import type { MetadataRoute } from "next";
import { getReviews, getPromos, getBlogPosts } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const stat = ["", "/best-rust-gambling-sites", "/reviews", "/promo", "/blog",
    "/about", "/responsible-gambling", "/contact", "/privacy"]
    .map((p) => ({ url: `${SITE.domain}${p}`, lastModified: now }));
  const reviews = getReviews().map((r) => ({
    url: `${SITE.domain}/reviews/${r.slug}`, lastModified: new Date(r.updated),
  }));
  const promos = getPromos().map((p) => ({
    url: `${SITE.domain}/promo/${p.slug}`, lastModified: new Date(p.updated),
  }));
  const posts = getBlogPosts().map((p) => ({
    url: `${SITE.domain}/blog/${p.slug}`, lastModified: new Date(p.updated),
  }));
  return [...stat, ...reviews, ...promos, ...posts];
}
