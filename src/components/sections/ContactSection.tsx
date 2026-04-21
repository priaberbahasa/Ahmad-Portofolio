"use client";
import { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { IMail, ILink, IScholar, ILinkedin, IGithub, IOrcid, IArrowRight } from "../Icons";

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="section section--cream">
      <div className="container">
        <header className="section-head">
          <div className="eyebrow">Contact</div>
          <h2 className="section-title">Let&apos;s talk</h2>
          <p className="section-sub">Open to Master&apos;s conversations, research collaborations, and geotechnical projects.</p>
        </header>

        <div className="contact-grid">
          <div className="contact-info">
            <a href={`mailto:${siteConfig.email}`} className="contact-row"><IMail /> <span>{siteConfig.email}</span></a>
            <a href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="contact-row"><ILink /> <span>{siteConfig.whatsappDisplay}</span></a>
            <a href={siteConfig.links.scholar} target="_blank" rel="noreferrer" className="contact-row"><IScholar /> <span>Google Scholar</span></a>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="contact-row"><ILinkedin /> <span>LinkedIn</span></a>
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="contact-row"><IGithub /> <span>GitHub</span></a>
            <a href={siteConfig.links.orcid} target="_blank" rel="noreferrer" className="contact-row"><IOrcid /> <span>ORCID</span></a>
          </div>
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <label>
              <span>Your name</span>
              <input type="text" required placeholder="Jane Doe" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" required placeholder="you@university.edu" />
            </label>
            <label>
              <span>Message</span>
              <textarea rows={5} required placeholder="A short message…" />
            </label>
            <button type="submit" className="btn btn-primary" disabled={sent}>
              {sent ? "Sent — thank you" : <>Send message <IArrowRight /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
