import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPosts, getBlogPost } from "@/lib/content";
import { AuthorByline } from "@/components/AuthorByline";
import { JsonLd, articleLd, breadcrumbLd } from "@/lib/schema";
import { absUrl } from "@/lib/site";

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getBlogPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: absUrl(`/blog/${p.slug}`) },
    openGraph: { type: "article", title: p.title, description: p.description, url: absUrl(`/blog/${p.slug}`) },
  };
}

// Minimal markdown: paragraphs + ## headings. Full MDX can replace this later.
function renderBody(body: string) {
  return body.split(/\n\n+/).map((block, i) => {
    if (block.startsWith("## ")) {
      return <h2 key={i} className="stencil mt-8 text-2xl text-bone">{block.slice(3)}</h2>;
    }
    return <p key={i} className="mt-4 text-ash leading-relaxed">{block}</p>;
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getBlogPost(slug);
  if (!p) notFound();

  return (
    <article className="mx-auto max-w-2xl space-y-6">
      <JsonLd data={articleLd(p)} />
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/blog" },
        { name: p.title, path: `/blog/${p.slug}` },
      ])} />
      <header className="space-y-4">
        <h1 className="stencil text-4xl text-bone">{p.title}</h1>
        <AuthorByline lastTested={p.updated} published={p.published} />
      </header>
      <div>{renderBody(p.body)}</div>
      <nav className="border-t border-line pt-6 text-sm">
        <Link href="/best-rust-gambling-sites" className="text-rust hover:text-rust2">
          See the best Rust gambling sites →
        </Link>
      </nav>
    </article>
  );
}
