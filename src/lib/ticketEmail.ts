import QRCode from "qrcode";
import { Resend } from "resend";
import type { FulfilledTicket } from "@/lib/ticketsDb";
import { sessionById } from "@/data/tickets";
import type { SessionId } from "@/data/tickets";
import { siteConfig } from "@/data/site";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://tedxhuntingvalley.com";

function seatLabel(id: string): string {
  const [section, rest] = id.split("-");
  const names: Record<string, string> = { L: "Left", C: "Center", R: "Right" };
  return `${names[section] ?? section} ${rest}`;
}

/** Escape any user-supplied value before putting it inside email HTML. */
function esc(s: string): string {
  return (s || "").replace(/[&<>"]/g, (c) => (c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&quot;"));
}

/**
 * Emails the buyer their tickets: one QR code per seat, embedded inline in the message body (so the
 * buyer can show it straight from the email) and also reachable at its own scannable link.
 *
 * Deliverability notes: the message is sent multipart (both `html` and `text`) and the QR codes are
 * inline `cid:` images rather than loose attachments, both of which keep it out of spam. The domain
 * still needs SPF + DKIM + DMARC in DNS for this to reliably reach the inbox.
 */
export async function sendTicketEmail(email: string, tickets: FulfilledTicket[], displaySession: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !email) {
    console.warn("RESEND_API_KEY or email missing; skipping ticket email");
    return;
  }
  const resend = new Resend(apiKey);
  const from = process.env.TICKETS_FROM_EMAIL || "TEDxHuntingValley <tickets@tedxhuntingvalley.com>";
  const replyTo = process.env.TICKETS_ORG_EMAIL || siteConfig.email;
  const sessionName = sessionById(displaySession as SessionId)?.name ?? displaySession;

  // Inline QR images (referenced by cid:) plus a plain-text alternative built from the same loop.
  const attachments: { filename: string; content: string; contentType: string; contentId: string }[] = [];
  const rows: string[] = [];
  const textLines: string[] = [];
  for (const t of tickets) {
    const url = `${SITE}/ticket/${t.token}`;
    const png = await QRCode.toBuffer(url, { width: 320, margin: 1 });
    const cid = `qr-${t.seat}-${t.session}`;
    attachments.push({
      filename: `ticket-${t.seat}-${t.session}.png`,
      content: png.toString("base64"),
      contentType: "image/png",
      contentId: cid,
    });
    const who = t.name ? " · " + esc(t.name) : "";
    rows.push(
      `<tr><td style="padding:16px 0;border-top:1px solid #eee">
        <div style="font-weight:700;color:#0a0a0a">Seat ${seatLabel(t.seat)}${who}</div>
        <div style="font-size:13px;color:#777;margin-bottom:10px">${esc(sessionName)}</div>
        <img src="cid:${cid}" width="150" height="150" alt="QR code for seat ${seatLabel(t.seat)}" style="display:block;border:1px solid #eee;border-radius:4px" />
        <a href="${url}" style="color:#e62b1e;font-weight:700;font-size:13px;display:inline-block;margin-top:8px">View &amp; scan this ticket &rarr;</a>
      </td></tr>`
    );
    textLines.push(`Seat ${seatLabel(t.seat)}${t.name ? " (" + t.name + ")" : ""} - ${sessionName}\n${url}`);
  }

  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#0a0a0a">
    <div style="border-left:3px solid #e62b1e;padding-left:12px;margin-bottom:20px">
      <div style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#e62b1e">TEDxHuntingValley</div>
      <h1 style="font-size:22px;margin:6px 0 0">You&apos;re in. Here are your tickets.</h1>
    </div>
    <p style="color:#555;line-height:1.6">August 22, 2026 · Gund Auditorium, University School, Hunting Valley, OH. Show a QR code below at the door (one per seat). Each ticket also opens at its own link.</p>
    <table style="width:100%;border-collapse:collapse">${rows.join("")}</table>
    <p style="color:#999;font-size:12px;margin-top:24px">Questions? Just reply to this email and it reaches the organizers.</p>
  </div>`;

  const text = [
    "TEDxHuntingValley - your tickets",
    "",
    "August 22, 2026",
    "Gund Auditorium, University School, Hunting Valley, OH",
    "",
    "Show a QR code at the door (one per seat). Each ticket also opens at its link below.",
    "",
    ...textLines,
    "",
    "Questions? Just reply to this email and it reaches the organizers.",
  ].join("\n");

  await resend.emails.send({
    from,
    to: email,
    replyTo,
    subject: `Your TEDxHuntingValley tickets - ${sessionName}`,
    html,
    text,
    attachments,
  });
}

/**
 * Notifies the organizer that a buyer asked for a refund. Best-effort: returns false (and sends
 * nothing) if Resend isn't configured, so the caller can fall back to the stored request row.
 */
export async function sendRefundRequestEmail(
  buyerEmail: string,
  session: string | null,
  reason: string
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const resend = new Resend(apiKey);
  const from = process.env.TICKETS_FROM_EMAIL || "TEDxHuntingValley <tickets@tedxhuntingvalley.com>";
  const to = process.env.TICKETS_ORG_EMAIL || siteConfig.email;
  const sessionName = session ? sessionById(session as SessionId)?.name ?? session : "Not specified";

  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px;color:#0a0a0a">
    <h2 style="font-size:18px">Refund request</h2>
    <p><strong>Buyer:</strong> ${esc(buyerEmail)}</p>
    <p><strong>Session:</strong> ${esc(sessionName)}</p>
    <p><strong>Reason:</strong><br>${esc(reason || "(none given)")}</p>
    <p style="color:#777;font-size:13px">Issue the refund in Stripe (Payments -> the order -> Refund). The
    site will automatically free the seats when Stripe reports the refund.</p>
  </div>`;

  const text = [
    "Refund request",
    "",
    `Buyer: ${buyerEmail}`,
    `Session: ${sessionName}`,
    `Reason: ${reason || "(none given)"}`,
    "",
    "Issue the refund in Stripe (Payments -> the order -> Refund). The site will automatically free the seats when Stripe reports the refund.",
  ].join("\n");

  await resend.emails.send({
    from,
    to,
    replyTo: buyerEmail,
    subject: "TEDxHuntingValley refund request",
    html,
    text,
  });
  return true;
}
