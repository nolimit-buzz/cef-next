import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  department?: string;
  message?: string;
};

const CONTACT_TO =
  process.env.CONTACT_TO_EMAIL ?? "projects@cleanenergyfund.ng";

const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

const resend = new Resend(process.env.RESEND_API_KEY);


const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");


export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  const firstName = body?.firstName?.trim() ?? "";
  const lastName = body?.lastName?.trim() ?? "";
  const email = body?.email?.trim() ?? "";
  const department = body?.department?.trim() ?? "";
  const message = body?.message?.trim() ?? "";


  if (!firstName || !lastName || !email || !department || !message) {
    return NextResponse.json(
      {
        message: "Please complete all required contact fields.",
      },
      {
        status: 400,
      },
    );
  }


  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        message: "Email service is not configured.",
      },
      {
        status: 500,
      },
    );
  }


  const fullName = `${firstName} ${lastName}`;

  const subject = `[Contact Form] ${department} - ${fullName}`;


  const text = [
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Inquiry Type: ${department}`,
    "",
    message,
  ].join("\n");


  const html = `
    <div style="font-family: Arial, sans-serif; color: #0A1224; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">
        New Contact Inquiry
      </h2>

      <p>
        <strong>Name:</strong> ${escapeHtml(fullName)}
      </p>

      <p>
        <strong>Email:</strong> ${escapeHtml(email)}
      </p>

      <p>
        <strong>Inquiry Type:</strong> ${escapeHtml(department)}
      </p>

      <p>
        <strong>Message:</strong>
      </p>

      <p style="white-space: pre-wrap;">
        ${escapeHtml(message)}
      </p>
    </div>
  `;


  try {
    const { data, error } = await resend.emails.send({
      from: `Clean Energy Fund <${CONTACT_FROM}>`,
      to: CONTACT_TO,
      replyTo: email,
      subject,
      text,
      html,
    });


    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          message: `Email delivery failed: ${error.message}`,
        },
        {
          status: 502,
        },
      );
    }


    console.log("Email sent successfully:", data?.id);


    return NextResponse.json(
      {
        message:
          "Thanks for reaching out. Your inquiry has been sent successfully.",
      },
      {
        status: 200,
      },
    );

  } catch (error) {
    console.error("Email sending failed:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unable to send email.";

    return NextResponse.json(
      {
        message: `Email delivery failed: ${errorMessage}`,
      },
      {
        status: 502,
      },
    );
  }
}