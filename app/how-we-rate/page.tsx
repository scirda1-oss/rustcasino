import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd, breadcrumbLd } from "@/lib/schema";
import { absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "How We Rate Rust Gambling Sites",
  description:
    "Our testing methodology for Rust gambling sites: how we verify provably fair systems, time real withdrawals, weigh bonuses and factor in community reputation.",
  alternates: { canonical: absUrl("/how-we-rate") },
};

const criteria = [
  {
    h: "Provably fair verification",
    p: "Our first check is whether a site publishes a provably fair system and whether it actually verifies. We run the server seed, client seed and nonce through the site's verifier to confirm a result was not changed after the fact. A site that cannot be verified does not earn a top rating.",
  },
  {
    h: "Withdrawal reliability and speed",
    p: "Payouts matter more than bonuses. We make real deposits, play, and then withdraw, timing how long it takes and noting any friction, fees or held funds. Reliable, fast, low-friction withdrawals score highest; withheld or slow payouts pull a rating down hard.",
  },
  {
    h: "Game variety",
    p: "We look at how much a site offers beyond basic case opening — case battles, crash, wheel, coinflip, upgrader and more — and how well those modes are implemented. Broader, well-built game sets rate higher than a single-mode site.",
  },
  {
    h: "Bonus transparency",
    p: "We weigh the real value of sign-up offers, promo codes and ongoing rewards, and whether their terms are clear. A transparent, genuinely useful bonus beats a headline number buried in wagering conditions.",
  },
  {
    h: "Community reputation",
    p: "A site's standing among actual Rust players is part of the score. We factor in how it is regarded by the community and its track record over time, not just how it markets itself.",
  },
];

const tests = [
  { h: "Real deposits", p: "We deposit our own skins or funds rather than rely on a demo, so we see the genuine deposit flow, conversion rates and any surprises." },
  { h: "Withdrawal timing", p: "We withdraw after playing and record how long payouts take and whether anything is held, gated behind extra KYC, or charged a fee." },
  { h: "Provably fair checks", p: "We take a real game result and run it through the site's own verifier using the server seed, client seed and nonce to confirm the outcome was not tampered with." },
];

export default function HowWeRate() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "How We Rate", path: "/how-we-rate" },
      ])} />

      <header>
        <p className="stencil text-sm text-olive">METHODOLOGY · UPDATED JULY 2026</p>
        <h1 className="stencil mt-2 text-4xl text-bone md:text-5xl">How We Rate Rust Gambling Sites</h1>
        <p className="mt-4 text-ash leading-relaxed">
          Every rating on Rust.Casino comes from hands-on testing, not affiliate deals. Here is exactly
          what we check, how we test it, and why our scores are spread to reflect real differences
          between sites rather than clustered near the top. Ratings run 4.0–4.7 today because the sites
          genuinely differ; a higher score means a genuinely stronger site.
        </p>
      </header>

      <section>
        <h2 className="stencil text-2xl text-bone">Our criteria</h2>
        <p className="mt-3 text-ash leading-relaxed">
          Payout reliability leads: a site that will not pay out fails regardless of how good its
          bonuses look. After that we weigh the following, in roughly this order of importance.
        </p>
        <div className="mt-5 space-y-4">
          {criteria.map((c) => (
            <div key={c.h} className="rounded-sm border border-line bg-panel p-5">
              <h3 className="stencil text-lg text-bone">{c.h}</h3>
              <p className="mt-2 text-sm text-ash leading-relaxed">{c.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="stencil text-2xl text-bone">How we test</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {tests.map((t) => (
            <div key={t.h} className="rounded-sm border border-line bg-panel2 p-5">
              <h3 className="stencil text-sm text-olive">{t.h}</h3>
              <p className="mt-2 text-sm text-ash leading-relaxed">{t.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="stencil text-2xl text-bone">Community sentiment</h2>
        <p className="mt-3 text-ash leading-relaxed">
          Testing is a snapshot; reputation plays out over time. We monitor r/playrust and community
          Discord servers for withdrawal complaints and recurring problems, and we factor those signals
          into our ratings. A pattern of players reporting withheld payouts will lower a site's score
          even if our own test withdrawal went through.
        </p>
      </section>

      <section>
        <h2 className="stencil text-2xl text-bone">Why trust us</h2>
        <p className="mt-3 text-ash leading-relaxed">
          We are an independent affiliate site: we earn commissions when you sign up through our links,
          and we are upfront about that. What we do not do is sell rankings. Ratings are set by testing,
          not by which operator pays the most, which is why our list is not a wall of identical 5-star
          scores. When a site has a real weakness — a narrow game set, a bare tracking link, a smaller
          track record — we say so on its review and in its rating.
        </p>
      </section>

      <nav className="flex flex-wrap gap-4 border-t border-line pt-6 text-sm">
        <Link href="/best-rust-gambling-sites" className="text-rust hover:text-rust2">See our rated sites →</Link>
        <Link href="/reviews" className="text-ash hover:text-bone">All reviews →</Link>
        <Link href="/legit" className="text-ash hover:text-bone">Legit checks →</Link>
      </nav>

      <p className="text-xs text-ash">
        18+ only. Gambling can be addictive. Rust.Casino may earn commissions from links on this site.
        See our <Link href="/responsible-gambling" className="text-olive hover:text-bone">responsible gambling</Link> page.
      </p>
    </article>
  );
}
