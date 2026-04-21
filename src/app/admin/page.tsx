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

  async function clearServiceWorker() {
    if (!("serviceWorker" in navigator)) { alert("No service worker available."); return; }
    const regs = await navigator.serviceWorker.getRegistrations();
    for (const r of regs) await r.unregister();
    if ("caches" in window) {
      const names = await caches.keys();
      await Promise.all(names.map(n => caches.delete(n)));
    }
    alert(`Cleared ${regs.length} service worker${regs.length !== 1 ? "s" : ""} and all caches. Reloading…`);
    window.location.reload();
  }

  return (
    <div className="container" style={{ maxWidth: 1000, paddingTop: 40, paddingBottom: 80 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <div className="eyebrow">Admin</div>
          <h1 className="section-title" style={{ margin: 0 }}>Control panel</h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost btn-sm" onClick={clearServiceWorker} title="If saves hang or return empty responses, clear the PWA service worker.">Clear SW</button>
          <button className="btn btn-ghost" onClick={logout}>Sign out</button>
        </div>
      </div>

      <p className="section-sub" style={{ marginBottom: 32 }}>
        Every save commits directly to GitHub on the <code>main</code> branch.
        Vercel redeploys automatically within ~30 seconds.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 22 }}>
        <Link href="/admin/config" className="panel" style={{ textDecoration: "none", cursor: "pointer", gridColumn: "span 1" }}>
          <div className="panel-kicker">Site config</div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 19, margin: "4px 0 6px", color: "var(--ink)" }}>Edit everything →</h3>
          <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: 0 }}>Bio, links, education, experience, skills. Drag to reorder.</p>
        </Link>
        <Link href="/admin/media" className="panel" style={{ textDecoration: "none", cursor: "pointer", gridColumn: "span 1" }}>
          <div className="panel-kicker">Media library</div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 19, margin: "4px 0 6px", color: "var(--ink)" }}>Upload images →</h3>
          <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: 0 }}>Drag-drop. Auto-committed to git.</p>
        </Link>
        <Link href="/admin/icons" className="panel" style={{ textDecoration: "none", cursor: "pointer", gridColumn: "span 1" }}>
          <div className="panel-kicker">Site icon</div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 19, margin: "4px 0 6px", color: "var(--ink)" }}>Favicon & PWA →</h3>
          <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: 0 }}>Upload & auto-resize to all icon sizes.</p>
        </Link>
      </div>

      {error && <p style={{ color: "#b54141", fontFamily: "var(--mono)", fontSize: 13 }}>Error: {error}</p>}
      {loading && <p style={{ color: "var(--muted)" }}>Loading content…</p>}

      {!loading && !error && SECTIONS.map(s => (
        <div key={s.path} className="panel panel--wide" style={{ marginBottom: 14 }}>
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
