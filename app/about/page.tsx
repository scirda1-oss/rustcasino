import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
  description: "Who runs Rust.Casino and how we review Rust skin gambling sites.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="stencil text-4xl text-bone">About Rust.Casino</h1>
      <p className="text-ash leading-relaxed">
        Rust.Casino is an independent guide to Rust skin gambling sites. We test sites, verify
        promo codes, and rate each one on how reliably it pays out.
      </p>
      <h2 className="stencil text-2xl text-bone mt-8">How we review</h2>
      <p className="text-ash leading-relaxed">
        We create an account, deposit, play, and attempt a withdrawal before publishing a rating.
        Ratings prioritise payout reliability over bonus size.
      </p>
      <h2 className="stencil text-2xl text-bone mt-8">Affiliate disclosure</h2>
      <p className="text-ash leading-relaxed">
        Some links on this site are affiliate or referral links. If you sign up through them we may
        earn a commission at no cost to you. This never changes our ratings.
      </p>
    </div>
  );
}
