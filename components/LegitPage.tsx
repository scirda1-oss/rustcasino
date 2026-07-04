import Link from "next/link";
import { getLegitCheck, getReview } from "@/lib/content";
import { AffiliateLink } from "@/components/AffiliateLink";
import { RatingPlate } from "@/components/RatingPlate";
import { TrustpilotSummary } from "@/components/TrustpilotSummary";
import { JsonLd, breadcrumbLd } from "@/lib/schema";

export function LegitPage({ slug }: { slug: string }) {
  const l = getLegitCheck(slug);
  if (!l) return null;
  const review = getReview(l.reviewSlug);
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: `Is ${l.site} Legit?`, path: `/${l.slug}` },
      ])} />
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="stencil text-xs text-ash">SAFETY REVIEW · UPDATED JULY 2026</p>
          <h1 className="stencil mt-1 text-4xl text-bone">Is {l.site} Legit?</h1>
          <p className="mt-3 stencil text-lg text-olive">
            VERDICT: {l.verdict === "legit" ? "LEGIT" : "CAUTION"} · Est. {l.established}
          </p>
        </div>
        {review && <RatingPlate rating={review.rating} />}
      </header>

      <p className="text-ash leading-relaxed">{l.summary}</p>

      <AffiliateLink href={l.url} site={l.site}
        className="stencil inline-block rounded-sm border border-rust bg-rust/10 px-5 py-3 text-sm text-rust hover:bg-rust hover:text-base transition-colors">
        VISIT {l.site.toUpperCase()}
      </AffiliateLink>

      <section>
        <h2 className="stencil text-2xl text-bone">Safety checklist</h2>
        <div className="mt-4 divide-y divide-line border-y border-line">
          {l.checks.map((c, i) => (
            <div key={i} className="flex items-start gap-3 py-3">
              <span className={`stencil text-sm ${c.pass ? "text-olive" : "text-rust"}`}>
                {c.pass ? "PASS" : "FLAG"}
              </span>
              <div>
                <div className="font-semibold text-bone">{c.label}</div>
                <div className="text-sm text-ash">{c.note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="stencil text-2xl text-bone">Things to keep in mind</h2>
        <ul className="mt-3 space-y-1 text-sm text-ash">
          {l.redFlags.map((f, i) => <li key={i}>— {f}</li>)}
        </ul>
      </section>

      <TrustpilotSummary slug={l.reviewSlug} />

      <nav className="flex flex-wrap gap-4 border-t border-line pt-6 text-sm">
        <Link href={`/reviews/${l.reviewSlug}`} className="text-rust hover:text-rust2">Full {l.site} review →</Link>
        <Link href="/best-rust-gambling-sites" className="text-ash hover:text-bone">All Rust gambling sites →</Link>
      </nav>

      <p className="text-xs text-ash">
        18+ only. Gambling can be addictive. Rust.Casino may earn commissions from links on this page.
      </p>
    </article>
  );
}

export function legitMetadata(slug: string) {
  const l = getLegitCheck(slug);
  if (!l) return {};
  return {
    title: l.title, description: l.description,
    alternates: { canonical: `/${l.slug}` },
    openGraph: { title: l.title, description: l.description, url: `/${l.slug}` },
  };
}
