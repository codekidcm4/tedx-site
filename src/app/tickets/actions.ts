"use server";

// Server-side pre-sale code validation. The code is read from an environment variable so it is
// never shipped in the client bundle. Set TICKETS_PRESALE_CODE in your Vercel project (and in a
// local .env.local) to your real pre-sale code; until then a default is used for development.
//
// This is the only "backend" piece live right now. Stripe checkout + the seat database land next.

const FALLBACK_CODE = "TEDXHV2026"; // dev fallback — override with TICKETS_PRESALE_CODE in Vercel

export async function verifyPresaleCode(code: string): Promise<{ ok: boolean }> {
  const expected = (process.env.TICKETS_PRESALE_CODE || FALLBACK_CODE).trim().toLowerCase();
  const given = (code || "").trim().toLowerCase();
  // Tiny delay to blunt brute-force guessing of the code.
  await new Promise((r) => setTimeout(r, 400));
  return { ok: given.length > 0 && given === expected };
}
