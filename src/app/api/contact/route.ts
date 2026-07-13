import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  department?: string;
  message?: string;
};

const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? "projects@cleanenergyfund.ng";
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL ?? CONTACT_TO;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const escapeHtml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");

const buildTransport = () => {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  const firstName = body?.firstName?.trim() ?? "";
  const lastName = body?.lastName?.trim() ?? "";
  const email = body?.email?.trim() ?? "";
  const department = body?.department?.trim() ?? "";
  const message = body?.message?.trim() ?? "";

  if (!firstName || !lastName || !email || !department || !message) {
    return NextResponse.json(
      { message: "Please complete all required contact fields." },
      { status: 400 },
    );
  }

  const transporter = buildTransport();

  if (!transporter) {
    return NextResponse.json(
      {
        message:
          "Email delivery is not configured yet. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.",
      },
      { status: 500 },
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
      <h2 style="margin: 0 0 16px;">New Contact Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Inquiry Type:</strong> ${escapeHtml(department)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `Clean Energy Fund <${CONTACT_FROM}>`,
    to: CONTACT_TO,
    replyTo: email,
    subject,
    text,
    html,
  });

  return NextResponse.json(
    {
      message: "Thanks for reaching out. Your inquiry has been sent successfully.",
    },
    { status: 200 },
  );
}
