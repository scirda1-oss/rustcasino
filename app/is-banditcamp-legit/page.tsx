import type { Metadata } from "next";
import { LegitPage, legitMetadata } from "@/components/LegitPage";
export const metadata: Metadata = legitMetadata("is-banditcamp-legit");
export default function Page() { return <LegitPage slug="is-banditcamp-legit" />; }
