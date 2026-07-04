import type { Metadata } from "next";
import { ModePage, modeMetadata } from "@/components/ModePage";
export const metadata: Metadata = modeMetadata("rust-gambling-wheel-sites");
export default function Page() { return <ModePage slug="rust-gambling-wheel-sites" />; }
