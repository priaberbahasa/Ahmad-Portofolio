import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContentMeta } from "@/lib/content";
const sc: Record<string, string> = { published:"bg-green-50 text-green-700 border-green-200", "in-review":"bg-amber-50 text-amber-700 border-amber-200", "in-progress":"bg-blue-50 text-blue-700 border-blue-200" };
export default function ResearchCard({ slug, meta }: { slug:string; meta:ContentMeta }) {
  const s = meta.status || "in-progress";
  return (<Link href={`/research/${slug}`} className="block group"><article className="card p-5 h-full flex flex-col">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs text-ink-muted">{meta.journal || "Research"}</span>
      <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded border ${sc[s]}`}>{s}</span>
    </div>
    <h3 className="font-serif text-base text-ink group-hover:text-navy transition-colors mb-2 leading-snug">{meta.title}<ArrowUpRight size={14} className="inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-navy"/></h3>
    <p className="text-sm text-ink-light leading-relaxed mb-4 flex-1">{meta.description}</p>
    <div className="flex flex-wrap gap-1.5">{meta.tags?.slice(0,4).map(t=><span key={t} className="tag">{t}</span>)}</div>
  </article></Link>);
}
