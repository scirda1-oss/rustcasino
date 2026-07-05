"use client";
import Link from "next/link";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-panel/80 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="Rust.Casino home" className="flex shrink-0 items-center">
          <img
            src="/logos/rust-casino-logo.png"
            alt="Rust.Casino"
            width={880}
            height={567}
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-1 text-sm lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-ash transition-colors hover:text-bone">
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-bone hover:border-rust lg:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-line bg-panel lg:hidden">
          <div className="mx-auto flex max-w-content flex-col px-4 py-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center border-b border-line/40 text-sm text-ash last:border-0 hover:text-bone"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
