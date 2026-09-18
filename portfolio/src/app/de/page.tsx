import type { Metadata } from "next";
import HomeView from "@/components/views/HomeView";

export const metadata: Metadata = {
  title: "Prashant Sinha | Salesforce-Entwickler & Software Engineer",
  description:
    "Prashant Sinha ist Salesforce-Entwickler und Software Engineer aus Raipur, Indien. Erfahrung in Enterprise-Salesforce-Integrationen, Automatisierung und quantitativen Softwaresystemen.",
  alternates: {
    canonical: "/de",
    languages: {
      en: "/",
      de: "/de",
    },
  },
  openGraph: {
    locale: "de_DE",
    title: "Prashant Sinha | Salesforce-Entwickler & Software Engineer",
    description: "Enterprise-Salesforce-Integrationen in Produktionsqualität und eigenständige Softwaresysteme.",
  },
};

export default function GermanHomePage() {
  return <HomeView locale="de" />;
}
