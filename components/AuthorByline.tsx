import Link from "next/link";
import { AUTHOR } from "@/lib/site";

// Named editor byline for reviews and guides (E-E-A-T).
export function AuthorByline({ lastTested, published }: { lastTested?: string; published?: string }) {
  return (
    <div className="rounded-sm border border-line bg-panel p-4 text-xs text-ash">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-bone">
          By <Link href="/authors" className="text-olive hover:text-bone">{AUTHOR.name}</Link>, {AUTHOR.role}
        </span>
        {lastTested && <span className="text-line">·</span>}
        {lastTested && <span>Last tested {lastTested}</span>}
        {published && <span className="text-line">·</span>}
        {published && <span>Published {published}</span>}
      </div>
      <p className="mt-2 leading-relaxed">{AUTHOR.bio}</p>
    </div>
  );
}
