"use client";
import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import TopicCarousel from "../TopicCarousel";

export default function ResearchSection() {
  const topics = siteConfig.researchTopics;
  const [topicIdx, setTopicIdx] = useState(0);

  return (
    <section id="research" className="section section--cream">
      <div className="container">
        <header className="section-head">
          <div className="eyebrow">Research</div>
          <h2 className="section-title">Research by Topic</h2>
          <p className="section-sub">Swipe left or right to browse. Click any card to open the full research page.</p>
        </header>

        <div className="topic-tabs">
          {topics.map((t, i) => (
            <button key={t.topic} className={"tab" + (i === topicIdx ? " is-on" : "")} onClick={() => setTopicIdx(i)}>
              <span className="tab-num">{String(i + 1).padStart(2, "0")}</span>
              <span>{t.topic}</span>
            </button>
          ))}
        </div>

        <TopicCarousel
          topic={topics[topicIdx]}
          onOpen={(item) => { window.location.href = `/research/${item.slug}`; }}
        />

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link href="/research" className="btn btn-ghost">View all research</Link>
        </div>
      </div>
    </section>
  );
}
