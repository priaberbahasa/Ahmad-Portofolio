import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Github, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getAllContent, getContentBySlug } from "@/lib/content";
export function generateStaticParams() { return getAllContent("projects").map(i=>({slug:i.slug})); }
export function generateMetadata({params}:{params:{slug:string}}) { const i=getContentBySlug("projects",params.slug); return i?{title:i.meta.title}:{title:"Not Found"}; }
export default function Page({params}:{params:{slug:string}}) {
  const item=getContentBySlug("projects",params.slug); if(!item)notFound();
  const {meta,content}=item;
  return (<div className="pt-20 pb-8 px-6"><article className="max-w-3xl mx-auto">
    <AnimatedSection><Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-navy transition-colors mb-8"><ArrowLeft size={14}/>Back</Link></AnimatedSection>
    <AnimatedSection><div className="mb-8">
      {meta.thumbnail&&<div className="aspect-video bg-page-muted rounded-lg overflow-hidden mb-6 border border-gray-200"><img src={meta.thumbnail} alt={meta.title} className="w-full h-full object-cover"/></div>}
      <h1 className="font-serif text-2xl md:text-3xl text-ink leading-snug mb-3">{meta.title}</h1>
      <p className="text-ink-light leading-relaxed mb-3">{meta.description}</p>
      <div className="flex flex-wrap items-center gap-4 text-sm text-ink-muted">
        <span className="flex items-center gap-1"><Calendar size={12}/>{new Date(meta.date).toLocaleDateString("en-US",{year:"numeric",month:"long"})}</span>
        {meta.github&&<a href={meta.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-navy hover:underline"><Github size={13}/>Code</a>}
        {meta.demo&&<a href={meta.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-navy hover:underline"><ExternalLink size={13}/>Demo</a>}
      </div>
      {meta.tech&&<div className="flex flex-wrap gap-2 mt-3">{meta.tech.map(t=><span key={t} className="px-2.5 py-0.5 text-xs font-mono bg-page-muted text-ink-light rounded border border-gray-100">{t}</span>)}</div>}
      {meta.tags&&<div className="flex flex-wrap gap-1.5 mt-3">{meta.tags.map(t=><span key={t} className="tag">{t}</span>)}</div>}
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
