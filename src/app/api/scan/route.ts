import { NextResponse } from "next/server";
import { checkInTicket, searchTicketsByName } from "@/lib/ticketsDb";

export const dynamic = "force-dynamic";

// Name lookup for the door: GET /api/scan?q=<partial name> returns matching live tickets (one per
// seat per session) so staff can check someone in without a QR code. Same trust model as the
// rest of /scan (the page URL is the gate).
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  const hits = await searchTicketsByName(q);
  if (hits === null) return NextResponse.json({ status: "unavailable" }, { status: 503 });
  return NextResponse.json({ hits });
}

// Door check-in. POST { token } where token is either a raw QR token or the full /ticket/<token>
// URL that the QR encodes. The /scan page itself is the gate: the URL is unguessable and is shared
// with door staff directly, so no separate staff code is required.
function extractToken(raw: string): string {
  const s = (raw || "").trim();
  const marker = "/ticket/";
  const i = s.indexOf(marker);
  const t = i >= 0 ? s.slice(i + marker.length) : s;
  return t.split(/[?#]/)[0].replace(/\/+$/, "").trim();
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const { token } = (body ?? {}) as { token?: unknown };

  const parsed = extractToken(typeof token === "string" ? token : "");
  if (!parsed) return NextResponse.json({ status: "invalid" }, { status: 400 });

  const result = await checkInTicket(parsed);
  if (!result.ok) {
    if (result.reason === "db_error") return NextResponse.json({ status: "unavailable" }, { status: 503 });
    return NextResponse.json({ status: "not_found" });
  }
  return NextResponse.json({
    status: result.alreadyCheckedIn ? "already" : "checked_in",
    seat: result.seat,
    session: result.session,
    holder_name: result.holder_name,
  });
}
