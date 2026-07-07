// Server-only. Validates the door-scanner staff code. You MUST set TICKETS_SCAN_CODE in production
// (Vercel env) to a strong value shared only with door staff. The dev fallback only exists outside
// production, so no working door code is ever committed to the repo; if the env var is missing in
// production the scanner refuses every code (fails closed) rather than accepting a public default.
// Kept in one place so the /scan gate (server action) and the /api/scan route can't drift apart.

const FALLBACK_SCAN_CODE = process.env.NODE_ENV === "production" ? "" : "TEDXHV-DOOR-STAFF";

export function isValidStaffCode(code: unknown): boolean {
  const expected = (process.env.TICKETS_SCAN_CODE || FALLBACK_SCAN_CODE).trim().toLowerCase();
  return typeof code === "string" && expected.length > 0 && code.trim().toLowerCase() === expected;
}
