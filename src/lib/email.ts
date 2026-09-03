const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

const FROM_EMAIL =
  process.env.BREVO_FROM_EMAIL ?? "no-reply@cleanenergyfund.ng";

const FROM_NAME = process.env.BREVO_FROM_NAME ?? "Clean Energy Fund Website";

const CONTACT_TO =
  process.env.CONTACT_TO_EMAIL ?? "support@cleanenergyfund.ng";

export const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

type BrevoSender = { email?: string; active?: boolean };

type BrevoDomain = { domain_name?: string; authenticated?: boolean };

// Brevo accepts POST /v3/smtp/email and returns a messageId *before* validating
// the sender, then rejects asynchronously. Without this check an unverified
// sender looks like a successful send. Advisory only — we still attempt the send.
let senderCheck: Promise<boolean> | null = null;

async function isSenderUsable(apiKey: string): Promise<boolean> {
  const headers = { "api-key": apiKey, accept: "application/json" };

  try {
    const [sendersRes, domainsRes] = await Promise.all([
      fetch("https://api.brevo.com/v3/senders", { headers }),
      fetch("https://api.brevo.com/v3/senders/domains", { headers }),
    ]);

    if (!sendersRes.ok || !domainsRes.ok) {
      return true;
    }

    const senders = (await sendersRes.json()) as { senders?: BrevoSender[] };
    const domains = (await domainsRes.json()) as { domains?: BrevoDomain[] };

    const from = FROM_EMAIL.toLowerCase();
    const fromDomain = from.split("@")[1] ?? "";

    const verifiedSender = senders.senders?.some(
      (sender) => sender.active && sender.email?.toLowerCase() === from,
    );

    const authenticatedDomain = domains.domains?.some(
      (domain) =>
        domain.authenticated &&
        domain.domain_name?.toLowerCase() === fromDomain,
    );

    return Boolean(verifiedSender || authenticatedDomain);
  } catch (error) {
    // A flaky check must never block real mail.
    console.error("Brevo sender check failed:", error);

    return true;
  }
}

// Which form produced the mail. Drives the sheet partitioning in the CMS's
// spreadsheet export, so these strings must match the ones in
// cms/src/admin/extensions/email-log/workbook.ts.
export type MailType = "contact" | "project-submission" | "investor-enquiry";

type SendArgs = {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
  type?: MailType;
  payload?: Record<string, unknown> | null;
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

type EmailLogEntry = {
  type: string;
  to: string;
  from: string;
  replyTo: string | null;
  subject: string;
  body: string;
  payload: Record<string, unknown> | null;
  status: "sent" | "failed";
  error: string | null;
  messageId: string | null;
  smtpResponse: string | null;
};

// Best-effort archive write. A CMS that is down, misconfigured or missing the
// Public "create" permission on email-log must never turn a *delivered* email
// into an error for the visitor, so every failure is swallowed and only logged.
async function logToStrapi(entry: EmailLogEntry) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/email-logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: { ...entry, sentAt: new Date().toISOString() },
      }),
    });

    if (!response.ok) {
      console.error(
        "[mail] failed to log email in Strapi",
        response.status,
        await response.text(),
      );
    }
  } catch (error) {
    console.error("[mail] failed to log email in Strapi", error);
  }
}

type SendResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

export async function sendTransactionalEmail({
  subject,
  text,
  html,
  replyTo,
  type,
  payload,
}: SendArgs): Promise<SendResult> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    return { ok: false, error: "not-configured" };
  }

  senderCheck ??= isSenderUsable(apiKey);

  if (!(await senderCheck)) {
    console.error(
      `Brevo sender "${FROM_EMAIL}" is not verified and no authenticated domain covers it — mail will be rejected. Verify it at https://app.brevo.com/senders`,
    );
  }

  try {
    const response = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: FROM_EMAIL, name: FROM_NAME },
        to: [{ email: CONTACT_TO }],
        replyTo: { email: replyTo },
        subject,
        htmlContent: html,
        textContent: text,
      }),
    });

    const brevoResponse = (await response.json().catch(() => null)) as
      | { messageId?: string; message?: string; code?: string }
      | null;

    if (!response.ok) {
      console.error("Brevo error:", response.status, brevoResponse);

      return { ok: false, error: "send-failed" };
    }

    // Only delivered mail is archived. `status` and `error` still exist on the
    // schema, so failures can be logged later without a migration.
    await logToStrapi({
      type: type ?? "other",
      to: CONTACT_TO,
      from: FROM_EMAIL,
      replyTo,
      subject,
      body: text,
      payload: payload ?? null,
      status: "sent",
      error: null,
      messageId: brevoResponse?.messageId ?? null,
      smtpResponse: brevoResponse ? JSON.stringify(brevoResponse) : null,
    });

    return { ok: true, id: brevoResponse?.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);

    return { ok: false, error: "send-failed" };
  }
}
