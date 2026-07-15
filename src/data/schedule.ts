// Day-of schedule for TEDxHuntingValley. Everything is "to be announced" until you fill it in.
//
// HOW TO PUBLISH THE REAL SCHEDULE:
//   1. Set `scheduleReady = true`.
//   2. Fill in each session's `window` (e.g. "9:00 AM – 12:00 PM") and each item's `time`,
//      `title`, and `speaker`. Add or remove items freely.
// While `scheduleReady` is false, the /schedule page shows the framework with "To be announced"
// placeholders, so the page is useful even before times are locked.

export type ScheduleKind = "opening" | "talk" | "performance" | "break" | "closing";

export type ScheduleItem = {
  time: string | null; // e.g. "9:15 AM"; null shows as "TBA"
  title: string;
  speaker?: string | null;
  kind: ScheduleKind;
};

export type ScheduleSession = {
  id: "s1" | "s2";
  name: string;
  window: string | null; // e.g. "9:00 AM – 12:00 PM"; null shows as "Time to be announced"
  items: ScheduleItem[];
};

/** Flip to true once real times and titles are in below. */
export const scheduleReady = false;

// Talk slots below (the lineup is 6 adults + 6 students, 12 total). Titles/speakers left blank
// until confirmed. Adjust the number of "Talk N" rows per session to match your final running order.
export const schedule: ScheduleSession[] = [
  {
    id: "s1",
    name: "Session 1",
    window: null,
    items: [
      { time: null, title: "Doors open", kind: "opening" },
      { time: null, title: "Welcome and opening remarks", kind: "opening" },
      { time: null, title: "Talk 1", speaker: null, kind: "talk" },
      { time: null, title: "Talk 2", speaker: null, kind: "talk" },
      { time: null, title: "Talk 3", speaker: null, kind: "talk" },
      { time: null, title: "Short break", kind: "break" },
      { time: null, title: "Talk 4", speaker: null, kind: "talk" },
      { time: null, title: "Talk 5", speaker: null, kind: "talk" },
      { time: null, title: "Talk 6", speaker: null, kind: "talk" },
      { time: null, title: "Intermission", kind: "break" },
    ],
  },
  {
    id: "s2",
    name: "Session 2",
    window: null,
    items: [
      { time: null, title: "Session 2 doors", kind: "opening" },
      { time: null, title: "Talk 7", speaker: null, kind: "talk" },
      { time: null, title: "Talk 8", speaker: null, kind: "talk" },
      { time: null, title: "Talk 9", speaker: null, kind: "talk" },
      { time: null, title: "Short break", kind: "break" },
      { time: null, title: "Talk 10", speaker: null, kind: "talk" },
      { time: null, title: "Talk 11", speaker: null, kind: "talk" },
      { time: null, title: "Talk 12", speaker: null, kind: "talk" },
      { time: null, title: "Closing remarks", kind: "closing" },
    ],
  },
];
