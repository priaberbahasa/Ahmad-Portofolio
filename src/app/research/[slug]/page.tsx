import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getAllContent, getContentBySlug } from "@/lib/content";
const sc:Record<string,string> = { published:"bg-green-50 text-green-700 border-green-200", "in-review":"bg-amber-50 text-amber-700 border-amber-200", "in-progress":"bg-blue-50 text-blue-700 border-blue-200" };
export function generateStaticParams() { return getAllContent("research").map(i=>({slug:i.slug})); }
export function generateMetadata({params}:{params:{slug:string}}) { const i=getContentBySlug("research",params.slug); return i?{title:i.meta.title}:{title:"Not Found"}; }
export default function Page({params}:{params:{slug:string}}) {
  const item=getContentBySlug("research",params.slug); if(!item) notFound();
  const {meta,content}=item; const s=meta.status||"in-progress";
  return (<div className="pt-20 pb-8 px-6"><article className="max-w-3xl mx-auto">
    <AnimatedSection><Link href="/research" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-navy transition-colors mb-8"><ArrowLeft size={14}/>Back</Link></AnimatedSection>
    <AnimatedSection><div className="mb-8">
      <div className="flex items-center gap-3 mb-3"><span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded border ${sc[s]}`}>{s}</span>{meta.journal&&<span className="text-xs text-ink-muted flex items-center gap-1"><BookOpen size={12}/>{meta.journal}</span>}</div>
      <h1 className="font-serif text-2xl md:text-3xl text-ink leading-snug mb-3">{meta.title}</h1>
      <div className="flex flex-wrap items-center gap-4 text-sm text-ink-muted">
        <span className="flex items-center gap-1"><Calendar size={12}/>{new Date(meta.date).toLocaleDateString("en-US",{year:"numeric",month:"long"})}</span>
        {meta.doi&&<a href={meta.doi.startsWith("http")?meta.doi:`https://doi.org/${meta.doi}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-navy hover:underline">DOI<ExternalLink size={10}/></a>}
      </div>
      <div className="flex flex-wrap gap-1.5 mt-3">{meta.tags?.map(t=><span key={t} className="tag">{t}</span>)}</div>
    </div></AnimatedSection>
    <div className="divider mb-8"/>
    <AnimatedSection><div className="prose-academic">{content.split("\n").map((l,i)=>{
      if(l.startsWith("## "))return<h2 key={i}>{l.replace("## ","")}</h2>;
      if(l.startsWith("### "))return<h3 key={i}>{l.replace("### ","")}</h3>;
      if(l.startsWith("- "))return<li key={i}>{l.replace("- ","")}</li>;
      if(l.trim()==="")return<br key={i}/>;
      return<p key={i}>{l}</p>;
    })}</div></AnimatedSection>
  </article></div>);
}
