import QRCode from "qrcode";
import { Resend } from "resend";
import type { FulfilledTicket } from "@/lib/ticketsDb";
import { sessionById } from "@/data/tickets";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://tedxhuntingvalley.com";

function seatLabel(id: string): string {
  const [section, rest] = id.split("-");
  const names: Record<string, string> = { L: "Left", C: "Center", R: "Right" };
  return `${names[section] ?? section} ${rest}`;
}

/** Emails the buyer their tickets: one QR code per seat (attached), each linking to a scannable page. */
export async function sendTicketEmail(email: string, tickets: FulfilledTicket[], displaySession: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !email) {
    console.warn("RESEND_API_KEY or email missing; skipping ticket email");
    return;
  }
  const resend = new Resend(apiKey);
  const from = process.env.TICKETS_FROM_EMAIL || "TEDxHuntingValley <tickets@tedxhuntingvalley.com>";

  const attachments: { filename: string; content: string }[] = [];
  const rows: string[] = [];
  for (const t of tickets) {
    const url = `${SITE}/ticket/${t.token}`;
    const png = await QRCode.toBuffer(url, { width: 320, margin: 1 });
    attachments.push({ filename: `ticket-${t.seat}-${t.session}.png`, content: png.toString("base64") });
    rows.push(
      `<tr><td style="padding:12px 0;border-top:1px solid #eee">
        <div style="font-weight:700;color:#0a0a0a">Seat ${seatLabel(t.seat)}${t.name ? " · " + t.name : ""}</div>
        <div style="font-size:13px;color:#777">${sessionById(t.session as never)?.name ?? t.session}</div>
        <a href="${url}" style="color:#e62b1e;font-weight:700;font-size:13px">View &amp; scan this ticket &rarr;</a>
      </td></tr>`
    );
  }

  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#0a0a0a">
    <div style="border-left:3px solid #e62b1e;padding-left:12px;margin-bottom:20px">
      <div style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#e62b1e">TEDxHuntingValley</div>
      <h1 style="font-size:22px;margin:6px 0 0">You&apos;re in. Here are your tickets.</h1>
    </div>
    <p style="color:#555;line-height:1.6">August 22, 2026 · Gund Auditorium, University School, Hunting Valley, OH. Show a QR code below at the door (one per seat). The QR is attached and lives at the link too.</p>
    <table style="width:100%;border-collapse:collapse">${rows.join("")}</table>
    <p style="color:#999;font-size:12px;margin-top:24px">Questions? Reply to this email or write tedxhuntingvalley@gmail.com.</p>
  </div>`;

  await resend.emails.send({
    from,
    to: email,
    subject: "Your TEDxHuntingValley tickets",
    html,
    attachments,
  });
}
