import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "content");

// --- Schemas: build fails loudly on malformed frontmatter (prevents [object Object] bugs) ---

const faqSchema = z.array(z.object({ q: z.string(), a: z.string() })).default([]);

export const reviewSchema = z.object({
  slug: z.string(),
  site: z.string(),
  url: z.string().url(),
  rating: z.number().min(0).max(5),
  updated: z.string(),
  published: z.string(),
  title: z.string(),
  description: z.string(),
  promoCode: z.string().optional(),
  promoBonus: z.string().optional(),
  bonuses: z.array(z.string()).default([]),
  games: z.array(z.string()).default([]),
  deposits: z.array(z.string()).default([]),
  pros: z.array(z.string()).default([]),
  cons: z.array(z.string()).default([]),
  verdict: z.string(),
  related: z.array(z.string()).default([]),
  faq: faqSchema,
});

export const promoSchema = z.object({
  slug: z.string(),
  site: z.string(),
  url: z.string().url(),
  code: z.string(),
  bonus: z.string(),
  updated: z.string(),
  published: z.string(),
  title: z.string(),
  description: z.string(),
  steps: z.array(z.string()).default([]),
  terms: z.array(z.string()).default([]),
  reviewSlug: z.string().optional(),
  faq: faqSchema,
});

export const blogSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  author: z.string().default("Rust.Casino Team"),
  updated: z.string(),
  published: z.string(),
  related: z.array(z.string()).default([]),
});

export type Review = z.output<typeof reviewSchema> & { body: string };
export type Promo = z.output<typeof promoSchema> & { body: string };
export type BlogPost = z.output<typeof blogSchema> & { body: string };

function readCollection<S extends z.ZodTypeAny>(
  dir: string,
  schema: S
): (z.output<S> & { body: string })[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  const files = fs.readdirSync(full).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(full, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/${dir}/${file}:\n${parsed.error.toString()}`
      );
    }
    return { ...(parsed.data as z.output<S>), body: content.trim() };
  });
}

export function getReviews(): Review[] {
  return readCollection("reviews", reviewSchema).sort((a, b) => b.rating - a.rating);
}
export function getPromos(): Promo[] {
  return readCollection("promos", promoSchema);
}
export function getBlogPosts(): BlogPost[] {
  return readCollection("blog", blogSchema).sort(
    (a, b) => +new Date(b.published) - +new Date(a.published)
  );
}
export function getReview(slug: string) {
  return getReviews().find((r) => r.slug === slug);
}
export function getPromo(slug: string) {
  return getPromos().find((p) => p.slug === slug);
}
export function getBlogPost(slug: string) {
  return getBlogPosts().find((p) => p.slug === slug);
}

// --- Game-mode pages (SEO: target low-KD commercial mode terms) ---
import modesData from "@/content/modes.json";

export type GameMode = {
  key: string;
  slug: string;
  h1: string;
  title: string;
  description: string;
  kd: number;
  matchGames: string[];
  intro: string;
  sectionTitle: string;
  sectionBody: string;
};

export function getModes(): GameMode[] {
  return Object.entries(modesData as Record<string, Omit<GameMode, "key">>).map(
    ([key, v]) => ({ key, ...v })
  );
}

export function getMode(slug: string): GameMode | undefined {
  return getModes().find((m) => m.slug === slug);
}

// Reviews whose games match this mode, ranked by rating
export function reviewsForMode(mode: GameMode): Review[] {
  const wants = mode.matchGames.map((g) => g.toLowerCase());
  return getReviews().filter((r) =>
    r.games.some((g) => wants.some((w) => g.toLowerCase().includes(w)))
  );
}

// --- Legit-check pages ---
import legitData from "@/content/legit.json";
import compareData from "@/content/compare.json";

export type LegitCheck = {
  key: string; slug: string; site: string; reviewSlug: string; url: string;
  verdict: string; title: string; description: string; established: string;
  provablyFair: boolean; summary: string;
  checks: { label: string; pass: boolean; note: string }[];
  redFlags: string[];
};
export function getLegitChecks(): LegitCheck[] {
  return Object.entries(legitData as Record<string, Omit<LegitCheck, "key">>)
    .map(([key, v]) => ({ key, ...v }));
}
export function getLegitCheck(slug: string) {
  return getLegitChecks().find((l) => l.slug === slug);
}

export type Comparison = {
  key: string; slug: string; a: string; b: string; title: string; description: string;
  intro: string; winner: string; winnerReason: string;
  rows: { label: string; a: string; b: string }[];
};
export function getComparisons(): Comparison[] {
  return Object.entries(compareData as Record<string, Omit<Comparison, "key">>)
    .map(([key, v]) => ({ key, ...v }));
}
export function getComparison(slug: string) {
  return getComparisons().find((c) => c.slug === slug);
}

// --- Trustpilot community data (sourced Jan 2026; validated so bad data fails the build) ---
import trustpilotData from "@/content/trustpilot.json";

export const trustpilotSchema = z.object({
  rating: z.number().min(0).max(5),
  reviews: z.number().int().nonnegative(),
  sample: z.enum(["robust", "limited"]),
  lastChecked: z.string(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
});
export type Trustpilot = z.output<typeof trustpilotSchema> & { slug: string };

const trustpilotParsed = z.record(trustpilotSchema).parse(trustpilotData);

export function getTrustpilot(slug: string): Trustpilot | undefined {
  const v = trustpilotParsed[slug];
  return v ? { slug, ...v } : undefined;
}

// --- Filtered-list pages (validated so bad data fails the build) ---
import filtersData from "@/content/filters.json";

const filterOperatorSchema = z.object({
  slug: z.string(),
  card: z.boolean().optional(),
  note: z.string().optional(),
  methods: z.string().optional(),
  issues: z.string().optional(),
});
export const filterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  h1: z.string(),
  description: z.string(),
  intro: z.string(),
  layout: z.enum(["cards", "table"]),
  operators: z.array(filterOperatorSchema),
});
export type FilterOperator = z.output<typeof filterOperatorSchema>;
export type Filter = z.output<typeof filterSchema>;

const filtersParsed = z.record(filterSchema).parse(filtersData);

export function getFilters(): Filter[] {
  return Object.values(filtersParsed);
}
export function getFilter(slug: string): Filter | undefined {
  return filtersParsed[slug];
}
