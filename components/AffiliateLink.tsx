"use client";
import { usePathname } from "next/navigation";

// Derive a clean campaign slug from the current path: "/" -> "home",
// "/reviews/banditcamp" -> "reviews-banditcamp".
function campaignFromPath(pathname: string | null): string {
  const slug = (pathname ?? "/").replace(/^\/+|\/+$/g, "").replace(/\/+/g, "-");
  return slug || "home";
}

// Append UTM params, preserving any existing query/referral params.
export function withUtm(href: string, campaign: string): string {
  const params = `utm_source=rust.casino&utm_medium=affiliate&utm_campaign=${campaign}`;
  return href + (href.includes("?") ? "&" : "?") + params;
}

// Centralized outbound link: correct rel + one place for UTM attribution tracking.
export function AffiliateLink({
  href,
  site,
  children,
  className = "",
}: {
  href: string;
  site: string;
  children: React.ReactNode;
  className?: string;
}) {
  const campaign = campaignFromPath(usePathname());
  return (
    <a
      href={withUtm(href, campaign)}
      target="_blank"
      rel="sponsored noopener noreferrer"
      data-affiliate={site}
      className={className}
    >
      {children}
    </a>
  );
}
