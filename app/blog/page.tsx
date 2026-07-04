import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Rust Gambling Guides",
  description: "Guides to Rust skin gambling: how it works, staying safe, and getting the most from bonuses.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getBlogPosts();
  return (
    <div className="space-y-6">
      <h1 className="stencil text-4xl text-bone">Guides</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`}
            className="rounded-sm border border-line bg-panel p-5 hover:border-rust transition-colors">
            <h2 className="stencil text-lg text-bone">{p.title}</h2>
            <p className="mt-2 text-sm text-ash">{p.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
