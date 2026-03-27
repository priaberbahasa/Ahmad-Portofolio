"use client";
import { motion } from "framer-motion";
import { ContentMeta } from "@/lib/content";
export default function Timeline({ items }: { items: { slug:string; meta:ContentMeta }[] }) {
  return (<div className="relative">
    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200"/>
    <div className="space-y-8">{items.map((item, i) => (
      <motion.div key={item.slug} initial={{opacity:0,x:-15}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.4,delay:i*0.08}} className="relative pl-8">
        <div className="absolute left-0 top-2 w-[14px] h-[14px] rounded-full border-2 border-navy bg-white"/>
        <div className="card p-5">
          <div className="flex flex-wrap items-center gap-3 mb-1.5">
            <span className="text-xs font-medium text-navy">{item.meta.startDate||item.meta.date}{item.meta.endDate&&` — ${item.meta.endDate}`}</span>
            {item.meta.location && <span className="text-xs text-ink-muted">{item.meta.location}</span>}
          </div>
          <h3 className="font-serif text-base text-ink">{item.meta.role||item.meta.title}</h3>
          {item.meta.organization && <p className="text-sm text-gold-dark mt-0.5">{item.meta.organization}</p>}
          <p className="text-sm text-ink-light mt-2 leading-relaxed">{item.meta.description}</p>
          {item.meta.tags && <div className="flex flex-wrap gap-1.5 mt-3">{item.meta.tags.map(t=><span key={t} className="tag">{t}</span>)}</div>}
        </div>
      </motion.div>))}</div></div>);
}
