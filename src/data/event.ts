import { siteConfig } from "@/data/site";

// Single source of truth for "where are we relative to the event": before it, during it, or after.
// Drives post-event mode (the site flips to a thank-you / watch-the-talks state once the day passes).

export type EventPhase = "pre" | "live" | "post";

const START_MS = new Date(siteConfig.startDateTimeISO).getTime();
const END_MS = new Date(siteConfig.endDateTimeISO).getTime();

// Optional hard override so you can force a phase without waiting on the clock (handy for a preview,
// or to lock the post-event state the day after). Set NEXT_PUBLIC_EVENT_PHASE to "pre", "live", or
// "post". Any other value (or unset) means "decide automatically from the date".
const RAW_OVERRIDE = (process.env.NEXT_PUBLIC_EVENT_PHASE || "").trim().toLowerCase();
export const eventPhaseOverride: EventPhase | null =
  RAW_OVERRIDE === "pre" || RAW_OVERRIDE === "live" || RAW_OVERRIDE === "post"
    ? (RAW_OVERRIDE as EventPhase)
    : null;

/** Pure helper: which phase a given instant (ms since epoch) falls in. */
export function computeEventPhase(nowMs: number): EventPhase {
  if (nowMs < START_MS) return "pre";
  if (nowMs > END_MS) return "post";
  return "live";
}

/**
 * Phase for server code (route handlers, server components, metadata). Uses the override when set,
 * otherwise the real server clock.
 */
export function eventPhaseServer(): EventPhase {
  return eventPhaseOverride ?? computeEventPhase(Date.now());
}

/**
 * The phase a client component renders on first paint. Kept stable (override, else "pre") so the
 * server-rendered HTML and the first client render match; the useEventPhase hook then updates it to
 * the real value after mount. This avoids a hydration mismatch while still flipping automatically.
 */
export const initialClientPhase: EventPhase = eventPhaseOverride ?? "pre";
