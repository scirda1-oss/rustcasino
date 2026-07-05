import Link from "next/link";
import { getReviews, getBlogPosts } from "@/lib/content";
import { OperatorCard } from "@/components/OperatorCard";
import { SITE } from "@/lib/site";

export default function Home() {
  const reviews = getReviews();
  const posts = getBlogPosts().slice(0, 3);
  const top = reviews.slice(0, 5);

  return (
    <div className="space-y-16">
      <section>
        <p className="stencil text-sm text-olive">RUST SKIN GAMBLING — VERIFIED</p>
        <h1 className="stencil mt-2 text-4xl leading-tight text-bone md:text-6xl">
          Which Rust gambling sites<br />actually pay out.
        </h1>
        <p className="mt-4 max-w-2xl text-ash">{SITE.description}</p>
        <Link
          href="/best-rust-gambling-sites"
          className="stencil mt-6 inline-block rounded-sm border border-rust bg-rust/10 px-5 py-3 text-sm text-rust hover:bg-rust hover:text-base transition-colors"
        >
          SEE THE TOP SITES
        </Link>
      </section>

      {top.length > 0 && (
        <section>
          <h2 className="stencil text-2xl text-bone">Top rated right now</h2>
          <div className="mt-6 grid gap-4">
            {top.map((r, i) => (
              <OperatorCard key={r.slug} review={r} rank={i + 1} />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section>
          <h2 className="stencil text-2xl text-bone">Guides</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}
                className="rounded-sm border border-line bg-panel p-4 hover:border-rust transition-colors">
                <h3 className="stencil text-bone">{p.title}</h3>
                <p className="mt-2 text-sm text-ash line-clamp-2">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
