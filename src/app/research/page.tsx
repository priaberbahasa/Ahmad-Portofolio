import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import ResearchCard from "@/components/ResearchCard";
import { getAllContent } from "@/lib/content";
export const metadata: Metadata = { title: "Research" };
export default function ResearchPage() {
  const r = getAllContent("research");
  return (<div className="pt-20 pb-8 px-6"><div className="max-w-5xl mx-auto">
    <SectionHeading label="Research" title="Publications & Research" subtitle="Geotechnical engineering research and numerical analysis."/>
    {r.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{r.map((i,n)=><AnimatedSection key={i.slug} delay={n*0.08}><ResearchCard slug={i.slug} meta={i.meta}/></AnimatedSection>)}</div>
    : <p className="text-ink-muted text-sm text-center py-16">Add .mdx files to content/research/</p>}
  </div></div>);
}
