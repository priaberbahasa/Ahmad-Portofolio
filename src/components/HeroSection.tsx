"use client";
import { motion } from "framer-motion";
import { FileText, ArrowDown } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="min-h-[85vh] flex items-center pt-14">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Photo */}
          <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.5, delay:0.1 }}>
            <div className="w-40 h-48 md:w-48 md:h-56 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm flex-shrink-0 relative">
              <Image
                src="/images/profile.png"
                alt="Ahmad Auliadi Y"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 160px, 192px"
              />
            </div>
          </motion.div>

          {/* Text */}
          <div className="text-center md:text-left">
            <motion.p initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.2 }} className="text-xs tracking-widest uppercase text-gold font-medium mb-3">
              {siteConfig.title}
            </motion.p>

            <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.3 }} className="font-serif text-3xl md:text-5xl text-ink leading-tight mb-3">
              Ahmad Auliadi Y
            </motion.h1>

            <motion.p initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.4 }} className="text-base text-navy font-medium mb-2">
              Institut Teknologi Sumatera (ITERA)
            </motion.p>

            <motion.p initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.5 }} className="text-[15px] text-ink-light max-w-lg leading-relaxed mb-6">
              {siteConfig.bio}
            </motion.p>

            <motion.div initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.6 }} className="flex flex-wrap justify-center md:justify-start gap-3">
              <a href="/research" className="px-5 py-2.5 bg-navy text-white text-sm font-medium rounded-md hover:bg-navy-light transition-colors">View Research</a>
              <a href="/projects" className="px-5 py-2.5 bg-page-muted text-ink text-sm font-medium rounded-md border border-gray-200 hover:border-gray-300 transition-colors">View Projects</a>
              <a href="/cv.pdf" target="_blank" className="flex items-center gap-1.5 px-5 py-2.5 bg-page-muted text-ink text-sm font-medium rounded-md border border-gray-200 hover:border-gray-300 transition-colors">
                <FileText size={14} /> CV
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }} className="flex justify-center mt-16">
          <motion.div animate={{ y:[0,6,0] }} transition={{ duration:2, repeat:Infinity }}>
            <ArrowDown size={16} className="text-ink-faint" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
