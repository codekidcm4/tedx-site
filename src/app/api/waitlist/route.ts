import { NextResponse } from "next/server";
import { joinWaitlist } from "@/lib/ticketsDb";
import { ticketConfig } from "@/data/tickets";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Captures an interested buyer for a (usually sold-out) session. Stored in the waitlist table.
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const { email, session, note } = (body ?? {}) as { email?: unknown; session?: unknown; note?: unknown };

  const cleanEmail = typeof email === "string" ? email.trim() : "";
  if (!EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  const cleanSession =
    typeof session === "string" && ticketConfig.sessions.some((s) => s.id === session) ? session : "any";

  const cleanNote = typeof note === "string" ? note.slice(0, 500) : null;
  const { ok } = await joinWaitlist(cleanEmail, cleanSession, cleanNote);
  if (!ok) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  return NextResponse.json({ ok: true });
}
