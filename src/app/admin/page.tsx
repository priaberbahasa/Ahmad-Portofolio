"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Item = { name: string; path: string; type: string };

const SECTIONS = [
  { label: "Research", path: "content/research" },
  { label: "Projects", path: "content/projects" },
  { label: "Experience", path: "content/experience" },
  { label: "Activities", path: "content/activities" },
];

export default function AdminHome() {
  const router = useRouter();
  const [data, setData] = useState<Record<string, Item[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const entries = await Promise.all(SECTIONS.map(async (s) => {
          const res = await fetch(`/api/admin/list?path=${encodeURIComponent(s.path)}`);
          const d = await res.json();
          if (!res.ok) throw new Error(d.error || "Failed to list");
          return [s.path, (d.items as Item[]).filter(i => i.type === "file" && i.name.endsWith(".mdx"))] as const;
        }));
        setData(Object.fromEntries(entries));
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <div className="container" style={{ maxWidth: 900, paddingTop: 40, paddingBottom: 80 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <div className="eyebrow">Admin</div>
          <h1 className="section-title" style={{ margin: 0 }}>Content editor</h1>
        </div>
        <button className="btn btn-ghost" onClick={logout}>Sign out</button>
      </div>

      <p className="section-sub" style={{ marginBottom: 32 }}>
        Edit a file below — save will commit directly to GitHub on the <code>main</code> branch.
        Vercel will redeploy automatically within ~30 seconds.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <Link href="/admin/media" className="panel" style={{ textDecoration: "none", cursor: "pointer" }}>
          <div className="panel-kicker">Media library</div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 20, margin: "4px 0 6px", color: "var(--ink)" }}>Upload & manage images →</h3>
          <p style={{ fontSize: 13, color: "var(--ink-2)", margin: 0 }}>Drag-drop images. Each upload auto-commits to git.</p>
        </Link>
        <Link href={`/admin/edit?path=${encodeURIComponent("src/lib/siteConfig.ts")}`} className="panel" style={{ textDecoration: "none", cursor: "pointer" }}>
          <div className="panel-kicker">Site config</div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 20, margin: "4px 0 6px", color: "var(--ink)" }}>Bio, contacts, skills →</h3>
          <p style={{ fontSize: 13, color: "var(--ink-2)", margin: 0 }}>Raw TypeScript editor for <code>siteConfig.ts</code>.</p>
        </Link>
      </div>

      {error && <p style={{ color: "#b54141", fontFamily: "var(--mono)", fontSize: 13 }}>Error: {error}</p>}
      {loading && <p style={{ color: "var(--muted)" }}>Loading content…</p>}

      {!loading && !error && SECTIONS.map(s => (
        <div key={s.path} className="panel panel--wide" style={{ marginBottom: 20 }}>
          <div className="panel-kicker">{s.label} · {data[s.path]?.length || 0}</div>
          <ul className="simple-list">
            {(data[s.path] || []).map(item => (
              <li key={item.path}>
                <Link href={`/admin/edit?path=${encodeURIComponent(item.path)}`} className="pub-doi">{item.name}</Link>
              </li>
            ))}
            <li>
              <Link href={`/admin/edit?path=${encodeURIComponent(s.path + "/new-entry.mdx")}&new=1`} className="pub-doi" style={{ color: "var(--accent)" }}>
                + New entry
              </Link>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
