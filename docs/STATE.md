# rust.casino — Current State & Next Actions
# Read this first. Single source of truth for what's done and what's next.
# Last updated: 2026-07-04

## What this is
SEO-first Rust gambling affiliate site. Next.js 15, Cloudflare Pages, pushes to
scirda1-oss/rustcasino (auto-builds). Monetized via operator affiliate/referral links.
Live at rustcasino-13i.pages.dev. Domain rust.casino NOT yet pointed at Pages.

## The strategy (from real Ahrefs data — do not re-research)
- Niche is SMALL + high-intent: ~5-6K global searches/mo total across all terms.
- WIN: commercial terms + low-KD game modes + buyer-intent pages (legit/compare/filtered).
- DO NOT BUILD: how-to/strategy/"how to win" guides — Ahrefs confirmed 0-10 vol. Dead.
- Target GLOBAL volume, not US-only (global is 2-3x).
- Quality over volume: ~15-20 strong pages beat 100 thin ones. NOT a daily-article play.

## Hard technical rules
- NO route groups with root catch-all (app/(modes)/[mode]) — they 404 on Cloudflare's
  next-on-pages adapter. Use plain static routes (app/rust-case-opening-sites/ etc.).
- Content frontmatter is Zod-validated in lib/content.ts — build fails on bad data (this
  is intentional; it prevents the [object Object] bug the old site had).
- Every affiliate link uses <AffiliateLink> (rel="sponsored", tracking).
- Ratings must be DIFFERENTIATED (4.0-4.7), never bunched — the "we test" claim depends on it.
- No invented commission numbers, payout speeds, or operator claims. Verified facts only.
- Run `npm run build` GREEN before every push. nodejs_compat already set in Cloudflare.

## What's BUILT and live
- Home, About, Contact, Privacy, Responsible Gambling
- Money page: /best-rust-gambling-sites (methodology, FAQ, ItemList+FAQ schema)
- 5 reviews: banditcamp, rustclash, rustmagic, rustyloot, rustypot (real ref links)
- 5 promo pages (real codes: rustcasino, CAS5, RUSTCASINO, CASINO)
- 4 game-mode pages: /rust-case-opening-sites (KD6), /rust-case-battle-sites (KD0),
  /rust-crash-gambling-sites (KD37), /rust-gambling-wheel-sites (KD47 + odds calculator)
- 2 legit pages: /is-rustclash-legit, /is-banditcamp-legit
- 2 comparisons: /compare/banditcamp-vs-rustclash, /compare/rustclash-vs-rustypot + index
- Full 301 map (next.config.mjs) for all old Bolt URLs
- sitemap.xml, robots.txt, per-page canonicals + JSON-LD

## Affiliate status (docs/affiliates.md)
- BanditCamp, RustClash, RustMagic, RustyLoot, RustyPot: ref links live, all tracking confirmed
- RustChance: NO affiliate deal — do not feature; /reviews/rustchance 301s to money page

## NEXT (priority order)
1. rust skin gambling hub — /rust-skin-gambling, target "rust skin gambling"/"rust skins
   gambling" (300/850 global vol, KD 30-40). Only informational term with real demand.
   Explainer + funnels to money page + reviews.
2. More legit pages (trivial — add to content/legit.json): is-banditcamp already done;
   add rustmagic, rustyloot, rustypot. Each is high buyer intent.
3. More comparisons (content/compare.json): banditcamp-vs-rustmagic, etc.

## DEFERRED — needs Mark's verified data, do not invent
- Filtered lists: /highest-rakeback-rust-sites, /fastest-withdrawal-rust-sites,
  /bitcoin-rust-gambling-sites. Currently 301'd to money page. Need per-operator specifics
  (which sites actually have fastest withdrawal / highest rakeback / bitcoin) before building.

## HOLD
- Do NOT point rust.casino DNS at Pages until content + 301 map verified live. Then it's a
  Cloudflare Pages custom-domain step + GSC sitemap submission (Phase 3 in rebuild plan).
