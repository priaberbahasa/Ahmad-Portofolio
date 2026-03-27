import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import { getAllContent } from "@/lib/content";
export const metadata: Metadata = { title: "Projects" };
export default function ProjectsPage() {
  const p = getAllContent("projects");
  return (<div className="pt-20 pb-8 px-6"><div className="max-w-5xl mx-auto">
    <SectionHeading label="Projects" title="Professional & Technical Work" subtitle="Geotechnical investigations, analyses, and engineering projects."/>
    {p.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{p.map((i,n)=><AnimatedSection key={i.slug} delay={n*0.08}><ProjectCard slug={i.slug} meta={i.meta}/></AnimatedSection>)}</div>
    : <p className="text-ink-muted text-sm text-center py-16">Add .mdx files to content/projects/</p>}
  </div></div>);
}
