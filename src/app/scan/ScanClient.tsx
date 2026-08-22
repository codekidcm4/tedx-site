"use client";

import { useEffect, useRef, useState } from "react";
import type { Html5Qrcode as Html5QrcodeInstance } from "html5-qrcode";
import { sessionById } from "@/data/tickets";
import type { SessionId } from "@/data/tickets";

function seatLabel(id: string): string {
  const [section, rest] = id.split("-");
  const names: Record<string, string> = { L: "Left", C: "Center", R: "Right" };
  return `${names[section] ?? section} ${rest}`;
}

type ScanResult =
  | { kind: "status"; status: string; seat?: string; session?: string; holder_name?: string | null }
  | { kind: "error"; message: string };

export function ScanClient() {
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [manualToken, setManualToken] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [count, setCount] = useState(0);
  const [busy, setBusy] = useState(false);

  const scannerRef = useRef<Html5QrcodeInstance | null>(null);
  const cancelledRef = useRef(false);
  const lastRef = useRef<{ token: string; at: number }>({ token: "", at: 0 });

  // ── Find by name ──
  type Hit = { token: string; seat: string; session: string; holder: string | null; checkedIn: boolean; pass: string };
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [searching, setSearching] = useState(false);
  const searchSeq = useRef(0);

  async function runSearch(q: string) {
    const seq = ++searchSeq.current;
    if (q.trim().length < 2) { setHits([]); setSearching(false); return; }
    setSearching(true);
    try {
      const res = await fetch(`/api/scan?q=${encodeURIComponent(q.trim())}`, { cache: "no-store" });
      const d = await res.json().catch(() => ({}));
      if (seq !== searchSeq.current) return; // a newer keystroke superseded this request
      setHits(Array.isArray(d.hits) ? d.hits : []);
    } catch {
      if (seq === searchSeq.current) setHits([]);
    } finally {
      if (seq === searchSeq.current) setSearching(false);
    }
  }

  // Debounced live search as the name is typed.
  useEffect(() => {
    const t = setTimeout(() => runSearch(query), 220);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  async function checkInHit(h: Hit) {
    await submitToken(h.token);
    runSearch(query); // refresh so the row flips to "Checked in"
  }

  // Stop the camera if the component unmounts mid-scan (even while start() is still initializing).
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      const inst = scannerRef.current;
      if (inst) inst.stop().catch(() => {});
    };
  }, []);

  async function submitToken(raw: string) {
    const token = (raw || "").trim();
    if (!token || busy) return;
    const now = Date.now();
    if (lastRef.current.token === token && now - lastRef.current.at < 3500) return; // debounce rescans
    lastRef.current = { token, at: now };
    setBusy(true);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const d = await res.json().catch(() => ({}));
      setResult({ kind: "status", status: d.status, seat: d.seat, session: d.session, holder_name: d.holder_name });
      if (d.status === "checked_in") setCount((c) => c + 1);
    } catch {
      setResult({ kind: "error", message: "Network error. Try again." });
    } finally {
      setBusy(false);
    }
  }

  async function startCamera() {
    setCameraError(null);
    cancelledRef.current = false;
    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const inst = new Html5Qrcode("qr-reader");
      await inst.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        (decoded) => submitToken(decoded),
        () => {} // ignore per-frame "no code in view" errors
      );
      // If we were torn down (unmount / Stop) while the camera was starting, stop it now.
      // Only record the running instance AFTER start resolves, so stop() is never called too early.
      if (cancelledRef.current) { try { await inst.stop(); } catch {} return; }
      scannerRef.current = inst;
      setScanning(true);
    } catch {
      setCameraError("Couldn't start the camera. Check camera permission, or use manual entry below.");
      scannerRef.current = null;
    }
  }

  async function stopCamera() {
    cancelledRef.current = true; // aborts an in-flight startCamera too
    const inst = scannerRef.current;
    if (inst) {
      try { await inst.stop(); } catch {}
      try { inst.clear(); } catch {}
      scannerRef.current = null;
    }
    setScanning(false);
  }

  // ── Scanner ──
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Checked in this device</span>
        <span className="text-white font-extrabold text-lg tabular-nums">{count}</span>
      </div>

      {/* Result card */}
      {result && <ResultCard result={result} />}

      {/* Camera */}
      <div className="bg-black rounded-sm overflow-hidden mb-3" style={{ minHeight: scanning ? undefined : 0 }}>
        <div id="qr-reader" className="w-full [&_video]:w-full [&_video]:block" />
      </div>
      {cameraError && <p className="text-[#ff8f88] text-xs mb-3" role="alert">{cameraError}</p>}

      {!scanning ? (
        <button
          type="button"
          onClick={startCamera}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#e62b1e] text-white font-bold text-sm rounded-sm hover:bg-[#c9231a] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.66-.9l.82-1.2A2 2 0 0110.07 3h3.86a2 2 0 011.66.9l.82 1.2a2 2 0 001.66.9H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
          Start camera
        </button>
      ) : (
        <button
          type="button"
          onClick={stopCamera}
          className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-white/10 text-white font-bold text-sm rounded-sm hover:bg-white/20 transition-colors"
        >
          Stop camera
        </button>
      )}

      {/* Name lookup: type a name, pick the person + session, check them in */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <label htmlFor="name-search" className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
          Or find by name
        </label>
        <input
          id="name-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Start typing a name…"
          autoComplete="off"
          className="w-full px-4 py-3 text-sm rounded-sm bg-white/5 text-white border border-white/15 outline-none focus:border-[#e62b1e] transition-colors placeholder:text-white/30"
        />
        {query.trim().length >= 2 && (
          <div className="mt-2 rounded-sm border border-white/10 divide-y divide-white/10 overflow-hidden">
            {searching && hits.length === 0 && (
              <p className="px-4 py-3 text-white/40 text-xs">Searching…</p>
            )}
            {!searching && hits.length === 0 && (
              <p className="px-4 py-3 text-white/40 text-xs">No ticket holder matches “{query.trim()}”.</p>
            )}
            {hits.map((h) => {
              const sessionName = sessionById(h.session as SessionId)?.name ?? h.session;
              return (
                <div key={h.token} className="flex items-center gap-3 px-4 py-3 bg-white/[0.03]">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-bold truncate">{h.holder || "(no name)"}</p>
                    <p className="text-white/50 text-xs">
                      Seat {seatLabel(h.seat)} · {sessionName}
                      {h.pass === "all-day" && <span className="text-white/30"> · All-Day pass</span>}
                    </p>
                  </div>
                  {h.checkedIn ? (
                    <span className="text-[#4ade80] text-[0.65rem] font-bold uppercase tracking-wider flex-shrink-0">Checked in</span>
                  ) : (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => checkInHit(h)}
                      className="flex-shrink-0 px-4 py-2 bg-[#e62b1e] text-white font-bold text-xs rounded-sm hover:bg-[#c9231a] transition-colors disabled:opacity-50"
                    >
                      Check in
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Manual entry fallback */}
      <form
        onSubmit={(e) => { e.preventDefault(); submitToken(manualToken); setManualToken(""); }}
        className="mt-6 pt-6 border-t border-white/10"
      >
        <label htmlFor="manual-token" className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
          Or enter a ticket code / link
        </label>
        <div className="flex gap-2">
          <input
            id="manual-token"
            value={manualToken}
            onChange={(e) => setManualToken(e.target.value)}
            placeholder="Paste the QR link or code"
            className="flex-1 px-4 py-3 text-sm rounded-sm bg-white/5 text-white border border-white/15 outline-none focus:border-[#e62b1e] transition-colors placeholder:text-white/30"
          />
          <button
            type="submit"
            disabled={busy || manualToken.trim().length === 0}
            className="px-5 py-3 bg-[#e62b1e] text-white font-bold text-sm rounded-sm hover:bg-[#c9231a] transition-colors disabled:opacity-50"
          >
            Check in
          </button>
        </div>
      </form>
    </div>
  );
}

function ResultCard({ result }: { result: ScanResult }) {
  if (result.kind === "error") {
    return (
      <div className="rounded-sm p-5 mb-3 bg-[#3a0f0c] border border-[#e62b1e]/50" role="status" aria-live="polite">
        <p className="text-[#ff8f88] font-bold">Try again</p>
        <p className="text-white/70 text-sm mt-0.5">{result.message}</p>
      </div>
    );
  }
  const { status, seat, session, holder_name } = result;
  const sessionName = session ? sessionById(session as SessionId)?.name ?? session : "";

  const styles: Record<string, { bg: string; border: string; head: string; title: string }> = {
    checked_in: { bg: "bg-[#0d2f1e]", border: "border-[#16794a]", head: "text-[#4ade80]", title: "Checked in" },
    already:    { bg: "bg-[#332103]", border: "border-[#b45309]", head: "text-[#fbbf24]", title: "Already checked in" },
    not_found:  { bg: "bg-[#3a0f0c]", border: "border-[#e62b1e]", head: "text-[#ff8f88]", title: "Not a valid ticket" },
    unavailable:{ bg: "bg-[#1a1a1a]", border: "border-white/20", head: "text-white/70", title: "Database not connected" },
    invalid:    { bg: "bg-[#3a0f0c]", border: "border-[#e62b1e]", head: "text-[#ff8f88]", title: "Unreadable code" },
  };
  const s = styles[status] ?? styles.not_found;

  return (
    <div className={`rounded-sm p-5 mb-3 border ${s.bg} ${s.border}`} role="status" aria-live="polite">
      <p className={`font-extrabold text-lg ${s.head}`}>{s.title}</p>
      {(status === "checked_in" || status === "already") && (
        <div className="mt-1 text-white">
          {seat && <p className="font-bold">Seat {seatLabel(seat)}</p>}
          {holder_name && <p className="text-white/80 text-sm">{holder_name}</p>}
          {sessionName && <p className="text-white/50 text-xs mt-0.5">{sessionName}</p>}
          {status === "already" && <p className="text-[#fbbf24] text-xs mt-2 font-semibold">This ticket was already scanned. Check for a duplicate.</p>}
        </div>
      )}
    </div>
  );
}
