import type { Metadata } from "next";
import { ModePage, modeMetadata } from "@/components/ModePage";
export const metadata: Metadata = modeMetadata("rust-case-battle-sites");
export default function Page() { return <ModePage slug="rust-case-battle-sites" />; }
