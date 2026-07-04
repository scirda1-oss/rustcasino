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
