import type { Metadata } from "next";
import Image from "next/image";
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

  const activityPhotos = [
    { src: "/images/activities-1.jpg", caption: "ISF-ITERA International Event" },
    { src: "/images/organization-photos.jpg", caption: "HMS ITERA Organization" },
    { src: "/images/activities-3.jpg", caption: "Flood Study Collaboration" },
    { src: "/images/work-apprentice.jpg", caption: "PT MWT Engineering Apprenticeship" },
    { src: "/images/student-exchange.jpg", caption: "Student Exchange Activities" },
    { src: "/images/activities-2.jpg", caption: "ISF-ITERA Event" },
  ];

  return (<div className="pt-20 pb-8 px-6"><div className="max-w-4xl mx-auto">
    <SectionHeading label="About" title="Ahmad Auliadi Y" subtitle="Undergraduate of Civil Engineering at ITERA — Geotechnical Engineering." />

    {/* Profile section with photo */}
    <AnimatedSection>
      <div className="flex flex-col md:flex-row gap-8 mb-14">
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <div className="relative w-48 h-56 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
            <Image src="/images/profile.png" alt="Ahmad Auliadi Y" fill priority className="object-cover" sizes="192px" />
          </div>
        </div>
        <div className="prose-academic space-y-4 flex-1">
          <p>I am a civil engineering undergraduate at <strong>Institut Teknologi Sumatera (ITERA)</strong> maintaining a <strong>3.70 GPA</strong> while actively engaged in research, organizational leadership, and professional work. My field interest is <strong>geotechnical engineering</strong>.</p>
          <p>My undergraduate thesis investigates the <strong>effects of geometry and groundwater table position on lateral displacement of liquefied slopes</strong> using numerical methods. I have two published papers in SINTA 4-indexed journals covering bored pile foundations and jetty soil-structure interaction analysis.</p>
          <p>Beyond academics, I have over six years of organizational experience and five years as a public speaker and writer. I am an <strong>ASCE Student Member (Geo-Institute)</strong> and fluent in English at C1 level (DET 140 / TOEFL ITP 600).</p>
        </div>
      </div>
    </AnimatedSection>

    {/* Activity Photos Grid */}
    <div className="divider mb-14"/>
    <SectionHeading label="Gallery" title="Activities & Experiences"/>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-14">
      {activityPhotos.map((photo, i) => (
        <AnimatedSection key={photo.src} delay={i * 0.06}>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 group">
            <Image src={photo.src} alt={photo.caption} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, 33vw" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-white text-xs font-medium">{photo.caption}</p>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>

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
