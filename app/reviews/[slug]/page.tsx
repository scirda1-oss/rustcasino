import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getReviews, getReview } from "@/lib/content";
import { RatingPlate } from "@/components/RatingPlate";
import { PromoTab } from "@/components/PromoTab";
import { AuthorByline } from "@/components/AuthorByline";
import { TrustpilotSummary } from "@/components/TrustpilotSummary";
import { AffiliateLink } from "@/components/AffiliateLink";
import { JsonLd, reviewLd, breadcrumbLd, faqLd } from "@/lib/schema";
import { absUrl } from "@/lib/site";

export function generateStaticParams() {
  return getReviews().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getReview(slug);
  if (!r) return {};
  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: absUrl(`/reviews/${r.slug}`) },
    openGraph: { title: r.title, description: r.description, url: absUrl(`/reviews/${r.slug}`) },
  };
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getReview(slug);
  if (!r) notFound();
  const related = getReviews().filter((x) => r.related.includes(x.slug)).slice(0, 3);
  // Build-time check (pages are statically prerendered): skip gracefully if no screenshot.
  const hasScreenshot = fs.existsSync(path.join(process.cwd(), "public", "screenshots", `${r.slug}.png`));

  return (
    <article className="space-y-10">
      <JsonLd data={reviewLd(r)} />
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Reviews", path: "/reviews" },
        { name: r.site, path: `/reviews/${r.slug}` },
      ])} />
      <JsonLd data={faqLd(r.faq)} />

      <header className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="stencil text-4xl text-bone">{r.site} Review</h1>
          <p className="mt-3 max-w-2xl text-ash">{r.description}</p>
          <AffiliateLink href={r.url} site={r.site}
            className="stencil mt-4 inline-block rounded-sm border border-rust bg-rust/10 px-5 py-3 text-sm text-rust hover:bg-rust hover:text-base transition-colors">
            VISIT {r.site.toUpperCase()}
          </AffiliateLink>
        </div>
        <RatingPlate rating={r.rating} />
      </header>

      <AuthorByline lastTested={r.updated} published={r.published} />

      {hasScreenshot && (
        <img
          src={`/screenshots/${r.slug}.png`}
          alt={`${r.site} screenshot`}
          width={1917}
          height={939}
          className="w-full rounded-sm border border-line"
        />
      )}

      {r.promoCode && (
        <PromoTab code={r.promoCode} bonus={r.promoBonus} />
      )}

      <Section title="Bonuses" items={r.bonuses} />
      <Section title="Games" items={r.games} />
      <Section title="Deposits & withdrawals" items={r.deposits} />

      <div className="grid gap-6 md:grid-cols-2">
        <ProsCons title="Pros" items={r.pros} tone="olive" />
        <ProsCons title="Cons" items={r.cons} tone="rust" />
      </div>

      <section>
        <h2 className="stencil text-2xl text-bone">Verdict</h2>
        <p className="mt-3 text-ash leading-relaxed">{r.verdict}</p>
      </section>

      <TrustpilotSummary slug={r.slug} />

      {r.faq.length > 0 && (
        <section>
          <h2 className="stencil text-2xl text-bone">FAQ</h2>
          <div className="mt-4 space-y-4">
            {r.faq.map((f, i) => (
              <div key={i} className="border-b border-line pb-4">
                <h3 className="font-semibold text-bone">{f.q}</h3>
                <p className="mt-1 text-sm text-ash">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <nav className="flex flex-wrap gap-4 border-t border-line pt-6 text-sm">
        {r.promoCode && (
          <Link href={`/promo/${r.slug}`} className="text-rust hover:text-rust2">
            {r.site} promo code →
          </Link>
        )}
        <Link href="/best-rust-gambling-sites" className="text-ash hover:text-bone">
          All Rust gambling sites →
        </Link>
        <Link href="/how-we-rate" className="text-ash hover:text-bone">
          See how we rate →
        </Link>
      </nav>

      {related.length > 0 && (
        <section>
          <h2 className="stencil text-xl text-bone">Related reviews</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {related.map((x) => (
              <Link key={x.slug} href={`/reviews/${x.slug}`}
                className="rounded-sm border border-line bg-panel p-4 hover:border-rust transition-colors">
                <span className="stencil text-bone">{x.site}</span>
                <span className="ml-2 font-mono text-sm text-olive">{x.rating.toFixed(1)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <section>
      <h2 className="stencil text-2xl text-bone">{title}</h2>
      <ul className="mt-3 space-y-1 text-ash">
        {items.map((it, i) => <li key={i}>— {it}</li>)}
      </ul>
    </section>
  );
}

function ProsCons({ title, items, tone }: { title: string; items: string[]; tone: "olive" | "rust" }) {
  if (!items.length) return null;
  return (
    <div className="rounded-sm border border-line bg-panel p-5">
      <h3 className={`stencil text-lg ${tone === "olive" ? "text-olive" : "text-rust"}`}>{title}</h3>
      <ul className="mt-3 space-y-1 text-sm text-ash">
        {items.map((it, i) => <li key={i}>{tone === "olive" ? "+" : "−"} {it}</li>)}
      </ul>
    </div>
  );
}
