import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getNews, getNewsItem } from "@/lib/content";
import { AuthorByline } from "@/components/AuthorByline";
import { renderBody } from "@/components/prose";
import { RelatedLinks, type RelatedLink } from "@/components/RelatedLinks";
import { JsonLd, newsArticleLd, breadcrumbLd } from "@/lib/schema";
import { absUrl } from "@/lib/site";

export function generateStaticParams() {
  return getNews().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const n = getNewsItem(slug);
  if (!n) return {};
  return {
    title: n.title,
    description: n.description,
    alternates: { canonical: absUrl(`/news/${n.slug}`) },
    openGraph: {
      type: "article",
      title: n.title,
      description: n.description,
      url: absUrl(`/news/${n.slug}`),
      publishedTime: n.published,
      modifiedTime: n.updated,
    },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNewsItem(slug);
  if (!n) notFound();

  const related: RelatedLink[] = [
    ...getNews()
      .filter((x) => x.slug !== n.slug)
      .slice(0, 3)
      .map((x) => ({ href: `/news/${x.slug}`, label: x.title, note: x.description })),
    { href: "/best-rust-gambling-sites", label: "Best Rust gambling sites", note: "Our full ranked list." },
    { href: "/blog", label: "Guides", note: "How Rust gambling works, safely." },
  ];

  return (
    <article className="mx-auto max-w-2xl space-y-6">
      <JsonLd data={newsArticleLd(n)} />
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "News", path: "/news" },
        { name: n.title, path: `/news/${n.slug}` },
      ])} />

      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="stencil text-[10px] tracking-widest text-olive">{n.category}</span>
          <span className="font-mono text-xs text-line">{n.published}</span>
        </div>
        <h1 className="stencil text-4xl text-bone">{n.title}</h1>
        <p className="text-ash leading-relaxed">{n.description}</p>
        <AuthorByline lastTested={n.updated} published={n.published} />
      </header>

      <div>{renderBody(n.body)}</div>

      {n.sources.length > 0 && (
        <section className="border-t border-line pt-4">
          <p className="stencil text-[10px] tracking-widest text-ash">TREND SIGNAL</p>
          <ul className="mt-2 space-y-1 text-xs text-line">
            {n.sources.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      <RelatedLinks title="More on Rust gambling" links={related} />

      <p className="text-xs text-ash">
        18+ only. Gambling can be addictive. Rust.Casino may earn commissions from links on this page.
        See our <Link href="/responsible-gambling" className="text-olive hover:text-bone">responsible gambling</Link> page.
      </p>
    </article>
  );
}
