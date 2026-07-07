import type { Metadata } from "next";
import Link from "next/link";
import QRCode from "qrcode";
import { getTicketByToken } from "@/lib/ticketsDb";
import { sessionById } from "@/data/tickets";
import type { SessionId } from "@/data/tickets";

export const metadata: Metadata = {
  title: "Your ticket",
  robots: { index: false, follow: false },
};

function seatLabel(id: string): string {
  const [section, rest] = id.split("-");
  const names: Record<string, string> = { L: "Left", C: "Center", R: "Right" };
  return `${names[section] ?? section} ${rest}`;
}

export default async function TicketPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const ticket = await getTicketByToken(token);

  if (!ticket) {
    return (
      <section className="min-h-[70vh] bg-[#0a0a0a] flex items-center">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 py-24 w-full text-center">
          <h1 className="text-white font-extrabold mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.02em" }}>
            Ticket not found
          </h1>
          <p className="text-white/60 mb-8">This ticket link isn&apos;t valid. Check the link from your confirmation email.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#e62b1e] text-white text-sm font-bold rounded-sm hover:bg-[#c9231a] transition-colors">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  const qr = await QRCode.toDataURL(token, { width: 340, margin: 1 });

  return (
    <section className="min-h-[80vh] bg-[#0a0a0a] flex items-center py-20">
      <div className="max-w-md mx-auto px-6 w-full">
        <div className="bg-white rounded-sm overflow-hidden">
          <div className="bg-[#e62b1e] px-6 py-4 flex items-center justify-between">
            <span className="text-white font-extrabold tracking-tight">TEDxHuntingValley</span>
            <span className="text-white/90 text-xs font-bold uppercase tracking-wider">Ticket</span>
          </div>
          <div className="p-8 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qr} alt="Ticket QR code" width={220} height={220} className="mx-auto mb-6" />
            <p className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-[#6b6b6b] mb-1">Seat</p>
            <h1 className="text-2xl font-extrabold text-[#0a0a0a] mb-4">{seatLabel(ticket.seat)}</h1>
            {ticket.holder_name && (
              <p className="text-[#555555] mb-4">{ticket.holder_name}</p>
            )}
            <div className="border-t border-[#eee] pt-4 grid grid-cols-2 gap-3 text-left">
              <div>
                <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#6b6b6b]">Session</p>
                <p className="text-sm font-semibold text-[#0a0a0a]">{sessionById(ticket.session as SessionId)?.name ?? ticket.session}</p>
              </div>
              <div>
                <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#6b6b6b]">Date</p>
                <p className="text-sm font-semibold text-[#0a0a0a]">Aug 22, 2026</p>
              </div>
            </div>
            {ticket.checked_in && (
              <p className="mt-5 text-xs font-bold text-[#e62b1e] uppercase tracking-wider">Already checked in</p>
            )}
          </div>
        </div>
        <p className="text-center text-white/55 text-xs mt-5">Gund Auditorium, University School · Hunting Valley, OH</p>
      </div>
    </section>
  );
}
