# STATE.md — rust.casino

**Single source of truth for this project.** Read this first. It describes what
is actually built (verified against the repo), the hard rules that must not be
broken, affiliate status, and what's next.

Project: **rust.casino** — a Rust skin-gambling affiliate site.
Stack: **Next.js 15.1.6** (App Router, TypeScript, React 19, Tailwind 3.4),
content as **MDX/JSON in-repo** validated with **Zod**, deployed to
**Cloudflare Pages** via the `next-on-pages` adapter. Repo auto-builds on push
to `main` (`scirda1-oss/rustcasino`).

---

## Hard rules (do not break)

1. **No route groups.** `app/(group)/…` folders 404 on Cloudflare's
   `next-on-pages` adapter. The 4 game-mode pages are therefore **plain static
   routes** (`app/rust-case-opening-sites/`, etc.), not a shared
   `app/(modes)/[mode]/` group. Keep it that way. Do not reintroduce route groups.
2. **Zod-validated frontmatter.** All MDX/JSON content is parsed through Zod
   schemas in `lib/content.ts`. Malformed frontmatter **throws at build time**
   (guards against `[object Object]` / silent-bad-data bugs). Add a field to the
   schema before using it in content.
3. **`AffiliateLink` for every outbound operator link.** Use
   `components/AffiliateLink.tsx` — it centralizes `rel="sponsored noopener
   noreferrer"`, `target="_blank"`, and a `data-affiliate` hook for tracking.
   No raw `<a>` to operators.
4. **Differentiated ratings.** Ratings are real and vary (4.0–4.7), never a wall
   of identical 5-stars. Reflect genuine differences between operators.
5. **Verified facts only.** No invented bonuses, codes, licences, or stats.
   If a fact isn't confirmed, don't publish it (see affiliate "Verify" notes).
6. **Build green before push.** `npm run build` must exit 0 before any push /
   deploy. A red build must never reach `main`.
7. **`nodejs_compat` is set** in the Cloudflare Pages project. Already
   configured — do not remove or toggle it.
8. **`rust.casino` DNS is not yet pointed at Pages.** The site runs on the
   `*.pages.dev` URL for now. Do not assume the apex domain is live; don't touch
   DNS until the explicit cutover.
9. **Icon/OG image routes must be static files or edge-runtime.** Dynamic image
   routes fail next-on-pages on Cloudflare ("not configured to run with the Edge
   Runtime"). Do NOT put `icon.png` / `apple-icon.png` / `opengraph-image.png` in
   `app/` (Next turns them into dynamic routes). Keep them in `public/` and
   reference via `metadata.icons` / `metadata.openGraph.images` in
   `app/layout.tsx`. Verify with `npx @cloudflare/next-on-pages@1`, not just
   `next build` — the plain build passes while the CF adapter is what fails.

---

## What's built (verified against the repo)

**Core / money**
- `/` — homepage; top-rated list uses the rich `OperatorCard`
- `/best-rust-gambling-sites` — primary money page; uses the rich
  `OperatorCard`
- `/reviews` and `/promo` indexes also render `OperatorCard` (logo, rating,
  offer, tags, payment icons, promo code, Trustpilot badge, dual CTA) (logo + RatingPlate + offer + game tags + payment icons +
  promo code + dual CTA Claim Bonus / Read Review)
- `/rust-skin-gambling` — informational hub (what it is / how it works / game
  types / safety & legality) funnelling to money page + reviews; Article +
  FAQPage JSON-LD, in header nav

**Trust / E-E-A-T**
- `/how-we-rate` — testing methodology (criteria, how we test, community
  sentiment, why trust us); linked from money page + every review; in nav
- `/authors` — editorial team / editor profile (ProfilePage + Person JSON-LD);
  named byline (`AuthorByline`) on every review + guide; Person author wired
  into Article/Review JSON-LD. NOTE: editor "Marcus Feld" is a placeholder
  persona — replace with a real team member.

**Brand**
- Site logo `public/logos/rust-casino-logo.png` (transparent) in the header;
  favicon `app/icon.png` (tag-mark), `app/apple-icon.png`, and OG/Twitter image
  `app/opengraph-image.png` (Next file conventions auto-wire metadata).

**Components**
- `OperatorCard` (rich card, money + mode pages; all 5 operators use real logos
  in `public/logos/`), `AuthorByline`, `TrustpilotSummary`, payment icons in
  `public/icons/`

**Comparisons** — winners reconciled to the ratings + Trustpilot data:
`banditcamp-vs-rustclash` → RustClash, `banditcamp-vs-rustmagic` → BanditCamp,
`rustclash-vs-rustypot` → RustClash. No winner contradicts its rating.

**Reviews** (`content/reviews/*.mdx`, Zod-validated, sorted by rating)
- `/reviews` index + 5 reviews. Ratings reconciled (Trustpilot + testing +
  track record): RustClash 4.3, RustyLoot 4.3, BanditCamp 3.9, RustMagic 3.6,
  RustyPot 3.6. `getReviews()` sorts by rating, so all lists re-order automatically.

**Trustpilot data** (`content/trustpilot.json`, Zod-validated, sourced Jan 2026)
- Per operator: rating, review count, sample (robust/limited), pros/cons.
- `TrustpilotSummary` on every review + legit page; compact badge on
  `OperatorCard`. `/how-we-rate` explains our score blends testing + Trustpilot
  + track record (so it can differ from Trustpilot alone).

**Promos** (`content/promos/*.mdx`)
- `/promo` index + 5 promo pages (one per operator above)

**Game-mode pages** (static routes, `content/modes.json`, SEO low-KD terms)
- `/rust-case-opening-sites` (KD 6) · `/rust-case-battle-sites` (KD 0)
- `/rust-crash-gambling-sites` (KD 37) · `/rust-gambling-wheel-sites` (KD 47)
- Each pulls matching reviews via `reviewsForMode()`.

**Legit-check pages** (`content/legit.json`)
- `/is-rustclash-legit` (verdict: legit) · `/is-banditcamp-legit` (verdict: legit)

**Comparison pages** (`content/compare.json`)
- `/compare` index + `/compare/banditcamp-vs-rustclash` (winner: BanditCamp)
  · `/compare/rustclash-vs-rustypot` (winner: RustClash)

**Blog / guides** (`content/blog/*.mdx`, in nav as "Guides"; renderer supports
`##`/`###`, bullet lists, `**bold**`, and internal/external links)
- `/blog` index + 3 guides (1500+ words each, Article JSON-LD, byline):
  `how-rust-skin-gambling-works`, `how-to-verify-provably-fair`,
  `rust-gambling-scam-avoidance`

**Static / trust**
- `/about` · `/contact` · `/privacy` · `/responsible-gambling`

**SEO infrastructure**
- `app/sitemap.ts` (`/sitemap.xml`), `app/robots.ts` (`/robots.txt`),
  `app/not-found.tsx`
- **301 map** in `next.config.mjs` (`async redirects()`): renamed/consolidated
  pages (`/methodology`→money, `/promocodes`→`/promo`, `/guides*`→`/blog`),
  old blog slugs, `/reviews/rustchance`→money (no affiliate deal), and
  programmatic pages (`/bitcoin-rust-gambling-sites`,
  `/highest-rakeback-rust-sites`, `/fastest-withdrawal-rust-sites`) →money page
  **until filtered lists ship**.

---

## Affiliate status

Real referral links live in the content files. Commission model is not published
on-page (not needed). See `docs/affiliates.md` for detail.

| Operator | Ref link / code | Status | Note |
|---|---|---|---|
| BanditCamp | `bandit.camp/r/rustcasino` | Live | Confirm payout model in affiliate tab |
| RustClash | `rustclash.com/r/CAS5` (code `CAS5`) | Live | Pays % of referral **winnings**, not deposits — push active players |
| RustMagic | `rustmagic.com/r/rustcasino` | Live | Confirm terms |
| RustyLoot | `rustyloot.gg/r/RUSTCASINO` | Live | Confirm terms |
| RustyPot | `rustypot.com` (code `CASINO`) | ⚠️ Verify | Bare domain, no `/r/` path — **confirm code `CASINO` attributes to your account** |

**Not joined / skipped**
- **RustChance** — high demand but no affiliate deal → review redirected to money
  page; skip until joinable.
- **Howl.gg**, **RustReaper** — high search demand, no link yet; consider joining.

---

## Next priorities

1. ~~**`rust-skin-gambling` hub**~~ — ✅ shipped (`/rust-skin-gambling`,
   informational pillar targeting the head term, funnels to money / mode /
   review pages).
2. **More legit-check pages** — extend beyond RustClash & BanditCamp
   (`is-<operator>-legit`) for the remaining/high-demand operators.
3. **More comparison pages** — additional `X-vs-Y` matchups off the existing
   `compare.json` pattern.
4. **Filtered lists (deferred)** — `bitcoin-`, `highest-rakeback-`,
   `fastest-withdrawal-` rust-sites pages. Currently 301'd to the money page;
   build these out to reclaim those redirects.
5. **Verify RustyPot tracking**, then evaluate joining Howl.gg / RustReaper.

---

## Conventions

- Work is grounded in `docs/rust-casino-rebuild-plan.md` (phased task list) and
  `docs/keywords.md` (target terms / KD).
- Add content by dropping a Zod-valid MDX/JSON entry — pages are generated from
  `lib/content.ts` (`getReviews`, `getPromos`, `getModes`, `getLegitChecks`,
  `getComparisons`, `getBlogPosts`).
- Keep this file current: when you ship a page, join/drop an affiliate, or
  change a hard rule, update STATE.md in the same change.
