import Link from "next/link";
import { SITE } from "@/lib/site";

const nav = [
  { href: "/best-rust-gambling-sites", label: "Best Sites" },
  { href: "/reviews", label: "Reviews" },
  { href: "/promo", label: "Promo Codes" },
  { href: "/rust-case-opening-sites", label: "Case Opening" },
  { href: "/rust-skin-gambling", label: "Skin Gambling" },
  { href: "/compare", label: "Compare" },
  { href: "/legit", label: "Legit?" },
  { href: "/lowest-fee-rust-gambling-sites", label: "Low Fees" },
  { href: "/bitcoin-rust-gambling-sites", label: "Bitcoin" },
  { href: "/rust-gambling-withdrawal-guide", label: "Withdrawals" },
  { href: "/blog", label: "Guides" },
  { href: "/how-we-rate", label: "How We Rate" },
];

export function Header() {
  return (
    <header className="border-b border-line bg-panel/60 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-4">
        <Link href="/" aria-label="Rust.Casino home" className="flex items-center">
          <img
            src="/logos/rust-casino-logo.png"
            alt="Rust.Casino"
            width={880}
            height={567}
            className="h-10 w-auto md:h-11"
          />
        </Link>
        <nav className="flex gap-6 text-sm">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-ash hover:text-bone transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-panel/40">
      <div className="mx-auto max-w-content px-4 py-10 text-sm text-ash">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <Link href="/about" className="hover:text-bone">About</Link>
          <Link href="/authors" className="hover:text-bone">Editorial Team</Link>
          <Link href="/how-we-rate" className="hover:text-bone">How We Rate</Link>
          <Link href="/responsible-gambling" className="hover:text-bone">Responsible Gambling</Link>
          <Link href="/contact" className="hover:text-bone">Contact</Link>
          <Link href="/privacy" className="hover:text-bone">Privacy</Link>
        </div>
        <p className="mt-6 max-w-2xl leading-relaxed">
          {SITE.name} publishes independent reviews of Rust skin gambling sites and may earn
          commissions from links on this site. 18+ only. Gambling can be addictive — play responsibly.
        </p>
        <p className="mt-4 text-xs text-line">© {new Date().getFullYear()} {SITE.name}</p>
      </div>
    </footer>
  );
}
