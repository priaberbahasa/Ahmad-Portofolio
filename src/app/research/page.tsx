import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllContent } from "@/lib/content";
import { IDot } from "@/components/Icons";

export const metadata: Metadata = { title: "Research" };

export default function ResearchPage() {
  const items = getAllContent("research");
  return (
    <section className="section" style={{ borderTop: 0, paddingTop: 120 }}>
      <div className="container">
        <header className="section-head">
          <div className="eyebrow">Research</div>
          <h1 className="section-title">Publications & Research</h1>
          <p className="section-sub">Geotechnical engineering research and numerical analysis.</p>
        </header>
        {items.length > 0 ? (
          <div className="project-grid">
            {items.map((i) => {
              const statusLabel = i.meta.status === "published" ? "Published" : i.meta.status === "in-review" ? "In Review" : "In Progress";
              return (
                <Link key={i.slug} href={`/research/${i.slug}`} className="research-card" style={{ textDecoration: "none" }}>
                  <div className="rc-media">
                    {i.meta.thumbnail ? (
                      <Image src={i.meta.thumbnail} alt={i.meta.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 360px" />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "repeating-linear-gradient(135deg, var(--line) 0 1px, transparent 1px 10px), var(--surface)" }} />
                    )}
                    <span className={"rc-status " + (i.meta.status === "published" ? "is-pub" : "")}>{statusLabel}</span>
                  </div>
                  <div className="rc-body">
                    <div className="rc-meta">
                      <span>{new Date(i.meta.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span>
                      {i.meta.journal && <><IDot /><span className="rc-venue">{i.meta.journal}</span></>}
                    </div>
                    <h3 className="rc-title">{i.meta.title}</h3>
                    <p className="rc-summary">{i.meta.description}</p>
                    <div className="rc-tags">
                      {i.meta.tags?.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "var(--muted)", padding: "64px 0" }}>Add .mdx files to content/research/</p>
        )}
      </div>
    </section>
  );
}
