"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import { IDot } from "../Icons";

function SafeImg({ src, alt }: { src: string; alt: string }) {
  if (!src) {
    return (
      <div style={{
        width: "100%", height: "100%",
        background: "repeating-linear-gradient(135deg, var(--line) 0 1px, transparent 1px 10px), var(--surface)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase",
      }}>[site photo]</div>
    );
  }
  return <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 360px" />;
}

export default function ProjectsSection() {
  const router = useRouter();
  return (
    <section id="projects" className="section">
      <div className="container">
        <header className="section-head">
          <div className="eyebrow">Projects</div>
          <h2 className="section-title">Field & Professional Projects</h2>
          <p className="section-sub">Click any card to see project details.</p>
        </header>
        <div className="project-grid">
          {siteConfig.projectsFeatured.map(p => (
            <article key={p.slug} className="project-card" onClick={() => router.push(`/projects/${p.slug}`)}>
              <div className="pc-image">
                <SafeImg src={p.img} alt={p.title} />
              </div>
              <div className="pc-content">
                <div className="rc-meta"><span>{p.date}</span><IDot /><span>{p.location}</span></div>
                <h3 className="pc-title">{p.title}</h3>
                <div className="pc-role">{p.role}</div>
                <p className="pc-summary">{p.summary}</p>
                <div className="rc-tags">
                  {p.tech.map(t => <span key={t} className="tag tag--mono">{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
