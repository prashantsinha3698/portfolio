import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ImpactIndex from "@/components/sections/ImpactIndex";
import TCSCaseStudy from "@/components/sections/TCSCaseStudy";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import StoryTimeline from "@/components/sections/StoryTimeline";
import Certifications from "@/components/sections/Certifications";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <ImpactIndex />
        <TCSCaseStudy />
        <Projects />
        <Skills />
        <StoryTimeline />
        <Certifications />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
