"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ContentMeta } from "@/lib/content";
import Timeline from "@/components/Timeline";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "work", label: "Work Experience" },
  { key: "organization", label: "Organization" },
  { key: "education", label: "Education" },
] as const;

export default function CategorizedTimeline({ items }: { items: { slug:string; meta:ContentMeta }[] }) {
  const [active, setActive] = useState<string>("all");

  const filtered = active === "all"
    ? items
    : items.filter(item => item.meta.category === active);

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={`px-4 py-1.5 text-sm rounded-md border transition-colors ${
              active === cat.key
                ? "bg-navy text-white border-navy"
                : "bg-white text-ink-light border-gray-200 hover:border-gray-300"
            }`}
          >
            {cat.label}
            <span className="ml-1.5 text-xs opacity-70">
              ({cat.key === "all" ? items.length : items.filter(i => i.meta.category === cat.key).length})
            </span>
          </button>
        ))}
      </div>

      {/* Timeline */}
      {filtered.length > 0 ? (
        <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Timeline items={filtered} />
        </motion.div>
      ) : (
        <p className="text-ink-muted text-sm text-center py-12">No entries in this category.</p>
      )}
    </div>
  );
}
