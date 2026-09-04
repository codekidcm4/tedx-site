// Every talk from TEDxHuntingValley 2026, as published to the TEDxHuntingValley YouTube channel on
// September 3, 2026. Single source of truth for /talks, the home-page talk grid, the speaker cards,
// and the schedule. `speakerId` joins to src/data/speakers.ts.

export type Talk = {
  speakerId: string;
  videoId: string;
  title: string;
  /** One-line hook, adapted from the channel's published description of the full event. */
  blurb: string;
  duration: string; // as shown on YouTube
  durationISO: string; // schema.org ISO 8601
  session: "s1" | "s2";
  order: number;
  /** Seconds into the full-event recording where this talk begins. */
  eventStart: number;
};

export const talksPublishedOn = "2026-09-03";
export const youtubeChannelUrl = "https://www.youtube.com/@TEDxHuntingValley";

export const fullEvent = {
  videoId: "7e6Jl1m2MmQ",
  title: "TEDxHuntingValley 2026 | The Invisible Engine: The Forces We Forget | Full Event, 12 Talks",
  duration: "4:22:20",
  durationISO: "PT4H22M20S",
  description:
    "The complete event: the cold open by comedian Ricky Smith, six student talks, six adult talks, the hosts' Q&A with every speaker, and the closing.",
};

export const talks: Talk[] = [
  // ── Session 1: Students ─────────────────────────────────────────────
  {
    speakerId: "ethan-shneyderman",
    videoId: "nZE7HF8xWzo",
    title: "They Wrote Back: The World Is More Reachable Than You Think",
    blurb: "Six hundred letters from embassies, a Prime Minister, and a grocery store, and why the story was never about who wrote back.",
    duration: "13:40",
    durationISO: "PT13M40S",
    session: "s1",
    order: 1,
    eventStart: 389,
  },
  {
    speakerId: "jackson-sarver",
    videoId: "U4r46o9c4EM",
    title: "Feed Billions, Kill Millions: The Tragedy of Fritz Haber",
    blurb: "A war over bird poop, the chemist who fed half of humanity, and the dark side of the same molecule.",
    duration: "15:20",
    durationISO: "PT15M20S",
    session: "s1",
    order: 2,
    eventStart: 1284,
  },
  {
    speakerId: "claire-witalec",
    videoId: "yoNluiYRWMc",
    title: "Where Do We Draw the Line? Gerrymandering and Democracy",
    blurb: "The invisible lines on the map that decide elections before a vote is cast.",
    duration: "15:25",
    durationISO: "PT15M25S",
    session: "s1",
    order: 3,
    eventStart: 2287,
  },
  {
    speakerId: "priyasha-ghosal",
    videoId: "OiRZFnlQBrI",
    title: "The Human Cost of Convenience: How Efficiency Erodes Empathy",
    blurb: "The human labor hidden behind every “place order” button.",
    duration: "16:17",
    durationISO: "PT16M17S",
    session: "s1",
    order: 4,
    eventStart: 3276,
  },
  {
    speakerId: "gage-martin",
    videoId: "76OWwPP_ZKQ",
    title: "The Ads on Your Phone Are Making You Mow Your Lawn",
    blurb: "Why you mow your lawn every Sunday, and the false needs somebody sold you.",
    duration: "13:44",
    durationISO: "PT13M44S",
    session: "s1",
    order: 5,
    eventStart: 4328,
  },
  {
    speakerId: "james-mason-jr",
    videoId: "0YCXYnz9NEk",
    title: "It’s About What You Say, Not How You Say It",
    blurb: "Code switching, W.E.B. Du Bois, and the cost of hiding your own voice.",
    duration: "17:16",
    durationISO: "PT17M16S",
    session: "s1",
    order: 6,
    eventStart: 5235,
  },

  // ── Session 2: Adults ───────────────────────────────────────────────
  {
    speakerId: "nic-barlage",
    videoId: "CzDvUQOOB10",
    title: "You’ll See It When You Believe It",
    blurb: "Purpose as the engine, and the bet on downtown Cleveland.",
    duration: "25:35",
    durationISO: "PT25M35S",
    session: "s2",
    order: 7,
    eventStart: 6728,
  },
  {
    speakerId: "brandon-chrostowski",
    videoId: "8xPWpTBEK6s",
    title: "Breaking Out",
    blurb: "Same human, same prison, different engine, different result.",
    duration: "13:54",
    durationISO: "PT13M54S",
    session: "s2",
    order: 8,
    eventStart: 8333,
  },
  {
    speakerId: "marc-byrnes",
    videoId: "NPMGLgncwjA",
    title: "Are You a Battery Charger?",
    blurb: "Are you a battery charger or a battery drainer?",
    duration: "14:30",
    durationISO: "PT14M30S",
    session: "s2",
    order: 9,
    eventStart: 9239,
  },
  {
    speakerId: "laila-edwards",
    videoId: "vF24MIQWpl8",
    title: "Before the Applause",
    blurb: "The practices nobody watched, and the final two minutes of a gold medal game.",
    duration: "14:44",
    durationISO: "PT14M44S",
    session: "s2",
    order: 10,
    eventStart: 10188,
  },
  {
    speakerId: "jeff-epstein",
    videoId: "jFzEa39yklI",
    title: "The Infrastructure of Possibility",
    blurb: "An anchor, a jar of river mud, and a ship’s wheel: what the Port of Cleveland is, and what it could be.",
    duration: "23:07",
    durationISO: "PT23M7S",
    session: "s2",
    order: 11,
    eventStart: 11225,
  },
  {
    speakerId: "fred-nance",
    videoId: "60VlGSuh0No",
    title: "EQ: The Difference Maker in Winning High-Stakes Engagements",
    blurb: "The secret weapon behind the Browns, LeBron, and 40 years of fights for Cleveland.",
    duration: "46:10",
    durationISO: "PT46M10S",
    session: "s2",
    order: 12,
    eventStart: 12690,
  },
];

/** Chapter markers in the full-event recording (seconds). */
export const eventChapters: { start: number; label: string; speakerId?: string }[] = [
  { start: 0, label: "Cold open: Ricky Smith" },
  { start: 124, label: "Welcome from Charlie Martin and Jack Nelson" },
  ...talks.filter((t) => t.session === "s1").map((t) => ({ start: t.eventStart, label: t.title, speakerId: t.speakerId })),
  { start: 6286, label: "Student session close and intermission" },
  ...talks.filter((t) => t.session === "s2").map((t) => ({ start: t.eventStart, label: t.title, speakerId: t.speakerId })),
  { start: 15460, label: "Closing: credits, thank yous, and what is your why" },
];

const byOrder = (a: Talk, b: Talk) => a.order - b.order;
export const sessionOneTalks = talks.filter((t) => t.session === "s1").sort(byOrder);
export const sessionTwoTalks = talks.filter((t) => t.session === "s2").sort(byOrder);

export function talkForSpeaker(speakerId: string): Talk | undefined {
  return talks.find((t) => t.speakerId === speakerId);
}

export function watchUrl(videoId: string, startSeconds?: number): string {
  return `https://www.youtube.com/watch?v=${videoId}${startSeconds ? `&t=${startSeconds}s` : ""}`;
}

export function thumbUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

export function formatTimestamp(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
}
