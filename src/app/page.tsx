import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import ResearchCard from "@/components/ResearchCard";
import ProjectCard from "@/components/ProjectCard";
import { getAllContent } from "@/lib/content";
import { siteConfig } from "@/lib/siteConfig";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const research = getAllContent("research").slice(0, 3);
  const projects = getAllContent("projects").slice(0, 3);
  const acts = [...getAllContent("experience"), ...getAllContent("activities")].sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()).slice(0, 4);

  return (<>
    <HeroSection />

    {/* Research Interests */}
    <section className="py-16 px-6"><div className="max-w-5xl mx-auto">
      <SectionHeading label="Focus Areas" title="Research Interests" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {siteConfig.researchInterests.map((r, i) => (
          <AnimatedSection key={r.area} delay={i * 0.08}><div className="card p-5">
            <h3 className="font-serif text-[15px] text-ink mb-2">{r.area}</h3>
            <div className="flex flex-wrap gap-1.5">{r.keywords.map(k => <span key={k} className="tag">{k}</span>)}</div>
          </div></AnimatedSection>))}
      </div>
    </div></section>

    <div className="divider max-w-5xl mx-auto" />

    {/* Research */}
    {research.length > 0 && <section className="py-16 px-6"><div className="max-w-5xl mx-auto">
      <SectionHeading label="Research" title="Publications & Ongoing Work" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{research.map((item, i) => <AnimatedSection key={item.slug} delay={i * 0.08}><ResearchCard slug={item.slug} meta={item.meta}/></AnimatedSection>)}</div>
      <AnimatedSection className="mt-6 text-center"><Link href="/research" className="inline-flex items-center gap-1.5 text-sm text-navy hover:underline">View all research <ArrowRight size={14}/></Link></AnimatedSection>
    </div></section>}

    <div className="divider max-w-5xl mx-auto" />

    {/* Projects */}
    {projects.length > 0 && <section className="py-16 px-6"><div className="max-w-5xl mx-auto">
      <SectionHeading label="Projects" title="Professional & Technical Work" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{projects.map((item, i) => <AnimatedSection key={item.slug} delay={i * 0.08}><ProjectCard slug={item.slug} meta={item.meta}/></AnimatedSection>)}</div>
      <AnimatedSection className="mt-6 text-center"><Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-navy hover:underline">View all projects <ArrowRight size={14}/></Link></AnimatedSection>
    </div></section>}

    <div className="divider max-w-5xl mx-auto" />

    {/* Activities Preview */}
    {acts.length > 0 && <section className="py-16 px-6"><div className="max-w-5xl mx-auto">
      <SectionHeading label="Activities" title="Leadership & Experience" />
      <div className="space-y-3">{acts.map((item, i) => (
        <AnimatedSection key={item.slug} delay={i * 0.06}><div className="card p-4 flex items-start gap-3">
          <Calendar size={14} className="text-navy mt-1 flex-shrink-0"/>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3"><h3 className="text-sm font-medium text-ink truncate">{item.meta.role || item.meta.title}</h3><span className="text-xs text-ink-muted flex-shrink-0">{item.meta.startDate || item.meta.date}</span></div>
            {item.meta.organization && <p className="text-xs text-gold-dark mt-0.5">{item.meta.organization}</p>}
          </div>
        </div></AnimatedSection>))}</div>
      <AnimatedSection className="mt-6 text-center"><Link href="/activities" className="inline-flex items-center gap-1.5 text-sm text-navy hover:underline">View all activities <ArrowRight size={14}/></Link></AnimatedSection>
    </div></section>}

    {/* CTA */}
    <section className="py-16 px-6"><AnimatedSection><div className="max-w-2xl mx-auto text-center">
      <h2 className="font-serif text-2xl text-ink mb-3">Open to Collaboration</h2>
      <p className="text-ink-light mb-6 text-[15px] leading-relaxed">Actively seeking Master&apos;s programs and research collaborations in computational geotechnical engineering.</p>
      <a href="/contact" className="inline-block px-6 py-2.5 bg-navy text-white text-sm font-medium rounded-md hover:bg-navy-light transition-colors">Get in Touch</a>
    </div></AnimatedSection></section>
  </>);
}
