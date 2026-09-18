import type { Metadata } from "next";
import ProjectsView from "@/components/views/ProjectsView";

export const metadata: Metadata = {
  title: "Projekte | Prashant Sinha",
  description: "Eigenständige Softwareprojekte von Prashant Sinha zur Erforschung von Marktdaten, numerischer Optimierung und Systemarchitektur.",
  alternates: {
    canonical: "/de/projects",
    languages: {
      en: "/projects",
      de: "/de/projects",
    },
  },
  openGraph: {
    locale: "de_DE",
    title: "Projekte | Prashant Sinha",
    description: "Eigenständige Softwareprojekte von Prashant Sinha zur Erforschung von Marktdaten, numerischer Optimierung und Systemarchitektur.",
  },
};

export default function GermanProjectsPage() {
  return <ProjectsView locale="de" />;
}
