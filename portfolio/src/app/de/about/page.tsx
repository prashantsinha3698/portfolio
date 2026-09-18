import type { Metadata } from "next";
import AboutView from "@/components/views/AboutView";

export const metadata: Metadata = {
  title: "Über mich | Prashant Sinha",
  description: "Persönlicher Hintergrund, unternehmerische Experimente, Ingenieurlaufbahn bei TCS und meine Herangehensweise an Softwareentwicklung.",
  alternates: {
    canonical: "/de/about",
    languages: {
      en: "/about",
      de: "/de/about",
    },
  },
  openGraph: {
    locale: "de_DE",
    title: "Über mich | Prashant Sinha",
    description: "Persönlicher Hintergrund, unternehmerische Experimente, Ingenieurlaufbahn bei TCS und meine Herangehensweise an Softwareentwicklung.",
  },
};

export default function GermanAboutPage() {
  return <AboutView locale="de" />;
}
