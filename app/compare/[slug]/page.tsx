import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getComparisons, getComparison, getReview } from "@/lib/content";
import { AffiliateLink } from "@/components/AffiliateLink";
import { JsonLd, breadcrumbLd } from "@/lib/schema";

export function generateStaticParams() {
  return getComparisons().map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  return {
    title: c.title, description: c.description,
    alternates: { canonical: `/compare/${c.slug}` },
    openGraph: { title: c.title, description: c.description, url: `/compare/${c.slug}` },
  };
}
export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();
  const ra = getReview(c.a), rb = getReview(c.b);
  const winner = c.winner === c.a ? ra : rb;

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Compare", path: "/compare" },
        { name: c.title, path: `/compare/${c.slug}` },
      ])} />
      <header>
        <p className="stencil text-xs text-ash">HEAD TO HEAD · UPDATED JULY 2026</p>
        <h1 className="stencil mt-1 text-4xl text-bone">{ra?.site} vs {rb?.site}</h1>
        <p className="mt-3 text-ash leading-relaxed">{c.intro}</p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="stencil py-2 text-xs text-ash"></th>
              <th className="stencil py-2 text-xs text-bone">{ra?.site}</th>
              <th className="stencil py-2 text-xs text-bone">{rb?.site}</th>
            </tr>
          </thead>
          <tbody>
            {c.rows.map((row, i) => (
              <tr key={i} className="border-b border-line/50">
                <td className="py-3 pr-4 text-ash">{row.label}</td>
                <td className="py-3 pr-4 text-bone">{row.a}</td>
                <td className="py-3 text-bone">{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="rounded-sm border border-rust/40 bg-rust/5 p-5">
        <h2 className="stencil text-xl text-rust">Winner: {winner?.site}</h2>
        <p className="mt-2 text-ash leading-relaxed">{c.winnerReason}</p>
        {winner && (
          <AffiliateLink href={winner.url} site={winner.site}
            className="stencil mt-4 inline-block rounded-sm border border-rust bg-rust/10 px-4 py-2 text-xs text-rust hover:bg-rust hover:text-base transition-colors">
            VISIT {winner.site.toUpperCase()}
          </AffiliateLink>
        )}
      </section>

      <nav className="flex flex-wrap gap-4 border-t border-line pt-6 text-sm">
        {ra && <Link href={`/reviews/${ra.slug}`} className="text-rust hover:text-rust2">{ra.site} review →</Link>}
        {rb && <Link href={`/reviews/${rb.slug}`} className="text-rust hover:text-rust2">{rb.site} review →</Link>}
        <Link href="/best-rust-gambling-sites" className="text-ash hover:text-bone">All sites →</Link>
      </nav>
      <p className="text-xs text-ash">18+ only. Gambling can be addictive. Rust.Casino may earn commissions from links on this page.</p>
    </article>
  );
}
