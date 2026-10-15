import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/smtp";

/**
 * Estimate request submission endpoint.
 *
 * Delivers each request by email through Pierce's existing Zoho mailbox
 * (SMTP, no extra services or packages). Success is returned ONLY after the
 * mail server accepts the message, so customers are never told "your request
 * is in" when it wasn't sent.
 *
 * Environment variables (Vercel → Settings → Environment Variables, Production):
 *   SMTP_USER          pierce@piercepropainting.com
 *   SMTP_PASS          a Zoho *app password* for that mailbox (not the login password)
 *   ESTIMATE_TO_EMAIL  optional; defaults to SMTP_USER
 *   SMTP_HOST          optional; defaults to smtp.zoho.com
 *   SMTP_PORT          optional; defaults to 465
 *
 * If SMTP_USER or SMTP_PASS is missing, the endpoint fails honestly and asks
 * the customer to call or text instead.
 */

export const runtime = "nodejs";

const CALL_TEXT_FALLBACK =
  "We couldn't send your request online. Please call or text (509) 802-4309 and we'll get you an estimate.";
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

function field(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim().slice(0, 2000);
}

export async function POST(request: NextRequest) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: CALL_TEXT_FALLBACK }, { status: 400 });
  }

  const name = field(formData, "name");
  const phone = field(formData, "phone");
  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "Name and phone are required." }, { status: 400 });
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.error("[estimate-request] delivery not configured; request NOT delivered");
    return NextResponse.json({ ok: false, error: CALL_TEXT_FALLBACK }, { status: 503 });
  }
  const to = process.env.ESTIMATE_TO_EMAIL || user;

  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Email", field(formData, "email")],
    ["City", field(formData, "city")],
    ["Project type", field(formData, "projectType")],
    ["Scope", field(formData, "scope")],
    ["Size", field(formData, "size")],
    ["Timeframe", field(formData, "timeframe")],
    ["Notes", field(formData, "notes")],
  ];

  const attachments: { filename: string; contentType: string; content: Buffer }[] = [];
  let photoNote = "";
  const photo = formData.get("photo");
  if (photo && typeof photo === "object" && "arrayBuffer" in photo) {
    const file = photo as File;
    if (file.size > 0 && file.size <= MAX_PHOTO_BYTES) {
      attachments.push({
        filename: file.name || "photo.jpg",
        contentType: file.type || "application/octet-stream",
        content: Buffer.from(await file.arrayBuffer()),
      });
    } else if (file.size > MAX_PHOTO_BYTES) {
      photoNote = "Customer attached a photo larger than 5 MB; ask them to text it.";
    }
  }

  const text =
    "New estimate request from piercepropainting.com\n\n" +
    rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n") +
    (photoNote ? `\n\n${photoNote}` : "") +
    "\n\nReply to this email to answer the customer (if they gave an email), or call/text them.";

  const email = field(formData, "email");
  try {
    await sendMail(
      {
        host: process.env.SMTP_HOST || "smtp.zoho.com",
        port: Number(process.env.SMTP_PORT || 465),
        user,
        pass,
      },
      {
        from: user,
        fromName: "Pierce Pro Painting Website",
        to,
        replyTo: /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ? email : undefined,
        subject: `Estimate request: ${name} (${field(formData, "projectType") || "painting"})`,
        text,
        attachments,
      }
    );
  } catch (err) {
    console.error("[estimate-request] SMTP send failed:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ ok: false, error: CALL_TEXT_FALLBACK }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
