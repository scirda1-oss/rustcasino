import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd, breadcrumbLd, authorLd } from "@/lib/schema";
import { SITE, AUTHOR, absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial Team",
  description:
    "Who writes and tests the reviews on Rust.Casino — our editor, how we test Rust gambling sites, and how to reach us.",
  alternates: { canonical: absUrl("/authors") },
};

const profileLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: { "@context": "https://schema.org", ...authorLd() },
};

export default function Authors() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <JsonLd data={profileLd} />
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Editorial Team", path: "/authors" },
      ])} />

      <header>
        <p className="stencil text-sm text-olive">EDITORIAL TEAM</p>
        <h1 className="stencil mt-2 text-4xl text-bone md:text-5xl">Who writes Rust.Casino</h1>
        <p className="mt-4 text-ash leading-relaxed">
          Every review and guide on this site is tested and edited by a person, not generated from an
          affiliate feed. Here is who is behind the ratings and how we work.
        </p>
      </header>

      <section className="rounded-sm border border-line bg-panel p-6">
        <h2 className="stencil text-2xl text-bone">{AUTHOR.name}</h2>
        <p className="stencil mt-1 text-sm text-olive">{AUTHOR.role}</p>
        <p className="mt-4 text-ash leading-relaxed">{AUTHOR.bio}</p>
        <p className="mt-3 text-ash leading-relaxed">
          Marcus handles the hands-on side of every review: opening accounts, depositing real skins,
          playing across a site's game modes, and then withdrawing to see how payouts actually behave.
          Provably fair results are checked against each site's own verifier, and community reports of
          withheld payouts are tracked over time and factored into ratings.
        </p>
      </section>

      <section>
        <h2 className="stencil text-2xl text-bone">How we work</h2>
        <p className="mt-3 text-ash leading-relaxed">
          {SITE.name} is an independent affiliate site. We earn commissions when you sign up through our
          links, and we are upfront about it — but rankings are set by testing, not by which operator
          pays the most. Our full process is documented on the{" "}
          <Link href="/how-we-rate" className="text-olive hover:text-bone">how we rate</Link> page.
        </p>
      </section>

      <nav className="flex flex-wrap gap-4 border-t border-line pt-6 text-sm">
        <Link href="/how-we-rate" className="text-rust hover:text-rust2">How we rate →</Link>
        <Link href="/reviews" className="text-ash hover:text-bone">All reviews →</Link>
        <Link href="/contact" className="text-ash hover:text-bone">Contact us →</Link>
      </nav>

      <p className="text-xs text-ash">
        18+ only. Gambling can be addictive. See our{" "}
        <Link href="/responsible-gambling" className="text-olive hover:text-bone">responsible gambling</Link> page.
      </p>
    </article>
  );
}
