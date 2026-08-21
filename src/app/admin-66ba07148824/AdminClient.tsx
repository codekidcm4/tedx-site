"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sampleSections, ADMIN_ROW_SEATS, ADMIN_ROW_GROUPS, seatId } from "@/data/tickets";
import { ADMIN_KEY } from "@/lib/adminKey";

type AdminTicket = {
  seat: string;
  holder: string | null;
  email: string;
  pass: string;
  checkedIn: boolean;
  checkedInAt: string | null;
};
type AdminState = { tickets: AdminTicket[]; holds: { seat: string; expiresAt: string }[] };
type Phys = "s1" | "s2";

const PASS_LABEL: Record<string, string> = { s1: "Session 1", s2: "Session 2", "all-day": "All-Day" };

// Rows B..G as [leftWing, center, rightWing] seat-id arrays, plus organizer Row H.
function buildRows() {
  const [left, center, right] = sampleSections;
  return center.rows.map((cr) => {
    const lw = left.rows.find((r) => r.row === cr.row);
    const rw = right.rows.find((r) => r.row === cr.row);
    return {
      row: cr.row,
      left: Array.from({ length: lw?.seats ?? 0 }, (_, i) => seatId(left.id, cr.row, i + 1)),
      center: Array.from({ length: cr.seats }, (_, i) => seatId(center.id, cr.row, i + 1)),
      right: Array.from({ length: rw?.seats ?? 0 }, (_, i) => seatId(right.id, cr.row, i + 1)),
    };
  });
}

export function AdminClient() {
  const code = ADMIN_KEY; // the page's unguessable URL slug doubles as the API key
  const [session, setSession] = useState<Phys>("s1");
  const [state, setState] = useState<AdminState | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [assigning, setAssigning] = useState<string | null>(null); // seat id being assigned
  const [assignName, setAssignName] = useState("");
  const [assignEmail, setAssignEmail] = useState("");
  const [assignPass, setAssignPass] = useState<"all-day" | Phys>("all-day");
  const [assignResult, setAssignResult] = useState<{ seat: string; urls: { session: string; url: string }[] } | null>(null);
  const [assignError, setAssignError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const refresh = useCallback(async (c: string, s: Phys) => {
    try {
      const res = await fetch(`/api/admin?code=${encodeURIComponent(c)}&session=${s}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as AdminState;
      setState(data);
      setUpdatedAt(new Date());
    } catch {
      /* transient network error: keep last state */
    }
  }, []);

  // Live polling: refresh every 4s while the tab is visible.
  useEffect(() => {
    refresh(code, session);
    timer.current = setInterval(() => {
      if (document.visibilityState === "visible") refresh(code, session);
    }, 4000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [code, session, refresh]);

  const rows = useMemo(buildRows, []);
  const bySeat = useMemo(() => {
    const m = new Map<string, AdminTicket>();
    state?.tickets.forEach((t) => m.set(t.seat, t));
    return m;
  }, [state]);
  const heldSeats = useMemo(() => new Set(state?.holds.map((h) => h.seat) ?? []), [state]);

  const total = state?.tickets.length ?? 0;
  const arrived = state?.tickets.filter((t) => t.checkedIn).length ?? 0;

  async function submitAssign() {
    if (!assigning || !assignName.trim()) return;
    setAssignError(null);
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, seat: assigning, name: assignName.trim(), email: assignEmail.trim() || undefined, session: assignPass }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setAssignError(data.error === "seat_taken" ? "That seat already has a ticket." : "Could not assign — try again.");
      return;
    }
    setAssignResult({ seat: data.seat, urls: data.tickets });
    setAssigning(null);
    setAssignName("");
    setAssignEmail("");
    refresh(code, session);
  }

  const seatBox = (id: string, organizerRow = false) => {
    const t = bySeat.get(id);
    const held = heldSeats.has(id);
    // Front rows: pop the hover card BELOW the seat — above it would be clipped by the
    // scroll container's top edge (there's only the stage bar up there).
    const row = organizerRow ? "H" : (id.split("-")[1]?.[0] ?? "");
    const tipPos = row === "B" || row === "C" ? "top-full mt-2" : "bottom-full mb-2";
    const cls = t
      ? t.checkedIn
        ? "bg-[#2e9e44] border-[#2e9e44] text-white"
        : "bg-[#3a3a3a] border-[#555] text-white/80"
      : held
        ? "bg-[#7a5b12] border-[#a87f1d] text-[#ffd97a]"
        : organizerRow
          ? "bg-transparent border-dashed border-white/30 text-white/40 hover:border-[#e62b1e] hover:text-white"
          : "bg-transparent border-white/15 text-white/30 hover:border-[#e62b1e] hover:text-white";
    return (
      <div key={id} className="relative group">
        <button
          onClick={() => {
            if (!t) {
              setAssigning(id);
              setAssignResult(null);
              setAssignError(null);
            }
          }}
          className={`w-9 h-9 md:w-10 md:h-10 border rounded-sm text-[0.55rem] font-bold flex items-center justify-center transition-colors ${cls}`}
          aria-label={id}
        >
          {id.replace(/^[A-Z]+-/, "")}
        </button>
        {/* Hover card */}
        <div className={`pointer-events-none absolute z-20 hidden group-hover:block ${tipPos} left-1/2 -translate-x-1/2 w-52 bg-[#111] border border-white/20 rounded-sm p-3 text-left shadow-xl`}>
          <p className="text-[0.6rem] font-bold tracking-widest uppercase text-[#e62b1e] mb-1">{id}</p>
          {t ? (
            <>
              <p className="text-white text-xs font-bold">{t.holder || "(no name)"}</p>
              <p className="text-white/50 text-[0.65rem] break-all">{t.email}</p>
              <p className="text-white/50 text-[0.65rem] mt-1">{PASS_LABEL[t.pass] ?? t.pass}</p>
              <p className={`text-[0.65rem] mt-1 font-bold ${t.checkedIn ? "text-[#6fdf87]" : "text-white/40"}`}>
                {t.checkedIn
                  ? `Checked in ${t.checkedInAt ? new Date(t.checkedInAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : ""}`
                  : "Not arrived yet"}
              </p>
            </>
          ) : held ? (
            <p className="text-[#ffd97a] text-xs">Held by organizers — click to assign</p>
          ) : (
            <p className="text-white/50 text-xs">{organizerRow ? "Organizer seat — click to assign" : "Empty — click to assign"}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex rounded-sm overflow-hidden border border-white/20">
          {(["s1", "s2"] as Phys[]).map((s) => (
            <button
              key={s}
              onClick={() => setSession(s)}
              className={`px-4 py-2 text-xs font-bold tracking-wide uppercase ${session === s ? "bg-[#e62b1e] text-white" : "text-white/60 hover:text-white"}`}
            >
              {s === "s1" ? "Session 1" : "Session 2"}
            </button>
          ))}
        </div>
        <p className="text-white text-sm font-bold">
          {arrived} <span className="text-white/40 font-normal">of</span> {total}{" "}
          <span className="text-white/40 font-normal">checked in</span>
        </p>
        <p className="text-white/35 text-xs ml-auto">
          {updatedAt ? `Live · updated ${updatedAt.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" })}` : "Loading…"}
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6 text-[0.65rem] text-white/60">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#2e9e44] inline-block" /> Checked in</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#3a3a3a] border border-[#555] inline-block" /> Ticketed, not arrived</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#7a5b12] border border-[#a87f1d] inline-block" /> Organizer hold</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm border border-white/20 inline-block" /> Empty</span>
      </div>

      {/* Seat map */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[760px]">
          <div className="mx-auto mb-6 w-64 h-8 bg-white/10 rounded-full flex items-center justify-center text-[0.6rem] font-bold tracking-[0.3em] text-white/60">
            STAGE
          </div>
          <div className="space-y-2">
            {rows.map((r) => (
              <div key={r.row} className="flex items-center gap-4 justify-center">
                <span className="w-4 text-right text-[0.6rem] font-bold text-white/30">{r.row}</span>
                <div className="flex gap-1">{r.left.map((id) => seatBox(id))}</div>
                <div className="flex gap-1">{r.center.map((id) => seatBox(id))}</div>
                <div className="flex gap-1">{r.right.map((id) => seatBox(id))}</div>
                <span className="w-4 text-[0.6rem] font-bold text-white/30">{r.row}</span>
              </div>
            ))}
            {/* Organizer Row H — never shown on the public site. Three separated blocks
                matching the physical setup: 9 left, 6 center-right, 5 far right. */}
            <div className="pt-3 mt-3 border-t border-white/10">
              <div className="flex items-center gap-4">
                <span className="w-4 text-right text-[0.6rem] font-bold text-[#e62b1e]">H</span>
                <div className="flex flex-1 items-center min-w-0">
                  {(() => {
                    const groups: string[][] = [];
                    let start = 0;
                    for (const n of ADMIN_ROW_GROUPS) {
                      groups.push(ADMIN_ROW_SEATS.slice(start, start + n));
                      start += n;
                    }
                    const [g1, g2, g3] = groups;
                    return (
                      <>
                        <div className="flex gap-1">{g1.map((id) => seatBox(id, true))}</div>
                        {/* bigger spacer first so the middle block sits slightly right of center */}
                        <div className="flex-[1.3] min-w-8" />
                        <div className="flex gap-1">{g2.map((id) => seatBox(id, true))}</div>
                        <div className="flex-[0.7] min-w-8" />
                        <div className="flex gap-1">{g3.map((id) => seatBox(id, true))}</div>
                      </>
                    );
                  })()}
                </div>
                <span className="w-4 text-[0.6rem] font-bold text-[#e62b1e]">H</span>
              </div>
              <p className="text-center text-[0.6rem] text-white/35 mt-2">
                Row H · {ADMIN_ROW_SEATS.length} organizer seats in three blocks (9 · 6 · 5) · not visible or sellable on the public site
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Assign dialog */}
      {assigning && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setAssigning(null)}>
          <div className="bg-[#141414] border border-white/15 rounded-sm p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <p className="text-[0.6rem] font-bold tracking-widest uppercase text-[#e62b1e] mb-1">Assign seat {assigning}</p>
            <p className="text-white/50 text-xs mb-4">Creates a free scannable ticket for this seat.</p>
            <input
              autoFocus
              value={assignName}
              onChange={(e) => setAssignName(e.target.value)}
              placeholder="Guest name"
              className="w-full mb-2 bg-white/5 border border-white/15 rounded-sm px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e62b1e]"
            />
            <input
              value={assignEmail}
              onChange={(e) => setAssignEmail(e.target.value)}
              placeholder="Email (optional)"
              className="w-full mb-2 bg-white/5 border border-white/15 rounded-sm px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e62b1e]"
            />
            <div className="flex gap-2 mb-4">
              {(["all-day", "s1", "s2"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setAssignPass(p)}
                  className={`px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wide rounded-sm border ${assignPass === p ? "bg-[#e62b1e] border-[#e62b1e] text-white" : "border-white/20 text-white/60"}`}
                >
                  {PASS_LABEL[p]}
                </button>
              ))}
            </div>
            {assignError && <p className="text-[#ff8f88] text-xs mb-3">{assignError}</p>}
            <div className="flex gap-2">
              <button onClick={submitAssign} className="flex-1 py-2.5 bg-[#e62b1e] text-white font-bold text-sm rounded-sm hover:bg-[#c9231a]">
                Assign
              </button>
              <button onClick={() => setAssigning(null)} className="px-4 py-2.5 border border-white/20 text-white/70 text-sm rounded-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign result: ticket links to share */}
      {assignResult && (
        <div className="mt-6 bg-[#10240f] border border-[#2e9e44]/50 rounded-sm p-5">
          <p className="text-[#6fdf87] text-sm font-bold mb-2">Seat {assignResult.seat} assigned. Ticket link(s):</p>
          {assignResult.urls.map((u) => (
            <p key={u.url} className="text-white/80 text-xs break-all mb-1">
              <span className="text-white/40 uppercase font-bold mr-2">{u.session}</span>
              {u.url}
            </p>
          ))}
          <p className="text-white/40 text-[0.65rem] mt-2">Send the link to the guest — it is their QR ticket for the door.</p>
        </div>
      )}
    </div>
  );
}
