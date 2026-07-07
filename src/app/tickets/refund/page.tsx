import type { Metadata } from "next";
import { RefundForm } from "./RefundForm";

export const metadata: Metadata = {
  title: "Request a refund",
  description: "Request a refund for your TEDxHuntingValley tickets.",
  robots: { index: false, follow: false },
};

export default function RefundPage() {
  return (
    <>
      <div className="bg-[#0a0a0a] pt-32 pb-14 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <span className="inline-flex items-center gap-3 mb-6">
            <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
            <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">Refunds</span>
          </span>
          <h1
            className="text-white font-extrabold mb-5 max-w-3xl"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
          >
            Request a refund.
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
            Plans changed? Tell us the email you used at checkout and we&apos;ll process it. Your seat
            goes back into the pool for someone on the waitlist.
          </p>
        </div>
      </div>

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <RefundForm />
        </div>
      </section>
    </>
  );
}
