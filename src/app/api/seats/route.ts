import { NextResponse } from "next/server";
import { getTakenSeats } from "@/lib/ticketsDb";
import { totalSeats, ticketConfig } from "@/data/tickets";

// Live seat availability. Two shapes:
//   /api/seats?session=s1   -> { taken: string[], total, remaining }  (for the seat map)
//   /api/seats?summary      -> { sessions: { s1: {total, remaining}, ... } }  (for the session cards)
// Returns everything-available when the database isn't configured yet.
export async function GET(req: Request) {
  const url = new URL(req.url);

  if (url.searchParams.has("summary")) {
    const entries = await Promise.all(
      ticketConfig.sessions.map(async (s) => {
        const taken = await getTakenSeats(s.id);
        return [s.id, { total: totalSeats, remaining: Math.max(0, totalSeats - taken.length) }] as const;
      })
    );
    return NextResponse.json(
      { sessions: Object.fromEntries(entries) },
      { headers: { "cache-control": "no-store" } }
    );
  }

  const session = url.searchParams.get("session") || "s1";
  const taken = await getTakenSeats(session);
  return NextResponse.json(
    { taken, total: totalSeats, remaining: Math.max(0, totalSeats - taken.length) },
    { headers: { "cache-control": "no-store" } }
  );
}
