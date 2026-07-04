import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Responsible Gambling",
  description: "Rust skin gambling is 18+. Guidance and support resources for gambling responsibly.",
  alternates: { canonical: "/responsible-gambling" },
};
export default function Responsible() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="stencil text-4xl text-bone">Responsible Gambling</h1>
      <p className="text-ash leading-relaxed">
        Rust skin gambling is for adults aged 18 or older. Gambling can be addictive. Only wager
        skins or money you can afford to lose, and never chase losses.
      </p>
      <ul className="space-y-2 text-ash">
        <li>— Set limits before you play and stick to them.</li>
        <li>— Treat gambling as entertainment, not income.</li>
        <li>— Take breaks and never play to recover losses.</li>
      </ul>
      <p className="text-ash leading-relaxed">
        If gambling stops being fun, seek support. BeGambleAware (begambleaware.org) and Gamblers
        Anonymous (gamblersanonymous.org) offer free, confidential help.
      </p>
    </div>
  );
}
