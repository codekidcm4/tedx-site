// Export every current ticket holder to a CSV.
//
// Usage:  node scripts/export-holders.mjs
// Output: ../exports/attendees-<today>.csv  (one row per person per seat)
//
// Columns: holder_name, buyer_email, pass (Session 1 / Session 2 / All-Day), seat,
//          session1_ticket_url, session2_ticket_url, checked_in, purchased
//
// Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local (service role is
// server-only; get it from Supabase dashboard -> Project Settings -> API keys).
// Only counts orders with status 'paid', so refunded orders drop out automatically.

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Minimal .env.local loader (no extra deps).
const env = { ...process.env };
const envFile = path.join(root, ".env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i > 0 && !(t.slice(0, i) in process.env)) env[t.slice(0, i)] = t.slice(i + 1);
  }
}

const url = env.SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Paste the service_role key into .env.local (Supabase dashboard -> Project Settings -> API keys)."
  );
  process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });
const SITE = (env.NEXT_PUBLIC_SITE_URL || "https://www.tedxhuntingvalley.com").replace(/\/$/, "");

const { data: orders, error: oErr } = await db
  .from("orders")
  .select("id, email, session, created_at")
  .in("status", ["paid", "comp"]); // comp = organizer-assigned free seats (Row H etc.)
if (oErr) throw oErr;

const { data: tickets, error: tErr } = await db
  .from("tickets")
  .select("order_id, seat, session, holder_name, qr_token, checked_in");
if (tErr) throw tErr;

const orderById = new Map(orders.map((o) => [o.id, o]));
const passLabel = { s1: "Session 1", s2: "Session 2", "all-day": "All-Day" };

// One row per (order, seat): all-day passes have two ticket rows (s1 + s2) for the same seat.
const rows = new Map();
for (const t of tickets) {
  const o = orderById.get(t.order_id);
  if (!o) continue; // ticket on a non-paid order (shouldn't happen)
  const k = `${t.order_id}|${t.seat}`;
  const r =
    rows.get(k) ??
    rows
      .set(k, {
        name: (t.holder_name || "").trim(),
        email: o.email,
        pass: passLabel[o.session] ?? o.session,
        seat: t.seat,
        u1: "",
        u2: "",
        checkedIn: false,
        purchased: (o.created_at || "").slice(0, 10),
      })
      .get(k);
  if (t.session === "s1") r.u1 = `${SITE}/ticket/${t.qr_token}`;
  if (t.session === "s2") r.u2 = `${SITE}/ticket/${t.qr_token}`;
  r.checkedIn = r.checkedIn || t.checked_in;
}

const q = (s) => `"${String(s).replace(/"/g, '""')}"`;
const sorted = [...rows.values()].sort(
  (a, b) => a.pass.localeCompare(b.pass) || a.seat.localeCompare(b.seat, undefined, { numeric: true })
);
const csv = [
  ["holder_name", "buyer_email", "pass", "seat", "session1_ticket_url", "session2_ticket_url", "checked_in", "purchased"]
    .map(q)
    .join(","),
  ...sorted.map((r) => [r.name, r.email, r.pass, r.seat, r.u1, r.u2, r.checkedIn, r.purchased].map(q).join(",")),
].join("\n");

const outDir = path.join(path.dirname(root), "exports");
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, `attendees-${new Date().toISOString().slice(0, 10)}.csv`);
fs.writeFileSync(out, csv + "\n");

const counts = {};
for (const r of sorted) counts[r.pass] = (counts[r.pass] ?? 0) + 1;
console.log(`Wrote ${sorted.length} rows -> ${out}`);
for (const [pass, n] of Object.entries(counts)) console.log(`  ${pass}: ${n}`);
