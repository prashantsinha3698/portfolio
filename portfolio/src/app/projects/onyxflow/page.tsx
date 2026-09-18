import type { Metadata } from "next";
import OnyxflowView from "@/components/views/OnyxflowView";

export const metadata: Metadata = {
  title: "OnyxFlow Project Case Study | Prashant Sinha",
  description: "Technical case study of OnyxFlow, an algorithmic market data and execution engine built by Prashant Sinha.",
  alternates: {
    canonical: "/projects/onyxflow",
    languages: {
      en: "/projects/onyxflow",
      de: "/de/projects/onyxflow",
    },
  },
};

export default function OnyxFlowDocPage() {
  return <OnyxflowView locale="en" />;
}
