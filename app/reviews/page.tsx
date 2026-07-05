import type { Metadata } from "next";
import { getReviews } from "@/lib/content";
import { OperatorCard } from "@/components/OperatorCard";

export const metadata: Metadata = {
  title: "Rust Gambling Site Reviews",
  description: "Independent reviews of Rust skin gambling sites with ratings, bonuses and payout details.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsIndex() {
  const reviews = getReviews();
  return (
    <div className="space-y-6">
      <h1 className="stencil text-4xl text-bone">Reviews</h1>
      <p className="max-w-2xl text-ash">
        Every site tested hands-on and rated on payout reliability, bonuses, games and community
        trust. Ratings blend our testing with Trustpilot sentiment — see{" "}
        <a href="/how-we-rate" className="text-olive hover:text-bone">how we rate</a>.
      </p>
      <div className="grid gap-4">
        {reviews.map((r, i) => (
          <OperatorCard key={r.slug} review={r} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}
