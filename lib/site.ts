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

// Byline identity (E-E-A-T). An honest team byline — NOT an invented named
// persona, which is a trust risk on a YMYL/gambling site. Swap in a real,
// verifiable person (name + bio + photo) when one is available.
export const AUTHOR = {
  name: "Rust.Casino Editorial Team",
  role: "Editors & testers",
  path: "/authors",
  bio: "The Rust.Casino editorial team tests sites hands-on — depositing, playing, withdrawing and verifying provably fair results — and rates them on what actually happens, not on what operators advertise.",
};
