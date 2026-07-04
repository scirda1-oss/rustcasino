import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Rust.Casino.",
  alternates: { canonical: "/contact" },
};
export default function Contact() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="stencil text-4xl text-bone">Contact</h1>
      <p className="text-ash leading-relaxed">
        Questions, corrections, or partnership enquiries: email
        {" "}<span className="font-mono text-olive">hello@rust.casino</span>.
      </p>
    </div>
  );
}
