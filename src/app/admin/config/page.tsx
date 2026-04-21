"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DragList from "@/components/admin/DragList";
import ImagePicker from "@/components/admin/ImagePicker";

// ───────── Small styled inputs ─────────────────────────────────
const inp: React.CSSProperties = {
  width: "100%", padding: "8px 10px", border: "1px solid var(--line)", borderRadius: "var(--r)",
  background: "var(--surface)", color: "var(--ink)", fontFamily: "var(--font-sans)", fontSize: 13,
};
const mono: React.CSSProperties = { ...inp, fontFamily: "var(--mono)", fontSize: 12 };
const lbl: React.CSSProperties = { fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 };

function TextField({ label, value, onChange, placeholder, multiline, style }: any) {
  return (
    <label style={{ display: "block", marginBottom: 10 }}>
      <span style={lbl}>{label}</span>
      {multiline
        ? <textarea value={value ?? ""} onChange={(e) => onChange(e.target.value)} rows={3} style={{ ...inp, resize: "vertical", ...style }} placeholder={placeholder} />
        : <input type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} style={{ ...inp, ...style }} placeholder={placeholder} />
      }
    </label>
  );
}

function TagsField({ label, value, onChange }: any) {
  const arr: string[] = Array.isArray(value) ? value : [];
  return (
    <label style={{ display: "block", marginBottom: 10 }}>
      <span style={lbl}>{label}</span>
      <input type="text" value={arr.join(", ")} onChange={(e) => onChange(e.target.value.split(",").map(s => s.trim()).filter(Boolean))} style={inp} placeholder="item 1, item 2, item 3" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
        {arr.map((t, i) => <span key={i} className="tag">{t}</span>)}
      </div>
    </label>
  );
}

function Section({ title, children, defaultOpen = true }: any) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="panel panel--wide" style={{ marginBottom: 14 }}>
      <button type="button" onClick={() => setOpen(!open)} style={{ all: "unset", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div className="panel-kicker" style={{ margin: 0 }}>{title}</div>
        <span style={{ fontFamily: "var(--mono)", fontSize: 14, color: "var(--muted)" }}>{open ? "−" : "+"}</span>
      </button>
      {open && <div style={{ marginTop: 14 }}>{children}</div>}
    </div>
  );
}

// ───────── Main page ────────────────────────────────────────────
export default function ConfigEditorPage() {
  const [data, setData] = useState<any>(null);
  const [sha, setSha] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pickerFor, setPickerFor] = useState<{ section: string; index: number; field: string } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/config");
        const d = await res.json();
        if (!res.ok) throw new Error(d.error || "Failed to load");
        setData(d.data);
        setSha(d.sha);
      } catch (e) { setError((e as Error).message); }
      finally { setLoading(false); }
    })();
  }, []);

  function set<K extends string>(key: K, value: any) {
    setData((prev: any) => ({ ...prev, [key]: value }));
  }
  function setNested(key: string, subkey: string, value: any) {
    setData((prev: any) => ({ ...prev, [key]: { ...prev[key], [subkey]: value } }));
  }
  function setArray(key: string, next: any[]) {
    setData((prev: any) => ({ ...prev, [key]: next }));
  }
  function updateItem(key: string, idx: number, patch: any) {
    setData((prev: any) => ({ ...prev, [key]: prev[key].map((it: any, i: number) => i === idx ? { ...it, ...patch } : it) }));
  }
  function removeItem(key: string, idx: number) {
    setData((prev: any) => ({ ...prev, [key]: prev[key].filter((_: any, i: number) => i !== idx) }));
  }
  function addItem(key: string, template: any) {
    setData((prev: any) => ({ ...prev, [key]: [...(prev[key] || []), template] }));
  }

  async function save() {
    setSaving(true); setError(""); setSuccess("");
    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, sha, message: "admin: update site config" }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Save failed");
      setSha(d.newSha);
      setSuccess(`Saved. Commit: ${(d.commitSha || "").slice(0, 7)}`);
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) { setError((e as Error).message); }
    finally { setSaving(false); }
  }

  if (loading) return <div className="container" style={{ paddingTop: 40 }}><p>Loading…</p></div>;
  if (!data) return <div className="container" style={{ paddingTop: 40 }}><p style={{ color: "#b54141" }}>{error || "No data"}</p></div>;

  return (
    <div className="container" style={{ maxWidth: 900, paddingTop: 40, paddingBottom: 100 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Link href="/admin" className="btn btn-ghost btn-sm">← Dashboard</Link>
        <span className="eyebrow" style={{ margin: 0 }}>Site config · visual editor</span>
      </div>

      <h1 className="section-title" style={{ marginBottom: 4 }}>Site Configuration</h1>
      <p className="section-sub" style={{ marginBottom: 28 }}>All site data — bio, links, education, skills. Drag any row with ⋮⋮ to reorder.</p>

      <Section title="Identity">
        <TextField label="Name" value={data.name} onChange={(v: any) => set("name", v)} />
        <TextField label="Short name (shown in nav)" value={data.shortName} onChange={(v: any) => set("shortName", v)} />
        <TextField label="Title" value={data.title} onChange={(v: any) => set("title", v)} />
        <TextField label="Subtitle" value={data.subtitle} onChange={(v: any) => set("subtitle", v)} />
        <TextField label="Tagline" value={data.tagline} onChange={(v: any) => set("tagline", v)} />
        <TextField label="Location" value={data.location} onChange={(v: any) => set("location", v)} />
        <TextField label="Short bio (about page / footer)" value={data.bio} onChange={(v: any) => set("bio", v)} multiline />
        <TextField label="Hero bio (English)" value={data.heroBio_en} onChange={(v: any) => set("heroBio_en", v)} multiline />
        <TextField label="Hero bio (Indonesian)" value={data.heroBio_id} onChange={(v: any) => set("heroBio_id", v)} multiline />
      </Section>

      <Section title="Contact">
        <TextField label="Email" value={data.email} onChange={(v: any) => set("email", v)} />
        <TextField label="WhatsApp (+country…)" value={data.whatsapp} onChange={(v: any) => set("whatsapp", v)} />
        <TextField label="WhatsApp display" value={data.whatsappDisplay} onChange={(v: any) => set("whatsappDisplay", v)} />
      </Section>

      <Section title="Links">
        {Object.entries(data.links || {}).map(([k]) => (
          <TextField key={k} label={k} value={data.links[k]} onChange={(v: any) => setNested("links", k, v)} style={{ fontFamily: "var(--mono)", fontSize: 12 }} />
        ))}
      </Section>

      <Section title={`Education · ${data.education?.length || 0}`}>
        <DragList
          items={data.education || []}
          onChange={(next) => setArray("education", next)}
          keyOf={(_: any, i: number) => `edu-${i}`}
          renderItem={(item: any, i: number) => (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <TextField label="Degree" value={item.degree} onChange={(v: any) => updateItem("education", i, { degree: v })} />
                <TextField label="Year" value={item.year} onChange={(v: any) => updateItem("education", i, { year: v })} />
                <TextField label="Institution" value={item.institution} onChange={(v: any) => updateItem("education", i, { institution: v })} />
                <TextField label="Location" value={item.location} onChange={(v: any) => updateItem("education", i, { location: v })} />
                <TextField label="GPA" value={item.gpa} onChange={(v: any) => updateItem("education", i, { gpa: v })} />
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => removeItem("education", i)} style={{ marginTop: 6, color: "#b54141", fontSize: 11 }}>Remove</button>
            </div>
          )}
        />
        <button className="btn btn-ghost btn-sm" onClick={() => addItem("education", { degree: "", institution: "", location: "", year: "", gpa: "" })} style={{ marginTop: 6 }}>+ Add education</button>
      </Section>

      <Section title="Undergraduate Thesis" defaultOpen={false}>
        <TextField label="Title" value={data.thesis?.title} onChange={(v: any) => setNested("thesis", "title", v)} multiline />
        <TextField label="Supervisor" value={data.thesis?.supervisor} onChange={(v: any) => setNested("thesis", "supervisor", v)} />
        <TextField label="Status" value={data.thesis?.status} onChange={(v: any) => setNested("thesis", "status", v)} />
      </Section>

      <Section title={`Experience · ${data.experience?.length || 0}`}>
        <DragList
          items={data.experience || []}
          onChange={(next) => setArray("experience", next)}
          keyOf={(_: any, i: number) => `exp-${i}`}
          renderItem={(item: any, i: number) => (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 140px", gap: 8 }}>
                <TextField label="Role" value={item.role} onChange={(v: any) => updateItem("experience", i, { role: v })} />
                <TextField label="Organization" value={item.org} onChange={(v: any) => updateItem("experience", i, { org: v })} />
                <TextField label="Date" value={item.date} onChange={(v: any) => updateItem("experience", i, { date: v })} />
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => removeItem("experience", i)} style={{ marginTop: 6, color: "#b54141", fontSize: 11 }}>Remove</button>
            </div>
          )}
        />
        <button className="btn btn-ghost btn-sm" onClick={() => addItem("experience", { role: "", org: "", date: "" })} style={{ marginTop: 6 }}>+ Add role</button>
      </Section>

      <Section title={`Activities · ${data.activities?.length || 0} (photo gallery)`}>
        <DragList
          items={data.activities || []}
          onChange={(next) => setArray("activities", next)}
          keyOf={(_: any, i: number) => `act-${i}`}
          renderItem={(item: any, i: number) => (
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 10, alignItems: "center" }}>
              <div style={{ width: 60, height: 60, borderRadius: 6, overflow: "hidden", background: "var(--surface-2)" }}>
                {item.img && <img src={item.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
              </div>
              <div>
                <TextField label="Caption" value={item.caption} onChange={(v: any) => updateItem("activities", i, { caption: v })} />
                <TextField label="Image path" value={item.img} onChange={(v: any) => updateItem("activities", i, { img: v })} style={{ fontFamily: "var(--mono)", fontSize: 11 }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => setPickerFor({ section: "activities", index: i, field: "img" })} style={{ fontSize: 11 }}>Pick image</button>
                <button className="btn btn-ghost btn-sm" onClick={() => removeItem("activities", i)} style={{ fontSize: 11, color: "#b54141" }}>Remove</button>
              </div>
            </div>
          )}
        />
        <button className="btn btn-ghost btn-sm" onClick={() => addItem("activities", { caption: "", img: "" })} style={{ marginTop: 6 }}>+ Add photo</button>
      </Section>

      <Section title={`Achievements · ${data.achievements?.length || 0}`}>
        <DragList
          items={data.achievements || []}
          onChange={(next) => setArray("achievements", next)}
          keyOf={(_: any, i: number) => `ach-${i}`}
          renderItem={(item: string, i: number) => (
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center" }}>
              <input type="text" value={item} onChange={(e) => setArray("achievements", data.achievements.map((x: string, idx: number) => idx === i ? e.target.value : x))} style={inp} />
              <button className="btn btn-ghost btn-sm" onClick={() => removeItem("achievements", i)} style={{ fontSize: 11, color: "#b54141" }}>Remove</button>
            </div>
          )}
        />
        <button className="btn btn-ghost btn-sm" onClick={() => addItem("achievements", "")} style={{ marginTop: 6 }}>+ Add achievement</button>
      </Section>

      <Section title={`Languages · ${data.languages?.length || 0}`}>
        <DragList
          items={data.languages || []}
          onChange={(next) => setArray("languages", next)}
          keyOf={(_: any, i: number) => `lang-${i}`}
          renderItem={(item: any, i: number) => (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: 8, alignItems: "end" }}>
              <TextField label="Language" value={item.lang} onChange={(v: any) => updateItem("languages", i, { lang: v })} />
              <TextField label="Level" value={item.level} onChange={(v: any) => updateItem("languages", i, { level: v })} />
              <button className="btn btn-ghost btn-sm" onClick={() => removeItem("languages", i)} style={{ fontSize: 11, color: "#b54141" }}>Remove</button>
            </div>
          )}
        />
        <button className="btn btn-ghost btn-sm" onClick={() => addItem("languages", { lang: "", level: "" })} style={{ marginTop: 6 }}>+ Add language</button>
      </Section>

      <Section title={`Certifications · ${data.certifications?.length || 0}`}>
        <DragList
          items={data.certifications || []}
          onChange={(next) => setArray("certifications", next)}
          keyOf={(_: any, i: number) => `cert-${i}`}
          renderItem={(item: any, i: number) => (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                <TextField label="Name" value={item.name} onChange={(v: any) => updateItem("certifications", i, { name: v })} />
                <TextField label="Issuer" value={item.issuer} onChange={(v: any) => updateItem("certifications", i, { issuer: v })} />
                <TextField label="Date" value={item.date} onChange={(v: any) => updateItem("certifications", i, { date: v })} />
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => removeItem("certifications", i)} style={{ marginTop: 6, color: "#b54141", fontSize: 11 }}>Remove</button>
            </div>
          )}
        />
        <button className="btn btn-ghost btn-sm" onClick={() => addItem("certifications", { name: "", issuer: "", date: "" })} style={{ marginTop: 6 }}>+ Add cert</button>
      </Section>

      <Section title="Skills (skillGroups)" defaultOpen={false}>
        {Object.entries(data.skillGroups || {}).map(([label, items]) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <TagsField label={label} value={items as string[]} onChange={(v: any) => setNested("skillGroups", label, v)} />
          </div>
        ))}
      </Section>

      <Section title={`Referees · ${data.referees?.length || 0}`} defaultOpen={false}>
        <DragList
          items={data.referees || []}
          onChange={(next) => setArray("referees", next)}
          keyOf={(_: any, i: number) => `ref-${i}`}
          renderItem={(item: any, i: number) => (
            <div>
              <TextField label="Name" value={item.name} onChange={(v: any) => updateItem("referees", i, { name: v })} />
              <TextField label="Role" value={item.role} onChange={(v: any) => updateItem("referees", i, { role: v })} />
              <TextField label="Note" value={item.note} onChange={(v: any) => updateItem("referees", i, { note: v })} />
              <button className="btn btn-ghost btn-sm" onClick={() => removeItem("referees", i)} style={{ fontSize: 11, color: "#b54141" }}>Remove</button>
            </div>
          )}
        />
        <button className="btn btn-ghost btn-sm" onClick={() => addItem("referees", { name: "", role: "", note: "" })} style={{ marginTop: 6 }}>+ Add referee</button>
      </Section>

      <Section title="Site metadata" defaultOpen={false}>
        <TextField label="Title template" value={data.siteMeta?.titleTemplate} onChange={(v: any) => setNested("siteMeta", "titleTemplate", v)} />
        <TextField label="Description" value={data.siteMeta?.description} onChange={(v: any) => setNested("siteMeta", "description", v)} multiline />
        <TextField label="Theme color (hex)" value={data.siteMeta?.themeColor} onChange={(v: any) => setNested("siteMeta", "themeColor", v)} />
      </Section>

      {/* Save bar */}
      <div style={{ position: "sticky", bottom: 20, background: "var(--bg)", padding: "16px 0", borderTop: "1px solid var(--line)", marginTop: 32, display: "flex", gap: 12, alignItems: "center" }}>
        <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save & Commit all changes"}</button>
        <Link href="/admin" className="btn btn-ghost">Cancel</Link>
        {success && <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent)" }}>{success}</span>}
        {error && <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "#b54141" }}>{error}</span>}
      </div>

      <ImagePicker
        open={!!pickerFor}
        onClose={() => setPickerFor(null)}
        onSelect={(url) => {
          if (pickerFor) updateItem(pickerFor.section, pickerFor.index, { [pickerFor.field]: url });
          setPickerFor(null);
        }}
      />
    </div>
  );
}
