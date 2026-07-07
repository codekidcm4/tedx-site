import { NextResponse } from "next/server";
import { getTakenSeats } from "@/lib/ticketsDb";

// Live seat availability for a session. Returns [] when the database isn't configured yet
// (the seat map then shows everything as available).
export async function GET(req: Request) {
  const session = new URL(req.url).searchParams.get("session") || "s1";
  const taken = await getTakenSeats(session);
  return NextResponse.json({ taken }, { headers: { "cache-control": "no-store" } });
}
