import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { ContentMeta } from "@/lib/content";
export default function ProjectCard({ slug, meta }: { slug:string; meta:ContentMeta }) {
  return (<article className="card overflow-hidden h-full flex flex-col group">
    {/* ADMIN: Add thumbnail by putting an image in public/images/ and setting thumbnail in .mdx frontmatter */}
    {meta.thumbnail && <div className="aspect-video bg-page-muted overflow-hidden"><img src={meta.thumbnail} alt={meta.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"/></div>}
    <div className="p-5 flex flex-col flex-1">
      <h3 className="font-serif text-base text-ink group-hover:text-navy transition-colors mb-2 leading-snug">
        <Link href={`/projects/${slug}`}>{meta.title}<ArrowUpRight size={14} className="inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-navy"/></Link>
      </h3>
      <p className="text-sm text-ink-light leading-relaxed mb-4 flex-1">{meta.description}</p>
      {meta.tech && <div className="flex flex-wrap gap-1.5 mb-3">{meta.tech.map(t=><span key={t} className="inline-block px-2 py-0.5 text-[11px] font-mono bg-page-muted text-ink-light rounded">{t}</span>)}</div>}
      <div className="flex items-center gap-4 pt-3 border-t border-gray-100 text-xs text-ink-muted">
        {meta.github && <a href={meta.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-navy transition-colors"><Github size={12}/>Code</a>}
        {meta.demo && <a href={meta.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-navy transition-colors"><ExternalLink size={12}/>Demo</a>}
        <span className="ml-auto">{new Date(meta.date).toLocaleDateString("en-US",{year:"numeric",month:"short"})}</span>
      </div>
    </div>
  </article>);
}
