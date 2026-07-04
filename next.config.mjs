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
    // 301 map (task 0.4). Add old Bolt URLs here as they are inventoried.
    return [
      // { source: '/old-path', destination: '/reviews/rustclash', permanent: true },
    ];
  },
};
export default nextConfig;
