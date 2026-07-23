import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactBody = {
  source?: string;
  name?: string;
  email?: string;
  company?: string;
  interest?: string;
  message?: string;
};

const SOURCES = new Set([
  "contact",
  "newsletter",
  "book",
  "assessment-report",
  "diligence",
]);

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const source = String(body.source || "").trim();
  const email = String(body.email || "").trim();
  const name = String(body.name || "").trim();
  const company = String(body.company || "").trim();
  const interest = String(body.interest || "").trim();
  const message = String(body.message || "").trim();

  if (!SOURCES.has(source)) {
    return NextResponse.json(
      { ok: false, error: "Invalid source." },
      { status: 400 },
    );
  }

  if (!email || !isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required." },
      { status: 400 },
    );
  }

  if (source !== "newsletter" && !name) {
    return NextResponse.json(
      { ok: false, error: "Name is required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_EMAIL || "Maslow AI <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL || "hello@maslow.ai";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const subjectMap: Record<string, string> = {
    contact: `Working session request from ${name}`,
    newsletter: `Newsletter signup: ${email}`,
    book: `Campaign booking from ${name}`,
    "assessment-report": `Assessment report request: ${email}`,
    diligence: `Diligence pack request from ${name}`,
  };

  const lines = [
    `Source: ${source}`,
    name ? `Name: ${name}` : null,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    interest ? `Interest: ${interest}` : null,
    message ? `Message:\n${message}` : null,
  ].filter(Boolean);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: subjectMap[source] || `Maslow form: ${source}`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("Resend error", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send message." },
      { status: 500 },
    );
  }
}
