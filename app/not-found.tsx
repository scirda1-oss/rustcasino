import Link from "next/link";
export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="stencil text-6xl text-rust">404</p>
      <p className="mt-4 text-ash">That page does not exist.</p>
      <Link href="/best-rust-gambling-sites" className="stencil mt-6 inline-block text-rust hover:text-rust2">
        See the best Rust gambling sites →
      </Link>
    </div>
  );
}
