import type { Metadata } from "next";
import { TicketsView } from "@/components/tickets/TicketsView";

export const metadata: Metadata = {
  title: "Tickets",
  description:
    "TEDxHuntingValley 2026 has ended. Every talk from August 22 is now free to watch on YouTube.",
  alternates: { canonical: "/tickets" },
  openGraph: {
    title: "Tickets | TEDxHuntingValley",
    description:
      "TEDxHuntingValley 2026 has ended. Every talk from August 22 is now free to watch on YouTube.",
    url: "https://tedxhuntingvalley.com/tickets",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "TEDxHuntingValley tickets" }],
  },
};

export default function TicketsPage() {
  return <TicketsView />;
}
