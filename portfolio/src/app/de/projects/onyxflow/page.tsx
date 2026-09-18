import type { Metadata } from "next";
import OnyxflowView from "@/components/views/OnyxflowView";

export const metadata: Metadata = {
  title: "OnyxFlow Fallstudie | Prashant Sinha",
  description: "Technische Fallstudie zu OnyxFlow, einer Ausführungs- und Marktdaten-Engine für algorithmischen Handel von Prashant Sinha.",
  alternates: {
    canonical: "/de/projects/onyxflow",
    languages: {
      en: "/projects/onyxflow",
      de: "/de/projects/onyxflow",
    },
  },
  openGraph: {
    locale: "de_DE",
    title: "OnyxFlow Fallstudie | Prashant Sinha",
    description: "Technische Fallstudie zu OnyxFlow, einer Ausführungs- und Marktdaten-Engine für algorithmischen Handel von Prashant Sinha.",
  },
};

export default function GermanOnyxFlowDocPage() {
  return <OnyxflowView locale="de" />;
}
