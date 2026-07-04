import type { Metadata } from "next";
import { ModePage, modeMetadata } from "@/components/ModePage";
export const metadata: Metadata = modeMetadata("rust-case-opening-sites");
export default function Page() { return <ModePage slug="rust-case-opening-sites" />; }
