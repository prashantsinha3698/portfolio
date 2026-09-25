import type { Metadata } from "next";
import EducationView from "@/components/views/EducationView";

export const metadata: Metadata = {
  title: "Studium & Qualifikationen | Prashant Sinha",
  description: "Ingenieurwissenschaftliches Studium, vollständiger Noten- und Laborpraktikaspiegel, berufliche Fachtrainings, Zertifizierungen und Meilensteine.",
  alternates: {
    canonical: "/de/education",
    languages: {
      en: "/education",
      de: "/de/education",
    },
  },
  openGraph: {
    locale: "de_DE",
    title: "Studium & Qualifikationen | Prashant Sinha",
    description: "Ingenieurwissenschaftliches Studium, vollständiger Noten- und Laborpraktikaspiegel, berufliche Fachtrainings, Zertifizierungen und Meilensteine.",
  },
};

export default function GermanEducationPage() {
  return <EducationView locale="de" />;
}
