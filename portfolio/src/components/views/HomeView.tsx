import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HomeHero from "@/components/sections/HomeHero";
import HomeProjects from "@/components/sections/HomeProjects";
import HomeExperience from "@/components/sections/HomeExperience";
import HomeSkills from "@/components/sections/HomeSkills";
import HomeEducation from "@/components/sections/HomeEducation";
import HomeAbout from "@/components/sections/HomeAbout";
import HomeContact from "@/components/sections/HomeContact";
import { Locale } from "@/locales";

interface HomeViewProps {
  locale: Locale;
}

export default function HomeView({ locale }: HomeViewProps) {
  return (
    <>
      <Navigation locale={locale} />
      <main id="main-content">
        <HomeHero locale={locale} />
        <HomeProjects locale={locale} />
        <HomeExperience locale={locale} />
        <HomeSkills locale={locale} />
        <HomeEducation locale={locale} />
        <HomeAbout locale={locale} />
        <HomeContact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
