import { siteConfig } from "@/data/site";

// Single source of truth for "where are we relative to the event": before it, during it, or after.
// Drives post-event mode (the site flips to a thank-you / watch-the-talks state once the day passes).

export type EventPhase = "pre" | "live" | "post";

const START_MS = new Date(siteConfig.startDateTimeISO).getTime();
const END_MS = new Date(siteConfig.endDateTimeISO).getTime();

// TEDxHuntingValley 2026 has happened and every talk is published, so the site is permanently in
// its post-event state. NEXT_PUBLIC_EVENT_PHASE can still force "pre" or "live" for a preview, but
// with nothing set the answer is "post" on the server AND on the first client paint (no flash of
// the pre-event hero, no dependence on the visitor's clock).
const RAW_OVERRIDE = (process.env.NEXT_PUBLIC_EVENT_PHASE || "").trim().toLowerCase();
export const eventPhaseOverride: EventPhase =
  RAW_OVERRIDE === "pre" || RAW_OVERRIDE === "live" || RAW_OVERRIDE === "post"
    ? (RAW_OVERRIDE as EventPhase)
    : "post";

/** Pure helper: which phase a given instant (ms since epoch) falls in. */
export function computeEventPhase(nowMs: number): EventPhase {
  if (nowMs < START_MS) return "pre";
  if (nowMs > END_MS) return "post";
  return "live";
}

/** Phase for server code (route handlers, server components, metadata). */
export function eventPhaseServer(): EventPhase {
  return eventPhaseOverride;
}

/** The phase a client component renders on first paint; matches the server so hydration is clean. */
export const initialClientPhase: EventPhase = eventPhaseOverride;
