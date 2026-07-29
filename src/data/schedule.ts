// Day-of running order for TEDxHuntingValley (August 22, 2026).
//
// HOW TO UPDATE:
//   - Edit the times and names below; the /schedule page follows automatically.
//   - Add a talk title once confirmed by setting `detail` on that item.
//   - When the running order is locked, set `scheduleTentative = false` to drop the draft notice.
// All times are PM.

export type ScheduleKind = "opening" | "talk" | "performance" | "break" | "closing";

export type ScheduleItem = {
  time: string | null; // e.g. "1:05 - 1:25"; null shows as "TBA"
  title: string; // the speaker's name for talks, otherwise the segment name
  detail?: string | null; // optional second line, e.g. the talk title once announced
  kind: ScheduleKind;
};

export type ScheduleSession = {
  id: "s1" | "s2";
  name: string;
  window: string | null; // null shows as "Time to be announced"
  ticket: string; // which ticket admits you to this session
  items: ScheduleItem[];
};

/** Real times are published (false would show TBA placeholders instead). */
export const scheduleReady = true;
/** Final running order. Set true to show a "times may shift" draft notice on /schedule. */
export const scheduleTentative = false;

export const schedule: ScheduleSession[] = [
  {
    id: "s1",
    name: "Student Session",
    window: "1:00 - 3:05 PM",
    ticket: "Session 1 ticket or the All-Day Pass",
    items: [
      { time: "12:30 - 1:00", title: "Guest arrival and check-in", kind: "opening" },
      { time: "1:00 - 1:05", title: "Opening remarks", kind: "opening" },
      { time: "1:05 - 1:25", title: "Ethan Shneyderman", kind: "talk" },
      { time: "1:25 - 1:45", title: "Jackson Sarver", kind: "talk" },
      { time: "1:45 - 2:05", title: "Claire Witalec", kind: "talk" },
      { time: "2:05 - 2:25", title: "Priyasha Ghosal", kind: "talk" },
      { time: "2:25 - 2:45", title: "Gage Martin", kind: "talk" },
      { time: "2:45 - 3:05", title: "James Mason Jr.", kind: "talk" },
      { time: "3:05 - 3:40", title: "Intermission and reception", kind: "break" },
    ],
  },
  {
    id: "s2",
    name: "Adult Session",
    window: "3:40 - 5:55 PM",
    ticket: "Session 2 ticket or the All-Day Pass",
    items: [
      { time: "3:40 - 3:45", title: "Adult session introduction", kind: "opening" },
      { time: "3:45 - 4:05", title: "Nic Barlage", kind: "talk" },
      { time: "4:05 - 4:25", title: "Brandon Chrostowski", kind: "talk" },
      { time: "4:25 - 4:45", title: "Laila Edwards", kind: "talk" },
      { time: "4:45 - 5:05", title: "India L. Birdsong Terry", kind: "talk" },
      { time: "5:05 - 5:25", title: "Marc Byrnes", kind: "talk" },
      { time: "5:25 - 5:45", title: "Fred Nance", kind: "talk" },
      { time: "5:45 - 5:55", title: "Closing remarks", kind: "closing" },
    ],
  },
];
