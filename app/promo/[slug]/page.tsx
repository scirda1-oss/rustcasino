import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getPromos, getPromo } from "@/lib/content";
import { PromoTab } from "@/components/PromoTab";
import { AffiliateLink } from "@/components/AffiliateLink";
import { JsonLd, breadcrumbLd, faqLd } from "@/lib/schema";
import { absUrl } from "@/lib/site";

export function generateStaticParams() {
  return getPromos().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPromo(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: absUrl(`/promo/${p.slug}`) },
    openGraph: { title: p.title, description: p.description, url: absUrl(`/promo/${p.slug}`) },
  };
}

export default async function PromoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPromo(slug);
  if (!p) notFound();

  return (
    <article className="space-y-8">
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Promo Codes", path: "/promo" },
        { name: p.site, path: `/promo/${p.slug}` },
      ])} />
      <JsonLd data={faqLd(p.faq)} />

      <header>
        <p className="stencil text-xs text-ash">Updated {p.updated}</p>
        <h1 className="stencil mt-1 text-4xl text-bone">{p.site} Promo Code</h1>
        <p className="mt-3 max-w-2xl text-ash">{p.description}</p>
      </header>

      <PromoTab code={p.code} bonus={p.bonus} />

      <AffiliateLink href={p.url} site={p.site}
        className="stencil inline-block rounded-sm border border-rust bg-rust/10 px-5 py-3 text-sm text-rust hover:bg-rust hover:text-base transition-colors">
        CLAIM ON {p.site.toUpperCase()}
      </AffiliateLink>

      {p.steps.length > 0 && (
        <section>
          <h2 className="stencil text-2xl text-bone">How to claim</h2>
          <ol className="mt-3 space-y-2 text-ash">
            {p.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono text-rust">{String(i + 1).padStart(2, "0")}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {p.terms.length > 0 && (
        <section>
          <h2 className="stencil text-2xl text-bone">Terms</h2>
          <ul className="mt-3 space-y-1 text-sm text-ash">
            {p.terms.map((t, i) => <li key={i}>— {t}</li>)}
          </ul>
        </section>
      )}

      {p.faq.length > 0 && (
        <section>
          <h2 className="stencil text-2xl text-bone">FAQ</h2>
          <div className="mt-4 space-y-4">
            {p.faq.map((f, i) => (
              <div key={i} className="border-b border-line pb-4">
                <h3 className="font-semibold text-bone">{f.q}</h3>
                <p className="mt-1 text-sm text-ash">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <nav className="flex flex-wrap gap-4 border-t border-line pt-6 text-sm">
        {p.reviewSlug && (
          <Link href={`/reviews/${p.reviewSlug}`} className="text-rust hover:text-rust2">
            Full {p.site} review →
          </Link>
        )}
        <Link href="/best-rust-gambling-sites" className="text-ash hover:text-bone">
          All Rust gambling sites →
        </Link>
      </nav>
    </article>
  );
}
