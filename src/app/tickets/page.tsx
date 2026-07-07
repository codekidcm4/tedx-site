import type { Metadata } from "next";
import { TicketsView } from "@/components/tickets/TicketsView";

export const metadata: Metadata = {
  title: "Tickets",
  description:
    "Reserve your seat for TEDxHuntingValley on August 22, 2026 at Gund Auditorium, University School. Two sessions, intimate seating.",
  alternates: { canonical: "/tickets" },
  openGraph: {
    title: "Tickets | TEDxHuntingValley",
    description:
      "Reserve your seat for TEDxHuntingValley on August 22, 2026. Two sessions at Gund Auditorium, University School. Seating is intimate.",
    url: "https://tedxhuntingvalley.com/tickets",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "TEDxHuntingValley tickets" }],
  },
};

export default function TicketsPage() {
  return <TicketsView />;
}
