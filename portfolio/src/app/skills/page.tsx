import type { Metadata } from "next";
import SkillsView from "@/components/views/SkillsView";

export const metadata: Metadata = {
  title: "Skills & Certifications | Prashant Sinha",
  description: "Enterprise Salesforce development, verified industry certifications, Trailhead Ranger platform rank, data integrations, and software engineering capabilities.",
  alternates: {
    canonical: "/skills",
    languages: {
      en: "/skills",
      de: "/de/skills",
    },
  },
};

export default function SkillsPage() {
  return <SkillsView locale="en" />;
}
