import type { Metadata } from "next";
import { ScanClient } from "./ScanClient";

export const metadata: Metadata = {
  title: "Door check-in",
  robots: { index: false, follow: false },
};

// Staff-only door check-in scanner. Not linked from the site; the URL is unguessable and is shared
// with door volunteers directly, which is the only gate. Robots are told not to index it.
export default function ScanPage() {
  return (
    <section className="min-h-[90vh] bg-[#0a0a0a] py-12 md:py-16">
      <div className="max-w-md mx-auto px-5">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 mb-3">
            <span className="inline-block w-6 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
            <span className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">Staff</span>
          </span>
          <h1 className="text-white font-extrabold" style={{ fontSize: "clamp(1.75rem, 5vw, 2.25rem)", letterSpacing: "-0.02em" }}>
            Door check-in
          </h1>
          <p className="text-white/55 text-sm mt-2 leading-relaxed">
            Scan each attendee&apos;s QR code at the door. Tap Start camera to begin.
          </p>
        </div>
        <ScanClient />
      </div>
    </section>
  );
}
