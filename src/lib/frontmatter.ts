// Lightweight client-safe frontmatter parser/serializer.
// Handles the limited YAML subset used in our MDX files: string, number,
// boolean, and bracket-style array of strings.

export type Frontmatter = Record<string, string | number | boolean | string[]>;

export function parseFrontmatter(source: string): { data: Frontmatter; content: string } {
  const m = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, content: source };
  const data: Frontmatter = {};
  const lines = m[1].split(/\r?\n/);
  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    if (!key) continue;
    let raw = line.slice(idx + 1).trim();
    if (raw === "") { data[key] = ""; continue; }

    // array like ["a", "b"]
    if (raw.startsWith("[") && raw.endsWith("]")) {
      const inner = raw.slice(1, -1).trim();
      if (!inner) { data[key] = []; continue; }
      const items = inner.split(",").map(s => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
      data[key] = items;
      continue;
    }
    // quoted string
    if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
      data[key] = raw.slice(1, -1);
      continue;
    }
    if (raw === "true") { data[key] = true; continue; }
    if (raw === "false") { data[key] = false; continue; }
    if (!isNaN(Number(raw)) && raw !== "") { data[key] = Number(raw); continue; }
    data[key] = raw;
  }
  return { data, content: m[2] };
}

function serializeValue(v: Frontmatter[string]): string {
  if (Array.isArray(v)) return `[${v.map(x => `"${String(x).replace(/"/g, '\\"')}"`).join(", ")}]`;
  if (typeof v === "boolean" || typeof v === "number") return String(v);
  return `"${String(v).replace(/"/g, '\\"')}"`;
}

export function stringifyFrontmatter(data: Frontmatter, content: string): string {
  const lines = Object.entries(data)
    .filter(([, v]) => !(typeof v === "string" && v === "" && false)) // keep empty strings for clarity
    .map(([k, v]) => `${k}: ${serializeValue(v)}`);
  const body = content.startsWith("\n") ? content : "\n" + content;
  return `---\n${lines.join("\n")}\n---${body}`;
}
