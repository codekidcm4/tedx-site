// Sponsorship / community-partner tiers for TEDxHuntingValley.
//
// TED rules: a TEDx event is run not-for-profit and no single sponsor may "present" or be the title
// of the event. These are framed as community partners whose support helps cover the cost of a
// licensed, not-for-profit event. Edit the amounts/perks freely; add real partners to `partners`
// (with an optional logo in public/sponsors/) as they come on board.

export type SponsorTier = {
  id: string;
  name: string;
  amount: string;
  blurb: string;
  perks: string[];
  featured?: boolean;
};

export const sponsorTiers: SponsorTier[] = [
  {
    id: "champion",
    name: "Champion Partner",
    amount: "$5,000",
    blurb: "For partners who want to power the whole day.",
    perks: [
      "Logo on the event program, website, and on-screen partner reel",
      "Recognition from the stage",
      "Eight reserved seats across the two sessions",
      "A thank-you post to our social audience",
    ],
    featured: true,
  },
  {
    id: "advocate",
    name: "Advocate Partner",
    amount: "$2,500",
    blurb: "Meaningful support that keeps tickets affordable.",
    perks: [
      "Logo on the website and on-screen partner reel",
      "Four reserved seats",
      "A thank-you post to our social audience",
    ],
  },
  {
    id: "supporter",
    name: "Supporter",
    amount: "$1,000",
    blurb: "Help cover the real costs of the room.",
    perks: ["Name on the website partners list", "Two reserved seats"],
  },
  {
    id: "friend",
    name: "Friend of TEDx",
    amount: "$250",
    blurb: "Every bit helps a student take the stage.",
    perks: ["Name on the website partners list"],
  },
];

export type Partner = {
  name: string;
  url?: string | null;
  logo?: string | null; // e.g. "/sponsors/acme.png"; null shows the name as text
  tier?: string;
};

// Add confirmed partners here. Empty for now (the page shows a tasteful "partners announced soon").
export const partners: Partner[] = [];
