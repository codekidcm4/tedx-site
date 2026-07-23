"use server";

// Server-side pre-sale code validation. The code is read from an environment variable so it is
// never shipped in the client bundle. Set TICKETS_PRESALE_CODE in your Vercel project (and in a
// local .env.local) to your real pre-sale code; until then a default is used for development.
//
// TICKETS_PRESALE_CODE in Vercel overrides this fallback. IMPORTANT: changing that env var only
// takes effect after a redeploy. This fallback is kept in sync with the live code so the pre-sale
// gate works even before a redeploy. Supports several codes at once (comma-separated).

const FALLBACK_CODE = "TEDXPRESALE!";

function normalize(s: string): string {
  return (s || "").trim().toLowerCase();
}

export async function verifyPresaleCode(code: string): Promise<{ ok: boolean }> {
  const allowed = (process.env.TICKETS_PRESALE_CODE || FALLBACK_CODE)
    .split(",")
    .map(normalize)
    .filter(Boolean);
  const given = normalize(code);
  // Small constant delay to blunt brute-force guessing (no early-return timing signal).
  await new Promise((r) => setTimeout(r, 400));
  return { ok: given.length > 0 && allowed.includes(given) };
}
