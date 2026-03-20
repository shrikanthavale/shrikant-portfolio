import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
  turnstileToken?: string;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestBuckets = new Map<string, number[]>();

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clamp(value: string, max: number) {
  return value.trim().slice(0, max);
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const bucket = requestBuckets.get(key) ?? [];
  const recent = bucket.filter((timestamp) => now - timestamp <= WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    requestBuckets.set(key, recent);
    return true;
  }

  recent.push(now);
  requestBuckets.set(key, recent);
  return false;
}

export async function POST(request: Request) {
  const rateLimitKey = getClientKey(request);
  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json(
      { message: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }

  const name = clamp(payload.name ?? "", 80);
  const email = clamp(payload.email ?? "", 120);
  const subject = clamp(payload.subject ?? "", 140) || "Website contact message";
  const message = clamp(payload.message ?? "", 3000);
  const website = clamp(payload.website ?? "", 200);
  const turnstileToken = clamp(payload.turnstileToken ?? "", 5000);

  // Honeypot triggered.
  if (website) {
    return NextResponse.json({ message: "Message sent." }, { status: 200 });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ message: "Name, email, and message are required." }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    if (!turnstileToken) {
      return NextResponse.json({ message: "Anti-spam verification is required." }, { status: 400 });
    }

    const verifyParams = new URLSearchParams({
      secret: turnstileSecret,
      response: turnstileToken,
      remoteip: rateLimitKey,
    });

    const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: verifyParams.toString(),
    });

    const turnstileResult = (await turnstileResponse.json()) as { success?: boolean };
    if (!turnstileResult.success) {
      return NextResponse.json({ message: "Anti-spam verification failed. Please retry." }, { status: 400 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { message: "Contact form is not configured yet. Please try again later." },
      { status: 500 },
    );
  }

  const emailText = [
    "New portfolio contact form submission",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const emailHtml = `
    <h2>New portfolio contact form submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br />")}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `[Portfolio] ${subject}`,
      reply_to: email,
      text: emailText,
      html: emailHtml,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Unable to send your message right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
}
