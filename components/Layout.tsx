import Link from "next/link";
import { SITE } from "@/lib/site";

export { Header } from "@/components/Header";

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
