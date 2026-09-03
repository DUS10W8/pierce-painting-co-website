import { NextRequest, NextResponse } from "next/server";

/**
 * Estimate request submission endpoint.
 *
 * IMPORTANT — before launch: this currently only validates and logs the
 * submission server-side. It does NOT send an email, text, or CRM entry
 * yet. Wire this up to a real provider (e.g. Resend, Postmark, or Zoho
 * Mail's SMTP once info@piercepaintingco.com is live) before relying on
 * it to actually reach the business.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Name and phone are required." },
        { status: 400 }
      );
    }

    const submission = {
      projectType: formData.get("projectType"),
      scope: formData.get("scope"),
      size: formData.get("size"),
      timeframe: formData.get("timeframe"),
      name,
      phone,
      email,
      city: formData.get("city"),
      notes: formData.get("notes"),
      hasPhoto: formData.has("photo"),
      submittedAt: new Date().toISOString(),
    };

    // TODO: replace with real email/CRM delivery before launch.
    console.log("[estimate-request]", submission);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please call or text instead." },
      { status: 500 }
    );
  }
}
