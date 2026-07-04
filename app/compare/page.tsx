import Link from "next/link";
import type { Metadata } from "next";
import { getComparisons, getReview } from "@/lib/content";
export const metadata: Metadata = {
  title: "Compare Rust Gambling Sites",
  description: "Head-to-head comparisons of the top Rust gambling sites to help you pick the right one.",
  alternates: { canonical: "/compare" },
};
export default function CompareIndex() {
  const comps = getComparisons();
  return (
    <div className="space-y-6">
      <h1 className="stencil text-4xl text-bone">Compare Rust Gambling Sites</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {comps.map((c) => {
          const ra = getReview(c.a), rb = getReview(c.b);
          return (
            <Link key={c.slug} href={`/compare/${c.slug}`}
              className="rounded-sm border border-line bg-panel p-5 hover:border-rust transition-colors">
              <span className="stencil text-lg text-bone">{ra?.site} vs {rb?.site}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
