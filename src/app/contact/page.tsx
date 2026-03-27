import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import { siteConfig } from "@/lib/siteConfig";
import { Mail, Linkedin, BookOpen, Instagram, MessageCircle, ExternalLink } from "lucide-react";
export const metadata: Metadata = { title: "Contact" };
export default function ContactPage() {
  const links = [
    { label:"Email", value:siteConfig.email, href:`mailto:${siteConfig.email}`, icon:Mail, desc:"Academic email — best for formal inquiries." },
    { label:"WhatsApp", value:siteConfig.whatsappDisplay, href:`https://wa.me/${siteConfig.whatsapp}`, icon:MessageCircle, desc:"Quick messages and informal discussion." },
    { label:"LinkedIn", value:"ahmadauliadiy", href:siteConfig.links.linkedin, icon:Linkedin, desc:"Professional network and updates." },
    { label:"Google Scholar", value:"H-Index: 1", href:siteConfig.links.scholar, icon:BookOpen, desc:"Publication profile and citations." },
    { label:"Instagram", value:"@ahmadauliadiyufr", href:siteConfig.links.instagram, icon:Instagram, desc:"Personal updates and activities." },
  ];
  return (<div className="pt-20 pb-8 px-6"><div className="max-w-2xl mx-auto">
    <SectionHeading label="Contact" title="Get in Touch" subtitle="Actively seeking Master's programs and research collaborations in computational geotechnical engineering."/>
    <div className="space-y-3 mb-14">{links.map((l,i)=>{ const Icon=l.icon; return (
      <AnimatedSection key={l.label} delay={i*0.08}><a href={l.href} target={l.href.startsWith("mailto")? undefined:"_blank"} rel="noopener noreferrer" className="card p-4 flex items-center gap-4 group">
        <div className="w-10 h-10 rounded-lg bg-page-muted flex items-center justify-center flex-shrink-0"><Icon size={16} className="text-navy"/></div>
        <div className="flex-1 min-w-0"><div className="flex items-center gap-1.5"><span className="text-sm font-medium text-ink">{l.label}</span><ExternalLink size={10} className="text-ink-faint opacity-0 group-hover:opacity-100 transition-opacity"/></div><p className="text-xs text-ink-muted mt-0.5">{l.desc}</p></div>
        <span className="text-xs text-ink-muted hidden sm:block">{l.value}</span>
      </a></AnimatedSection>); })}</div>
    <div className="divider mb-10"/>
    <AnimatedSection><div className="card p-6 text-center">
      <p className="text-sm text-ink-light leading-relaxed">Particularly interested in connecting with researchers working on <strong className="text-ink">earthquake-induced slope failures</strong>, <strong className="text-ink">particle-based numerical methods</strong>, and <strong className="text-ink">geotechnical earthquake engineering</strong>.</p>
    </div></AnimatedSection>
  </div></div>);
}
