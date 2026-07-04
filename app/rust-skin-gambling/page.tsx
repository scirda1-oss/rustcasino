import Link from "next/link";
import type { Metadata } from "next";
import { getReviews } from "@/lib/content";
import { RatingPlate } from "@/components/RatingPlate";
import { AffiliateLink } from "@/components/AffiliateLink";
import { JsonLd, articleLd, breadcrumbLd, faqLd } from "@/lib/schema";
import { absUrl, SITE } from "@/lib/site";

const faq = [
  { q: "What is Rust skin gambling?",
    a: "Rust skin gambling is betting with Rust in-game skins as currency. You deposit skins on a gambling site, they become site balance or coins, and you wager them on games like case openings, coinflip, crash and roulette. Winnings are withdrawn as skins or, on some sites, crypto and cash." },
  { q: "Is Rust skin gambling legal?",
    a: "It is a legal grey area that depends on your location. Some regions regulate or restrict it, others do not address it directly. All reputable sites are 18+ only. Check your local laws and gamble responsibly." },
  { q: "How do you deposit and withdraw Rust skins?",
    a: "You link your Steam account and trade skins to the site, which converts them to balance. Rust skins have no trade lock, so deposits and withdrawals are instant, unlike CS2 skins which have a 7-day hold." },
  { q: "Is Rust skin gambling safe?",
    a: "The established sites use provably fair systems you can verify, so game outcomes are not manipulated. Risk comes from the gambling itself: the house has an edge and most players lose over time. Only wager skins you can afford to lose." },
];

export const metadata: Metadata = {
  title: "Rust Skin Gambling: How It Works and Where to Play",
  description:
    "What Rust skin gambling is, how depositing and withdrawing skins works, the game types, and whether it is safe and legal. Plus where to play in 2026.",
  alternates: { canonical: absUrl("/rust-skin-gambling") },
  openGraph: { title: "Rust Skin Gambling: How It Works", description: "How Rust skin gambling works and where to play safely in 2026.", url: absUrl("/rust-skin-gambling") },
};

const article = {
  slug: "rust-skin-gambling",
  title: "Rust Skin Gambling: How It Works and Where to Play",
  description: "How Rust skin gambling works and where to play safely in 2026.",
  author: SITE.name, updated: "2026-07-04", published: "2026-07-04", body: "",
};

export default function RustSkinGambling() {
  const top = getReviews().slice(0, 3);
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <JsonLd data={articleLd(article as any)} />
      <JsonLd data={faqLd(faq)} />
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Rust Skin Gambling", path: "/rust-skin-gambling" },
      ])} />

      <header>
        <p className="stencil text-sm text-olive">GUIDE · UPDATED JULY 2026</p>
        <h1 className="stencil mt-2 text-4xl text-bone md:text-5xl">Rust Skin Gambling</h1>
        <p className="mt-4 text-ash leading-relaxed">
          Rust skin gambling lets you bet Rust in-game skins as currency on casino-style games.
          Here is how it works, how deposits and withdrawals happen, the game types, and whether
          it is safe and legal.
        </p>
      </header>

      <section>
        <h2 className="stencil text-2xl text-bone">What Rust skin gambling is</h2>
        <p className="mt-3 text-ash leading-relaxed">
          Rust skins are cosmetic in-game items with real tradeable value on the Steam marketplace.
          Because they can be traded and valued, they work as a currency. On a Rust gambling site you
          deposit skins, they convert to site balance, and you wager that balance on games. Even small
          inventories work, since skins come in many price points.
        </p>
      </section>

      <section>
        <h2 className="stencil text-2xl text-bone">How it works, step by step</h2>
        <ol className="mt-3 space-y-2 text-ash">
          {["Link your Steam account and trade Rust skins to the site",
            "Skins convert to site balance or coins",
            "Wager on games like case openings, coinflip, crash or roulette",
            "Withdraw winnings as skins, or crypto and cash on some sites"].map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-mono text-rust">{String(i + 1).padStart(2, "0")}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-ash leading-relaxed">
          Rust skins have no trade lock, so deposits and withdrawals are instant. This is a key
          advantage over CS2 skins, which carry a 7-day trade hold.
        </p>
      </section>

      <section>
        <h2 className="stencil text-2xl text-bone">Game types</h2>
        <p className="mt-3 text-ash leading-relaxed">The main Rust gambling game modes:</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { href: "/rust-case-opening-sites", label: "Case Opening", note: "Open cases for random skins" },
            { href: "/rust-case-battle-sites", label: "Case Battles", note: "Open against others, winner takes all" },
            { href: "/rust-crash-gambling-sites", label: "Crash", note: "Cash out before the multiplier crashes" },
            { href: "/rust-gambling-wheel-sites", label: "Wheel / Roulette", note: "Bet a segment, includes odds calculator" },
          ].map((g) => (
            <Link key={g.href} href={g.href}
              className="rounded-sm border border-line bg-panel p-4 hover:border-rust transition-colors">
              <span className="stencil text-bone">{g.label}</span>
              <p className="mt-1 text-sm text-ash">{g.note}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="stencil text-2xl text-bone">Is it safe and legal?</h2>
        <p className="mt-3 text-ash leading-relaxed">
          Legality is a grey area that depends on your region, and all reputable sites are 18+ only.
          On safety, the established sites use provably fair systems that let you verify each outcome.
          The real risk is the gambling itself: the house edge means most players lose over time. If
          you want to check a specific site first, see our{" "}
          <Link href="/is-rustclash-legit" className="text-rust hover:text-rust2">is RustClash legit</Link>{" "}
          safety review as an example of how we assess trust.
        </p>
      </section>

      <section>
        <h2 className="stencil text-2xl text-bone">Where to play</h2>
        <p className="mt-3 mb-4 text-ash leading-relaxed">Our top-rated Rust gambling sites right now:</p>
        <div className="divide-y divide-line border-y border-line">
          {top.map((r, i) => (
            <div key={r.slug} className="flex flex-wrap items-center gap-4 py-4">
              <span className="font-mono text-lg text-ash w-8">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex-1 min-w-[10rem]">
                <Link href={`/reviews/${r.slug}`} className="stencil text-lg text-bone hover:text-rust">{r.site}</Link>
                {r.promoCode && <span className="ml-2 font-mono text-xs text-olive">CODE: {r.promoCode}</span>}
              </div>
              <RatingPlate rating={r.rating} />
              <AffiliateLink href={r.url} site={r.site}
                className="stencil rounded-sm border border-rust bg-rust/10 px-4 py-2 text-xs text-rust hover:bg-rust hover:text-base transition-colors">VISIT</AffiliateLink>
            </div>
          ))}
        </div>
        <Link href="/best-rust-gambling-sites"
          className="stencil mt-6 inline-block rounded-sm border border-rust bg-rust/10 px-5 py-3 text-sm text-rust hover:bg-rust hover:text-base transition-colors">
          SEE ALL RUST GAMBLING SITES
        </Link>
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

      <p className="text-xs text-ash">18+ only. Gambling can be addictive. Rust.Casino may earn commissions from links on this page. See our <Link href="/responsible-gambling" className="text-olive hover:text-bone">responsible gambling</Link> page.</p>
    </div>
  );
}
