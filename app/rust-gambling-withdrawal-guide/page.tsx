import type { Metadata } from "next";
import { FilterPage, filterMetadata } from "@/components/FilterPage";
export const metadata: Metadata = filterMetadata("rust-gambling-withdrawal-guide");
export default function Page() { return <FilterPage slug="rust-gambling-withdrawal-guide" />; }
