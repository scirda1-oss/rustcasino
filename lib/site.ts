export const SITE = {
  name: "Rust.Casino",
  domain: "https://rust.casino",
  tagline: "Rust gambling sites, promo codes and honest reviews",
  description:
    "Independent reviews and verified promo codes for Rust skin gambling sites. Ratings, bonuses and how each site pays out.",
};

export function absUrl(pathname: string) {
  return `${SITE.domain}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

// Site editor identity (E-E-A-T byline). Single editorial persona used across
// reviews and guides. NOTE: replace with a real team member's details when available.
export const AUTHOR = {
  name: "Marcus Feld",
  role: "Editor & Lead Tester",
  path: "/authors",
  bio: "Marcus leads testing at Rust.Casino — making real deposits, timing withdrawals and verifying provably fair results before any site earns a rating.",
};
