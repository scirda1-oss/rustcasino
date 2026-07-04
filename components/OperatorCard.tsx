import Link from "next/link";
import type { Review } from "@/lib/content";
import { RatingPlate } from "@/components/RatingPlate";
import { AffiliateLink } from "@/components/AffiliateLink";

// Payment-method classifier: maps a review's free-text `deposits` to generic icons.
// Order matters — gift cards are tested before generic cards so "Gift cards" doesn't match both.
const PAYMENTS: { key: string; label: string; test: (d: string) => boolean }[] = [
  { key: "skins", label: "Skins", test: (d) => /skin/i.test(d) },
  { key: "crypto", label: "Crypto", test: (d) => /crypto|bitcoin|btc|eth/i.test(d) },
  { key: "paypal", label: "PayPal", test: (d) => /paypal/i.test(d) },
  { key: "giftcard", label: "Gift cards", test: (d) => /gift|zen/i.test(d) },
  { key: "card", label: "Cards", test: (d) => /(visa|mastercard|google pay|trustly|paysafe|\bcards?\b)/i.test(d) && !/gift/i.test(d) },
];

function paymentsFor(deposits: string[]) {
  return PAYMENTS.filter((p) => deposits.some((d) => p.test(d)));
}

// Logo file per operator. Real brand logo where a clean, transparent asset was
// sourced; on-brand wordmark fallback (public/logos/<slug>.svg) otherwise.
const LOGO: Record<string, string> = {
  banditcamp: "banditcamp.png", // real logo (transparent)
  rustclash: "rustclash.png",   // real logo (transparent)
  rustmagic: "rustmagic.png",   // real logo (transparent)
  rustyloot: "rustyloot.svg",   // fallback — awaiting a usable (non-AVIF) asset
  rustypot: "rustypot.svg",     // fallback — not yet provided
};

export function OperatorCard({ review: r, rank }: { review: Review; rank: number }) {
  const tags = r.games.slice(0, 4);
  const payments = paymentsFor(r.deposits);
  const offer = r.promoBonus ?? r.bonuses[0];
  const logo = LOGO[r.slug] ?? `${r.slug}.svg`;

  return (
    <div className="rounded-sm border border-line bg-panel p-5 transition-colors hover:border-rust/60">
      <div className="flex flex-wrap items-center gap-4">
        <span className="stencil text-lg text-ash">{String(rank).padStart(2, "0")}</span>
        {/* Normalized to a uniform max height; aspect ratio preserved (w-auto). */}
        <img src={`/logos/${logo}`} alt={`${r.site} logo`} height={32} className="h-8 w-auto max-w-[170px] object-contain object-left" />
        <div className="ml-auto">
          <RatingPlate rating={r.rating} />
        </div>
      </div>

      {offer && (
        <p className="mt-4 text-sm text-bone">
          <span className="stencil mr-2 text-[10px] tracking-widest text-olive">OFFER</span>
          {offer}
        </p>
      )}

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-sm border border-line bg-panel2 px-2 py-1 text-[11px] text-ash">
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4">
        {payments.length > 0 && (
          <div className="flex items-center gap-2" aria-label="Accepted payment methods">
            {payments.map((p) => (
              <img key={p.key} src={`/icons/${p.key}.svg`} alt={p.label} title={p.label} width={22} height={22} className="h-[22px] w-[22px]" />
            ))}
          </div>
        )}
        {r.promoCode && (
          <span className="font-mono text-xs text-olive">
            CODE: <span className="text-bone">{r.promoCode}</span>
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <AffiliateLink href={r.url} site={r.site}
          className="stencil flex-1 min-w-[8rem] rounded-sm border border-rust bg-rust/10 px-4 py-2.5 text-center text-xs text-rust hover:bg-rust hover:text-base transition-colors">
          CLAIM BONUS
        </AffiliateLink>
        <Link href={`/reviews/${r.slug}`}
          className="stencil flex-1 min-w-[8rem] rounded-sm border border-line bg-panel2 px-4 py-2.5 text-center text-xs text-ash hover:border-bone hover:text-bone transition-colors">
          READ REVIEW
        </Link>
      </div>
    </div>
  );
}
