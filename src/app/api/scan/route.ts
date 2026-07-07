import { NextResponse } from "next/server";
import { checkInTicket } from "@/lib/ticketsDb";
import { isValidStaffCode } from "@/lib/scanAuth";

// Door check-in. Staff POST { code, token } where token is either a raw QR token or the full
// /ticket/<token> URL that the QR encodes. The staff code is required on every request.
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
  const { code, token } = (body ?? {}) as { code?: unknown; token?: unknown };

  if (!isValidStaffCode(code)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

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
