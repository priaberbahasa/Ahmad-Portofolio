"use client";
// Minimal markdown → HTML preview. Handles the subset used on our site:
// # / ## / ### headings, - lists, **bold**, *italic*, `code`, [link](url),
// ![alt](src) images, --- rules, and paragraphs. Output is sanitized by
// escaping HTML in raw text before applying formatting.

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s: string) {
  let t = esc(s);
  t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_m, alt: string, src: string) =>
    `<img src="${src}" alt="${alt}" style="max-width:100%;border-radius:8px;margin:12px 0" />`);
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text: string, href: string) =>
    `<a href="${href}" target="_blank" rel="noreferrer" style="color:var(--accent);text-decoration:underline">${text}</a>`);
  t = t.replace(/`([^`]+)`/g, (_m, code: string) => `<code>${code}</code>`);
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return t;
}

export default function MarkdownPreview({ source }: { source: string }) {
  const lines = source.split(/\r?\n/);
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^#{1,3}\s+/.test(line)) {
      const level = (line.match(/^#+/) || [""])[0].length;
      const text = line.replace(/^#+\s+/, "");
      out.push(`<h${level}>${inline(text)}</h${level}>`);
      i++; continue;
    }
    if (/^(-|\*)\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^(-|\*)\s+/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^(-|\*)\s+/, ""))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join("")}</ul>`);
      continue;
    }
    if (/^---+$/.test(line.trim())) {
      out.push(`<hr />`);
      i++; continue;
    }
    if (line.trim() === "") { i++; continue; }
    // paragraph — collect until blank line
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() !== "") {
      para.push(lines[i]);
      i++;
    }
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }
  const html = out.join("\n");

  return (
    <div
      className="prose-academic"
      style={{
        padding: 16,
        background: "var(--surface-2)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-lg)",
        minHeight: 360,
        maxHeight: 520,
        overflow: "auto",
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
