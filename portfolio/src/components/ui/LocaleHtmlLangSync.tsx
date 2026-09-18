"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/locales";

export default function LocaleHtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = getLocaleFromPathname(pathname);
    document.documentElement.setAttribute("lang", locale);
    try {
      localStorage.setItem("portfolio_lang", locale);
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // ignore
    }
  }, [pathname]);

  return null;
}
