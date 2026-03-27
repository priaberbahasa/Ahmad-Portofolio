import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import Timeline from "@/components/Timeline";
import { getAllContent } from "@/lib/content";
export const metadata: Metadata = { title: "Activities" };
export default function ActivitiesPage() {
  const all = [...getAllContent("experience"), ...getAllContent("activities")].sort((a,b)=>new Date(b.meta.date).getTime()-new Date(a.meta.date).getTime());
  return (<div className="pt-20 pb-8 px-6"><div className="max-w-3xl mx-auto">
    <SectionHeading label="Activities" title="Experience & Activities" subtitle="Professional work, organizational leadership, seminars, and social initiatives."/>
    {all.length > 0 ? <Timeline items={all}/> : <p className="text-ink-muted text-sm text-center py-16">Add .mdx files to content/experience/ or content/activities/</p>}
  </div></div>);
}
