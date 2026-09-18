import type { Metadata } from "next";
import ProjectsView from "@/components/views/ProjectsView";

export const metadata: Metadata = {
  title: "Projects | Prashant Sinha",
  description: "Personal software projects built by Prashant Sinha to explore market data, numerical optimization, and system architecture.",
  alternates: {
    canonical: "/projects",
    languages: {
      en: "/projects",
      de: "/de/projects",
    },
  },
};

export default function ProjectsPage() {
  return <ProjectsView locale="en" />;
}
