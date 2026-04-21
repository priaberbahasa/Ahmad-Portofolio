"use client";
import { useState } from "react";
import type { Frontmatter } from "@/lib/frontmatter";
import ImagePicker from "./ImagePicker";
import MarkdownPreview from "./MarkdownPreview";

// All known frontmatter keys across our content types.
// Each gets a structured input; unknown keys fall back to a text input so
// nothing is ever silently dropped on save.
const FIELD_DEFS: Record<string, { label: string; type: "text" | "longtext" | "date" | "tags" | "bool" | "image" | "select"; options?: string[]; hint?: string }> = {
  title:        { label: "Title",         type: "text" },
  description:  { label: "Description",   type: "longtext" },
  date:         { label: "Date",          type: "date" },
  published:    { label: "Published",     type: "bool" },
  tags:         { label: "Tags",          type: "tags", hint: "Comma-separated" },
  thumbnail:    { label: "Thumbnail",     type: "image" },
  category:     { label: "Category",      type: "select", options: ["", "work", "education", "organization"] },
  role:         { label: "Role",          type: "text" },
  organization: { label: "Organization",  type: "text" },
  location:     { label: "Location",      type: "text" },
  startDate:    { label: "Start date",    type: "text", hint: "e.g. Jun 2025" },
  endDate:      { label: "End date",      type: "text", hint: "e.g. Aug 2025 or Present" },
  journal:      { label: "Journal",       type: "text" },
  doi:          { label: "DOI",           type: "text" },
  status:       { label: "Status",        type: "select", options: ["", "published", "in-review", "in-progress"] },
  github:       { label: "GitHub",        type: "text" },
  demo:         { label: "Demo URL",      type: "text" },
};

// Fields to show on a fresh form (in order). Extra keys found in existing
// frontmatter are appended automatically.
const DEFAULT_ORDER = [
  "title", "description", "date", "published", "tags", "thumbnail",
  "category", "role", "organization", "location", "startDate", "endDate",
  "journal", "doi", "status", "github", "demo",
];

export default function MDXFormEditor({
  initialData,
  initialContent,
  onChange,
}: {
  initialData: Frontmatter;
  initialContent: string;
  onChange: (data: Frontmatter, content: string) => void;
}) {
  const [data, setData] = useState<Frontmatter>(initialData);
  const [content, setContent] = useState(initialContent);
  const [pickerFor, setPickerFor] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  function update(patch: Frontmatter, newContent?: string) {
    const next = { ...data, ...patch };
    setData(next);
    const c = newContent ?? content;
    if (newContent !== undefined) setContent(newContent);
    onChange(next, c);
  }

  const extraKeys = Object.keys(data).filter(k => !DEFAULT_ORDER.includes(k));
  const orderedKeys = [...DEFAULT_ORDER, ...extraKeys];

  function renderField(key: string) {
    const def = FIELD_DEFS[key] || { label: key, type: "text" as const };
    const val = data[key];

    const labelBlock = (
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" }}>{def.label}</span>
        {def.hint && <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--faint)" }}>{def.hint}</span>}
      </div>
    );

    const baseInput: React.CSSProperties = {
      width: "100%", padding: "10px 12px", border: "1px solid var(--line)", borderRadius: "var(--r)",
      background: "var(--surface)", color: "var(--ink)", fontFamily: "var(--font-sans)", fontSize: 14,
    };

    if (def.type === "longtext") {
      return (
        <div key={key} style={{ gridColumn: "span 2" }}>
          {labelBlock}
          <textarea value={String(val ?? "")} rows={2} onChange={(e) => update({ [key]: e.target.value })} style={{ ...baseInput, resize: "vertical", fontFamily: "var(--font-sans)" }} />
        </div>
      );
    }
    if (def.type === "date") {
      return (
        <div key={key}>
          {labelBlock}
          <input type="date" value={String(val ?? "")} onChange={(e) => update({ [key]: e.target.value })} style={baseInput} />
        </div>
      );
    }
    if (def.type === "bool") {
      return (
        <div key={key}>
          {labelBlock}
          <label style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 0" }}>
            <input type="checkbox" checked={Boolean(val)} onChange={(e) => update({ [key]: e.target.checked })} />
            <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{Boolean(val) ? "Published — visible on site" : "Draft — hidden from site"}</span>
          </label>
        </div>
      );
    }
    if (def.type === "tags") {
      const arr = Array.isArray(val) ? val : [];
      return (
        <div key={key} style={{ gridColumn: "span 2" }}>
          {labelBlock}
          <input
            type="text"
            value={arr.join(", ")}
            onChange={(e) => update({ [key]: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
            style={baseInput}
            placeholder="FEM, Slope Stability, Liquefaction"
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {arr.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      );
    }
    if (def.type === "image") {
      return (
        <div key={key} style={{ gridColumn: "span 2" }}>
          {labelBlock}
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <input type="text" value={String(val ?? "")} onChange={(e) => update({ [key]: e.target.value })} style={{ ...baseInput, flex: 1, fontFamily: "var(--mono)", fontSize: 12 }} placeholder="/images/..." />
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPickerFor(key)}>Pick image</button>
          </div>
          {val && (
            <div style={{ marginTop: 10, width: 180, aspectRatio: "4/3", border: "1px solid var(--line)", borderRadius: 6, overflow: "hidden", background: "var(--surface-2)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={String(val)} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
        </div>
      );
    }
    if (def.type === "select") {
      return (
        <div key={key}>
          {labelBlock}
          <select value={String(val ?? "")} onChange={(e) => update({ [key]: e.target.value })} style={baseInput}>
            {def.options!.map(o => <option key={o} value={o}>{o || "(none)"}</option>)}
          </select>
        </div>
      );
    }
    // default text
    return (
      <div key={key}>
        {labelBlock}
        <input type="text" value={String(val ?? "")} onChange={(e) => update({ [key]: e.target.value })} style={baseInput} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
        {orderedKeys.map(renderField)}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" }}>Body (Markdown)</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPickerFor("__body__")}>
            Insert image
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? "Hide preview" : "Show preview"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: showPreview ? "1fr 1fr" : "1fr", gap: 16 }}>
        <textarea
          value={content}
          onChange={(e) => update({}, e.target.value)}
          spellCheck={false}
          style={{
            width: "100%", minHeight: 360, padding: 16,
            border: "1px solid var(--line)", borderRadius: "var(--r-lg)",
            background: "var(--surface)", color: "var(--ink)",
            fontFamily: "var(--mono)", fontSize: 13, lineHeight: 1.6, resize: "vertical",
          }}
        />
        {showPreview && <MarkdownPreview source={content} />}
      </div>

      <ImagePicker
        open={!!pickerFor}
        onClose={() => setPickerFor(null)}
        onSelect={(url) => {
          if (pickerFor === "__body__") {
            const insert = `\n\n![image](${url})\n\n`;
            update({}, content + insert);
          } else if (pickerFor) {
            update({ [pickerFor]: url });
          }
          setPickerFor(null);
        }}
      />
    </div>
  );
}
