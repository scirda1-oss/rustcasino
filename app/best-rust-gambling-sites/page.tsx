import Link from "next/link";
import type { Metadata } from "next";
import { getReviews } from "@/lib/content";
import { OperatorCard } from "@/components/OperatorCard";
import { JsonLd, itemListLd, breadcrumbLd, faqLd } from "@/lib/schema";
import { absUrl } from "@/lib/site";

const faq = [
  {
    q: "What are the best Rust gambling sites in 2026?",
    a: "BanditCamp leads for most players thanks to the biggest pots and most active community, followed by RustClash for game variety and its free-to-play daily case. RustMagic, RustyLoot and RustyPot round out the list depending on whether you want payment flexibility, a sleek interface or low-minimum coinflip.",
  },
  {
    q: "How do we rate Rust gambling sites?",
    a: "We weight payout reliability first, then bonus value, game variety, deposit and withdrawal options, and community activity. Ratings are spread to reflect real differences between sites rather than clustered at the top.",
  },
  {
    q: "Are Rust gambling sites legit?",
    a: "The established sites here use provably fair systems that let you verify outcomes. Skin gambling is a legal grey area that depends on your location, and all sites are 18+ only. Gamble responsibly and only wager what you can afford to lose.",
  },
  {
    q: "Do I need to deposit to start?",
    a: "Not always. RustClash offers a daily free case with no deposit after KYC, and most sites give a small sign-up balance or free cases via promo code. You can test a site before wagering your own skins.",
  },
  {
    q: "How do withdrawals work on Rust gambling sites?",
    a: "Most sites let you convert your balance to Rust skins and trade them out via Steam, or withdraw via crypto and other methods depending on the site. Rust skins have no trade lock, so deposits and withdrawals are instant.",
  },
];

export const metadata: Metadata = {
  title: "Best Rust Gambling Sites 2026",
  description:
    "The best Rust skin gambling sites in 2026, ranked by payout reliability, bonuses and games. Verified promo codes for BanditCamp, RustClash and more.",
  alternates: { canonical: absUrl("/best-rust-gambling-sites") },
};

export default function BestSites() {
  const reviews = getReviews();
  return (
    <div className="space-y-12">
      <JsonLd data={itemListLd(reviews)} />
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Best Rust Gambling Sites", path: "/best-rust-gambling-sites" },
      ])} />
      <JsonLd data={faqLd(faq)} />

      <header>
        <p className="stencil text-sm text-olive">UPDATED JULY 2026</p>
        <h1 className="stencil mt-2 text-4xl text-bone md:text-5xl">Best Rust Gambling Sites</h1>
        <p className="mt-4 max-w-2xl text-ash leading-relaxed">
          These are the Rust skin gambling sites worth your time in 2026. Each is rated on payout
          reliability, bonus value, game selection and withdrawal speed. Promo codes are verified and
          updated. All sites are 18+ only.
        </p>
      </header>

      <div className="grid gap-4">
        {reviews.map((r, i) => (
          <OperatorCard key={r.slug} review={r} rank={i + 1} />
        ))}
      </div>

      <section>
        <h2 className="stencil text-2xl text-bone">How we rate Rust gambling sites</h2>
        <p className="mt-3 text-ash leading-relaxed">
          Ratings are led by payout reliability: a site that will not pay out fails regardless of how
          good its bonuses look. After that we weigh bonus value, game variety, deposit and withdrawal
          options, and how active the community is. We spread ratings to reflect real differences
          between sites rather than bunching everything near the top, so a higher score means a
          genuinely stronger site, not a bigger affiliate deal.
        </p>
        <Link href="/how-we-rate" className="mt-3 inline-block text-sm text-rust hover:text-rust2">
          See how we rate →
        </Link>
      </section>

      <section>
        <h2 className="stencil text-2xl text-bone">What to look for in a Rust gambling site</h2>
        <p className="mt-3 text-ash leading-relaxed">
          The best Rust sites share a few traits: a provably fair system you can verify, fast skin
          deposits and withdrawals with no trade lock, a game selection that goes beyond basic case
          opening, and a genuine free-to-play path so you can test before risking your own skins.
          BanditCamp and RustClash both check these boxes; the rest of the list trades scale for
          specific strengths like payment flexibility or low minimums.
        </p>
      </section>

      <section>
        <h2 className="stencil text-2xl text-bone">FAQ</h2>
        <div className="mt-4 space-y-4">
          {faq.map((f, i) => (
            <div key={i} className="border-b border-line pb-4">
              <h3 className="font-semibold text-bone">{f.q}</h3>
              <p className="mt-1 text-sm text-ash">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs text-ash">
        18+ only. Gambling can be addictive. Rust.Casino may earn commissions from links on this page.
        See our <Link href="/responsible-gambling" className="text-olive hover:text-bone">responsible gambling</Link> page.
      </p>
    </div>
  );
}
