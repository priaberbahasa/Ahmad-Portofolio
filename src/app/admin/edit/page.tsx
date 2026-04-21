"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { parseFrontmatter, stringifyFrontmatter, type Frontmatter } from "@/lib/frontmatter";
import MDXFormEditor from "@/components/admin/MDXFormEditor";
import { adminFetch } from "@/lib/adminFetch";

function mdxTemplate(slug: string) {
  return `---
title: "New entry — ${slug}"
date: "${new Date().toISOString().slice(0,10)}"
description: ""
tags: []
published: true
category: "organization"
role: ""
organization: ""
location: ""
startDate: ""
endDate: ""
---

## Overview

Write content here.
`;
}

function EditInner() {
  const router = useRouter();
  const search = useSearchParams();
  const path = search.get("path") || "";
  const isNew = search.get("new") === "1";
  const isMDX = path.endsWith(".mdx");

  const [rawContent, setRawContent] = useState("");
  const [sha, setSha] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [customPath, setCustomPath] = useState(path);

  // For MDX files, we also keep the parsed form state.
  const [fmData, setFmData] = useState<Frontmatter>({});
  const [fmBody, setFmBody] = useState("");

  useEffect(() => {
    if (!path) { setLoading(false); return; }
    const loadInitial = (source: string) => {
      setRawContent(source);
      if (isMDX) {
        const { data, content } = parseFrontmatter(source);
        setFmData(data);
        setFmBody(content);
      }
    };
    if (isNew) {
      const slug = path.split("/").pop()?.replace(".mdx", "") || "new-entry";
      loadInitial(mdxTemplate(slug));
      setSha(undefined);
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const d = await adminFetch<{ content: string; sha: string }>(`/api/admin/file?path=${encodeURIComponent(path)}`);
        loadInitial(d.content);
        setSha(d.sha);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, [path, isNew, isMDX]);

  async function save() {
    setSaving(true); setError(""); setSuccess("");
    try {
      const toSave = isMDX ? stringifyFrontmatter(fmData, fmBody) : rawContent;
      const d = await adminFetch<{ ok: true; newSha: string; commitSha: string }>("/api/admin/file", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: customPath,
          content: toSave,
          sha: isNew ? undefined : sha,
          message: `admin: ${isNew ? "create" : "update"} ${customPath}`,
        }),
      });
      setSha(d.newSha);
      setSuccess(`Saved. Commit: ${(d.commitSha || "").slice(0, 7)}`);
      if (isNew) setTimeout(() => router.replace(`/admin/edit?path=${encodeURIComponent(customPath)}`), 800);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (!path) return <div className="container"><p>Missing <code>?path=</code> parameter.</p></div>;

  return (
    <div className="container" style={{ maxWidth: 1000, paddingTop: 40, paddingBottom: 80 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Link href="/admin" className="btn btn-ghost btn-sm">← Dashboard</Link>
        <span className="eyebrow" style={{ margin: 0 }}>
          {isNew ? "Creating" : "Editing"} · {isMDX ? "MDX form" : "Raw text"}
        </span>
      </div>

      {isNew && (
        <label style={{ display: "block", marginBottom: 16 }}>
          <span className="ml-label">File path</span>
          <input
            type="text"
            value={customPath}
            onChange={(e) => setCustomPath(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--line)", borderRadius: "var(--r)", background: "var(--surface)", fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink)", marginTop: 6 }}
          />
        </label>
      )}

      {!isNew && <h1 className="section-title" style={{ fontSize: 20, marginTop: 4, marginBottom: 20 }}>{path}</h1>}

      {loading ? <p style={{ color: "var(--muted)" }}>Loading…</p> : (
        isMDX ? (
          <MDXFormEditor
            initialData={fmData}
            initialContent={fmBody}
            onChange={(data, body) => { setFmData(data); setFmBody(body); }}
          />
        ) : (
          <textarea
            value={rawContent}
            onChange={(e) => setRawContent(e.target.value)}
            spellCheck={false}
            style={{
              width: "100%", minHeight: 520,
              padding: 16, border: "1px solid var(--line)", borderRadius: "var(--r-lg)",
              background: "var(--surface)", color: "var(--ink)",
              fontFamily: "var(--mono)", fontSize: 13, lineHeight: 1.55, resize: "vertical",
            }}
          />
        )
      )}

      {!loading && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
          <button className="btn btn-primary" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save & Commit"}
          </button>
          <Link href="/admin" className="btn btn-ghost">Cancel</Link>
          {success && <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent)" }}>{success}</span>}
          {error && <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "#b54141" }}>{error}</span>}
        </div>
      )}
    </div>
  );
}

export default function EditPage() {
  return <Suspense fallback={<div className="container"><p>Loading…</p></div>}><EditInner /></Suspense>;
}
