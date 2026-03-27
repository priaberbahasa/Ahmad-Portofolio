import AnimatedSection from "./AnimatedSection";
export default function SectionHeading({ label, title, subtitle }: { label:string; title:string; subtitle?:string }) {
  return (<AnimatedSection className="mb-10">
    <p className="text-xs font-medium tracking-widest uppercase text-gold mb-1">{label}</p>
    <h2 className="font-serif text-2xl md:text-3xl text-ink">{title}</h2>
    {subtitle && <p className="text-ink-light mt-2 max-w-2xl leading-relaxed text-[15px]">{subtitle}</p>}
  </AnimatedSection>);
}
