"use client";
import { useState } from "react";

// Rust gambling wheel odds calculator. Standard Rust wheel layout (54 segments)
// mirrors the common bandit/rustclash wheel: multipliers 2x, 3x, 5x, 10x, 20x, 50x.
// Segment counts below reflect a typical 54-slot wheel; users can adjust their bet.
const SEGMENTS = [
  { label: "2x", multiplier: 2, count: 24 },
  { label: "3x", multiplier: 3, count: 15 },
  { label: "5x", multiplier: 5, count: 7 },
  { label: "10x", multiplier: 10, count: 4 },
  { label: "20x", multiplier: 20, count: 3 },
  { label: "50x", multiplier: 50, count: 1 },
];
const TOTAL = SEGMENTS.reduce((s, x) => s + x.count, 0);

export function WheelCalculator() {
  const [bet, setBet] = useState<number>(1);

  return (
    <div className="rounded-sm border border-line bg-panel p-5">
      <div className="mb-4 flex items-center gap-3">
        <label className="stencil text-xs text-ash">BET (SKINS VALUE $)</label>
        <input
          type="number"
          min={0}
          step={0.1}
          value={bet}
          onChange={(e) => setBet(Math.max(0, Number(e.target.value)))}
          className="w-28 rounded-sm border border-line bg-base px-3 py-2 font-mono text-bone focus:border-rust focus:outline-none"
        />
        <span className="text-xs text-ash">based on a standard 54-segment wheel</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-ash">
              <th className="stencil py-2 text-xs">SEGMENT</th>
              <th className="stencil py-2 text-xs">SLOTS</th>
              <th className="stencil py-2 text-xs">WIN CHANCE</th>
              <th className="stencil py-2 text-xs">PAYOUT IF HIT</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {SEGMENTS.map((s) => {
              const chance = (s.count / TOTAL) * 100;
              const payout = bet * s.multiplier;
              return (
                <tr key={s.label} className="border-b border-line/50">
                  <td className="py-2 text-rust">{s.label}</td>
                  <td className="py-2 text-ash">{s.count}</td>
                  <td className="py-2 text-bone">{chance.toFixed(1)}%</td>
                  <td className="py-2 text-olive">${payout.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-ash">
        Win chance is the share of segments a multiplier occupies on a standard 54-slot wheel.
        Higher multipliers hit less often. Actual layouts vary by site; always check the wheel and
        its provably fair verification before betting. This tool is for information only.
      </p>
    </div>
  );
}
