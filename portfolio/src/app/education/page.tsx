import type { Metadata } from "next";
import EducationView from "@/components/views/EducationView";

export const metadata: Metadata = {
  title: "Education | Prashant Sinha",
  description: "Formal engineering foundation, complete transcript laboratory coursework, vocational technical training, certifications, and achievements.",
  alternates: {
    canonical: "/education",
    languages: {
      en: "/education",
      de: "/de/education",
    },
  },
};

export default function EducationPage() {
  return <EducationView locale="en" />;
}
