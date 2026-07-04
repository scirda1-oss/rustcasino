// Centralized outbound link (task 5.2): correct rel + one place to add tracking.
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
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      data-affiliate={site}
      className={className}
    >
      {children}
    </a>
  );
}
