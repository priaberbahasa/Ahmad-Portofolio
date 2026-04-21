import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px" }}>
      <div style={{ textAlign: "center" }}>
        <p className="display" style={{ fontSize: 96, margin: "0 0 8px" }}>404</p>
        <h1 className="section-title" style={{ fontSize: 22 }}>Page not found</h1>
        <p style={{ color: "var(--muted)", margin: "8px 0 24px", fontSize: 14 }}>This page doesn&apos;t exist.</p>
        <Link href="/" className="btn btn-primary">Go Home</Link>
      </div>
    </div>
  );
}
