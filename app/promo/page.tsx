import type { Metadata } from "next";
import { getReviews } from "@/lib/content";
import { OperatorCard } from "@/components/OperatorCard";

export const metadata: Metadata = {
  title: "Rust Gambling Promo Codes",
  description: "Verified promo and referral codes for Rust skin gambling sites, updated regularly.",
  alternates: { canonical: "/promo" },
};

export default function PromoIndex() {
  const reviews = getReviews();
  return (
    <div className="space-y-6">
      <h1 className="stencil text-4xl text-bone">Promo Codes</h1>
      <p className="max-w-2xl text-ash">
        Verified promo and referral codes for every Rust gambling site we rate. Each card shows the
        code, the offer it unlocks, and the site&apos;s rating. Codes are updated and checked; 18+ only.
      </p>
      <div className="grid gap-4">
        {reviews.map((r, i) => (
          <OperatorCard key={r.slug} review={r} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}
