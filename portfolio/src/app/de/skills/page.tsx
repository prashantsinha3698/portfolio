import type { Metadata } from "next";
import SkillsView from "@/components/views/SkillsView";

export const metadata: Metadata = {
  title: "Fähigkeiten & Zertifizierungen | Prashant Sinha",
  description: "Enterprise-Salesforce-Entwicklung, branchenweit verifizierte Zertifizierungen, Trailhead Ranger Rang, Datenintegrationen und Software-Engineering-Kompetenzen.",
  alternates: {
    canonical: "/de/skills",
    languages: {
      en: "/skills",
      de: "/de/skills",
    },
  },
  openGraph: {
    locale: "de_DE",
    title: "Fähigkeiten & Zertifizierungen | Prashant Sinha",
    description: "Enterprise-Salesforce-Entwicklung, branchenweit verifizierte Zertifizierungen, Trailhead Ranger Rang, Datenintegrationen und Software-Engineering-Kompetenzen.",
  },
};

export default function GermanSkillsPage() {
  return <SkillsView locale="de" />;
}
