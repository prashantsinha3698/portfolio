"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const PageIntroOverlay = dynamic(
  () => import("@/components/ui/PageIntroOverlay"),
  { ssr: false }
);

const SubtleScrollCanvas = dynamic(
  () => import("@/components/ui/SubtleScrollCanvas"),
  { ssr: false }
);

export default function ClientOverlayMount() {
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/de" || pathname === "";

  return (
    <>
      <PageIntroOverlay />
      {isHomePage && <SubtleScrollCanvas />}
    </>
  );
}
