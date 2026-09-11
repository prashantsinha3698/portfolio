import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HomeHero from "@/components/sections/HomeHero";
import HomeProjects from "@/components/sections/HomeProjects";
import HomeExperience from "@/components/sections/HomeExperience";
import HomeSkills from "@/components/sections/HomeSkills";
import HomeEducation from "@/components/sections/HomeEducation";
import HomeAbout from "@/components/sections/HomeAbout";
import HomeContact from "@/components/sections/HomeContact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HomeHero />
        <HomeProjects />
        <HomeExperience />
        <HomeSkills />
        <HomeEducation />
        <HomeAbout />
        <HomeContact />
      </main>
      <Footer />
    </>
  );
}
