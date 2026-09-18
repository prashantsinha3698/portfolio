import type { Metadata } from "next";
import ExperienceView from "@/components/views/ExperienceView";

export const metadata: Metadata = {
  title: "Berufserfahrung | Prashant Sinha",
  description: "Professionelle Erfahrung in Salesforce-Entwicklung, Automatisierung und Enterprise-Systemintegration bei Tata Consultancy Services.",
  alternates: {
    canonical: "/de/experience",
    languages: {
      en: "/experience",
      de: "/de/experience",
    },
  },
  openGraph: {
    locale: "de_DE",
    title: "Berufserfahrung | Prashant Sinha",
    description: "Professionelle Erfahrung in Salesforce-Entwicklung, Automatisierung und Enterprise-Systemintegration bei Tata Consultancy Services.",
  },
};

export default function GermanExperiencePage() {
  return <ExperienceView locale="de" />;
}
