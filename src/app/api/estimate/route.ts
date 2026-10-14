import { NextRequest, NextResponse } from "next/server";

/**
 * Estimate request submission endpoint.
 *
 * Delivers each request by email through Resend's HTTP API (no extra
 * packages). Success is returned ONLY after the email provider accepts the
 * message, so customers are never told "your request is in" when it wasn't
 * delivered.
 *
 * Required environment variables (set in Vercel → Settings → Environment
 * Variables, Production):
 *   RESEND_API_KEY      API key from resend.com (domain piercepropainting.com verified)
 *   ESTIMATE_TO_EMAIL   inbox that receives requests, e.g. info@piercepropainting.com
 *   ESTIMATE_FROM_EMAIL sender on the verified domain, e.g. estimates@piercepropainting.com
 *
 * If any are missing, the endpoint fails honestly and asks the customer to
 * call or text instead.
 */

const CALL_TEXT_FALLBACK =
  "We couldn't send your request online. Please call or text (509) 802-4309 and we'll get you an estimate.";
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

function field(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim().slice(0, 2000);
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ESTIMATE_TO_EMAIL;
  const from = process.env.ESTIMATE_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("[estimate-request] delivery not configured; request NOT delivered");
    return NextResponse.json({ ok: false, error: CALL_TEXT_FALLBACK }, { status: 503 });
  }

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
  const filled = rows.filter(([, v]) => v);

  const attachments: { filename: string; content: string }[] = [];
  const photo = formData.get("photo");
  let photoNote = "";
  if (photo && typeof photo === "object" && "arrayBuffer" in photo) {
    const file = photo as File;
    if (file.size > 0 && file.size <= MAX_PHOTO_BYTES) {
      const buf = Buffer.from(await file.arrayBuffer());
      attachments.push({ filename: file.name || "photo.jpg", content: buf.toString("base64") });
    } else if (file.size > MAX_PHOTO_BYTES) {
      photoNote = "Customer attached a photo larger than 5 MB; ask them to text it.";
    }
  }

  const text = [...filled.map(([k, v]) => `${k}: ${v}`), photoNote].filter(Boolean).join("\n");
  const html =
    `<h2>New estimate request</h2><table>` +
    filled.map(([k, v]) => `<tr><td><b>${escapeHtml(k)}</b></td><td>${escapeHtml(v)}</td></tr>`).join("") +
    `</table>` +
    (photoNote ? `<p>${escapeHtml(photoNote)}</p>` : "");

  const email = field(formData, "email");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Estimate request: ${name} (${field(formData, "projectType") || "painting"})`,
        text,
        html,
        ...(email.includes("@") ? { reply_to: email } : {}),
        ...(attachments.length ? { attachments } : {}),
      }),
    });
    if (!res.ok) {
      console.error("[estimate-request] provider rejected", res.status);
      return NextResponse.json({ ok: false, error: CALL_TEXT_FALLBACK }, { status: 502 });
    }
  } catch {
    console.error("[estimate-request] provider unreachable");
    return NextResponse.json({ ok: false, error: CALL_TEXT_FALLBACK }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
