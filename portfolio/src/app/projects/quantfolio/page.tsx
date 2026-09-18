import type { Metadata } from "next";
import QuantfolioView from "@/components/views/QuantfolioView";

export const metadata: Metadata = {
  title: "Quantfolio Project Case Study | Prashant Sinha",
  description: "Case study for Quantfolio, a portfolio risk analytics and numerical optimization platform built by Prashant Sinha.",
  alternates: {
    canonical: "/projects/quantfolio",
    languages: {
      en: "/projects/quantfolio",
      de: "/de/projects/quantfolio",
    },
  },
};

export default function QuantfolioCaseStudyPage() {
  return <QuantfolioView locale="en" />;
}
