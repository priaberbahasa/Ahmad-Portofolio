"use client";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";

type MediaItem = { name: string; path: string; url: string; sha: string; size: number };

export default function ImagePicker({
  open,
  onSelect,
  onClose,
}: {
  open: boolean;
  onSelect: (url: string) => void;
  onClose: () => void;
}) {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) return;
    (async () => {
      setLoading(true); setError("");
      try {
        const d = await adminFetch<{ images: MediaItem[] }>("/api/admin/media");
        setImages(d.images);
      } catch (e) { setError((e as Error).message); }
      finally { setLoading(false); }
    })();
  }, [open]);

  async function uploadFiles(files: FileList) {
    setUploading(true); setError("");
    try {
      for (const f of Array.from(files)) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result).split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(f);
        });
        const d = await adminFetch<{ name: string; path: string; url: string; newSha: string }>("/api/admin/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: f.name, base64 }),
        });
        setImages(prev => {
          const existing = prev.find(i => i.path === d.path);
          if (existing) return prev.map(i => i.path === d.path ? { ...i, sha: d.newSha } : i);
          return [...prev, { name: d.name, path: d.path, url: d.url, sha: d.newSha, size: 0 }].sort((a,b)=>a.name.localeCompare(b.name));
        });
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 960 }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div style={{ padding: "28px 32px 24px" }}>
          <div className="eyebrow">Media library</div>
          <h2 className="section-title" style={{ fontSize: 24, marginBottom: 16 }}>Pick an image</h2>

          <div style={{ marginBottom: 20, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
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
            <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--mono)" }}>
              {images.length} file{images.length !== 1 ? "s" : ""} · jpg, png, webp, gif, svg · max 8 MB
            </span>
          </div>

          {error && <p style={{ color: "#b54141", fontFamily: "var(--mono)", fontSize: 12, marginBottom: 12 }}>{error}</p>}
          {loading && <p style={{ color: "var(--muted)" }}>Loading…</p>}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10, maxHeight: "60vh", overflowY: "auto" }}>
            {images.map(img => (
              <button
                key={img.path}
                onClick={() => onSelect(img.url)}
                className="pg-item"
                style={{ border: "1px solid var(--line)", padding: 0, background: "var(--surface-2)", aspectRatio: "1/1", cursor: "pointer" }}
                title={`${img.name} — click to insert`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <figcaption style={{ fontSize: 10 }}>{img.name}</figcaption>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
