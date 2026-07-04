import { getTrustpilot } from "@/lib/content";

// Deterministic thousands separator (prerendered at build; avoids locale drift).
export function formatCount(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

function checkedLabel(ym: string): string {
  const [y, m] = ym.split("-");
  const idx = Number(m) - 1;
  return MONTHS[idx] ? `${MONTHS[idx]} ${y}` : ym;
}

export function TrustpilotSummary({ slug }: { slug: string }) {
  const tp = getTrustpilot(slug);
  if (!tp) return null;
  return (
    <section className="rounded-sm border border-line bg-panel p-5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="stencil text-2xl text-bone">Trustpilot</h2>
        <span className="font-mono text-2xl text-rust">
          {tp.rating.toFixed(1)}<span className="text-sm text-ash"> / 5</span>
        </span>
        <span className="text-sm text-ash">
          {formatCount(tp.reviews)} reviews · checked {checkedLabel(tp.lastChecked)}
        </span>
      </div>

      {tp.sample === "limited" && (
        <p className="mt-2 text-xs text-olive">
          Limited review sample — treat as indicative of sentiment, not statistically robust.
        </p>
      )}

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="stencil text-sm text-olive">Pros</h3>
          <ul className="mt-2 space-y-1 text-sm text-ash">
            {tp.pros.map((p, i) => <li key={i}>+ {p}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="stencil text-sm text-rust">Cons</h3>
          <ul className="mt-2 space-y-1 text-sm text-ash">
            {tp.cons.map((c, i) => <li key={i}>− {c}</li>)}
          </ul>
        </div>
      </div>

      <p className="mt-4 text-xs text-ash">
        Community sentiment from Trustpilot, factored into our rating alongside hands-on testing.
        See <a href="/how-we-rate" className="text-olive hover:text-bone">how we rate</a>.
      </p>
    </section>
  );
}
