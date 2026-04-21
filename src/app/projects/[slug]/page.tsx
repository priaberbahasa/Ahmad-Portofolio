import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllContent, getContentBySlug } from "@/lib/content";
import { IChevL, ILink } from "@/components/Icons";

export function generateStaticParams() {
  return getAllContent("projects").map(i => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const i = getContentBySlug("projects", params.slug);
  return i ? { title: i.meta.title } : { title: "Not Found" };
}

export default function Page({ params }: { params: { slug: string } }) {
  const item = getContentBySlug("projects", params.slug);
  if (!item) notFound();
  const { meta, content } = item;

  return (
    <section className="section" style={{ borderTop: 0, paddingTop: 120 }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <Link href="/projects" className="btn btn-ghost btn-sm" style={{ marginBottom: 32 }}><IChevL /> Back</Link>

        {meta.thumbnail && (
          <div style={{ aspectRatio: "16/9", position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden", border: "1px solid var(--line)", marginBottom: 32 }}>
            <Image src={meta.thumbnail} alt={meta.title} fill className="object-cover" sizes="820px" priority />
          </div>
        )}

        <h1 className="display display--tight" style={{ marginBottom: 16 }}>{meta.title}</h1>

        <p className="lede">{meta.description}</p>

        <div className="rc-meta" style={{ marginBottom: 16 }}>
          <span>{new Date(meta.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
          {meta.github && <><span style={{ margin: "0 10px" }}>·</span><a href={meta.github} target="_blank" rel="noopener noreferrer" className="pub-doi"><ILink /> Code</a></>}
          {meta.demo && <><span style={{ margin: "0 10px" }}>·</span><a href={meta.demo} target="_blank" rel="noopener noreferrer" className="pub-doi"><ILink /> Demo</a></>}
        </div>

        {meta.tech && (
          <div className="rc-tags" style={{ marginBottom: 12 }}>
            {meta.tech.map(t => <span key={t} className="tag tag--mono">{t}</span>)}
          </div>
        )}
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
