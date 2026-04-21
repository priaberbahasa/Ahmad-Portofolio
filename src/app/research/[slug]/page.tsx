import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllContent, getContentBySlug } from "@/lib/content";
import { IChevL, ILink, IBook } from "@/components/Icons";

export function generateStaticParams() {
  return getAllContent("research").map(i => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const i = getContentBySlug("research", params.slug);
  return i ? { title: i.meta.title } : { title: "Not Found" };
}

export default function Page({ params }: { params: { slug: string } }) {
  const item = getContentBySlug("research", params.slug);
  if (!item) notFound();
  const { meta, content } = item;
  const statusLabel = meta.status === "published" ? "Published" : meta.status === "in-review" ? "In Review" : "In Progress";

  return (
    <section className="section" style={{ borderTop: 0, paddingTop: 120 }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <Link href="/research" className="btn btn-ghost btn-sm" style={{ marginBottom: 32 }}><IChevL /> Back</Link>

        {meta.thumbnail && (
          <div style={{ aspectRatio: "16/9", position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden", border: "1px solid var(--line)", marginBottom: 32 }}>
            <Image src={meta.thumbnail} alt={meta.title} fill className="object-cover" sizes="820px" priority />
          </div>
        )}

        <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <span className={"rc-status " + (meta.status === "published" ? "is-pub" : "")} style={{ position: "static" }}>{statusLabel}</span>
          {meta.journal && <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IBook /> {meta.journal}</span>}
        </div>

        <h1 className="display display--tight" style={{ marginTop: 16, marginBottom: 16 }}>{meta.title}</h1>

        <div className="rc-meta" style={{ marginBottom: 12 }}>
          <span>{new Date(meta.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
          {meta.doi && (
            <>
              <span style={{ margin: "0 10px" }}>·</span>
              <a href={meta.doi.startsWith("http") ? meta.doi : `https://doi.org/${meta.doi}`} target="_blank" rel="noopener noreferrer" className="pub-doi"><ILink /> DOI</a>
            </>
          )}
        </div>

        {meta.tags && (
          <div className="rc-tags" style={{ marginBottom: 36 }}>
            {meta.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        )}

        <div className="prose-academic">
          {content.split("\n").map((l, i) => {
            if (l.startsWith("## ")) return <h2 key={i}>{l.replace("## ", "")}</h2>;
            if (l.startsWith("### ")) return <h3 key={i}>{l.replace("### ", "")}</h3>;
            if (l.startsWith("- ")) return <li key={i}>{l.replace("- ", "")}</li>;
            if (l.trim() === "") return <br key={i} />;
            return <p key={i}>{l}</p>;
          })}
        </div>
      </div>
    </section>
  );
}
