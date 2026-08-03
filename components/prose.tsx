import Link from "next/link";
import type { ReactNode } from "react";

// Markdown-lite renderer shared by blog guides and news articles.
// Supports: ## / ### headings, "- " bullet lists, **bold**, and
// [text](url) links (internal via next/link, external via <a>).
export function inline(text: string, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      const label = m[1];
      const href = m[2];
      nodes.push(
        href.startsWith("/") ? (
          <Link key={`${keyBase}-${k}`} href={href} className="text-rust underline underline-offset-2 hover:text-rust2">{label}</Link>
        ) : (
          <a key={`${keyBase}-${k}`} href={href} className="text-rust underline underline-offset-2 hover:text-rust2">{label}</a>
        )
      );
    } else if (m[3] !== undefined) {
      nodes.push(<strong key={`${keyBase}-${k}`} className="font-semibold text-bone">{m[3]}</strong>);
    }
    last = m.index + m[0].length;
    k++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function renderBody(body: string) {
  return body.split(/\n\n+/).map((block, i) => {
    if (block.startsWith("### ")) {
      return <h3 key={i} className="stencil mt-6 text-xl text-bone">{inline(block.slice(4), `h3-${i}`)}</h3>;
    }
    if (block.startsWith("## ")) {
      return <h2 key={i} className="stencil mt-8 text-2xl text-bone">{inline(block.slice(3), `h2-${i}`)}</h2>;
    }
    if (block.split("\n").every((l) => l.startsWith("- "))) {
      return (
        <ul key={i} className="mt-4 space-y-2 text-ash leading-relaxed">
          {block.split("\n").map((li, j) => (
            <li key={j} className="flex gap-2"><span className="text-rust">—</span><span>{inline(li.slice(2), `li-${i}-${j}`)}</span></li>
          ))}
        </ul>
      );
    }
    return <p key={i} className="mt-4 text-ash leading-relaxed">{inline(block, `p-${i}`)}</p>;
  });
}
