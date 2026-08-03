import Link from "next/link";
import type { Metadata } from "next";
import { getNews } from "@/lib/content";
import { JsonLd, breadcrumbLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Rust Gambling News",
  description:
    "News and analysis on Rust skin gambling — new sites, promo changes, the skins market and what it means for players.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "Rust Gambling News",
    description:
      "News and analysis on Rust skin gambling — new sites, promo changes, the skins market and what it means for players.",
    url: "/news",
  },
};

export default function NewsIndex() {
  const items = getNews();
  return (
    <div className="space-y-8">
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "News", path: "/news" },
      ])} />
      <header>
        <h1 className="stencil text-4xl text-bone md:text-5xl">Rust Gambling News</h1>
        <p className="mt-4 max-w-2xl text-ash leading-relaxed">
          What&apos;s changing across Rust skin gambling — new sites and promos, the skins
          market, provably fair, and payout policy. We cover the trend and what it means for
          players; we don&apos;t republish other people&apos;s posts.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="rounded-sm border border-line bg-panel p-6 text-ash">
          No articles yet — check back soon.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((n) => (
            <Link
              key={n.slug}
              href={`/news/${n.slug}`}
              className="rounded-sm border border-line bg-panel p-5 transition-colors hover:border-rust"
            >
              <div className="flex items-center gap-2">
                <span className="stencil text-[10px] tracking-widest text-olive">{n.category}</span>
                <span className="font-mono text-xs text-line">{n.published}</span>
              </div>
              <h2 className="stencil mt-2 text-lg text-bone">{n.title}</h2>
              <p className="mt-2 text-sm text-ash">{n.description}</p>
            </Link>
          ))}
        </div>
      )}

      <nav className="flex flex-wrap gap-4 border-t border-line pt-6 text-sm">
        <Link href="/best-rust-gambling-sites" className="text-rust hover:text-rust2">Best Rust gambling sites →</Link>
        <Link href="/blog" className="text-ash hover:text-bone">Guides →</Link>
      </nav>

      <p className="text-xs text-ash">
        18+ only. Gambling can be addictive. Rust.Casino may earn commissions from links in our
        articles. See our{" "}
        <Link href="/responsible-gambling" className="text-olive hover:text-bone">responsible gambling</Link> page.
      </p>
    </div>
  );
}
