"use client";
import { useRef, useState } from "react";
import Link from "next/link";

export default function IconManagerPage() {
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState<{ paths: string[] } | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function onPick(file: File) {
    setError(""); setDone(null);
    // Render to a 512x512 canvas for consistent icon sizing + strip metadata.
    const img = new Image();
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512; canvas.height = 512;
      const ctx = canvas.getContext("2d")!;
      // cover + center-crop
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      ctx.drawImage(img, sx, sy, size, size, 0, 0, 512, 512);
      const dataUrl = canvas.toDataURL("image/png");
      setPreview(dataUrl);
    };
    img.onerror = () => setError("Couldn't read that image. Try PNG or JPG.");
    img.src = URL.createObjectURL(file);
  }

  async function upload() {
    if (!preview) return;
    setUploading(true); setError("");
    try {
      const base64 = preview.split(",")[1];
      const res = await fetch("/api/admin/icon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64 }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Upload failed");
      setDone({ paths: d.results.map((r: any) => r.path) });
    } catch (e) { setError((e as Error).message); }
    finally { setUploading(false); }
  }

  return (
    <div className="container" style={{ maxWidth: 720, paddingTop: 40, paddingBottom: 80 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Link href="/admin" className="btn btn-ghost btn-sm">← Dashboard</Link>
        <span className="eyebrow" style={{ margin: 0 }}>Site icon</span>
      </div>

      <h1 className="section-title">Favicon & app icon</h1>
      <p className="section-sub" style={{ marginBottom: 28 }}>
        Upload a square image — it will be resized to 512×512 and committed as <code>favicon.png</code>, <code>icon-192.png</code>, <code>icon-512.png</code>, and <code>apple-icon.png</code>.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 20 }}>
        <div>
          <div style={lblStyle}>Current icon</div>
          <div style={iconBox}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/favicon.png" alt="current" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        </div>
        <div>
          <div style={lblStyle}>Preview (new)</div>
          <div style={iconBox}>
            {preview
              ? <img src={preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              : <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>No image selected</span>}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <label className="btn btn-ghost" style={{ cursor: "pointer" }}>
          Choose image
          <input ref={fileRef} type="file" accept="image/png,image/jpeg" onChange={(e) => e.target.files?.[0] && onPick(e.target.files[0])} style={{ display: "none" }} />
        </label>
        <button className="btn btn-primary" onClick={upload} disabled={!preview || uploading}>
          {uploading ? "Committing…" : "Save icon to git"}
        </button>
      </div>

      {done && (
        <div className="panel" style={{ marginTop: 16 }}>
          <div className="panel-kicker">Committed</div>
          <ul className="simple-list">
            {done.paths.map(p => <li key={p} style={{ fontFamily: "var(--mono)", fontSize: 12 }}>{p}</li>)}
          </ul>
          <p style={{ fontSize: 13, color: "var(--ink-2)", margin: "12px 0 0" }}>
            Vercel will redeploy in ~30 seconds. Browser icons are heavily cached — hard refresh (Ctrl+Shift+R) or open an incognito tab to see the change.
          </p>
        </div>
      )}
      {error && <p style={{ color: "#b54141", fontFamily: "var(--mono)", fontSize: 12 }}>{error}</p>}
    </div>
  );
}

const lblStyle: React.CSSProperties = { fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 };
const iconBox: React.CSSProperties = { width: "100%", aspectRatio: "1/1", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" };
