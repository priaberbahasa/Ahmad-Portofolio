"use client";
import { useEffect, useState } from "react";
import { subscribe, clearLog, serializeLog, type LogEntry } from "@/lib/adminLog";

// Floating audit panel. Fixed top-right on admin pages. Shows every
// adminFetch call with status, duration, size, and on error a body
// preview. Collapsed by default; expands on click. "Copy all" copies
// a JSON dump for paste-to-support.
export default function ErrorLog() {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [open, setOpen] = useState(false);
  const [justCopied, setJustCopied] = useState(false);

  useEffect(() => subscribe(setEntries), []);

  const errorCount = entries.filter(e => !e.ok).length;
  const badge = errorCount > 0
    ? { color: "#b54141", label: `${errorCount} error${errorCount !== 1 ? "s" : ""}` }
    : { color: "var(--accent)", label: `${entries.length} call${entries.length !== 1 ? "s" : ""}` };

  async function copyAll() {
    await navigator.clipboard.writeText(serializeLog(entries));
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 1500);
  }

  return (
    <div style={{ position: "fixed", top: 70, right: 16, zIndex: 90, width: open ? 480 : "auto", maxWidth: "calc(100vw - 32px)" }}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: "8px 14px", borderRadius: 999,
            background: "var(--surface)", color: badge.color,
            border: `1px solid ${badge.color}`,
            fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".08em",
            cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8,
            boxShadow: "var(--shadow-1)",
          }}
          title="Open log panel"
        >
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 99, background: badge.color }} />
          Log · {badge.label}
        </button>
      ) : (
        <div style={{
          background: "var(--surface)", border: "1px solid var(--line-2)", borderRadius: "var(--r-lg)",
          boxShadow: "var(--shadow-2)", maxHeight: "calc(100vh - 100px)", display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 99, background: badge.color }} />
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink)" }}>
                Admin log · {badge.label}
              </span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={copyAll} className="btn btn-ghost btn-sm" style={{ fontSize: 11, padding: "4px 10px" }}>
                {justCopied ? "✓ Copied" : "Copy all"}
              </button>
              <button onClick={clearLog} className="btn btn-ghost btn-sm" style={{ fontSize: 11, padding: "4px 10px" }}>Clear</button>
              <button onClick={() => setOpen(false)} className="btn btn-ghost btn-sm" style={{ fontSize: 11, padding: "4px 10px" }}>Hide</button>
            </div>
          </div>

          <div style={{ overflowY: "auto", padding: "6px 6px 10px" }}>
            {entries.length === 0 && <p style={{ padding: 16, color: "var(--muted)", fontSize: 12 }}>No requests yet.</p>}
            {entries.map(e => <LogRow key={e.id} entry={e} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function LogRow({ entry }: { entry: LogEntry }) {
  const [expanded, setExpanded] = useState(!entry.ok);
  const statusColor = !entry.ok ? "#b54141" : entry.status && entry.status < 300 ? "var(--accent)" : "var(--muted)";
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        padding: "8px 12px", borderRadius: 6, margin: "4px 8px",
        background: entry.ok ? "var(--surface-2)" : "rgba(181,65,65,0.06)",
        border: `1px solid ${entry.ok ? "var(--line)" : "rgba(181,65,65,0.25)"}`,
        cursor: "pointer", fontFamily: "var(--mono)", fontSize: 11,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <span style={{ color: statusColor, fontWeight: 600, minWidth: 34 }}>{entry.status || "—"}</span>
          <span style={{ color: "var(--ink-2)", fontWeight: 600 }}>{entry.method}</span>
          <span style={{ color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.url.replace(/^.*\/api/, "/api")}</span>
        </div>
        <div style={{ color: "var(--muted)", fontSize: 10, flexShrink: 0 }}>
          {entry.durationMs ?? "—"}ms
        </div>
      </div>
      {expanded && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed var(--line)", color: "var(--ink-2)", fontSize: 10, lineHeight: 1.6 }}>
          {entry.error && <div style={{ color: "#b54141", marginBottom: 4 }}><strong>Error:</strong> {entry.error}</div>}
          {entry.requestSize !== undefined && <div>Request body: {entry.requestSize} bytes</div>}
          {entry.meta?.contentType && <div>Content-Type: {entry.meta.contentType}</div>}
          {entry.meta?.via && <div>Server: {entry.meta.via}</div>}
          {entry.meta?.swActive !== undefined && <div>Service worker: {entry.meta.swActive ? "⚠ ACTIVE" : "clean"}</div>}
          {entry.body && (
            <div style={{ marginTop: 6 }}>
              <div style={{ color: "var(--muted)" }}>Response body:</div>
              <pre style={{ whiteSpace: "pre-wrap", margin: "4px 0 0", background: "var(--surface)", padding: 8, borderRadius: 4, maxHeight: 200, overflow: "auto", fontSize: 10 }}>{entry.body || "(empty)"}</pre>
            </div>
          )}
          <div style={{ color: "var(--faint)", marginTop: 6 }}>{new Date(entry.ts).toISOString()}</div>
        </div>
      )}
    </div>
  );
}
