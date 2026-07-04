import Link from "next/link";
import type { Metadata } from "next";
import { getPromos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Rust Gambling Promo Codes",
  description: "Verified promo and referral codes for Rust skin gambling sites, updated regularly.",
  alternates: { canonical: "/promo" },
};

export default function PromoIndex() {
  const promos = getPromos();
  return (
    <div className="space-y-6">
      <h1 className="stencil text-4xl text-bone">Promo Codes</h1>
      <div className="divide-y divide-line border-y border-line">
        {promos.map((p) => (
          <Link key={p.slug} href={`/promo/${p.slug}`} className="flex items-center justify-between py-4 group">
            <span className="stencil text-lg text-bone group-hover:text-rust">{p.site}</span>
            <span className="font-mono text-sm text-olive">{p.code}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
