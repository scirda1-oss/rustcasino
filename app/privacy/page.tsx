import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Rust.Casino handles data and cookies.",
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="stencil text-4xl text-bone">Privacy Policy</h1>
      <p className="text-ash leading-relaxed">
        Rust.Casino uses privacy-friendly analytics and does not sell personal data. Affiliate
        links may set cookies on the destination site under that site's own policy.
      </p>
    </div>
  );
}
