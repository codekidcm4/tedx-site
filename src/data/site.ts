export const siteConfig = {
  name: "TEDxHuntingValley",
  tagline: "The Invisible Engine: The Forces We Forget",

  // Event date and timing
  date: "August 22, 2026",
  dateISO: "2026-08-22",
  // From the draft running order (see src/data/schedule.ts). Update both places together if the
  // times shift. Set either to null to show "Time to be announced" in the event-essentials card.
  doorsOpen: "12:30 PM" as string | null,
  startTime: "1:00 PM" as string | null,
  // Drives the countdown, the Event JSON-LD, and the pre/live/post event phase.
  startDateTimeISO: "2026-08-22T13:00:00-04:00",
  endDateTimeISO: "2026-08-22T17:55:00-04:00",

  // Venue + address
  venue: "Gund Auditorium, University School",
  venueName: "Gund Auditorium",
  school: "University School (Hunting Valley Campus)",
  // Gund Auditorium is on University School's Hunting Valley (Upper School) campus.
  // 20701 Brantley Rd is the separate Shaker Heights campus, so the precise address below is used
  // for the map to pin only the Hunting Valley location.
  streetAddress: "2785 SOM Center Road",
  city: "Hunting Valley",
  state: "OH",
  zip: "44022",
  location: "Hunting Valley, Ohio",
  addressFull: "2785 SOM Center Road, Hunting Valley, OH 44022",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=2785%20SOM%20Center%20Road%2C%20Hunting%20Valley%2C%20OH%2044022",
  mapEmbedUrl:
    "https://www.google.com/maps?q=2785%20SOM%20Center%20Road%2C%20Hunting%20Valley%2C%20OH%2044022&output=embed",

  // Contact + social
  email: "tedxhuntingvalley@gmail.com",
  instagram: "https://instagram.com/tedxhuntingvalley",
  twitter: "https://x.com/tedxhv26",
  handle: "@tedxhuntingvalley",
  beholdFeedId: "n7Q4k8P6hLA35PL6L83y",

  // People
  organizers: ["Charlie Martin", "Jack Nelson"],
  licensedOrganizer: "Charlie Martin and Dr. Tyler Yoder",

  url: "https://tedxhuntingvalley.com",

  // Official TED / TEDx program links (required: a visible TEDx program link on the homepage).
  tedUrl: "https://www.ted.com",
  tedxProgramUrl: "https://www.ted.com/about/programs-initiatives/tedx-program",

  // Swappable launch config. Each value is null until the real thing exists; setting a value
  // flips the matching section from its "coming soon" state to live, with no other code change.
  ticketsUrl: "/tickets" as string | null, // live box office (tickets are on sale to everyone)
  interestFormUrl: null as string | null, // seat-interest / notify list (e.g. a Google Form URL)
  livestreamUrl: null as string | null, // event-day livestream link
  watchNotifyUrl: null as string | null, // "notify me when talks publish" list URL

  description:
    "TEDxHuntingValley is Cleveland's first independent community TEDx event in over a decade. Six adult speakers and six student speakers share one stage on August 22, 2026 at Gund Auditorium, University School in Hunting Valley, Ohio.",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Speakers", href: "/speakers" },
  { label: "Schedule", href: "/schedule" },
  { label: "Press", href: "/press" },
  { label: "Media", href: "/media" },
  { label: "Social", href: "/social" },
];

// Forward-looking road to August 22. Application milestones are intentionally folded into a single
// completed-history entry so the timeline leads with what is ahead: speaker prep and the event.
export type KeyDate = {
  date: string;
  label: string;
  status: "done" | "upcoming" | "event";
};

export const keyDates: KeyDate[] = [
  { date: "Spring 2026", label: "Speaker applications reviewed and the lineup selected", status: "done" },
  { date: "Summer 2026", label: "Speaker coaching and talk development", status: "upcoming" },
  { date: "August 22, 2026", label: "TEDxHuntingValley at Gund Auditorium, University School", status: "event" },
  { date: "After the event", label: "Every talk published to the TEDx YouTube channel", status: "upcoming" },
];
