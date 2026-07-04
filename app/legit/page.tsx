import Link from "next/link";
import type { Metadata } from "next";
import { getLegitChecks, getReview } from "@/lib/content";

export const metadata: Metadata = {
  title: "Is It Legit? Rust Gambling Site Safety Checks",
  description:
    "Independent safety reviews of Rust gambling sites: provably fair verification, withdrawals, track record and red flags before you deposit.",
  alternates: { canonical: "/legit" },
};

export default function LegitIndex() {
  const checks = getLegitChecks();
  return (
    <div className="space-y-6">
      <h1 className="stencil text-4xl text-bone">Is It Legit? Rust Site Safety Checks</h1>
      <p className="max-w-2xl text-ash leading-relaxed">
        Independent safety reviews of Rust gambling sites — provably fair verification, withdrawals,
        track record and any red flags before you deposit. 18+ only.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {checks.map((l) => {
          const r = getReview(l.reviewSlug);
          return (
            <Link key={l.slug} href={`/${l.slug}`}
              className="flex items-center justify-between rounded-sm border border-line bg-panel p-5 hover:border-rust transition-colors">
              <span className="stencil text-lg text-bone">Is {l.site} Legit?</span>
              <span className="stencil text-xs text-olive">
                {l.verdict === "legit" ? "LEGIT" : "CAUTION"}{r ? ` · ${r.rating.toFixed(1)}` : ""}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
