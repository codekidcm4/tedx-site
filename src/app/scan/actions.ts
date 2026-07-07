"use server";

import { isValidStaffCode } from "@/lib/scanAuth";

// Unlocks the door-scanner page. The same code must also accompany each check-in POST (defense in
// depth), so a stolen page URL alone can't check anyone in.
export async function verifyStaffCode(code: string): Promise<{ ok: boolean }> {
  await new Promise((r) => setTimeout(r, 300)); // constant delay to blunt guessing
  return { ok: isValidStaffCode(code) };
}
