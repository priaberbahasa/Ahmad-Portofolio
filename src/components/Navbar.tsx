"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  useEffect(() => { const h = () => setScrolled(window.scrollY > 10); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${scrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm" : "bg-transparent"}`}>
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-serif text-lg text-ink hover:text-navy transition-colors">{siteConfig.shortName}</Link>
        <ul className="hidden md:flex items-center gap-1">
          {siteConfig.navLinks.map(l => (
            <li key={l.href}><Link href={l.href} className={`px-3 py-1.5 text-sm transition-colors rounded ${path === l.href || (l.href !== "/" && path.startsWith(l.href)) ? "text-navy font-medium" : "text-ink-muted hover:text-ink"}`}>{l.label}</Link></li>
          ))}
        </ul>
        <button onClick={() => setOpen(!open)} className="md:hidden text-ink-muted hover:text-ink" aria-label="Menu">{open ? <X size={20}/> : <Menu size={20}/>}</button>
      </nav>
      {open && <div className="md:hidden bg-white border-b border-gray-200"><ul className="px-6 py-3 space-y-1">
        {siteConfig.navLinks.map(l => <li key={l.href}><Link href={l.href} className={`block px-3 py-2 text-sm rounded ${path === l.href ? "text-navy font-medium bg-page-muted" : "text-ink-muted hover:text-ink"}`}>{l.label}</Link></li>)}
      </ul></div>}
    </header>
  );
}
