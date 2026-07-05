import type { Metadata } from "next";
import { FilterPage, filterMetadata } from "@/components/FilterPage";
export const metadata: Metadata = filterMetadata("lowest-fee-rust-gambling-sites");
export default function Page() { return <FilterPage slug="lowest-fee-rust-gambling-sites" />; }
