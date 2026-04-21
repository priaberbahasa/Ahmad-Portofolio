import type { Metadata } from "next";
import ErrorLog from "@/components/admin/ErrorLog";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ paddingTop: 80, minHeight: "80vh" }}>
      {children}
      <ErrorLog />
    </div>
  );
}
