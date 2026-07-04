import Link from "next/link";
import type { Metadata } from "next";
import { getReviews } from "@/lib/content";
import { RatingPlate } from "@/components/RatingPlate";

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
      <div className="divide-y divide-line border-y border-line">
        {reviews.map((r) => (
          <div key={r.slug} className="flex items-center gap-4 py-4">
            <Link href={`/reviews/${r.slug}`} className="stencil flex-1 text-lg text-bone hover:text-rust">
              {r.site}
            </Link>
            <RatingPlate rating={r.rating} />
          </div>
        ))}
      </div>
    </div>
  );
}
