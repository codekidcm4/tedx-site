import type { Metadata } from "next";
import { TicketFlow } from "@/components/tickets/TicketFlow";
import { siteConfig } from "@/data/site";

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
  return (
    <>
      {/* Page header */}
      <div className="bg-[#0a0a0a] pt-32 pb-14 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <span className="inline-flex items-center gap-3 mb-6">
            <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
            <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
              Tickets
            </span>
          </span>
          <h1
            className="text-white font-extrabold mb-5 max-w-3xl"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
          >
            Reserve your seat.
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
            August 22, 2026 at {siteConfig.venueName}, {siteConfig.school}. Two sessions, intimate
            seating, twelve voices on one stage.
          </p>
        </div>
      </div>

      {/* Flow */}
      <section className="bg-white py-16 md:py-24" aria-label="Ticket selection">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <TicketFlow />
        </div>
      </section>
    </>
  );
}
