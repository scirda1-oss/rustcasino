#!/usr/bin/env node
/**
 * Rust.Casino news agent.
 *
 *  1. Trendwatcher  — pulls recent post titles from Rust subreddits via an
 *                     Apify Reddit actor. We only read TITLES as a trend
 *                     *signal* (what players are talking about) — we never
 *                     republish Reddit post bodies or comments.
 *  2. Content writer — asks Claude to write ONE original, evergreen-safe
 *                     article about the strongest trend, constrained to
 *                     verified facts and our markdown-lite format.
 *
 * The script only WRITES a file. It does not commit. The GitHub Actions
 * workflow runs `next build` afterwards and commits only if the build passes,
 * so malformed frontmatter or a broken article can never reach production.
 *
 * Env:
 *   ANTHROPIC_API_KEY  (required)
 *   APIFY_TOKEN        (optional — without it we fall back to evergreen angles)
 *   APIFY_ACTOR        (default: trudax~reddit-scraper-lite)
 *   NEWS_SUBREDDITS    (default: playrust,RustConsole) comma-separated
 *   NEWS_MODEL         (default: claude-opus-5)
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const NEWS_DIR = path.join(ROOT, "content", "news");

const {
  ANTHROPIC_API_KEY,
  APIFY_TOKEN,
  APIFY_ACTOR = "trudax~reddit-scraper-lite",
  NEWS_SUBREDDITS = "playrust,RustConsole",
  NEWS_MODEL = "claude-opus-5",
} = process.env;

if (!ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY is required.");
  process.exit(1);
}

const log = (...a) => console.log("[news-agent]", ...a);

// --- helpers ---------------------------------------------------------------

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function existingSlugs() {
  if (!fs.existsSync(NEWS_DIR)) return [];
  return fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

function existingTitles() {
  if (!fs.existsSync(NEWS_DIR)) return [];
  return fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => fs.readFileSync(path.join(NEWS_DIR, f), "utf8"))
    .map((raw) => (raw.match(/^title:\s*"?(.+?)"?\s*$/m) || [])[1] || "")
    .filter(Boolean);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

// --- 1. trendwatcher -------------------------------------------------------

async function fetchTrendTitles() {
  const subs = NEWS_SUBREDDITS.split(",").map((s) => s.trim()).filter(Boolean);
  if (!APIFY_TOKEN) {
    log("No APIFY_TOKEN — skipping Reddit trendwatch, using evergreen angles.");
    return { titles: [], subs };
  }
  const startUrls = subs.map((s) => ({
    url: `https://www.reddit.com/r/${s}/top/?t=week`,
  }));
  const input = {
    startUrls,
    skipComments: true,
    skipUserPosts: false,
    maxItems: 40,
    maxPostCount: 40,
    proxy: { useApifyProxy: true },
  };
  const url = `https://api.apify.com/v2/acts/${APIFY_ACTOR}/run-sync-get-dataset-items?token=${APIFY_TOKEN}&timeout=120`;
  try {
    log(`Running Apify actor ${APIFY_ACTOR} over r/${subs.join(", r/")} ...`);
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) {
      log(`Apify returned HTTP ${res.status} — falling back to evergreen angles.`);
      return { titles: [], subs };
    }
    const items = await res.json();
    const titles = (Array.isArray(items) ? items : [])
      .map((it) => it?.title || it?.postTitle || it?.text || "")
      .map((t) => String(t).trim())
      .filter((t) => t.length > 8 && t.length < 300);
    log(`Trendwatch collected ${titles.length} post titles.`);
    return { titles: titles.slice(0, 40), subs };
  } catch (err) {
    log("Apify request failed:", err?.message || err, "— using evergreen angles.");
    return { titles: [], subs };
  }
}

// --- 2. content writer -----------------------------------------------------

const SYSTEM = `You are the staff writer for Rust.Casino, an independent affiliate site reviewing Rust (the video game) skin-gambling sites. You write short, credible news/analysis articles for players.

HARD RULES — a violation makes the article unusable:
- Write 100% ORIGINAL prose. Never copy, quote, or closely paraphrase Reddit posts, comments, or any source. The Reddit titles you are given are ONLY a signal of what players currently care about — a topic seed, nothing more.
- Invent NOTHING presented as fact: no fabricated statistics, dates, dollar amounts, quotes, partnerships, outages, or "breaking" events. If you don't know a specific fact, write about the trend and its implications in general, evergreen terms.
- Stay factually safe about the wider ecosystem. You may rely on well-established, durable facts (e.g. Rust skins trade on the Steam Community Market; most Rust skins have no multi-day trade hold; provably fair lets a player verify a result was not altered; rakeback returns a share of the house edge over time).
- Always frame responsibly: 18+, gambling can be addictive.
- Do NOT name or rank specific operators with claims you cannot support. You may reference our own pages by relative link.

FORMAT — the site uses a minimal renderer, so use ONLY:
- Blank line between every block.
- "## Heading" and "### Subheading" for headings.
- "- item" lines for bullet lists (a block that is entirely bullet lines).
- "**bold**" for emphasis.
- "[text](/relative-path)" for internal links and "[text](https://...)" for external links.
Do not use tables, images, code fences, blockquotes, or numbered lists.

Useful internal links you may use where relevant:
- /best-rust-gambling-sites (our ranked list)
- /reviews (all site reviews)
- /blog/how-to-verify-provably-fair (verifying provably fair)
- /blog/how-rust-skin-gambling-works (how it works)
- /rust-gambling-withdrawal-guide (withdrawals)
- /responsible-gambling (support)

Aim for 500–800 words. Open with the trend and why it matters; close with practical takeaways for players.`;

function buildUserPrompt(titles, subs) {
  const signal = titles.length
    ? `Recent post titles from r/${subs.join(", r/")} (trend signal only — do not reuse wording):\n${titles.map((t) => `- ${t}`).join("\n")}`
    : `No live Reddit signal available. Pick a durable, evergreen Rust skin-gambling angle that helps players (e.g. reading withdrawal terms, spotting unfair skin conversion rates, why rakeback beats a welcome bonus, verifying provably fair).`;

  return `${signal}

Choose the SINGLE strongest, most useful topic for a Rust gambling audience. Then write the article.

Respond with ONLY a JSON object (no markdown, no code fence) of exactly this shape:
{
  "title": "Headline — specific and clickable, no clickbait, <= 70 chars",
  "description": "One-sentence meta description, 110-155 chars",
  "category": "One of: Analysis, Skins, Sites, Promos, Market, Safety",
  "body": "The full article in the markdown-lite format described. Use \\n for newlines."
}`;
}

function extractJson(text) {
  // Tolerate stray prose or a code fence around the JSON.
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object in model output.");
  return JSON.parse(raw.slice(start, end + 1));
}

async function writeArticle(titles, subs) {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

  log(`Drafting article with ${NEWS_MODEL} ...`);
  const stream = client.messages.stream({
    model: NEWS_MODEL,
    max_tokens: 8000,
    system: SYSTEM,
    messages: [{ role: "user", content: buildUserPrompt(titles, subs) }],
  });
  const msg = await stream.finalMessage();
  const text = msg.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");
  return extractJson(text);
}

// --- frontmatter + file ----------------------------------------------------

function yamlString(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function toMdx(article, subs) {
  const date = today();
  const cat = ["Analysis", "Skins", "Sites", "Promos", "Market", "Safety"].includes(article.category)
    ? article.category
    : "Analysis";
  const signal = subs.length ? `Trend signal: r/${subs.join(", r/")} (weekly).` : "Editorial angle.";
  const fm = [
    "---",
    `slug: ${article.slug}`,
    `title: ${yamlString(article.title)}`,
    `description: ${yamlString(article.description)}`,
    `category: ${yamlString(cat)}`,
    `author: "Rust.Casino Team"`,
    `published: "${date}"`,
    `updated: "${date}"`,
    `sources:`,
    `  - ${yamlString(signal)}`,
    "---",
    "",
  ].join("\n");
  return fm + article.body.trim() + "\n";
}

// --- main ------------------------------------------------------------------

async function main() {
  fs.mkdirSync(NEWS_DIR, { recursive: true });

  const { titles, subs } = await fetchTrendTitles();
  const article = await writeArticle(titles, subs);

  if (!article.title || !article.body || !article.description) {
    console.error("Model output missing required fields:", article);
    process.exit(1);
  }

  let slug = slugify(article.title);
  const taken = existingSlugs();
  const titles_ = existingTitles().map((t) => t.toLowerCase().trim());
  if (titles_.includes(String(article.title).toLowerCase().trim())) {
    log(`An article titled "${article.title}" already exists — skipping (no dupes).`);
    return;
  }
  if (taken.includes(slug)) {
    log(`Slug ${slug} exists — appending date suffix.`);
    slug = `${slug}-${today()}`.slice(0, 80);
  }
  article.slug = slug;

  const outPath = path.join(NEWS_DIR, `${slug}.mdx`);
  fs.writeFileSync(outPath, toMdx(article, subs), "utf8");
  log(`Wrote ${path.relative(ROOT, outPath)} — "${article.title}"`);
  log("Done. The workflow will validate with `next build` before committing.");
}

main().catch((err) => {
  console.error("[news-agent] fatal:", err?.stack || err);
  process.exit(1);
});
