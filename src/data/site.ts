export const siteConfig = {
  name: "TEDxHuntingValley",
  tagline: "The Invisible Engine: The Forces We Forget",

  // Event date and timing
  date: "August 22, 2026",
  dateISO: "2026-08-22",
  // Used by the Event structured data.
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

  youtube: "https://www.youtube.com/@TEDxHuntingValley",

  description:
    "TEDxHuntingValley was Cleveland's first independent community TEDx event in over a decade. Six adult speakers and six student speakers shared one stage on August 22, 2026 at Gund Auditorium, University School in Hunting Valley, Ohio. Every talk is now free on YouTube.",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Talks", href: "/talks" },
  { label: "Speakers", href: "/speakers" },
  { label: "Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
  { label: "Press", href: "/press" },
  { label: "Media", href: "/media" },
  { label: "Social", href: "/social" },
];

// The full arc of TEDxHuntingValley 2026, from the license to the published talks.
export type KeyDate = {
  date: string;
  label: string;
  status: "done" | "upcoming" | "event";
};

export const keyDates: KeyDate[] = [
  { date: "Spring 2026", label: "TED license granted; open student speaker competition across Greater Cleveland", status: "done" },
  { date: "May 2026", label: "Applications closed and the twelve-voice lineup selected", status: "done" },
  { date: "Summer 2026", label: "Speaker coaching and talk development", status: "done" },
  { date: "August 22, 2026", label: "TEDxHuntingValley at Gund Auditorium, University School", status: "event" },
  { date: "September 3, 2026", label: "All twelve talks and the complete event published to YouTube", status: "done" },
];
