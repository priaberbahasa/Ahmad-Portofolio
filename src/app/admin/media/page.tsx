"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch } from "@/lib/adminFetch";

type MediaItem = { name: string; path: string; url: string; sha: string; size: number };

export default function MediaLibraryPage() {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dropActive, setDropActive] = useState(false);
  const [toast, setToast] = useState("");

  async function load() {
    setLoading(true); setError("");
    try {
      const d = await adminFetch<{ images: MediaItem[] }>("/api/admin/media");
      setImages(d.images);
    } catch (e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function uploadFiles(files: FileList | File[]) {
    setUploading(true); setError("");
    const total = "length" in files ? files.length : (files as File[]).length;
    let done = 0;
    try {
      for (const f of Array.from(files)) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result).split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(f);
        });
        const d = await adminFetch<{ ok: true; name: string }>("/api/admin/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: f.name, base64 }),
        });
        done++;
        setToast(`Uploaded ${done}/${total}: ${d.name}`);
      }
      await load();
      setToast(`${total} file${total > 1 ? "s" : ""} committed to git`);
      setTimeout(() => setToast(""), 3500);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function removeImage(path: string) {
    if (!confirm(`Delete ${path}? This commits to git.`)) return;
    try {
      await adminFetch(`/api/admin/media?path=${encodeURIComponent(path)}`, { method: "DELETE" });
      await load();
      setToast(`Deleted ${path.split("/").pop()}`);
      setTimeout(() => setToast(""), 2500);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  function copyPath(url: string) {
    navigator.clipboard.writeText(url);
    setToast(`Copied: ${url}`);
    setTimeout(() => setToast(""), 1800);
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDropActive(false);
    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
  };

  return (
    <div className="container" style={{ maxWidth: 1120, paddingTop: 40, paddingBottom: 80 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Link href="/admin" className="btn btn-ghost btn-sm">← Dashboard</Link>
        <span className="eyebrow" style={{ margin: 0 }}>Media library</span>
      </div>

      <h1 className="section-title">Images in /public/images</h1>
      <p className="section-sub" style={{ marginBottom: 28 }}>
        Drag files to upload, or click Upload. Each upload commits straight to the <code>main</code> branch.
      </p>

      <div
        onDragOver={(e) => { e.preventDefault(); setDropActive(true); }}
        onDragLeave={() => setDropActive(false)}
        onDrop={onDrop}
        style={{
          border: `2px dashed ${dropActive ? "var(--ink)" : "var(--line-2)"}`,
          background: dropActive ? "var(--surface-2)" : "var(--surface)",
          borderRadius: "var(--r-lg)",
          padding: 32,
          textAlign: "center",
          marginBottom: 24,
          transition: "all .2s",
        }}
      >
        <p style={{ margin: "0 0 12px", color: "var(--ink-2)" }}>
          {dropActive ? "Drop to upload" : "Drag images here, or"}
        </p>
        <label className="btn btn-primary" style={{ cursor: "pointer" }}>
          {uploading ? "Uploading…" : "Upload image(s)"}
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            style={{ display: "none" }}
            onChange={(e) => e.target.files && uploadFiles(e.target.files)}
          />
        </label>
        <p style={{ margin: "12px 0 0", fontSize: 12, color: "var(--muted)", fontFamily: "var(--mono)" }}>
          jpg · png · webp · gif · svg · max 8 MB each
        </p>
      </div>

      {toast && <div style={{ position: "fixed", bottom: 24, right: 24, padding: "12px 18px", background: "var(--ink)", color: "var(--bg)", borderRadius: 999, fontSize: 13, fontFamily: "var(--mono)", boxShadow: "var(--shadow-2)", zIndex: 100 }}>{toast}</div>}
      {error && <p style={{ color: "#b54141", fontFamily: "var(--mono)", fontSize: 13, marginBottom: 16 }}>{error}</p>}
      {loading && <p style={{ color: "var(--muted)" }}>Loading library…</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
        {images.map(img => (
          <div key={img.path} className="research-card" style={{ cursor: "default" }}>
            <div className="rc-media" style={{ aspectRatio: "1/1" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.name} style={{ objectFit: "cover" }} />
            </div>
            <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={img.name}>{img.name}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)" }}>
                {img.size > 0 ? `${(img.size / 1024).toFixed(0)} KB` : ""}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => copyPath(img.url)} style={{ flex: 1, fontSize: 11 }}>Copy path</button>
                <button className="btn btn-ghost btn-sm" onClick={() => removeImage(img.path)} style={{ fontSize: 11, color: "#b54141" }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
