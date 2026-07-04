"use client";
import { useState } from "react";

// Signature: promo code as a "crate label" tab you copy.
export function PromoTab({ code, bonus }: { code: string; bonus?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rating-plate flex items-center justify-between gap-4 rounded-sm px-4 py-3">
      <div>
        {bonus && <div className="text-xs text-ash">{bonus}</div>}
        <div className="stencil text-[10px] tracking-widest text-olive">PROMO CODE</div>
        <div className="font-mono text-xl font-bold text-bone">{code}</div>
      </div>
      <button
        onClick={() => {
          navigator.clipboard?.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="stencil rounded-sm border border-rust bg-rust/10 px-3 py-2 text-xs text-rust hover:bg-rust hover:text-base transition-colors"
      >
        {copied ? "COPIED" : "COPY"}
      </button>
    </div>
  );
}
