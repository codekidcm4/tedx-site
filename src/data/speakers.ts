// Single source of truth for the TEDxHuntingValley speaker lineup.
//
// To update a speaker you only need to touch this file: edit the object, and (for a photo)
// drop a headshot into public/speakers/ and point `image` at it (path starting with /speakers/).
// `image: null` renders a tasteful initials avatar instead, so the layout never breaks.
//
// Bio length standard: keep every bio to roughly two to four sentences, the same medium length
// as the adult bios below. Long enough to learn who the person is and why they matter, short
// enough that the card stays clean.
//
// talkTitle stays empty ("" / null) until a talk title is confirmed; when present it renders
// alongside the speaker's name and bio automatically.

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
  // Headshots are official/press photos sourced for onboarding. Final use should be confirmed
  // with each speaker or their organization as part of standard speaker onboarding.
  {
    id: "nic-barlage",
    name: "Nic Barlage",
    role: "CEO, Cleveland Cavaliers, Rocket Arena, and Rock Entertainment Group",
    organization: "Rock Entertainment Group",
    type: "adult",
    bio: "Nic Barlage is the CEO of the Cleveland Cavaliers, Rocket Arena, and Rock Entertainment Group, where he leads the business operation behind one of the NBA's most prominent franchises along with a growing portfolio of teams, venues, and media properties. He has built his reputation on culture, leadership, and the belief that a strong urban core is the heartbeat of an entire region. Under his leadership, Cleveland has become a case study in how sports and entertainment can power a city's rise.",
    talkTitle: null,
    image: "/speakers/nic-barlage.jpg",
    order: 1,
  },
  {
    id: "fred-nance",
    name: "Fred Nance",
    role: "Senior Partner and Executive Group Member, Squire Patton Boggs",
    organization: "Squire Patton Boggs",
    type: "adult",
    bio: "Fred Nance is a senior partner and Executive Group member at the global law firm Squire Patton Boggs, where he previously served as Global Managing Partner overseeing offices across twenty countries. A nationally recognized sports and entertainment attorney, he has served as counsel to figures including LeBron James and Dave Chappelle, and played a central role in some of Cleveland's most significant economic development efforts, including the return of the Browns. A proud native Clevelander, his career has been defined by bridging the worlds of business, law, and public life.",
    talkTitle: null,
    image: "/speakers/fred-nance.jpg",
    order: 2,
  },
  {
    id: "laila-edwards",
    name: "Laila Edwards",
    role: "Olympic Gold Medalist, US Women's National Hockey Team",
    organization: "US Women's National Hockey Team",
    type: "adult",
    bio: "Laila Edwards is a Cleveland Heights native who has rewritten the record books in women's hockey. In 2023 she became the first Black woman to play for the US women's national team, and at the 2026 Winter Olympics she became the first Black American woman to win Olympic gold in ice hockey. A three-time NCAA champion at Wisconsin and a 2024 World Championship MVP, she has become one of the faces of her sport and a role model for a new generation of athletes who can finally see themselves on the ice.",
    talkTitle: null,
    image: "/speakers/laila-edwards.jpg",
    order: 3,
  },
  {
    id: "marc-byrnes",
    name: "Marc Byrnes",
    role: "Chairman Emeritus, Oswald Companies",
    organization: "Oswald Companies",
    type: "adult",
    bio: "Marc Byrnes is Chairman Emeritus and the former Chairman and CEO of Oswald Companies, one of the nation's largest independent, employee-owned insurance and risk management firms, founded in Cleveland in 1893. Over decades he has been one of Northeast Ohio's most committed civic leaders, chairing the board of the United Way of Greater Cleveland and serving organizations from the Rock and Roll Hall of Fame to the Cleveland Leadership Center. A University School alumnus and longtime trustee, he has built his career and his life around the conviction that business and community rise together.",
    talkTitle: null,
    image: "/speakers/marc-byrnes.jpg",
    order: 4,
  },
  {
    id: "brandon-chrostowski",
    name: "Brandon Chrostowski",
    role: "Founder, President, and CEO, EDWINS Leadership & Restaurant Institute",
    organization: "EDWINS Leadership & Restaurant Institute",
    type: "adult",
    bio: "Brandon Chrostowski is the founder, president, and CEO of EDWINS Leadership & Restaurant Institute, a Cleveland organization that gives formerly incarcerated men and women a foundation in the culinary and hospitality industries. Built on the belief that every human being deserves a fair and equal future, EDWINS has helped hundreds of graduates rebuild their lives, reaching a recidivism rate near one percent against a national rate above forty. His work has been recognized with a 2016 CNN Hero honor, the 2025 James Beard Foundation Impact Award, and the Oscar-nominated documentary Knife Skills.",
    talkTitle: null,
    image: "/speakers/brandon-chrostowski.jpg",
    order: 5,
  },
  {
    id: "india-birdsong-terry",
    name: "India L. Birdsong Terry",
    role: "General Manager and CEO, Greater Cleveland Regional Transit Authority",
    organization: "Greater Cleveland Regional Transit Authority",
    type: "adult",
    bio: "India L. Birdsong Terry is the General Manager and CEO of the Greater Cleveland Regional Transit Authority, Ohio's largest public transit system, where she leads more than two thousand employees and a budget of nearly three hundred million dollars serving communities across the region. Since taking the helm in 2019, she has guided the agency through the pandemic and toward a future built on reliability, innovation, and access. A nationally respected transit leader, she sees mobility as the invisible infrastructure that connects people to opportunity.",
    talkTitle: null,
    image: "/speakers/india-birdsong-terry.jpg",
    order: 6,
  },

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
