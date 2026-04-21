import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllContent } from "@/lib/content";
import { IDot } from "@/components/Icons";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const items = getAllContent("projects");
  return (
    <section className="section" style={{ borderTop: 0, paddingTop: 120 }}>
      <div className="container">
        <header className="section-head">
          <div className="eyebrow">Projects</div>
          <h1 className="section-title">Professional & Technical Work</h1>
          <p className="section-sub">Geotechnical investigations, analyses, and engineering projects.</p>
        </header>
        {items.length > 0 ? (
          <div className="project-grid">
            {items.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="project-card" style={{ textDecoration: "none" }}>
                <div className="pc-image">
                  {p.meta.thumbnail ? (
                    <Image src={p.meta.thumbnail} alt={p.meta.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 360px" />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "repeating-linear-gradient(135deg, var(--line) 0 1px, transparent 1px 10px), var(--surface)" }} />
                  )}
                </div>
                <div className="pc-content">
                  <div className="rc-meta">
                    <span>{new Date(p.meta.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span>
                    {p.meta.location && <><IDot /><span>{p.meta.location}</span></>}
                  </div>
                  <h3 className="pc-title">{p.meta.title}</h3>
                  {p.meta.role && <div className="pc-role">{p.meta.role}</div>}
                  <p className="pc-summary">{p.meta.description}</p>
                  {p.meta.tech && (
                    <div className="rc-tags">
                      {p.meta.tech.map(t => <span key={t} className="tag tag--mono">{t}</span>)}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "var(--muted)", padding: "64px 0" }}>Add .mdx files to content/projects/</p>
        )}
      </div>
    </section>
  );
}
