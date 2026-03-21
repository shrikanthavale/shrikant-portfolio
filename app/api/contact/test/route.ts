import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type TestSendResult = {
  attempted: boolean;
  ok: boolean;
  provider: "smtp" | "resend";
};

function buildTestEmailContent() {
  const now = new Date().toISOString();
  const emailText = [
    "Portfolio contact email test",
    "",
    "This is a local test email from /api/contact/test.",
    `Timestamp: ${now}`,
  ].join("\n");

  const emailHtml = `
    <h2>Portfolio contact email test</h2>
    <p>This is a local test email from /api/contact/test.</p>
    <p><strong>Timestamp:</strong> ${now}</p>
  `;

  return { emailText, emailHtml };
}

async function sendViaSmtp() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE === "true";
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !toEmail || !fromEmail) {
    return { attempted: false, ok: false, provider: "smtp" } satisfies TestSendResult;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const { emailText, emailHtml } = buildTestEmailContent();

  await transporter.sendMail({
    from: fromEmail,
    to: toEmail,
    subject: "[Portfolio] SMTP test email",
    text: emailText,
    html: emailHtml,
  });

  return { attempted: true, ok: true, provider: "smtp" } satisfies TestSendResult;
}

async function sendViaResend() {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    return { attempted: false, ok: false, provider: "resend" } satisfies TestSendResult;
  }

  const { emailText, emailHtml } = buildTestEmailContent();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: "[Portfolio] Resend test email",
      text: emailText,
      html: emailHtml,
    }),
  });

  return { attempted: true, ok: response.ok, provider: "resend" } satisfies TestSendResult;
}

export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ message: "Not available outside local development." }, { status: 403 });
  }

  try {
    const smtpResult = await sendViaSmtp();
    if (smtpResult.attempted && smtpResult.ok) {
      return NextResponse.json({ message: "Test email sent via SMTP.", provider: smtpResult.provider }, { status: 200 });
    }

    const resendResult = await sendViaResend();
    if (resendResult.attempted && resendResult.ok) {
      return NextResponse.json({ message: "Test email sent via Resend.", provider: resendResult.provider }, { status: 200 });
    }

    if (!smtpResult.attempted && !resendResult.attempted) {
      return NextResponse.json({ message: "Email is not configured. Add SMTP or Resend env values." }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: "Email send failed. Check SMTP/Resend credentials.",
        details: "No provider was able to send successfully.",
      },
      { status: 502 },
    );
  } catch (error) {
    const details = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        message: "Email send failed. Check SMTP/Resend credentials.",
        details,
      },
      { status: 502 },
    );
  }
}