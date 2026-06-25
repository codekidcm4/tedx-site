// Single source of truth for the TEDxHuntingValley speaker lineup.
//
// To update a speaker you only need to touch this file: edit the object, and (for a photo)
// drop a headshot into public/speakers/ and point `image` at it (path starting with /speakers/).
// `image: null` renders a tasteful initials avatar instead, so the layout never breaks.
//
// Bio length standard: keep every bio to roughly two to four sentences. Long enough to learn who
// the person is and why they matter, short enough that the card stays clean.
//
// talkTitle stays empty (null) until a talk title is confirmed; when present it renders alongside
// the speaker's name and bio automatically.

export type Speaker = {
  id: string;
  name: string;
  role: string | null;
  organization: string | null;
  type: "adult" | "student";
  bio: string | null;
  talkTitle: string | null;
  image: string | null;
  order: number;
};

export const speakers: Speaker[] = [
  // ── Adult speakers (6) ──────────────────────────────────────────────
  // Titles, bios, and headshots were removed per request, so these render as plain name cards,
  // identical to the students. The original adult bios/titles are in git history, and the headshot
  // files still live in public/speakers/. To re-enable a speaker, restore their role/bio and set
  // image back to "/speakers/<id>.jpg".
  { id: "nic-barlage", name: "Nic Barlage", role: null, organization: null, type: "adult", bio: null, talkTitle: null, image: null, order: 1 },
  { id: "fred-nance", name: "Fred Nance", role: null, organization: null, type: "adult", bio: null, talkTitle: null, image: null, order: 2 },
  { id: "laila-edwards", name: "Laila Edwards", role: null, organization: null, type: "adult", bio: null, talkTitle: null, image: null, order: 3 },
  { id: "marc-byrnes", name: "Marc Byrnes", role: null, organization: null, type: "adult", bio: null, talkTitle: null, image: null, order: 4 },
  { id: "brandon-chrostowski", name: "Brandon Chrostowski", role: null, organization: null, type: "adult", bio: null, talkTitle: null, image: null, order: 5 },
  { id: "india-birdsong-terry", name: "India L. Birdsong Terry", role: null, organization: null, type: "adult", bio: null, talkTitle: null, image: null, order: 6 },

  // ── Student speakers (6) ────────────────────────────────────────────
  // Names only for now. Paste a bio (two to four sentences) and drop a headshot into
  // public/speakers/ + set `image` when each student is ready. No code change required.
  { id: "kamryn-taylor", name: "Kamryn Taylor", role: null, organization: null, type: "student", bio: null, talkTitle: null, image: null, order: 7 },
  { id: "jackson-sarver", name: "Jackson Sarver", role: null, organization: null, type: "student", bio: null, talkTitle: null, image: null, order: 8 },
  { id: "claire-witalec", name: "Claire Witalec", role: null, organization: null, type: "student", bio: null, talkTitle: null, image: null, order: 9 },
  { id: "ethan-shneyderman", name: "Ethan Shneyderman", role: null, organization: null, type: "student", bio: null, talkTitle: null, image: null, order: 10 },
  { id: "james-mason-jr", name: "James Mason Jr.", role: null, organization: null, type: "student", bio: null, talkTitle: null, image: null, order: 11 },
  { id: "priyasha-ghosal", name: "Priyasha Ghosal", role: null, organization: null, type: "student", bio: null, talkTitle: null, image: null, order: 12 },
];

const byOrder = (a: Speaker, b: Speaker) => a.order - b.order;

export const adultSpeakers = speakers.filter((s) => s.type === "adult").sort(byOrder);
export const studentSpeakers = speakers.filter((s) => s.type === "student").sort(byOrder);

/** Initials for the avatar fallback when a speaker has no headshot. */
export function speakerInitials(name: string): string {
  const suffixes = new Set(["jr", "jr.", "sr", "sr.", "ii", "iii", "iv", "v"]);
  const parts = name
    .replace(/[^A-Za-z.\s]/g, "")
    .trim()
    .split(/\s+/)
    .filter((p) => p && !suffixes.has(p.toLowerCase()));
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
