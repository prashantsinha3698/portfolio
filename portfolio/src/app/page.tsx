import type { Metadata } from "next";
import HomeView from "@/components/views/HomeView";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      de: "/de",
    },
  },
};

export default function Home() {
  return <HomeView locale="en" />;
}
