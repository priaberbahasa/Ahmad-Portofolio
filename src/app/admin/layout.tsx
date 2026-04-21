import type { Metadata } from "next";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ paddingTop: 80, minHeight: "80vh" }}>{children}</div>;
}
