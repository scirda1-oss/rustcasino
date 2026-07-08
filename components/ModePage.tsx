import Link from "next/link";
import { getMode, getModes, reviewsForMode } from "@/lib/content";
import { OperatorCard } from "@/components/OperatorCard";
import { WheelCalculator } from "@/components/WheelCalculator";
import { RelatedLinks, type RelatedLink } from "@/components/RelatedLinks";
import { JsonLd, itemListLd, breadcrumbLd } from "@/lib/schema";

export function ModePage({ slug }: { slug: string }) {
  const m = getMode(slug);
  if (!m) return null;
  const reviews = reviewsForMode(m);
  const otherModes = getModes().filter((x) => x.slug !== m.slug).slice(0, 3);
  const related: RelatedLink[] = [
    { href: "/best-rust-gambling-sites", label: "Best Rust gambling sites", note: "Our full ranked list." },
    ...otherModes.map((x) => ({ href: `/${x.slug}`, label: x.h1, note: x.title })),
    { href: "/lowest-fee-rust-gambling-sites", label: "Lowest-fee & rakeback sites" },
    { href: "/legit", label: "Legit checks", note: "Is each site safe?" },
  ];
  return (
    <div className="space-y-12">
      <JsonLd data={itemListLd(reviews)} />
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: m.h1, path: `/${m.slug}` },
      ])} />
      <header>
        <p className="stencil text-sm text-olive">UPDATED JULY 2026</p>
        <h1 className="stencil mt-2 text-4xl text-bone md:text-5xl">{m.h1}</h1>
        <p className="mt-4 max-w-2xl text-ash leading-relaxed">{m.intro}</p>
      </header>
      {reviews.length > 0 && (
        <div className="grid gap-4">
          {reviews.map((r, i) => (
            <OperatorCard key={r.slug} review={r} rank={i + 1} />
          ))}
        </div>
      )}
      <section>
        <h2 className="stencil text-2xl text-bone">{m.sectionTitle}</h2>
        <p className="mt-3 text-ash leading-relaxed">{m.sectionBody}</p>
      </section>
      {m.key === "wheel" && (
        <section>
          <h2 className="stencil text-2xl text-bone">Rust wheel odds calculator</h2>
          <p className="mt-3 mb-4 max-w-2xl text-ash leading-relaxed">
            Enter your bet to see the win chance and payout for each multiplier on a standard Rust wheel.
          </p>
          <WheelCalculator />
        </section>
      )}
      <RelatedLinks title="Related Rust gambling pages" links={related} />
      <nav className="flex flex-wrap gap-4 border-t border-line pt-6 text-sm">
        <Link href="/best-rust-gambling-sites" className="text-rust hover:text-rust2">All Rust gambling sites →</Link>
        <Link href="/promo" className="text-ash hover:text-bone">Promo codes →</Link>
      </nav>
      <p className="text-xs text-ash">18+ only. Gambling can be addictive. Rust.Casino may earn commissions from links on this page. See our <Link href="/responsible-gambling" className="text-olive hover:text-bone">responsible gambling</Link> page.</p>
    </div>
  );
}

export function modeMetadata(slug: string) {
  const m = getMode(slug);
  if (!m) return {};
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `/${m.slug}` },
    openGraph: { title: m.title, description: m.description, url: `/${m.slug}` },
  };
}
