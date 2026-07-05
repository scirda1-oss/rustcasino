import Link from "next/link";
import { getFilter, getReview } from "@/lib/content";
import { OperatorCard } from "@/components/OperatorCard";
import { JsonLd, itemListLd, breadcrumbLd, authorLd } from "@/lib/schema";
import { SITE, absUrl } from "@/lib/site";

export function FilterPage({ slug }: { slug: string }) {
  const f = getFilter(slug);
  if (!f) return null;

  const cardOps = f.operators.filter((o) => o.card !== false);
  const cardReviews = cardOps.map((o) => getReview(o.slug)).filter(Boolean);
  const noteOps = f.operators.filter((o) => o.card === false);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: f.h1,
    description: f.description,
    author: authorLd(),
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.domain },
    mainEntityOfPage: absUrl(`/${f.slug}`),
  };

  return (
    <div className="space-y-10">
      <JsonLd data={articleLd} />
      {cardReviews.length > 0 && <JsonLd data={itemListLd(cardReviews as never)} />}
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: f.h1, path: `/${f.slug}` },
      ])} />

      <header>
        <p className="stencil text-sm text-olive">UPDATED JULY 2026</p>
        <h1 className="stencil mt-2 text-4xl text-bone md:text-5xl">{f.h1}</h1>
        <p className="mt-4 max-w-2xl text-ash leading-relaxed">{f.intro}</p>
      </header>

      <p className="rounded-sm border border-olive/40 bg-olive/5 p-3 text-xs text-ash">
        <span className="stencil mr-1 text-olive">Note</span>
        Verify current terms before depositing — operators change fees, bonuses and payment methods without notice.
      </p>

      {f.layout === "table" ? (
        <section className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="stencil py-2 pr-4 text-xs text-ash">Site</th>
                <th className="stencil py-2 pr-4 text-xs text-bone">Withdrawal methods</th>
                <th className="stencil py-2 pr-4 text-xs text-bone">Known issues</th>
                <th className="stencil py-2 text-xs text-ash">More</th>
              </tr>
            </thead>
            <tbody>
              {f.operators.map((o) => {
                const r = getReview(o.slug);
                if (!r) return null;
                return (
                  <tr key={o.slug} className="border-b border-line/50 align-top">
                    <td className="py-3 pr-4">
                      <Link href={`/reviews/${o.slug}`} className="stencil text-bone hover:text-rust">{r.site}</Link>
                      <div className="mt-1 font-mono text-xs text-olive">{r.rating.toFixed(1)} / 5</div>
                    </td>
                    <td className="py-3 pr-4 text-bone">{o.methods}</td>
                    <td className="py-3 pr-4 text-ash">{o.issues}</td>
                    <td className="py-3 text-xs">
                      <Link href={`/reviews/${o.slug}`} className="block text-rust hover:text-rust2">Review →</Link>
                      <Link href={`/is-${o.slug}-legit`} className="block text-ash hover:text-bone">Legit check →</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <div className="space-y-5">
          {cardOps.map((o, i) => {
            const r = getReview(o.slug);
            if (!r) return null;
            return (
              <div key={o.slug} className="space-y-2">
                {o.note && (
                  <p className="text-sm text-bone">
                    <span className="stencil mr-2 text-[10px] tracking-widest text-olive">WHY</span>
                    {o.note}
                  </p>
                )}
                <OperatorCard review={r} rank={i + 1} />
              </div>
            );
          })}
        </div>
      )}

      {noteOps.length > 0 && (
        <section>
          <h2 className="stencil text-2xl text-bone">Limited or no support</h2>
          <ul className="mt-4 space-y-3">
            {noteOps.map((o) => {
              const r = getReview(o.slug);
              return (
                <li key={o.slug} className="rounded-sm border border-line bg-panel p-4 text-sm">
                  <Link href={`/reviews/${o.slug}`} className="stencil text-bone hover:text-rust">{r?.site ?? o.slug}</Link>
                  <span className="ml-2 text-ash">— {o.note}</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <nav className="flex flex-wrap gap-4 border-t border-line pt-6 text-sm">
        <Link href="/best-rust-gambling-sites" className="text-rust hover:text-rust2">All Rust gambling sites →</Link>
        <Link href="/reviews" className="text-ash hover:text-bone">Reviews →</Link>
        <Link href="/how-we-rate" className="text-ash hover:text-bone">How we rate →</Link>
      </nav>

      <p className="text-xs text-ash">
        18+ only. Gambling can be addictive. Rust.Casino may earn commissions from links on this page.
        See our <Link href="/responsible-gambling" className="text-olive hover:text-bone">responsible gambling</Link> page.
      </p>
    </div>
  );
}

export function filterMetadata(slug: string) {
  const f = getFilter(slug);
  if (!f) return {};
  return {
    title: f.title,
    description: f.description,
    alternates: { canonical: absUrl(`/${f.slug}`) },
    openGraph: { title: f.title, description: f.description, url: `/${f.slug}` },
  };
}
