import type { Metadata } from "next";
import { AdminClient } from "./AdminClient";

export const metadata: Metadata = {
  title: "Live check-in",
  robots: { index: false, follow: false },
};

// Organizer-only live dashboard: seat map with real-time check-in state, hover details per seat,
// and hand-assignment of comp seats (including organizer Row H). Gated by the staff code, which is
// verified server-side in /api/admin on every request.
export default function AdminPage() {
  return (
    <section className="min-h-[90vh] bg-[#0a0a0a] py-12 md:py-16">
      <div className="max-w-[1100px] mx-auto px-5 md:px-8">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 mb-3">
            <span className="inline-block w-6 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
            <span className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">Organizers</span>
          </span>
          <h1 className="text-white font-extrabold" style={{ fontSize: "clamp(1.75rem, 5vw, 2.25rem)", letterSpacing: "-0.02em" }}>
            Live check-in
          </h1>
          <p className="text-white/55 text-sm mt-2 leading-relaxed">
            Updates automatically as the door scans tickets. Hover a seat for who it belongs to;
            click an empty seat to assign it.
          </p>
        </div>
        <AdminClient />
      </div>
    </section>
  );
}
