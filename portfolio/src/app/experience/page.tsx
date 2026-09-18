import type { Metadata } from "next";
import ExperienceView from "@/components/views/ExperienceView";

export const metadata: Metadata = {
  title: "Experience | Prashant Sinha",
  description: "Professional Salesforce development, automation, and enterprise integration experience at Tata Consultancy Services.",
  alternates: {
    canonical: "/experience",
    languages: {
      en: "/experience",
      de: "/de/experience",
    },
  },
};

export default function ExperiencePage() {
  return <ExperienceView locale="en" />;
}
