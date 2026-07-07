# TEDxHuntingValley — Ticketing & Operations Runbook

Everything the ticketing system needs, and exactly what to do. The site is fully built and works in
**Stripe test mode** right now. To take real money and send real tickets you only need to paste a few
keys (below). Nothing here requires code changes.

---

## 1. The environment variables (word for word)

Put these in **two places**: your local `.env.local` (already scaffolded) and **Vercel → your project
→ Settings → Environment Variables** (add each one, Production + Preview). After changing Vercel env
vars you must **redeploy** for them to take effect.

| Variable | Value / where to get it |
|---|---|
| `SUPABASE_URL` | `https://emorewjkhtuugnuylbla.supabase.co` (exactly this — your project) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Paste from the dashboard** — see step 2. Secret, server-only. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your `pk_test_…` (already set locally). Live: `pk_live_…` later. |
| `STRIPE_SECRET_KEY` | Your `sk_test_…` (already set locally). Live: `sk_live_…` later. |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` from Stripe after you add the webhook — see step 4. |
| `RESEND_API_KEY` | `re_…` from resend.com — see step 5. (Optional until you want ticket emails.) |
| `TICKETS_FROM_EMAIL` | `TEDxHuntingValley <tickets@yourverifieddomain>` (already set) |
| `TICKETS_ORG_EMAIL` | `tedxhuntingvalley@gmail.com` (where refund requests are emailed) |
| `TICKETS_PRESALE_CODE` | `TEDXHV-EARLYACCESS-Q7KX` (change to anything; comma-separate for multiple) |
| `TICKETS_SCAN_CODE` | `TEDXHV-DOOR-7723` (change it; share only with door staff) |
| `NEXT_PUBLIC_SITE_URL` | `https://tedxhuntingvalley.com` (already set) |
| `NEXT_PUBLIC_EVENT_PHASE` | Leave **unset**. Optional override: `pre` \| `live` \| `post`. |

The site degrades gracefully: with no `SUPABASE_SERVICE_ROLE_KEY` the seat inventory is simply "all
open"; with no `RESEND_API_KEY` ticket emails are skipped; with no `STRIPE_WEBHOOK_SECRET` the webhook
returns 503. Nothing crashes.

---

## 2. Supabase service_role key (the one secret value you still need)

1. Go to **supabase.com → your project `tedxhuntingvalley`**.
2. **Project Settings** (gear, bottom-left) → **API keys**.
3. Under **Project API keys**, find the **`service_role`** key (labeled *secret*). Click reveal, copy it.
4. Paste it as `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` and in Vercel.

Do **not** use the `anon` / publishable key here — it can't write seat inventory. The service_role key
is server-only in this codebase (`src/lib/ticketsDb.ts`) and is never sent to the browser.

The database schema (orders, seat_holds, tickets, waitlist, refund_requests) is already created. Row
Level Security is on with no public policies, which is the secure default: the public/anon key can read
nothing, and our server uses the service_role key which bypasses RLS. You don't need to touch it.

---

## 3. Do you already need a Resend key? (your question)

**No — not for the contact features.** Every "contact" on the site (footer, press, media, social, the
notify buttons) is a plain `mailto:` link that opens the visitor's own email app. It sends nothing
through your server, so it needs no API key and works today.

`RESEND_API_KEY` is used by exactly **one** thing: the **QR ticket email** sent to a buyer after they
pay (and the refund-request notification to you). Until you add the key, a paid order still reserves the
seats and creates the ticket + QR page; it just doesn't email them automatically. Add the key when you
want buyers to receive their tickets by email.

---

## 4. Stripe webhook (needed for tickets to be issued + refunds to free seats)

1. Stripe Dashboard → **Developers → Webhooks → Add endpoint**.
2. Endpoint URL: `https://tedxhuntingvalley.com/api/stripe/webhook`
3. **Select events:** `payment_intent.succeeded` **and** `charge.refunded`.
   - `payment_intent.succeeded` → issues the QR tickets and emails them.
   - `charge.refunded` → automatically frees the seats when you refund someone.
4. Copy the **Signing secret** (`whsec_…`) into `STRIPE_WEBHOOK_SECRET`.

To issue a refund: Stripe → Payments → open the payment → **Refund**. The site's webhook then deletes
that order's tickets/holds so the seats reopen. (A buyer can also ask via `/tickets/refund`, which logs
the request and emails you.)

---

## 5. Resend (ticket emails), optional but recommended

1. Sign up free at **resend.com**.
2. **Add a domain** and verify it (DNS records), or use their test sender to start.
3. **API Keys → Create** → copy `re_…` into `RESEND_API_KEY`.
4. Set `TICKETS_FROM_EMAIL` to an address on your verified domain.

---

## 6. Going live with Stripe (when you have the co-organizer's identity details)

Test mode is fine indefinitely. When ready for real money: complete Stripe identity/activation, then
swap the two Stripe keys to their `pk_live_…` / `sk_live_…` values in Vercel and add a **live-mode**
webhook (repeat step 4 in live mode for a new `whsec_…`). Safety net: the checkout API refuses to run
with a live key unless the database is connected, so you can't charge without inventory to fulfill.

---

## 7. Day-of: the door check-in scanner

- URL: **`https://tedxhuntingvalley.com/scan`** (not linked anywhere; share the URL + `TICKETS_SCAN_CODE`
  with door volunteers).
- Enter the staff code once (it's remembered for that browser tab).
- Tap **Start camera** and point it at each attendee's QR. Green = checked in. Amber = **already
  scanned** (watch for a duplicate/screenshot). Red = not a valid ticket.
- No camera? Paste the QR link or code into the manual box.
- Each device shows its own running count. Check-ins are atomic, so two phones can scan at once safely.

---

## 8. The schedule

Edit `src/data/schedule.ts`: fill in each `time`, `title`, and `speaker`, set each session's `window`,
then set `scheduleReady = true`. Until then, `/schedule` shows the framework with "TBA" placeholders and
a "being finalized" note. Push the change and it's live.

---

## 9. Accessibility, waitlist, refunds, post-event — how they behave

- **Accessibility:** four front wing seats are marked wheelchair-accessible (blue dots on the map).
  Any buyer can also tick "needs accessible / companion seating" in checkout; that note is saved on the
  order (`orders.accessibility_note`). Query it in Supabase to plan the day.
- **Waitlist:** when a session sells out, buyers see a waitlist form; emails land in the `waitlist`
  table. When you refund someone, that seat reopens — email the waitlist to offer it.
- **Refunds:** buyers request at `/tickets/refund` (logged in `refund_requests`, emailed to you); you
  issue the refund in Stripe; the webhook frees the seat.
- **Post-event mode:** after **Aug 22, 2026** the homepage and tickets page automatically flip to a
  thank-you / "watch the talks" state. To lock it immediately (no waiting for the date), set
  `NEXT_PUBLIC_EVENT_PHASE=post` in Vercel and redeploy.

---

## 10. Analytics

Vercel Analytics is wired in (`@vercel/analytics`). It's privacy-friendly (no cookie banner needed).
Once deployed, open **Vercel → your project → Analytics** to see page views and web vitals. No key
needed — it works automatically on Vercel.

---

## Quick pre-sale test checklist

1. Add `SUPABASE_SERVICE_ROLE_KEY` locally, restart `npm run dev`.
2. `/tickets` → enter the pre-sale code → pick a session → the counter should read live from the DB.
3. Pick 2 seats → details → pay with test card `4242 4242 4242 4242`, any future date/CVC.
4. With the webhook running (use the Stripe CLI locally: `stripe listen --forward-to
   localhost:3000/api/stripe/webhook`), confirm a row appears in `tickets` and the seat shows as taken.
5. Open the ticket's `/ticket/<token>` link, then `/scan` and check it in (green, then amber on rescan).
6. Refund the payment in Stripe → confirm the seat reopens on `/tickets`.
