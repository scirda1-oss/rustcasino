# Rust.Casino Rebuild — Master Execution Plan

**Stack decision (locked):** Next.js on Cloudflare Pages. Content as MDX in repo. R2 for images only. Worker cron deleted. Bolt cancelled after cutover.

**Goal:** SEO-first Rust gambling affiliate site. Rank for commercial keywords (site reviews, promo codes, "best rust gambling sites"), monetize via operator affiliate/referral programs.

**How to use this doc:** tasks are numbered (e.g. 2.3). Each phase has a Definition of Done. We work top to bottom; reference task numbers in chat ("do 1.4").

---

## Status Tracker

| Phase | Status |
|---|---|
| 0 — Setup & migration prep | Not started |
| 1 — Core build (templates + SEO infra) | Not started |
| 2 — Content foundation | Not started |
| 3 — Launch cutover | Not started |
| 4 — Content engine (ongoing) | Not started |
| 5 — Monetization | Not started |
| 6 — Authority & links | Not started |

---

## Phase 0 — Setup & Migration Prep

Goal: clean foundation, nothing from Bolt carried over except URLs worth 301ing.

| # | Task | Notes | Depends on |
|---|---|---|---|
| 0.1 | Create fresh GitHub repo `rust-casino` | Next.js 15, App Router, TypeScript, Tailwind | — |
| 0.2 | Connect repo to Cloudflare Pages | Preview deploys on PRs; do NOT point domain yet | 0.1 |
| 0.3 | Crawl current Bolt site, export full URL list | Screaming Frog free tier or `wget --spider`; this is the 301 source list | — |
| 0.4 | Build 301 map | Old URL → new URL (or → home if no equivalent). Keep the 2 valid post URLs if possible | 0.3 |
| 0.5 | Inventory salvageable content | The 2 valid posts (rustclash promo, best rust gambling sites) — copy raw text out for rewrite | — |
| 0.6 | Delete Worker cron + topics.json pipeline | Keep R2 bucket for images | — |
| 0.7 | Set up GSC property (domain-level) if not already | Needed for cutover monitoring | — |

**DoD:** empty Next.js site deploys to `*.pages.dev`, 301 map exists as a file in repo, old content pipeline dead.

---

## Phase 1 — Core Build: 6 Templates + SEO Infrastructure

Goal: every page type templated with SEO correct by construction. Reuse timesaver.gg conventions (JSON-LD patterns, internal-linking rules, metadata API usage).

### 1A. Site infrastructure

| # | Task | Notes |
|---|---|---|
| 1.1 | Global layout: header nav, footer | Footer: About, Contact, Responsible Gambling, Privacy, all reviews list |
| 1.2 | Metadata system | `generateMetadata` per route; unique title/description; canonical on every page; OG + Twitter cards |
| 1.3 | `robots.txt` + dynamic `sitemap.xml` | Sitemap generated from content collections at build time |
| 1.4 | Redirects | 301 map from 0.4 wired into `next.config` / `_redirects` |
| 1.5 | Canonical policy | HTTPS, non-www, no trailing slash — enforced once, everywhere |
| 1.6 | MDX content system | `/content/reviews/`, `/content/promos/`, `/content/blog/` with typed frontmatter; build fails on invalid frontmatter (prevents [object Object] class bugs) |
| 1.7 | Image pipeline | R2 + `next/image`, WebP, defined sizes per slot |
| 1.8 | Analytics | Cloudflare Web Analytics (free) + GSC. No GA4 needed at this scale |

### 1B. Page templates

| # | Template | Route | JSON-LD | Key blocks |
|---|---|---|---|---|
| 1.9 | Home | `/` | Organization, WebSite | Top sites table (mini-ratings), latest reviews, latest posts, trust blurb |
| 1.10 | Review | `/reviews/[site]` | Review + Breadcrumb + FAQPage | Rating box, bonus/promo callout, games, deposits/withdrawals, pros/cons, verdict, FAQ, related reviews |
| 1.11 | Promo code | `/promo/[site]` | Breadcrumb + FAQPage | Current code (copy button), bonus terms, how-to-claim steps, screenshot, link to full review, FAQ |
| 1.12 | Best-of list | `/best-rust-gambling-sites` | ItemList + Breadcrumb | Ranked table with ratings + promo codes, per-site summary cards, methodology section, FAQ |
| 1.13 | Blog post | `/blog/[slug]` | Article + Breadcrumb | Author, published + updated dates, TOC, internal links to reviews/promos |
| 1.14 | Static/EEAT | `/about`, `/contact`, `/responsible-gambling`, `/privacy` | Organization on About | Review methodology, 18+ disclaimer, affiliate disclosure |

### 1C. Internal-linking rules (encode in templates, not editorial memory)

- Every review links to: its promo page, best-of list, 2–3 related reviews.
- Every promo page links to: its review, best-of list.
- Every blog post links to: at least 1 review + best-of list contextually.
- Best-of list links to every review and promo page.
- Max crawl depth 3 from home.

**DoD:** all 6 templates render from sample MDX, Lighthouse SEO 100, valid schema in Rich Results Test, sitemap lists all pages, redirects verified with curl.

---

## Phase 2 — Content Foundation (pre-launch minimum)

Goal: enough real content that Google sees a site, not a shell. Written/edited by hand — no auto-publishing.

### Target operator list (initial coverage)

BanditCamp (bandit.camp), RustClash, RustMagic, RustyPot, RustReaper, Howl.gg, RustyLoot — verify each is live and has a referral/affiliate program before writing (task 5.1 feeds this).

| # | Task | Scope |
|---|---|---|
| 2.1 | Money page: Best Rust Gambling Sites | The single most important page. 1,500–2,500 words, ranked table, methodology, FAQ |
| 2.2 | Reviews ×5 | BanditCamp, RustClash, RustMagic, Howl.gg, RustyPot. 1,200–1,800 words each, from actual site testing (deposit flow screenshots where feasible) |
| 2.3 | Promo pages ×5 | One per reviewed site. Short (400–700 words), code + terms + steps |
| 2.4 | Rewrite salvaged posts | RustClash promo content merges into 2.3; best-sites post merges into 2.1 |
| 2.5 | EEAT pages | About (who runs this, methodology), Responsible Gambling (18+, links to help orgs), affiliate disclosure text used site-wide |
| 2.6 | Blog posts ×2 | "How Rust Skin Gambling Works", "Rust Gambling Guide for Beginners" — informational, link into money pages |

**DoD:** 14–15 real pages live on preview: 1 money page, 5 reviews, 5 promos, 2 blog posts, EEAT set.

---

## Phase 3 — Launch Cutover

| # | Task | Notes |
|---|---|---|
| 3.1 | Final pre-flight | Crawl preview with Screaming Frog: zero 404s, unique titles, canonicals correct |
| 3.2 | Point rust.casino DNS to Cloudflare Pages | Low-traffic site, no need for staged rollout |
| 3.3 | Verify 301s on production | curl the full old-URL list |
| 3.4 | GSC: submit sitemap, request indexing on money page + reviews | |
| 3.5 | Cancel Bolt subscription | Only after 3.3 passes |
| 3.6 | Baseline snapshot | GSC coverage report + Ahrefs site audit of new domain for future comparison |

**DoD:** site live on domain, sitemap submitted, zero crawl errors, Bolt cancelled.

---

## Phase 4 — Content Engine (ongoing, post-launch)

Goal: consistent cadence, quality over volume. Daily AI-generated articles is what produced the current dead site — do not return to it.

| # | Task | Cadence |
|---|---|---|
| 4.1 | New review + promo pair | 1–2 per week until all active operators covered |
| 4.2 | Blog post (informational/long-tail) | 1 per week |
| 4.3 | Promo code freshness sweep | Weekly: verify every code still works, update "last updated" date |
| 4.4 | Keyword backlog | Maintain a list in repo (`/docs/keywords.md`): pull from Ahrefs matching terms for "rust gambling", competitor top pages |
| 4.5 | Comparison pages | After 8+ reviews exist: "RustClash vs BanditCamp" style, buyer intent |
| 4.6 | Programmatic long-tail | Only after core ranks: game-mode pages (rust case opening sites, rust roulette sites, rust jackpot sites) from a shared template |

AI-assisted drafting is fine; every page gets human editing, real screenshots, and verified facts before publish. Nothing auto-publishes.

---

## Phase 5 — Monetization

| # | Task | Notes |
|---|---|---|
| 5.1 | Apply/register for each operator's affiliate or referral program | Document terms in `/docs/affiliates.md`: commission model, cookie/attribution, payout method, minimums. Do not write commission numbers into public pages unless verified from the program itself |
| 5.2 | Centralized outbound link component | Single `<AffiliateLink site="...">` component: correct ref params, `rel="sponsored noopener"`, click tracking via CF Web Analytics events |
| 5.3 | Promo code sourcing | Where programs offer custom codes, get branded ones (better tracking + user trust) |
| 5.4 | Disclosure compliance | Visible affiliate disclosure on every money page; 18+ notice site-wide |
| 5.5 | Revenue tracking sheet | Monthly per-operator: clicks out, signups, revenue. Kill/deprioritize operators that don't convert |

---

## Phase 6 — Authority & Links

Start only after Phase 3; scale after content foundation ranks anywhere.

| # | Task | Notes |
|---|---|---|
| 6.1 | Reddit presence | r/playrust and Rust gambling discussion threads — same seeding playbook as the PoE2 campaign, adapted; helpful comments, no spam |
| 6.2 | Gaming forum placements | Reuse the timesaver Upwork link-building workflow; target gaming/gambling-adjacent forums |
| 6.3 | YouTube/Twitch creator partnerships | Rust gambling streamers — promo code placements drive both links and direct signups |
| 6.4 | Expired domain 301s | You already run this workflow for timesaver — evaluate Rust/gambling-adjacent expired domains, but only after site has content worth pointing at |
| 6.5 | Competitor backlink replication | Ahrefs: pull backlink profiles of ranking Rust gambling affiliates, replicate accessible placements |

---

## KPI Checkpoints

| Milestone | Target signal |
|---|---|
| Launch +2 weeks | All pages indexed (GSC coverage), zero errors |
| Launch +4 weeks | Impressions trending up on promo-code queries (lowest competition, fastest to move) |
| Launch +8 weeks | First page-2/page-1 rankings on long-tail; first affiliate signups |
| Launch +12 weeks | Best-of page ranking movement; decide on programmatic expansion (4.6) |

---

## Quick Start — Next 48 Hours

1. 0.1 + 0.2 — repo + Cloudflare Pages connected.
2. 0.3 + 0.4 — crawl Bolt site, build 301 map.
3. 0.5 + 0.6 — extract the 2 posts, kill the Worker cron.
4. 5.1 (start) — register for BanditCamp + RustClash referral programs; terms doc started.
