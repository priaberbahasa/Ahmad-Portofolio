"use client";
import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

export default function ActivitiesSection() {
  const [modal, setModal] = useState<{ caption: string; img: string } | null>(null);

  return (
    <section id="activities" className="section section--cream">
      <div className="container">
        <header className="section-head">
          <div className="eyebrow">Experience</div>
          <h2 className="section-title">Experience & Activities</h2>
          <p className="section-sub">Click any photo to view full size.</p>
        </header>

        <div className="exp-wrap">
          <ul className="exp-list">
            {siteConfig.experience.map((e, i) => (
              <li key={i} className="exp-row">
                <span className="exp-year">{e.date}</span>
                <div>
                  <div className="exp-role">{e.role}</div>
                  <div className="exp-org">{e.org}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="photo-grid">
            {siteConfig.activities.map((a, i) => (
              <figure key={i} className="pg-item" onClick={() => setModal(a)}>
                <Image src={a.img} alt={a.caption} fill className="object-cover" sizes="(max-width: 768px) 50vw, 200px" />
                <figcaption>{a.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal modal--photo" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)} aria-label="Close">✕</button>
            <div className="photo-detail">
              <img src={modal.img} alt={modal.caption} className="photo-detail-img" />
              <div className="photo-detail-cap">{modal.caption}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
