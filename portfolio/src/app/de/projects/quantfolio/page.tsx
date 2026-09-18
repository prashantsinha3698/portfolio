import type { Metadata } from "next";
import QuantfolioView from "@/components/views/QuantfolioView";

export const metadata: Metadata = {
  title: "Quantfolio Fallstudie | Prashant Sinha",
  description: "Technische Fallstudie zu Quantfolio, einer Plattform für Portfoliorisiko-Analytik und numerische Optimierung von Prashant Sinha.",
  alternates: {
    canonical: "/de/projects/quantfolio",
    languages: {
      en: "/projects/quantfolio",
      de: "/de/projects/quantfolio",
    },
  },
  openGraph: {
    locale: "de_DE",
    title: "Quantfolio Fallstudie | Prashant Sinha",
    description: "Technische Fallstudie zu Quantfolio, einer Plattform für Portfoliorisiko-Analytik und numerische Optimierung von Prashant Sinha.",
  },
};

export default function GermanQuantfolioCaseStudyPage() {
  return <QuantfolioView locale="de" />;
}
