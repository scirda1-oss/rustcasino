import Link from "next/link";
import { getLegitCheck, getReview, getTrustpilot, getComparisons } from "@/lib/content";
import { AffiliateLink } from "@/components/AffiliateLink";
import { RatingPlate } from "@/components/RatingPlate";
import { TrustpilotSummary, formatCount } from "@/components/TrustpilotSummary";
import { RelatedLinks, type RelatedLink } from "@/components/RelatedLinks";
import { JsonLd, breadcrumbLd, faqLd } from "@/lib/schema";

export function LegitPage({ slug }: { slug: string }) {
  const l = getLegitCheck(slug);
  if (!l) return null;
  const review = getReview(l.reviewSlug);
  const tp = getTrustpilot(l.reviewSlug);

  // FAQ built only from verified data (legit.json + trustpilot.json).
  const faq: { q: string; a: string }[] = [
    {
      q: `Is ${l.site} legit?`,
      a: `${l.verdict === "legit" ? `Yes — ${l.site} checks out as legitimate on the points that matter.` : `Approach ${l.site} with caution.`} ${l.summary}`,
    },
  ];
  if (tp) {
    faq.push({
      q: `What is ${l.site}'s Trustpilot rating?`,
      a: `${l.site} holds ${tp.rating.toFixed(1)} out of 5 on Trustpilot from ${formatCount(tp.reviews)} reviews (checked January 2026)${tp.sample === "limited" ? " — though that is a limited sample, so treat it as indicative rather than definitive" : ""}.`,
    });
  }
  faq.push({
    q: `Is ${l.site} provably fair?`,
    a: l.provablyFair
      ? `Yes. ${l.site} uses a provably fair system whose outcomes you can independently verify. See our guide on how to verify provably fair.`
      : `We could not confirm a published, verifiable provably fair system for ${l.site}. Treat fairness claims with caution and verify any you can before depositing.`,
  });
  if (l.established && l.established !== "Not disclosed") {
    faq.push({ q: `When was ${l.site} established?`, a: `${l.site} has operated since ${l.established}.` });
  }
  if (l.redFlags.length) {
    faq.push({ q: `What should I watch out for with ${l.site}?`, a: `${l.redFlags.join("; ")}.` });
  }

  const comparison = getComparisons().find((c) => c.a === l.reviewSlug || c.b === l.reviewSlug);
  const related: RelatedLink[] = [
    { href: `/reviews/${l.reviewSlug}`, label: `Full ${l.site} review`, note: "Games, bonuses, payouts and our rating." },
    ...(review?.promoCode
      ? [{ href: `/promo/${l.reviewSlug}`, label: `${l.site} promo code`, note: `Claim with code ${review.promoCode}.` }]
      : []),
    { href: "/rust-gambling-withdrawal-guide", label: "Withdrawals: methods & issues", note: "How payouts work across sites." },
    { href: "/legit", label: "All legit checks", note: "Safety verdicts for every site we rate." },
    { href: "/best-rust-gambling-sites", label: "Best Rust gambling sites", note: "Our full ranked list." },
    ...(comparison ? [{ href: `/compare/${comparison.slug}`, label: comparison.title.replace(/ 2026.*$/, ""), note: "Head-to-head comparison." }] : []),
  ];

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: `Is ${l.site} Legit?`, path: `/${l.slug}` },
      ])} />
      <JsonLd data={faqLd(faq)} />

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

      <section>
        <h2 className="stencil text-2xl text-bone">Is {l.site} legit? FAQ</h2>
        <div className="mt-4 space-y-4">
          {faq.map((f, i) => (
            <div key={i} className="border-b border-line pb-4">
              <h3 className="font-semibold text-bone">{f.q}</h3>
              <p className="mt-1 text-sm text-ash">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedLinks title={`More on ${l.site} & Rust gambling`} links={related} />

      <p className="text-xs text-ash">
        18+ only. Gambling can be addictive. Rust.Casino may earn commissions from links on this page.
        See our <Link href="/responsible-gambling" className="text-olive hover:text-bone">responsible gambling</Link> page.
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
