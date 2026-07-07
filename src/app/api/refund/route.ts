import { NextResponse } from "next/server";
import { createRefundRequest } from "@/lib/ticketsDb";
import { sendRefundRequestEmail } from "@/lib/ticketEmail";
import { ticketConfig } from "@/data/tickets";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A buyer asks for a refund. We record the request and notify the organizer; the organizer then
// issues the actual refund in Stripe, and the charge.refunded webhook frees the seats.
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const { email, session, reason } = (body ?? {}) as { email?: unknown; session?: unknown; reason?: unknown };

  const cleanEmail = typeof email === "string" ? email.trim() : "";
  if (!EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  const cleanSession =
    typeof session === "string" && ticketConfig.sessions.some((s) => s.id === session) ? session : null;
  const cleanReason = typeof reason === "string" ? reason.slice(0, 2000) : "";

  const stored = (await createRefundRequest(cleanEmail, cleanSession, cleanReason)).ok;
  let emailed = false;
  try {
    emailed = await sendRefundRequestEmail(cleanEmail, cleanSession, cleanReason);
  } catch {
    emailed = false;
  }
  // Only fail if we could neither record nor forward the request (nothing configured yet).
  if (!stored && !emailed) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  return NextResponse.json({ ok: true });
}
