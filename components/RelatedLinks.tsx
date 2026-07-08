import Link from "next/link";

export type RelatedLink = { href: string; label: string; note?: string };

// Internal-linking module: contextual cross-links to spread PageRank and give
// every page 2-3+ inbound links from related pages.
export function RelatedLinks({ title = "Related", links }: { title?: string; links: RelatedLink[] }) {
  const seen = new Set<string>();
  const unique = links.filter((l) => l.href && !seen.has(l.href) && seen.add(l.href));
  if (unique.length === 0) return null;
  return (
    <section>
      <h2 className="stencil text-2xl text-bone">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {unique.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-sm border border-line bg-panel p-4 transition-colors hover:border-rust"
          >
            <span className="stencil text-bone">{l.label}</span>
            {l.note && <p className="mt-1 text-sm text-ash">{l.note}</p>}
          </Link>
        ))}
      </div>
    </section>
  );
}
