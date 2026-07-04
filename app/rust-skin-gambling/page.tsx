import Link from "next/link";
import type { Metadata } from "next";
import { getReviews } from "@/lib/content";
import { RatingPlate } from "@/components/RatingPlate";
import { AffiliateLink } from "@/components/AffiliateLink";
import { JsonLd, faqLd, breadcrumbLd } from "@/lib/schema";
import { SITE, absUrl } from "@/lib/site";

const TITLE = "Rust Skin Gambling: How It Works & Where to Play";
const DESCRIPTION =
  "What Rust skin gambling is and how it works — deposit skins, convert to balance, play case openings, battles, crash or wheel, then withdraw. Safety, legality and where to play.";

const modes = [
  { slug: "rust-case-opening-sites", label: "Case Opening", blurb: "Open virtual cases for a chance at higher-value skins." },
  { slug: "rust-case-battle-sites", label: "Case Battles", blurb: "Open cases head-to-head; the best pull takes every skin." },
  { slug: "rust-crash-gambling-sites", label: "Crash", blurb: "Cash out before a rising multiplier crashes to zero." },
  { slug: "rust-gambling-wheel-sites", label: "Wheel", blurb: "Bet on a coloured segment; the wheel decides the payout." },
];

const faq = [
  {
    q: "What is Rust skin gambling?",
    a: "Rust skin gambling is wagering Rust in-game cosmetic items (skins) on games of chance. Skins are tradeable through Steam and have real second-hand market value, so sites let you deposit them as currency, play games like case openings or crash, and withdraw skins or your balance if you win. It is 18+ only.",
  },
  {
    q: "How does Rust skins gambling work?",
    a: "You link your Steam trade URL and deposit skins, which the site converts into a site balance at market value. You wager that balance on the site's games, and any winnings can be converted back into Rust skins and traded out via Steam, or withdrawn by the other methods a site supports.",
  },
  {
    q: "Is Rust skin gambling safe?",
    a: "The established sites we cover use provably fair systems that let you verify each outcome was not tampered with. Safety still depends on the operator's payout record, which is why we rate payout reliability first. Only use sites with a track record, and never deposit more than you can afford to lose.",
  },
  {
    q: "Is Rust skin gambling legal?",
    a: "It is a legal grey area that depends entirely on your region — some countries restrict or ban skin gambling while others do not regulate it clearly. It is your responsibility to check the rules where you live. Every site is 18+ only regardless of location.",
  },
  {
    q: "Do Rust skins have a trade lock when gambling?",
    a: "Rust skins have no trade lock, unlike some other Steam games. That means deposits and withdrawals of Rust skins are effectively instant once a trade is accepted, which is a large part of why Rust became a popular skin-gambling economy.",
  },
];

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  author: { "@type": "Organization", name: SITE.name, url: SITE.domain },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.domain },
  datePublished: "2026-07-04",
  dateModified: "2026-07-04",
  mainEntityOfPage: absUrl("/rust-skin-gambling"),
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absUrl("/rust-skin-gambling") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/rust-skin-gambling" },
};

export default function RustSkinGambling() {
  const top = getReviews().slice(0, 3);
  return (
    <div className="space-y-12">
      <JsonLd data={articleLd} />
      <JsonLd data={faqLd(faq)} />
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Rust Skin Gambling", path: "/rust-skin-gambling" },
      ])} />

      <header>
        <p className="stencil text-sm text-olive">UPDATED JULY 2026</p>
        <h1 className="stencil mt-2 text-4xl text-bone md:text-5xl">Rust Skin Gambling</h1>
        <p className="mt-4 max-w-2xl text-ash leading-relaxed">
          Rust skin gambling means wagering Rust cosmetic items — skins — on games of chance.
          Because skins trade freely through Steam and hold real market value, they work as
          currency: you deposit them, play, and withdraw skins if you win. This guide explains
          what it is, how it works, the game types, and whether it is safe and legal. 18+ only.
        </p>
      </header>

      <section>
        <h2 className="stencil text-2xl text-bone">What Rust skin gambling is</h2>
        <p className="mt-3 max-w-2xl text-ash leading-relaxed">
          Rust skins are cosmetic items for weapons, clothing and tools in the game Rust. They are
          tradeable on Steam and have a second-hand market price, which turns them into a form of
          currency. Skin gambling sites accept those skins as deposits and let you bet their value
          on games of chance. Rust skins carry <span className="text-bone">no trade lock</span>, so
          they move between accounts instantly once a trade is accepted — one of the main reasons
          Rust grew into a large skin-gambling economy.
        </p>
      </section>

      <section>
        <h2 className="stencil text-2xl text-bone">How it works</h2>
        <ol className="mt-4 space-y-3 text-ash leading-relaxed">
          <li className="flex gap-3">
            <span className="stencil text-rust">01</span>
            <span><span className="text-bone">Deposit skins.</span> Link your Steam trade URL and send skins to the site. They are converted into a site balance at market value.</span>
          </li>
          <li className="flex gap-3">
            <span className="stencil text-rust">02</span>
            <span><span className="text-bone">Convert to balance.</span> Your deposited skins become a spendable balance (coins or dollars) you can wager across the site's games.</span>
          </li>
          <li className="flex gap-3">
            <span className="stencil text-rust">03</span>
            <span><span className="text-bone">Play.</span> Bet your balance on case openings, case battles, crash, wheel or other modes. Outcomes on reputable sites are provably fair and verifiable.</span>
          </li>
          <li className="flex gap-3">
            <span className="stencil text-rust">04</span>
            <span><span className="text-bone">Withdraw.</span> Convert your balance back into Rust skins and trade them out via Steam, or use the other withdrawal methods a site offers. No trade lock means it is effectively instant.</span>
          </li>
        </ol>
      </section>

      <section>
        <h2 className="stencil text-2xl text-bone">Game types</h2>
        <p className="mt-3 max-w-2xl text-ash leading-relaxed">
          Most Rust gambling sites offer a handful of core game modes. Each has its own strategy and
          risk profile — the dedicated guides below rank the best sites for each.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {modes.map((m) => (
            <Link key={m.slug} href={`/${m.slug}`}
              className="block rounded-sm border border-line bg-panel/40 p-5 transition-colors hover:border-rust">
              <span className="stencil text-lg text-bone">{m.label}</span>
              <p className="mt-1 text-sm text-ash leading-relaxed">{m.blurb}</p>
              <span className="mt-2 inline-block text-xs text-rust">Best {m.label.toLowerCase()} sites →</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="stencil text-2xl text-bone">Is it safe and legal?</h2>
        <p className="mt-3 max-w-2xl text-ash leading-relaxed">
          Skin gambling is a <span className="text-bone">legal grey area that depends on your region</span> —
          some countries restrict or ban it, others do not regulate it clearly, so check the rules
          where you live. Every site is <span className="text-bone">18+ only</span>. On the safety
          side, established sites use <span className="text-bone">provably fair</span> systems that
          let you verify each result was not manipulated. That does not remove risk: an operator's
          payout record matters more than any bonus, which is why we rate payout reliability first.
          For a worked example of how we check a site, see our{" "}
          <Link href="/is-rustclash-legit" className="text-olive hover:text-bone">is RustClash legit</Link>{" "}
          breakdown.
        </p>
      </section>

      <section>
        <h2 className="stencil text-2xl text-bone">Where to play</h2>
        <p className="mt-3 max-w-2xl text-ash leading-relaxed">
          These are the top-rated Rust skin gambling sites right now, scored on payout reliability,
          bonus value and game variety. See the full ranked list on our{" "}
          <Link href="/best-rust-gambling-sites" className="text-olive hover:text-bone">best Rust gambling sites</Link>{" "}
          page.
        </p>
        <div className="mt-5 divide-y divide-line border-y border-line">
          {top.map((r, i) => (
            <div key={r.slug} className="flex flex-wrap items-center gap-4 py-5">
              <span className="font-mono text-xl text-ash w-8">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex-1 min-w-[12rem]">
                <Link href={`/reviews/${r.slug}`} className="stencil text-xl text-bone hover:text-rust">{r.site}</Link>
                <p className="mt-1 text-sm text-ash line-clamp-2">{r.description}</p>
                {r.promoCode && <span className="mt-1 inline-block font-mono text-xs text-olive">CODE: {r.promoCode}</span>}
              </div>
              <RatingPlate rating={r.rating} />
              <AffiliateLink href={r.url} site={r.site}
                className="stencil rounded-sm border border-rust bg-rust/10 px-4 py-2 text-xs text-rust hover:bg-rust hover:text-base transition-colors">VISIT</AffiliateLink>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-rust/40 bg-rust/5 p-6">
        <h2 className="stencil text-2xl text-bone">Ready to start?</h2>
        <p className="mt-2 max-w-2xl text-ash leading-relaxed">
          Compare every site we trust in one ranked list, with verified promo codes and honest
          payout notes.
        </p>
        <Link href="/best-rust-gambling-sites"
          className="stencil mt-4 inline-block rounded-sm border border-rust bg-rust/10 px-5 py-2 text-sm text-rust hover:bg-rust hover:text-base transition-colors">
          See the best Rust gambling sites →
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

      <p className="text-xs text-ash">
        18+ only. Gambling can be addictive. Rust.Casino may earn commissions from links on this page.
        See our <Link href="/responsible-gambling" className="text-olive hover:text-bone">responsible gambling</Link> page.
      </p>
    </div>
  );
}
