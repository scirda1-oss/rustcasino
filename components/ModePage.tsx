import Link from "next/link";
import { getMode, reviewsForMode } from "@/lib/content";
import { RatingPlate } from "@/components/RatingPlate";
import { AffiliateLink } from "@/components/AffiliateLink";
import { WheelCalculator } from "@/components/WheelCalculator";
import { JsonLd, itemListLd, breadcrumbLd } from "@/lib/schema";

export function ModePage({ slug }: { slug: string }) {
  const m = getMode(slug);
  if (!m) return null;
  const reviews = reviewsForMode(m);
  return (
    <div className="space-y-12">
      <JsonLd data={itemListLd(reviews)} />
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: m.h1, path: `/${m.slug}` },
      ])} />
      <header>
        <p className="stencil text-sm text-olive">UPDATED JULY 2026</p>
        <h1 className="stencil mt-2 text-4xl text-bone md:text-5xl">{m.h1}</h1>
        <p className="mt-4 max-w-2xl text-ash leading-relaxed">{m.intro}</p>
      </header>
      {reviews.length > 0 && (
        <div className="divide-y divide-line border-y border-line">
          {reviews.map((r, i) => (
            <div key={r.slug} className="flex flex-wrap items-center gap-4 py-5">
              <span className="font-mono text-xl text-ash w-8">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex-1 min-w-[12rem]">
                <Link href={`/reviews/${r.slug}`} className="stencil text-xl text-bone hover:text-rust">{r.site}</Link>
                <p className="mt-1 text-sm text-ash line-clamp-2">{r.description}</p>
                {r.promoCode && <span className="mt-1 inline-block font-mono text-xs text-olive">CODE: {r.promoCode}</span>}
              </div>
              <RatingPlate rating={r.rating} />
              <AffiliateLink href={r.url} site={r.site}
                className="stencil rounded-sm border border-rust bg-rust/10 px-4 py-2 text-xs text-rust hover:bg-rust hover:text-base transition-colors">VISIT</AffiliateLink>
            </div>
          ))}
        </div>
      )}
      <section>
        <h2 className="stencil text-2xl text-bone">{m.sectionTitle}</h2>
        <p className="mt-3 text-ash leading-relaxed">{m.sectionBody}</p>
      </section>
      {m.key === "wheel" && (
        <section>
          <h2 className="stencil text-2xl text-bone">Rust wheel odds calculator</h2>
          <p className="mt-3 mb-4 max-w-2xl text-ash leading-relaxed">
            Enter your bet to see the win chance and payout for each multiplier on a standard Rust wheel.
          </p>
          <WheelCalculator />
        </section>
      )}
      <nav className="flex flex-wrap gap-4 border-t border-line pt-6 text-sm">
        <Link href="/best-rust-gambling-sites" className="text-rust hover:text-rust2">All Rust gambling sites →</Link>
        <Link href="/promo" className="text-ash hover:text-bone">Promo codes →</Link>
      </nav>
      <p className="text-xs text-ash">18+ only. Gambling can be addictive. Rust.Casino may earn commissions from links on this page. See our <Link href="/responsible-gambling" className="text-olive hover:text-bone">responsible gambling</Link> page.</p>
    </div>
  );
}

export function modeMetadata(slug: string) {
  const m = getMode(slug);
  if (!m) return {};
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `/${m.slug}` },
    openGraph: { title: m.title, description: m.description, url: `/${m.slug}` },
  };
}
