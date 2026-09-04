// The running order for TEDxHuntingValley, August 22, 2026, as it happened. Talk titles come from
// the published videos; each talk links to its recording via `speakerId` (see src/data/talks.ts).
// All times are PM.

export type ScheduleKind = "opening" | "talk" | "performance" | "break" | "closing";

export type ScheduleItem = {
  time: string | null; // e.g. "1:05 - 1:25"; null shows as "TBA"
  title: string; // the speaker's name for talks, otherwise the segment name
  detail?: string | null; // optional second line, e.g. the talk title
  kind: ScheduleKind;
  speakerId?: string; // for talks: joins to speakers.ts / talks.ts so the row can link to the video
};

export type ScheduleSession = {
  id: "s1" | "s2";
  name: string;
  window: string | null; // null shows as "Time to be announced"
  ticket: string; // which ticket admitted you to this session
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
      { time: "1:00 - 1:05", title: "Cold open and welcome", detail: "Cold open by comedian Ricky Smith, then Charlie Martin and Jack Nelson", kind: "opening" },
      { time: "1:05 - 1:25", title: "Ethan Shneyderman", detail: "They Wrote Back: The World Is More Reachable Than You Think", kind: "talk", speakerId: "ethan-shneyderman" },
      { time: "1:25 - 1:45", title: "Jackson Sarver", detail: "Feed Billions, Kill Millions: The Tragedy of Fritz Haber", kind: "talk", speakerId: "jackson-sarver" },
      { time: "1:45 - 2:05", title: "Claire Witalec", detail: "Where Do We Draw the Line? Gerrymandering and Democracy", kind: "talk", speakerId: "claire-witalec" },
      { time: "2:05 - 2:25", title: "Priyasha Ghosal", detail: "The Human Cost of Convenience: How Efficiency Erodes Empathy", kind: "talk", speakerId: "priyasha-ghosal" },
      { time: "2:25 - 2:45", title: "Gage Martin", detail: "The Ads on Your Phone Are Making You Mow Your Lawn", kind: "talk", speakerId: "gage-martin" },
      { time: "2:45 - 3:05", title: "James Mason Jr.", detail: "It’s About What You Say, Not How You Say It", kind: "talk", speakerId: "james-mason-jr" },
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
      { time: "3:45 - 4:05", title: "Nic Barlage", detail: "You’ll See It When You Believe It", kind: "talk", speakerId: "nic-barlage" },
      { time: "4:05 - 4:25", title: "Brandon Chrostowski", detail: "Breaking Out", kind: "talk", speakerId: "brandon-chrostowski" },
      { time: "4:25 - 4:45", title: "Marc Byrnes", detail: "Are You a Battery Charger?", kind: "talk", speakerId: "marc-byrnes" },
      { time: "4:45 - 5:05", title: "Laila Edwards", detail: "Before the Applause", kind: "talk", speakerId: "laila-edwards" },
      { time: "5:05 - 5:25", title: "Jeff Epstein", detail: "The Infrastructure of Possibility", kind: "talk", speakerId: "jeff-epstein" },
      { time: "5:25 - 5:45", title: "Fred Nance", detail: "EQ: The Difference Maker in Winning High-Stakes Engagements", kind: "talk", speakerId: "fred-nance" },
      { time: "5:45 - 5:55", title: "Closing remarks", detail: "Credits, thank yous, and what is your why", kind: "closing" },
    ],
  },
];
