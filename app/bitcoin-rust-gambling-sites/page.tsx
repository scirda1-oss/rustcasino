import type { Metadata } from "next";
import { FilterPage, filterMetadata } from "@/components/FilterPage";
export const metadata: Metadata = filterMetadata("bitcoin-rust-gambling-sites");
export default function Page() { return <FilterPage slug="bitcoin-rust-gambling-sites" />; }
