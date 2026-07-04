# rustcasino

SEO-first Rust gambling affiliate site. Next.js 15 (App Router) on Cloudflare Pages.

## Stack
- Next.js 15, React 19, TypeScript, Tailwind
- Content as MDX in `/content` with Zod-validated frontmatter (build fails on bad data)
- JSON-LD schema per template, dynamic sitemap + robots
- Images: Cloudflare R2 (later)

## Structure
- `app/` — routes + templates (home, reviews, promo, blog, best-of, EEAT, sitemap, robots)
- `components/` — Header/Footer, RatingPlate, PromoTab, AffiliateLink
- `lib/` — content loader (`content.ts`), schema builders (`schema.tsx`), site config
- `content/reviews|promos|blog` — MDX content
- `docs/` — execution plan, keyword backlog, affiliate tracking

## Content
Add a review: create `content/reviews/<slug>.mdx` with required frontmatter
(see existing files). Same for `promos/` and `blog/`. Invalid frontmatter fails the build.

## Deploy
Auto-deploys on push to `main` via Cloudflare Pages. Framework preset: Next.js.

See `docs/rust-casino-rebuild-plan.md` for the full plan.
