import type { Metadata } from "next";
import AboutView from "@/components/views/AboutView";

export const metadata: Metadata = {
  title: "About | Prashant Sinha",
  description: "Personal background, operational experiments, engineering career at TCS, and how I approach building software.",
  alternates: {
    canonical: "/about",
    languages: {
      en: "/about",
      de: "/de/about",
    },
  },
};

export default function AboutPage() {
  return <AboutView locale="en" />;
}
