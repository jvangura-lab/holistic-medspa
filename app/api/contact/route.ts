import { NextResponse } from "next/server";

/**
 * POST /api/contact — request-a-consultation form submission handler
 *
 * Per /Users/jonasvangura/website-auto/studio/templates/booking-integrations.md
 * + craft-bar.md SECURITY/FORMS rule:
 *   - honeypot field (`company`) — bots fill it, humans don't
 *   - Cloudflare Turnstile token verification (placeholder env var)
 *   - 5-req/min rate-limit per IP (in-memory; replace with Upstash/Redis in prod)
 *   - secure email via Resend (placeholder env var)
 *   - no mailto: link; the form posts here
 *
 * Env vars (placeholder fallbacks for local dev — F3.5 deploy step wires real values):
 *   RESEND_API_KEY=changeme         — Resend transactional email
 *   TURNSTILE_SECRET_KEY=changeme   — Cloudflare Turnstile verification
 *   CLINIC_INBOX_EMAIL=             — owner-confirmed clinic inbox (TBD)
 */

// ─────────────────────────────────────────────────────────────────────────────
// In-memory rate-limit (process-local; replaced by Upstash in production)
// ─────────────────────────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // requests
const RATE_LIMIT_WINDOW_MS = 60_000; // per 60 seconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// Cloudflare Turnstile verification (placeholder; verifies token if env wired)
// ─────────────────────────────────────────────────────────────────────────────
async function verifyTurnstile(token: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Local dev / placeholder mode: skip verification when secret is missing or set to "changeme".
  if (!secret || secret === "changeme") return true;
  if (!token) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data?.success);
  } catch {
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Send email via Resend (placeholder; logs in dev when env missing)
// ─────────────────────────────────────────────────────────────────────────────
async function sendEmail(payload: {
  service: string;
  name: string;
  phone: string;
  email: string;
  preferred: string;
  windows: string;
  notes: string;
  source: string;
}): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CLINIC_INBOX_EMAIL ?? "bayouholistics@example.com";

  if (!apiKey || apiKey === "changeme") {
    // Local dev / placeholder: log to server console; ship succeeds.
    // eslint-disable-next-line no-console
    console.log("[contact] (placeholder mode — Resend not wired)", payload);
    return { ok: true };
  }

  const html = `
    <h2>New request from Holistic Medspa site</h2>
    <p><strong>Service:</strong> ${payload.service}</p>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Phone:</strong> ${payload.phone}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Preferred contact:</strong> ${payload.preferred}</p>
    <p><strong>Three time windows:</strong> ${payload.windows}</p>
    <p><strong>Notes:</strong></p>
    <pre>${payload.notes}</pre>
    <hr />
    <p><em>Source: ${payload.source}</em></p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Holistic Medspa Site <no-reply@holistic-v6.vercel.app>",
        to,
        subject: `New consultation request — ${payload.name} (${payload.service})`,
        html,
        reply_to: payload.email || undefined,
      }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// POST handler
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  // Resolve IP — Vercel sets x-forwarded-for; fall back to a deterministic local string.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "local";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please call or text (985) 278-6087." },
      { status: 429 },
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  // Honeypot: a bot fills `company`; humans don't see it.
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    // Silently 200 so bots don't learn the trap exists.
    return NextResponse.json({ ok: true });
  }

  const turnstileOk = await verifyTurnstile(
    typeof formData.get("cf-turnstile-response") === "string"
      ? (formData.get("cf-turnstile-response") as string)
      : null,
  );
  if (!turnstileOk) {
    return NextResponse.json(
      { ok: false, error: "Verification failed. Please try again or call (985) 278-6087." },
      { status: 400 },
    );
  }

  const get = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v.trim() : "";
  };

  const payload = {
    service: get("service") || "Not specified",
    name: get("name"),
    phone: get("phone"),
    email: get("email"),
    preferred: get("preferred") || "Either",
    windows: get("windows"),
    notes: get("notes"),
    source: get("source") || "/book",
  };

  // Minimal validation — name + phone required (we book by phone).
  if (!payload.name || payload.name.length < 2) {
    return NextResponse.json({ ok: false, error: "Please add your name." }, { status: 400 });
  }
  if (!payload.phone || payload.phone.length < 7) {
    return NextResponse.json(
      { ok: false, error: "Please add a phone number (this is how Toya replies)." },
      { status: 400 },
    );
  }
  if (payload.notes.length > 5000) {
    return NextResponse.json({ ok: false, error: "Notes are too long." }, { status: 400 });
  }

  const result = await sendEmail(payload);
  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong sending your request. Please call or text (985) 278-6087 and we will book you in.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
