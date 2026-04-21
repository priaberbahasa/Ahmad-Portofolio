"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IChevL, IChevR, IArrowRight, IDot } from "./Icons";

type ResearchItem = {
  slug: string; title: string; date: string; venue: string;
  status: string; tags: string[]; img: string; summary: string; doi?: string;
};
type Topic = { topic: string; blurb: string; items: ResearchItem[] };

function SafeImg({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(!src);
  if (err || !src) {
    return (
      <div style={{
        width: "100%", height: "100%",
        background: "repeating-linear-gradient(135deg, var(--line) 0 1px, transparent 1px 10px), var(--surface)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase",
      }}>[figure]</div>
    );
  }
  return <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 520px" onError={() => setErr(true)} />;
}

function ResearchCard({ item, onOpen }: { item: ResearchItem; onOpen: (item: ResearchItem) => void }) {
  return (
    <article className="research-card" onClick={() => onOpen(item)}>
      <div className="rc-media">
        <SafeImg src={item.img} alt={item.title} />
        <span className={"rc-status " + (item.status === "Published" ? "is-pub" : "is-prog")}>{item.status}</span>
      </div>
      <div className="rc-body">
        <div className="rc-meta">
          <span>{item.date}</span>
          <IDot />
          <span className="rc-venue">{item.venue}</span>
        </div>
        <h3 className="rc-title">{item.title}</h3>
        <p className="rc-summary">{item.summary}</p>
        <div className="rc-tags">
          {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className="rc-foot">
          <span className="rc-readmore">Read more <IArrowRight /></span>
        </div>
      </div>
    </article>
  );
}

export default function TopicCarousel({ topic, onOpen }: { topic: Topic; onOpen: (item: ResearchItem) => void }) {
  const { items, topic: name, blurb } = topic;
  const [idx, setIdx] = useState(0);
  const [drag, setDrag] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(360);
  const dragState = useRef({ active: false, startX: 0 });

  // reset index on topic change
  useEffect(() => { setIdx(0); setDrag(0); }, [name]);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      const w = wrapRef.current?.clientWidth || 800;
      if (w < 520) setCardW(Math.min(w - 48, 360));
      else if (w < 820) setCardW(Math.min(w - 140, 460));
      else setCardW(Math.min(520, w * 0.55));
    });
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const go = (n: number) => setIdx(Math.max(0, Math.min(items.length - 1, n)));

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    dragState.current = { active: true, startX: e.clientX };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.active) return;
    setDrag(e.clientX - dragState.current.startX);
  };
  const endDrag = (e: React.PointerEvent) => {
    if (!dragState.current.active) return;
    const d = e.clientX - dragState.current.startX;
    dragState.current.active = false;
    const threshold = cardW * 0.18;
    if (d < -threshold) go(idx + 1);
    else if (d > threshold) go(idx - 1);
    setDrag(0);
  };

  const gap = 20;
  const offset = -(idx * (cardW + gap)) + drag;

  return (
    <section className="topic-block">
      <header className="topic-head">
        <div>
          <div className="topic-kicker">Topic · {String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</div>
          <h3 className="topic-name">{name}</h3>
          <p className="topic-blurb">{blurb}</p>
        </div>
        <div className="topic-nav">
          <button className="icon-btn" onClick={() => go(idx - 1)} disabled={idx === 0} aria-label="Previous"><IChevL /></button>
          <button className="icon-btn" onClick={() => go(idx + 1)} disabled={idx === items.length - 1} aria-label="Next"><IChevR /></button>
        </div>
      </header>

      <div
        className="carousel-viewport"
        ref={wrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div
          className="carousel-track"
          style={{
            transform: `translateX(calc(50% - ${cardW / 2}px + ${offset}px))`,
            transition: drag === 0 ? "transform .45s cubic-bezier(.22,.8,.2,1)" : "none",
            gap: gap + "px",
          }}
        >
          {items.map((it, i) => (
            <div key={it.slug} className={"carousel-cell" + (i === idx ? " is-active" : "")} style={{ width: cardW + "px" }}>
              <ResearchCard item={it} onOpen={onOpen} />
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-dots">
        {items.map((_, i) => (
          <button key={i} className={"dot" + (i === idx ? " is-on" : "")} onClick={() => go(i)} aria-label={"Go to " + (i + 1)} />
        ))}
      </div>
    </section>
  );
}
