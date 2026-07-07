"use client";

import { useEffect, useState } from "react";
import {
  computeEventPhase,
  eventPhaseOverride,
  initialClientPhase,
  type EventPhase,
} from "@/data/event";

/**
 * Client hook for the current event phase. Renders `initialClientPhase` on the server and on the
 * first client paint (so hydration matches), then, if there's no hard override, recomputes from the
 * real clock after mount. The only visible effect is an automatic flip to post-event once the day
 * passes; set NEXT_PUBLIC_EVENT_PHASE to remove even that.
 */
export function useEventPhase(): EventPhase {
  const [phase, setPhase] = useState<EventPhase>(initialClientPhase);
  useEffect(() => {
    if (!eventPhaseOverride) setPhase(computeEventPhase(Date.now()));
  }, []);
  return phase;
}
