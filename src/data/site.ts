export const siteConfig = {
  name: "TEDxHuntingValley",
  tagline: "The Invisible Engine: The Forces We Forget",

  // Event date and timing
  date: "August 22, 2026",
  dateISO: "2026-08-22",
  // Doors / start times are not finalized yet. Set these to real values (e.g. "5:30 PM")
  // to surface them in the event-essentials card; while null, the card shows "Time to be announced".
  doorsOpen: null as string | null,
  startTime: null as string | null,
  // Used by the home-page event countdown and JSON-LD. Update if the start time is confirmed.
  startDateTimeISO: "2026-08-22T09:00:00-04:00",
  endDateTimeISO: "2026-08-22T17:00:00-04:00",

  // Venue + address
  venue: "Gund Auditorium, University School",
  venueName: "Gund Auditorium",
  school: "University School",
  streetAddress: "20701 Brantley Rd",
  city: "Hunting Valley",
  state: "OH",
  zip: "44022",
  location: "Hunting Valley, Ohio",
  addressFull: "20701 Brantley Rd, Hunting Valley, OH 44022",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Gund%20Auditorium%20University%20School%2020701%20Brantley%20Rd%20Hunting%20Valley%20OH%2044022",
  mapEmbedUrl:
    "https://www.google.com/maps?q=University%20School%2020701%20Brantley%20Rd%20Hunting%20Valley%20OH%2044022&output=embed",

  // Contact + social
  email: "tedxhuntingvalley@gmail.com",
  instagram: "https://instagram.com/tedxhuntingvalley",
  twitter: "https://x.com/tedxhv26",
  handle: "@tedxhuntingvalley",
  beholdFeedId: "n7Q4k8P6hLA35PL6L83y",

  // People
  organizers: ["Charlie Martin", "Jack Nelson"],
  licensedOrganizer: "Dr. Tyler Yoder",

  url: "https://tedxhuntingvalley.com",

  // Swappable launch config. Each value is null until the real thing exists; setting a value
  // flips the matching section from its "coming soon" state to live, with no other code change.
  ticketsUrl: null as string | null, // real ticket / registration link when seats are released
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
