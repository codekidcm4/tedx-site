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
    { id: "s1", name: "Session 1", detail: "Single session", price: 2500 },
    { id: "s2", name: "Session 2", detail: "Single session", price: 2500 },
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

const centerRows: SeatRow[] = [
  { row: "A", seats: 12 },
  { row: "B", seats: 12 },
  { row: "C", seats: 14 },
  { row: "D", seats: 14 },
  { row: "E", seats: 14 },
  { row: "F", seats: 14 },
  { row: "G", seats: 16 },
  { row: "H", seats: 16 },
];

const wingRows: SeatRow[] = [
  { row: "A", seats: 3 },
  { row: "B", seats: 3 },
  { row: "C", seats: 4 },
  { row: "D", seats: 4 },
];

export const sampleSections: SeatSection[] = [
  { id: "L", name: "Left", rows: wingRows },
  { id: "C", name: "Center", rows: centerRows },
  { id: "R", name: "Right", rows: wingRows },
];

// SAMPLE unavailable seats per session (real availability comes from the database later).
export const sampleSold: Record<SessionId, string[]> = {
  s1: ["C-A3", "C-A4", "C-B7", "C-D9", "C-E5", "C-E6", "C-G12", "L-A2", "R-C3", "C-H1", "C-H2"],
  s2: ["C-B5", "C-B6", "C-C10", "C-F3", "C-F4", "C-G2", "R-B1", "L-D4", "C-A11", "C-A12"],
  "all-day": ["C-A3", "C-A4", "C-B5", "C-B6", "C-B7", "C-E5", "C-E6", "C-F3", "C-F4", "L-A2", "R-C3"],
};

export function seatId(sectionId: string, row: string, num: number): string {
  return `${sectionId}-${row}${num}`;
}
