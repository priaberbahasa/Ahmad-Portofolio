import Hero from "@/components/Hero";
import ResearchSection from "@/components/sections/ResearchSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ActivitiesSection from "@/components/sections/ActivitiesSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ResearchSection />
      <ProjectsSection />
      <ActivitiesSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
