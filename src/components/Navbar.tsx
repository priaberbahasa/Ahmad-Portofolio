"use client";
import { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { IDownload, IMenu, IX } from "./Icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="/#home" className="brand-mark">{siteConfig.shortName}</a>
        <ul className="nav-links">
          {siteConfig.navLinks.map(l => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
        <div className="nav-actions">
          <a className="btn btn-primary btn-sm hide-m" href="/cv.pdf" download><IDownload /> CV</a>
          <button className="icon-btn mobile-only" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <IX /> : <IMenu />}</button>
        </div>
      </div>
      {open && (
        <div className="mobile-sheet" onClick={() => setOpen(false)}>
          {siteConfig.navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          <a href="/cv.pdf" download className="btn btn-primary">Download CV <IDownload /></a>
        </div>
      )}
    </nav>
  );
}
