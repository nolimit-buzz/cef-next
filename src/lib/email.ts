const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

const FROM_EMAIL =
  process.env.BREVO_FROM_EMAIL ?? "support@cleanenergyfund.ng";

const FROM_NAME = process.env.BREVO_FROM_NAME ?? "Clean Energy Fund";

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

type SendArgs = {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
};

type SendResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

export async function sendTransactionalEmail({
  subject,
  text,
  html,
  replyTo,
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

    const payload = (await response.json().catch(() => null)) as
      | { messageId?: string; message?: string; code?: string }
      | null;

    if (!response.ok) {
      console.error("Brevo error:", response.status, payload);

      return { ok: false, error: "send-failed" };
    }

    return { ok: true, id: payload?.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);

    return { ok: false, error: "send-failed" };
  }
}
