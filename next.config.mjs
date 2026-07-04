/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev' },
      { protocol: 'https', hostname: '**.pages.dev' },
    ],
  },
  async redirects() {
    // 301 map from old Bolt site (task 0.4). Review + mode slugs already match, no redirect needed.
    return [
      // Renamed / consolidated pages
      { source: '/methodology', destination: '/best-rust-gambling-sites', permanent: true },
      { source: '/promocodes', destination: '/promo', permanent: true },
      { source: '/guides', destination: '/blog', permanent: true },
      // Old guides — low search demand (Ahrefs 0-10 vol), consolidate rather than rebuild
      { source: '/guides/how-to-withdraw', destination: '/blog', permanent: true },
      { source: '/guides/best-games-beginners', destination: '/blog', permanent: true },
      { source: '/guides/no-kyc-rust-gambling', destination: '/blog', permanent: true },
      { source: '/guides/verify-provably-fair', destination: '/blog', permanent: true },
      // Old blog posts — consolidate to blog index
      { source: '/blog/provably-fair-explained', destination: '/blog', permanent: true },
      { source: '/blog/rust-gambling-guide', destination: '/blog', permanent: true },
      { source: '/blog/rust-promo-codes-guide', destination: '/promo', permanent: true },
      // Programmatic pages not yet rebuilt — point to money page until filtered lists ship (Phase B2)
      { source: '/bitcoin-rust-gambling-sites', destination: '/best-rust-gambling-sites', permanent: true },
      { source: '/highest-rakeback-rust-sites', destination: '/best-rust-gambling-sites', permanent: true },
      { source: '/fastest-withdrawal-rust-sites', destination: '/best-rust-gambling-sites', permanent: true },
      { source: '/alternatives/rustclash', destination: '/reviews/rustclash', permanent: true },
      // rustchance review existed on old site but has no affiliate deal — redirect to money page
      { source: '/reviews/rustchance', destination: '/best-rust-gambling-sites', permanent: true },
    ];
  },
};
export default nextConfig;
