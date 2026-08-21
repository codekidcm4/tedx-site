import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { getAdminState, assignCompTickets } from "@/lib/ticketsDb";
import { sampleSections, seatId, ADMIN_ROW_SEATS } from "@/data/tickets";
import { ADMIN_KEY } from "@/lib/adminKey";

export const dynamic = "force-dynamic";

// Organizer dashboard API. The dashboard's unguessable URL slug doubles as the key, sent with
// every request and checked server-side, so the bare API path can't be scraped or driven blind.
function codeOk(code: string | null): boolean {
  if (!code) return false;
  const a = Buffer.from(code);
  const b = Buffer.from(ADMIN_KEY);
  return a.length === b.length && timingSafeEqual(a, b);
}

const PUBLIC_SEAT_IDS = new Set(
  sampleSections.flatMap((s) => s.rows.flatMap((r) => Array.from({ length: r.seats }, (_, i) => seatId(s.id, r.row, i + 1))))
);
const ALL_ASSIGNABLE = new Set([...PUBLIC_SEAT_IDS, ...ADMIN_ROW_SEATS]);

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (!codeOk(url.searchParams.get("code"))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const session = url.searchParams.get("session") === "s2" ? "s2" : "s1";
  const state = await getAdminState(session);
  if (!state) return NextResponse.json({ error: "db_unavailable" }, { status: 503 });
  return NextResponse.json({ session, ...state });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const { code, seat, name, email, session } = (body ?? {}) as {
    code?: string;
    seat?: string;
    name?: string;
    email?: string;
    session?: string;
  };
  if (!codeOk(code ?? null)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const cleanSeat = typeof seat === "string" ? seat.trim() : "";
  const cleanName = typeof name === "string" ? name.trim().slice(0, 120) : "";
  const cleanEmail = typeof email === "string" && email.includes("@") ? email.trim().slice(0, 200) : undefined;
  const cleanSession = session === "s1" || session === "s2" || session === "all-day" ? session : "all-day";
  if (!ALL_ASSIGNABLE.has(cleanSeat) || !cleanName) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const result = await assignCompTickets({ seat: cleanSeat, name: cleanName, email: cleanEmail, session: cleanSession });
  if ("error" in result) {
    const status = result.error === "seat_taken" ? 409 : 503;
    return NextResponse.json({ error: result.error }, { status });
  }
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.tedxhuntingvalley.com").replace(/\/$/, "");
  return NextResponse.json({
    ok: true,
    seat: cleanSeat,
    tickets: result.tickets.map((t) => ({ session: t.session, url: `${site}/ticket/${t.token}` })),
  });
}
