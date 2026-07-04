import Link from "next/link";
import type { Metadata } from "next";
import { getReviews } from "@/lib/content";
import { RatingPlate } from "@/components/RatingPlate";
import { AffiliateLink } from "@/components/AffiliateLink";
import { JsonLd, itemListLd, breadcrumbLd } from "@/lib/schema";
import { absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Best Rust Gambling Sites",
  description:
    "Ranked list of the best Rust skin gambling sites, with ratings, promo codes and how each site pays out. Independently reviewed.",
  alternates: { canonical: absUrl("/best-rust-gambling-sites") },
};

export default function BestSites() {
  const reviews = getReviews();
  return (
    <div className="space-y-10">
      <JsonLd data={itemListLd(reviews)} />
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Best Rust Gambling Sites", path: "/best-rust-gambling-sites" },
      ])} />

      <header>
        <h1 className="stencil text-4xl text-bone">Best Rust Gambling Sites</h1>
        <p className="mt-3 max-w-2xl text-ash">
          Every site here is tested and rated on payout reliability, bonuses, game selection and
          withdrawal speed. Promo codes are checked and updated regularly.
        </p>
      </header>

      <div className="divide-y divide-line border-y border-line">
        {reviews.map((r, i) => (
          <div key={r.slug} className="flex flex-wrap items-center gap-4 py-5">
            <span className="font-mono text-xl text-ash w-8">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex-1 min-w-[12rem]">
              <Link href={`/reviews/${r.slug}`} className="stencil text-xl text-bone hover:text-rust">
                {r.site}
              </Link>
              <p className="mt-1 text-sm text-ash line-clamp-2">{r.description}</p>
              {r.promoCode && (
                <span className="mt-1 inline-block font-mono text-xs text-olive">
                  CODE: {r.promoCode} {r.promoBonus ? `· ${r.promoBonus}` : ""}
                </span>
              )}
            </div>
            <RatingPlate rating={r.rating} />
            <AffiliateLink href={r.url} site={r.site}
              className="stencil rounded-sm border border-rust bg-rust/10 px-4 py-2 text-xs text-rust hover:bg-rust hover:text-base transition-colors">
              VISIT
            </AffiliateLink>
          </div>
        ))}
      </div>

      <section>
        <h2 className="stencil text-2xl text-bone">How we rate</h2>
        <p className="mt-3 text-ash leading-relaxed">
          Ratings weigh payout reliability first, then bonus value, game variety, deposit and
          withdrawal options, and support. We test withdrawals before recommending any site.
        </p>
      </section>
    </div>
  );
}
