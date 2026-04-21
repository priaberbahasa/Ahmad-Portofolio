"use client";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import { IDownload, IMail, IScholar, ILinkedin, IGithub, IOrcid, IPin, ICap } from "./Icons";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">{siteConfig.title}</div>
          <h1 className="display">{siteConfig.name}</h1>
          <p className="lede">{siteConfig.heroBio_en}</p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="/cv.pdf" download><IDownload /> Download CV</a>
            <a className="btn btn-ghost" href="#contact"><IMail /> Get in touch</a>
          </div>
          <div className="hero-links">
            <a href={siteConfig.links.scholar} target="_blank" rel="noreferrer"><IScholar /> Scholar</a>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer"><ILinkedin /> LinkedIn</a>
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer"><IGithub /> GitHub</a>
            <a href={siteConfig.links.orcid} target="_blank" rel="noreferrer"><IOrcid /> ORCID</a>
          </div>
        </div>
        <div className="hero-portrait">
          <div className="portrait-wrap">
            <Image src="/images/profile.png" alt={siteConfig.name} fill priority className="object-cover" sizes="(max-width: 960px) 220px, 340px" />
          </div>
          <div className="portrait-caption">
            <div className="pc-row"><IPin /> {siteConfig.location}</div>
            <div className="pc-row"><ICap /> ITERA · 2022–2026</div>
          </div>
        </div>
      </div>
    </section>
  );
}
