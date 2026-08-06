import { NextResponse } from "next/server";
import { escapeHtml, sendTransactionalEmail } from "../../../lib/email";

export const runtime = "nodejs";

type InvestorEnquiryPayload = {
  fullName?: string;
  institution?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as InvestorEnquiryPayload | null;

  const fullName = body?.fullName?.trim() ?? "";
  const institution = body?.institution?.trim() ?? "";
  const email = body?.email?.trim() ?? "";
  const subject = body?.subject?.trim() ?? "";
  const message = body?.message?.trim() ?? "";

  if (!fullName || !institution || !email || !subject || !message) {
    return NextResponse.json(
      {
        message: "Please complete all required fields.",
      },
      {
        status: 400,
      },
    );
  }

  if (!process.env.BREVO_API_KEY) {
    return NextResponse.json(
      {
        message: "Email service is not configured.",
      },
      {
        status: 500,
      },
    );
  }

  const emailSubject = `[Investor Enquiry] ${subject} - ${fullName}`;

  const text = [
    `Name: ${fullName}`,
    `Institution: ${institution}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0A1224; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">
        New Investor Enquiry
      </h2>

      <p>
        <strong>Name:</strong> ${escapeHtml(fullName)}
      </p>

      <p>
        <strong>Institution:</strong> ${escapeHtml(institution)}
      </p>

      <p>
        <strong>Email:</strong> ${escapeHtml(email)}
      </p>

      <p>
        <strong>Subject:</strong> ${escapeHtml(subject)}
      </p>

      <p>
        <strong>Message:</strong>
      </p>

      <p style="white-space: pre-wrap;">
        ${escapeHtml(message)}
      </p>
    </div>
  `;

  const result = await sendTransactionalEmail({
    subject: emailSubject,
    text,
    html,
    replyTo: email,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        message: "Email delivery failed. Please try again.",
      },
      {
        status: 502,
      },
    );
  }

  console.log("Investor enquiry email sent successfully:", result.id);

  return NextResponse.json(
    {
      message:
        "Thanks for reaching out. Your enquiry has been sent successfully.",
    },
    {
      status: 200,
    },
  );
}
