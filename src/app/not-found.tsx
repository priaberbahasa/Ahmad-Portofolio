import Link from "next/link";
export default function NotFound() {
  return (<div className="min-h-screen flex items-center justify-center px-6"><div className="text-center">
    <p className="text-6xl font-serif text-navy mb-4">404</p>
    <h1 className="text-lg font-serif text-ink mb-2">Page Not Found</h1>
    <p className="text-sm text-ink-muted mb-6">This page doesn&apos;t exist.</p>
    <Link href="/" className="px-5 py-2 bg-navy text-white text-sm rounded-md hover:bg-navy-light transition-colors">Go Home</Link>
  </div></div>);
}
