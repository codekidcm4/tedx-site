// Ticketing configuration + a SAMPLE seat layout.
//
// This drives the /tickets page. The real Gund Auditorium seat map replaces `sampleSections`
// once the seating photos are parsed. Payments (Stripe), live seat inventory (database), and the
// QR e-tickets (email) are wired in a later step; until then the page runs in preview/test mode.

export type SessionId = "s1" | "s2" | "all-day";

export type TicketSession = {
  id: SessionId;
  name: string;
  detail: string;
  price: number; // in cents (USD)
};

export const ticketConfig = {
  currency: "usd",
  currencySymbol: "$",
  // Max tickets (seats) per order. Enforced in the UI now, and server-side once checkout is wired.
  maxPerOrder: 2,
  // While true, the public sees the pre-sale gate; a valid code unlocks buying. Flip to false for
  // a public on-sale. The code itself is validated server-side (see app/tickets/actions.ts).
  presaleActive: true,
  // Set to true only after Stripe + the seat database are connected and tested.
  checkoutLive: false,
  sessions: [
    { id: "s1", name: "Session 1", detail: "Student speakers · 1:00 PM", price: 2500 },
    { id: "s2", name: "Session 2", detail: "Adult speakers · 3:40 PM", price: 2500 },
    { id: "all-day", name: "All-Day Pass", detail: "Both sessions · best value", price: 5000 },
  ] as TicketSession[],
};

export function formatPrice(cents: number): string {
  return `${ticketConfig.currencySymbol}${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

export function sessionById(id: SessionId): TicketSession {
  return ticketConfig.sessions.find((s) => s.id === id) ?? ticketConfig.sessions[0];
}

// ── SAMPLE seat layout ──────────────────────────────────────────────────────
// Replace `sampleSections` with the real layout once the seating photos are parsed.
// Sections render left-to-right; rows render front (near stage) to back.
export type SeatRow = { row: string; seats: number };
export type SeatSection = { id: string; name: string; rows: SeatRow[] };

// The real Gund Auditorium plan for TEDxHuntingValley. Row A (front row) is NOT used, so the
// first row in use is B. Center block is filled first; the two side wings add seats per row.
// Total = 100 (Center 74 + Left 13 + Right 13), at the 100 cap.
const centerRows: SeatRow[] = [
  { row: "B", seats: 10 },
  { row: "C", seats: 12 },
  { row: "D", seats: 12 },
  { row: "E", seats: 13 },
  { row: "F", seats: 13 },
  { row: "G", seats: 14 },
];

// Side sections: front row (A) unused. The first row in use (B) has 3 seats per wing; rows C–G
// have 2. That is 13 seats per side (one extra chair added to each wing's first row).
const wingRows: SeatRow[] = [
  { row: "B", seats: 3 },
  { row: "C", seats: 2 },
  { row: "D", seats: 2 },
  { row: "E", seats: 2 },
  { row: "F", seats: 2 },
  { row: "G", seats: 2 },
];

export const sampleSections: SeatSection[] = [
  { id: "L", name: "Left", rows: wingRows },
  { id: "C", name: "Center", rows: centerRows },
  { id: "R", name: "Right", rows: wingRows },
];

/** Total sellable seats in the plan above (per session). */
export const totalSeats = sampleSections.reduce(
  (sum, s) => sum + s.rows.reduce((r, row) => r + row.seats, 0),
  0
);

// Nothing is taken by default; real, live availability comes from the database (/api/seats).
export const sampleSold: Record<SessionId, string[]> = {
  s1: [],
  s2: [],
  "all-day": [],
};

export function seatId(sectionId: string, row: string, num: number): string {
  return `${sectionId}-${row}${num}`;
}

