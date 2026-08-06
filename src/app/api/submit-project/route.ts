import { NextResponse } from "next/server";
import { escapeHtml, sendTransactionalEmail } from "../../../lib/email";

export const runtime = "nodejs";

type SubmitProjectPayload = {
  projectName?: string;
  sector?: string;
  description?: string;
  impact?: string;
  contactName?: string;
  email?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as SubmitProjectPayload | null;

  const projectName = body?.projectName?.trim() ?? "";
  const sector = body?.sector?.trim() ?? "";
  const description = body?.description?.trim() ?? "";
  const impact = body?.impact?.trim() ?? "";
  const contactName = body?.contactName?.trim() ?? "";
  const email = body?.email?.trim() ?? "";

  if (!projectName || !sector || !description || !impact || !contactName || !email) {
    return NextResponse.json(
      {
        message: "Please complete all required project fields.",
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

  const subject = `[Project Submission] ${projectName} - ${contactName}`;

  const text = [
    `Project Name: ${projectName}`,
    `Sector: ${sector}`,
    `Contact: ${contactName} <${email}>`,
    "",
    "Description:",
    description,
    "",
    "Expected Impact:",
    impact,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0A1224; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">
        New Project Submission
      </h2>

      <p>
        <strong>Project Name:</strong> ${escapeHtml(projectName)}
      </p>

      <p>
        <strong>Sector:</strong> ${escapeHtml(sector)}
      </p>

      <p>
        <strong>Contact:</strong> ${escapeHtml(contactName)} &lt;${escapeHtml(email)}&gt;
      </p>

      <p>
        <strong>Project Description:</strong>
      </p>

      <p style="white-space: pre-wrap;">
        ${escapeHtml(description)}
      </p>

      <p>
        <strong>Expected Impact:</strong>
      </p>

      <p style="white-space: pre-wrap;">
        ${escapeHtml(impact)}
      </p>
    </div>
  `;

  const result = await sendTransactionalEmail({
    subject,
    text,
    html,
    replyTo: email,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        message: "Submission failed to send. Please try again.",
      },
      {
        status: 502,
      },
    );
  }

  return NextResponse.json(
    {
      message: "Thanks — your project submission has been received.",
    },
    {
      status: 200,
    },
  );
}
