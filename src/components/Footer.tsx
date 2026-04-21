import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-name">{siteConfig.name}</div>
          <div className="footer-sub">{siteConfig.title}</div>
        </div>
        <div className="footer-links">
          <a href={siteConfig.links.scholar} target="_blank" rel="noreferrer">Scholar</a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`mailto:${siteConfig.email}`}>Email</a>
        </div>
        <div className="footer-copy">© {new Date().getFullYear()} {siteConfig.name} · Built with care</div>
      </div>
    </footer>
  );
}
