import { siteConfig } from "@/lib/siteConfig";
import { ICap, IBook, IScholar, IAward, IGlobe, IPin, IDot, ILink } from "../Icons";

export default function AboutSection() {
  const skills = Object.entries(siteConfig.skillGroups);

  return (
    <section id="about" className="section">
      <div className="container">
        <header className="section-head">
          <div className="eyebrow">About</div>
          <h2 className="section-title">Background & Capabilities</h2>
          <p className="section-sub">Education, languages, and the tools I work with day to day.</p>
        </header>

        <div className="about-grid">
          {/* Education */}
          <div className="panel">
            <div className="panel-kicker"><ICap /> Education</div>
            <ul className="edu-list">
              {siteConfig.education.map((e, i) => (
                <li key={i}>
                  <div className="edu-top">
                    <span className="edu-degree">{e.degree}</span>
                    <span className="edu-year">{e.year}</span>
                  </div>
                  <div className="edu-inst">{e.institution}</div>
                  <div className="edu-meta">
                    <IPin /> {e.location}
                    {e.gpa && <><IDot /> GPA {e.gpa}</>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Thesis */}
          <div className="panel">
            <div className="panel-kicker"><IBook /> Undergraduate Thesis</div>
            <h4 className="thesis-title">{siteConfig.thesis.title}</h4>
            <div className="thesis-meta thesis-meta--stack">
              <div><span className="ml-label">Supervisor</span><span>{siteConfig.thesis.supervisor}</span></div>
              <div><span className="ml-label">Status</span><span>{siteConfig.thesis.status}</span></div>
            </div>
          </div>

          {/* Publications */}
          <div className="panel panel--wide">
            <div className="panel-kicker"><IScholar /> Publications</div>
            <ul className="pub-list">
              {siteConfig.publications.map((p, i) => (
                <li key={i}>
                  <h5>{p.title}</h5>
                  <div className="pub-venue">{p.journal}</div>
                  {p.doi && <a className="pub-doi" href={p.doi} target="_blank" rel="noreferrer"><ILink /> {p.doi.replace(/https?:\/\//, "")}</a>}
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div className="panel">
            <div className="panel-kicker"><IAward /> Achievements</div>
            <ul className="simple-list">
              {siteConfig.achievements.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>

          {/* Languages */}
          <div className="panel">
            <div className="panel-kicker"><IGlobe /> Languages</div>
            <ul className="lang-list">
              {siteConfig.languages.map((l, i) => (
                <li key={i}><span className="lang-name">{l.lang}</span><span className="lang-level">{l.level}</span></li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="panel">
            <div className="panel-kicker">Certifications</div>
            <ul className="cert-list">
              {siteConfig.certifications.map((c, i) => (
                <li key={i}>
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-meta">{c.issuer} · {c.date}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* References */}
          <div className="panel">
            <div className="panel-kicker">References</div>
            <ul className="ref-list">
              {siteConfig.referees.map((r, i) => (
                <li key={i}>
                  <div className="ref-name">{r.name}</div>
                  <div className="ref-role">{r.role}</div>
                  <div className="ref-note">{r.note}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="panel panel--wide">
            <div className="panel-kicker">Tools & Skills</div>
            <div className="skills-grid">
              {skills.map(([label, items]) => (
                <div key={label} className="skills-col">
                  <div className="skills-label">{label}</div>
                  <div className="skills-items">
                    {items.map(s => <span key={s} className="tag tag--mono">{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
