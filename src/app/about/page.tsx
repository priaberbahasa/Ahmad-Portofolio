import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import { siteConfig } from "@/lib/siteConfig";
import { GraduationCap, MapPin, Award, Globe, BookOpen } from "lucide-react";
export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  const skillGroups = [
    { label: "Programming", items: siteConfig.skills.programming },
    { label: "Geotechnical", items: siteConfig.skills.geotechnical },
    { label: "Structural", items: siteConfig.skills.structural },
    { label: "Drafting", items: siteConfig.skills.drafting },
    { label: "Numerical Methods", items: siteConfig.skills.methods },
    { label: "Tools", items: siteConfig.skills.tools },
  ];
  return (<div className="pt-20 pb-8 px-6"><div className="max-w-4xl mx-auto">
    <SectionHeading label="About" title="Ahmad Auliadi Y" subtitle="Undergraduate of Civil Engineering at ITERA — Geotechnical Engineering." />
    <AnimatedSection><div className="prose-academic mb-14 space-y-4">
      <p>I am a civil engineering undergraduate at <strong>Institut Teknologi Sumatera (ITERA)</strong> maintaining a <strong>3.70 GPA</strong> while actively engaged in research, organizational leadership, and professional work. My field interest is <strong>geotechnical engineering</strong>.</p>
      <p>My undergraduate thesis investigates the <strong>effects of geometry and groundwater table position on lateral displacement of liquefied slopes</strong> using numerical methods. I have two published papers in SINTA 4-indexed journals covering bored pile foundations and jetty soil-structure interaction analysis.</p>
      <p>Beyond academics, I have over six years of organizational experience and five years as a public speaker and writer. I am an <strong>ASCE Student Member</strong> and fluent in English at C1 level (DET 140 / TOEFL ITP 600).</p>
    </div></AnimatedSection>

    <div className="divider mb-14"/>
    <SectionHeading label="Education" title="Academic Background"/>
    <div className="space-y-3 mb-14">{siteConfig.education.map((e, i) => (
      <AnimatedSection key={i} delay={i*0.1}><div className="card p-5 flex items-start gap-4">
        <GraduationCap size={18} className="text-navy mt-0.5 flex-shrink-0"/>
        <div><h3 className="font-serif text-[15px] text-ink">{e.degree}</h3><p className="text-sm text-gold-dark mt-0.5">{e.institution}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-ink-muted"><span>{e.year}</span><span className="flex items-center gap-1"><MapPin size={10}/>{e.location}</span>{e.gpa&&<span>GPA: {e.gpa}</span>}</div>
        </div></div></AnimatedSection>))}</div>

    <div className="divider mb-14"/>
    <SectionHeading label="Publications" title="Research Publications" subtitle="H-Index: 1 — Google Scholar"/>
    <div className="space-y-3 mb-14">{siteConfig.publications.map((p, i) => (
      <AnimatedSection key={i} delay={i*0.08}><div className="card p-5 flex items-start gap-3">
        <BookOpen size={16} className="text-navy mt-0.5 flex-shrink-0"/>
        <div><h3 className="text-sm text-ink leading-snug">{p.title}</h3><p className="text-xs text-gold-dark mt-1">{p.journal}</p>
          <a href={p.doi} target="_blank" rel="noopener noreferrer" className="text-xs text-navy hover:underline mt-1 inline-block">View publication →</a>
        </div></div></AnimatedSection>))}</div>

    <div className="divider mb-14"/>
    <SectionHeading label="Languages" title="Language Proficiency"/>
    <div className="space-y-3 mb-14">{siteConfig.languages.map((l, i) => (
      <AnimatedSection key={i} delay={i*0.08}><div className="card p-4 flex items-center gap-3">
        <Globe size={14} className="text-navy"/><span className="text-sm font-medium text-ink">{l.lang}</span><span className="text-sm text-ink-muted">{l.level}</span>
      </div></AnimatedSection>))}</div>

    <div className="divider mb-14"/>
    <SectionHeading label="Recognition" title="Achievements"/>
    <div className="space-y-2 mb-14">{siteConfig.achievements.map((a, i) => (
      <AnimatedSection key={i} delay={i*0.05}><div className="card p-4 flex items-center gap-3">
        <Award size={14} className="text-gold flex-shrink-0"/><span className="text-sm text-ink">{a}</span>
      </div></AnimatedSection>))}</div>

    <div className="divider mb-14"/>
    <SectionHeading label="Technical" title="Skills & Tools"/>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{skillGroups.map((g, i) => (
      <AnimatedSection key={g.label} delay={i*0.06}><div className="card p-5">
        <h3 className="text-xs font-medium tracking-widest uppercase text-gold mb-3">{g.label}</h3>
        <div className="flex flex-wrap gap-2">{g.items.map(s=><span key={s} className="px-2.5 py-1 text-sm bg-page-muted text-ink-light rounded border border-gray-100">{s}</span>)}</div>
      </div></AnimatedSection>))}</div>
  </div></div>);
}
