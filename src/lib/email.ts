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
