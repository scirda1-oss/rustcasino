import Link from "next/link";
import { SITE } from "@/lib/site";

const nav = [
  { href: "/best-rust-gambling-sites", label: "Best Sites" },
  { href: "/reviews", label: "Reviews" },
  { href: "/promo", label: "Promo Codes" },
  { href: "/blog", label: "Guides" },
];

export function Header() {
  return (
    <header className="border-b border-line bg-panel/60 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-4">
        <Link href="/" className="stencil text-xl text-bone">
          RUST<span className="text-rust">.CASINO</span>
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
