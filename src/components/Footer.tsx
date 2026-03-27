import Link from "next/link";
import { Linkedin, Mail, Instagram, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
export default function Footer() {
  return (<footer className="border-t border-gray-200 bg-white mt-16"><div className="max-w-5xl mx-auto px-6 py-10">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-center md:text-left">
        <Link href="/" className="font-serif text-base text-ink">{siteConfig.name}</Link>
        <p className="text-xs text-ink-muted mt-0.5">Institut Teknologi Sumatera</p>
      </div>
      <div className="flex items-center gap-5">
        <a href={`mailto:${siteConfig.email}`} className="text-ink-muted hover:text-navy transition-colors" aria-label="Email"><Mail size={16}/></a>
        <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-navy transition-colors" aria-label="WhatsApp"><MessageCircle size={16}/></a>
        <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-navy transition-colors" aria-label="LinkedIn"><Linkedin size={16}/></a>
        <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-navy transition-colors" aria-label="Instagram"><Instagram size={16}/></a>
      </div>
      <p className="text-xs text-ink-faint">&copy; {new Date().getFullYear()} {siteConfig.name}</p>
    </div>
  </div></footer>);
}
