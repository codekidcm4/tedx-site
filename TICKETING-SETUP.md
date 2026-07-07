# TEDxHuntingValley Ticketing — Setup Guide

This is the one document you need. The website is fully built. It runs safely right now in **Stripe
test mode** (no real charges). To start selling real tickets you only paste a few keys and flip Stripe
to live. No coding.

Read it top to bottom once. The whole thing takes about 20 minutes.

---

## The big picture (how it works)

1. A buyer enters the pre-sale code, picks a session and seats, and pays by card (Stripe).
2. Stripe tells our site the payment succeeded. The site reserves the seats and emails the buyer a QR
   ticket for each seat (Resend).
3. At the door, staff scan each QR at `/scan` to check people in.
4. If you refund someone in Stripe, the site automatically frees their seats.

Three outside services make this run: **Stripe** (payments), **Supabase** (the seat database, already
set up), and **Resend** (the ticket emails). You provide one key from each.

---

## PART 1 — Accounts you need to create

- [ ] **Stripe** — you already have a test account and keys. Nothing to create yet. (Real money is
      Part 6, later, when your co-organizer's ID details are ready.)
- [ ] **Supabase** — already created for you (project `tedxhuntingvalley`). You only need to copy ONE
      secret key from it (Part 2).
- [ ] **Resend** — create a free account at [resend.com](https://resend.com). Needed only so buyers get
      their QR ticket by email. (Your contact links do NOT use it — see the note at the bottom.)

---

## PART 2 — The keys to paste (copy this list)

Put every value in **Vercel → your project → Settings → Environment Variables** (add each one for both
**Production** and **Preview**). Also keep them in your local `.env.local` file if you run the site on
your computer. **After adding or changing any Vercel variable you must redeploy** (Part 3, step 5).

| Variable | What to paste | Where to get it |
|---|---|---|
| `SUPABASE_URL` | `https://emorewjkhtuugnuylbla.supabase.co` | Already correct. Paste as-is. |
| `SUPABASE_SERVICE_ROLE_KEY` | the long secret key | Supabase → Project Settings → **API keys** → copy the **`service_role`** key (the one marked *secret*). NOT the anon key. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | your `pk_test_…` | Stripe → Developers → API keys → Publishable key |
| `STRIPE_SECRET_KEY` | your `sk_test_…` | Stripe → Developers → API keys → Secret key |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` | Created in Part 3, step 3 |
| `RESEND_API_KEY` | `re_…` | Resend → API Keys → Create API Key |
| `TICKETS_FROM_EMAIL` | `TEDxHuntingValley <tickets@yourdomain>` | An address on a domain you verify in Resend |
| `TICKETS_ORG_EMAIL` | `tedxhuntingvalley@gmail.com` | Where refund requests get emailed to you |
| `TICKETS_PRESALE_CODE` | `TEDXHV-EARLYACCESS-Q7KX` | Your choice. Share it with pre-sale buyers. Comma-separate to allow several codes. |
| `TICKETS_SCAN_CODE` | e.g. `TEDXHV-DOOR-7723` | Your choice. Share ONLY with door staff. **Required in production, or the scanner stays locked.** |
| `NEXT_PUBLIC_SITE_URL` | `https://tedxhuntingvalley.com` | Already correct. Paste as-is. |
| `NEXT_PUBLIC_EVENT_PHASE` | leave blank | Optional. Set to `post` the day after the event to lock the "thank you" mode. |

If a key is missing the site still runs, it just turns that piece off: no Supabase key = seats show as
all-open and nothing is reserved; no Resend key = tickets are created but not emailed; no webhook
secret = the webhook is off.

---

## PART 3 — Do these steps in order

1. **Copy the Supabase service_role key.** Supabase → Project Settings → API keys → reveal and copy
   `service_role`. Paste it into `SUPABASE_SERVICE_ROLE_KEY` in Vercel and `.env.local`.

2. **Set up Resend email** (this is what sends the QR ticket):
   1. resend.com → API Keys → Create → paste into `RESEND_API_KEY` in Vercel.
   2. Resend → Domains → Add `tedxhuntingvalley.com`. Resend shows ~3 DNS records (one MX, two TXT).
   3. Your DNS is at **GoDaddy** (nameservers `ns67`/`ns68.domaincontrol.com`). Add each record in
      GoDaddy → your domain → DNS → Add New Record. **GoDaddy gotcha:** in the Name/Host field enter
      only the prefix (`send`, `resend._domainkey`), not the full domain — GoDaddy appends it for you.
   4. Click **Verify** in Resend. `TICKETS_FROM_EMAIL` is already an address on that domain.
   Until the domain shows Verified, ticket emails will not send.

3. **Add the Stripe webhook.** Stripe → Developers → Webhooks → **Add endpoint**:
   - Endpoint URL: `https://www.tedxhuntingvalley.com/api/stripe/webhook`
     (use **www** — the plain domain redirects to www, and Stripe does not follow redirects, so a
     non-www endpoint silently fails).
   - Events to send: **`payment_intent.succeeded`** and **`charge.refunded`** (add both).
   - Save, then copy the **Signing secret** (`whsec_…`) into `STRIPE_WEBHOOK_SECRET`.

4. **Set your codes.** Put your real `TICKETS_PRESALE_CODE` and `TICKETS_SCAN_CODE` in Vercel.

5. **Redeploy.** Vercel → Deployments → open the latest → **Redeploy** (or just push any commit). Env
   changes only take effect after a redeploy.

6. **Test it** (Part 5).

That is everything for test mode. Real money is Part 6.

---

## PART 4 — What each feature needs (quick reference)

| Feature | Needs |
|---|---|
| Seat map, holds, no double-booking | `SUPABASE_SERVICE_ROLE_KEY` |
| Taking card payments | the two Stripe keys |
| Issuing tickets after payment | `STRIPE_WEBHOOK_SECRET` + the `payment_intent.succeeded` event |
| Emailing the QR tickets | `RESEND_API_KEY` + `TICKETS_FROM_EMAIL` |
| Freeing seats after a refund | the `charge.refunded` event on the webhook |
| Pre-sale gate on `/tickets` | `TICKETS_PRESALE_CODE` |
| Door check-in at `/scan` | `TICKETS_SCAN_CODE` |
| Refund requests emailed to you | `TICKETS_ORG_EMAIL` (falls back to the contact email) |

---

## PART 5 — Test it before selling

1. After step 5 above, open the live `/tickets`, enter the pre-sale code, pick a session and 2 seats,
   go to payment.
2. Pay with the Stripe **test card**: `4242 4242 4242 4242`, any future expiry, any CVC, any ZIP.
3. Check your email for the QR tickets. Open one ticket link.
4. Go to `/scan`, enter your `TICKETS_SCAN_CODE`, and scan (or paste) that ticket. It should show green
   ("Checked in"); scanning it again should show amber ("Already checked in").
5. In Stripe, refund that test payment. Within a minute the seats should be available again on
   `/tickets`.

If all five work, you are ready. (Local testing tip: run `stripe listen --forward-to
localhost:3000/api/stripe/webhook` so webhooks reach your computer.)

---

## PART 6 — Going live with real money (later)

When your co-organizer's identity details are ready and Stripe activation is complete:

1. In Vercel, swap the two Stripe keys to their **live** values (`pk_live_…`, `sk_live_…`).
2. In Stripe **live mode**, add the webhook again (repeat Part 3, step 3) and paste the new live
   `whsec_…` into `STRIPE_WEBHOOK_SECRET`.
3. Redeploy.

Safety net: the checkout refuses to run with a live key unless the seat database is connected, so you
can never charge a card without inventory to fulfill it.

---

## Day-of: the door scanner

- URL: `https://tedxhuntingvalley.com/scan` (not linked anywhere; share the URL + `TICKETS_SCAN_CODE`
  with door volunteers).
- Enter the staff code once per device (remembered for that browser tab).
- Tap **Start camera**, point at each QR. Green = checked in. Amber = already scanned (watch for a
  duplicate). Red = not a valid ticket. No camera? Paste the ticket link into the manual box.
- Check-ins are atomic, so several phones can scan at the same time safely.

## Editing content

- **Schedule:** edit `src/data/schedule.ts` (fill in times/titles, set `scheduleReady = true`), push.
- **Add a student speaker:** drop a headshot in `public/speakers/`, fill in their object in
  `src/data/speakers.ts`, push. (The 5 students and Marc Byrnes are live; Fred Nance, Laila Edwards,
  and Brandon Chrostowski are name-only until you provide their bios.)
- **Sponsors:** add partners in `src/data/sponsors.ts`.
- **Seats:** the plan is now **100 seats** (Center 74 + two wings of 13). Edit `src/data/tickets.ts` to
  change it.

## One thing people ask

**Do I need Resend for the contact forms?** No. Every "contact" link on the site (footer, press,
media, social) is a `mailto:` link that opens the visitor's own email app and sends nothing through
the server. Resend is used only for the QR ticket email and the refund-request notice.
