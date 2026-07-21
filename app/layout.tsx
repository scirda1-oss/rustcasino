import type { Metadata } from "next";
import Script from "next/script";
import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import { SITE } from "@/lib/site";
import { Header, Footer } from "@/components/Layout";
import { JsonLd } from "@/lib/schema";
import { organizationLd, websiteLd } from "@/lib/schema";
import "./globals.css";

const display = Oswald({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  // Static assets from /public referenced explicitly — NOT app/ metadata image
  // files, which next-on-pages treats as dynamic routes needing the Edge Runtime.
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <JsonLd data={organizationLd()} />
        <JsonLd data={websiteLd()} />
        <Header />
        <main className="mx-auto max-w-content px-4 py-10">{children}</main>
        <Footer />

        {/* Google tag (gtag.js) — GA4 */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-G0HKQ6ZLEN" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-G0HKQ6ZLEN');`}
        </Script>
      </body>
    </html>
  );
}
