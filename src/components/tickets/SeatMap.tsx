"use client";

import { useMemo } from "react";
import type { SeatSection } from "@/data/tickets";
import { seatId } from "@/data/tickets";

interface SeatMapProps {
  sections: SeatSection[];
  soldSet: Set<string>;
  selectedSet: Set<string>;
  accessibleSet?: Set<string>;
  maxReached: boolean;
  onToggle: (id: string) => void;
}

const SEAT = 20;
const GAP_X = 5;
const ROW_H = 28;
const SECTION_GAP = 30;
const TOP_PAD = 64;
const LEFT_PAD = 26;
const RIGHT_PAD = 26;
const BOTTOM_PAD = 20;

type PositionedSeat = { id: string; x: number; y: number; label: string };

export function SeatMap({ sections, soldSet, selectedSet, accessibleSet, maxReached, onToggle }: SeatMapProps) {
  const { seats, width, height, rowLabels, stage } = useMemo(() => {
    const seats: PositionedSeat[] = [];
    const rowLabels: { x: number; y: number; text: string }[] = [];
    let cursorX = LEFT_PAD;
    let maxRows = 0;
    let centerX = 0;
    let centerW = 0;

    for (const section of sections) {
      const maxSeats = Math.max(...section.rows.map((r) => r.seats));
      const sectionW = maxSeats * (SEAT + GAP_X) - GAP_X;
      if (section.id === "C") {
        centerX = cursorX;
        centerW = sectionW;
      }
      section.rows.forEach((r, i) => {
        const rowW = r.seats * (SEAT + GAP_X) - GAP_X;
        const rowXStart = cursorX + (sectionW - rowW) / 2;
        const y = TOP_PAD + i * ROW_H;
        rowLabels.push({ x: cursorX - 6, y: y + SEAT / 2, text: r.row });
        for (let n = 1; n <= r.seats; n++) {
          seats.push({
            id: seatId(section.id, r.row, n),
            x: rowXStart + (n - 1) * (SEAT + GAP_X),
            y,
            label: `${section.name} · Row ${r.row}, Seat ${n}`,
          });
        }
      });
      maxRows = Math.max(maxRows, section.rows.length);
      cursorX += sectionW + SECTION_GAP;
    }

    const width = cursorX - SECTION_GAP + RIGHT_PAD;
    const height = TOP_PAD + maxRows * ROW_H + BOTTOM_PAD;
    const stage = { x: centerX || LEFT_PAD, w: centerW || 240 };
    return { seats, width, height, rowLabels, stage };
  }, [sections]);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="group"
        aria-label="Seat map. Select up to two available seats."
        style={{ maxWidth: "none" }}
      >
        {/* Stage */}
        <rect x={stage.x} y={16} width={stage.w} height={22} rx={11} fill="#0a0a0a" />
        <text
          x={stage.x + stage.w / 2}
          y={31}
          textAnchor="middle"
          fontSize={11}
          fontWeight={700}
          letterSpacing={3}
          fill="#ffffff"
        >
          STAGE
        </text>

        {/* Row labels */}
        {rowLabels.map((rl, i) => (
          <text
            key={`rl-${i}`}
            x={rl.x}
            y={rl.y + 4}
            textAnchor="end"
            fontSize={9}
            fontWeight={700}
            fill="#6f6f6f"
          >
            {rl.text}
          </text>
        ))}

        {/* Seats */}
        {seats.map((s) => {
          const sold = soldSet.has(s.id);
          const selected = selectedSet.has(s.id);
          const accessible = accessibleSet?.has(s.id) ?? false;
          const disabled = !selected && !sold && maxReached;
          const cls = sold
            ? "seat seat-sold"
            : selected
            ? "seat seat-selected"
            : disabled
            ? "seat seat-disabled"
            : "seat seat-available";
          return (
            <g key={s.id}>
              <rect
                x={s.x}
                y={s.y}
                width={SEAT}
                height={SEAT}
                rx={4}
                className={cls}
                onClick={sold || disabled ? undefined : () => onToggle(s.id)}
                tabIndex={sold || disabled ? -1 : 0}
                role="button"
                aria-pressed={selected}
                aria-disabled={sold || disabled}
                aria-label={`${s.label}${sold ? ", unavailable" : selected ? ", selected" : ""}`}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && !sold && !disabled) {
                    e.preventDefault();
                    onToggle(s.id);
                  }
                }}
              >
                <title>{s.label}</title>
              </rect>
              {sold && (
                <path
                  d={`M${s.x + 6} ${s.y + 6} L${s.x + SEAT - 6} ${s.y + SEAT - 6} M${s.x + SEAT - 6} ${s.y + 6} L${s.x + 6} ${s.y + SEAT - 6}`}
                  stroke="#8a8a8a"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  pointerEvents="none"
                />
              )}
              {accessible && !sold && (
                <circle
                  cx={s.x + SEAT / 2}
                  cy={s.y + SEAT / 2}
                  r={3}
                  fill={selected ? "#ffffff" : "#2563eb"}
                  pointerEvents="none"
                >
                  <title>Wheelchair-accessible seat</title>
                </circle>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
