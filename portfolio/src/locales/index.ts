import { Locale, Translations } from "./types";
import { en } from "./en";
import { de } from "./de";

export * from "./types";
export { en, de };

export const LOCALES: readonly Locale[] = ["en", "de"] as const;
export const DEFAULT_LOCALE: Locale = "en";

export function isValidLocale(locale: string): locale is Locale {
  return (LOCALES as readonly string[]).includes(locale);
}

export function getTranslation(locale: Locale = DEFAULT_LOCALE): Translations {
  return locale === "de" ? de : en;
}

/**
 * Returns the equivalent URL in the target locale for any given path.
 *
 * Examples:
 * getLocalizedPath("/", "de") -> "/de"
 * getLocalizedPath("/de", "en") -> "/"
 * getLocalizedPath("/projects", "de") -> "/de/projects"
 * getLocalizedPath("/de/projects", "en") -> "/projects"
 * getLocalizedPath("/projects/onyxflow", "de") -> "/de/projects/onyxflow"
 * getLocalizedPath("/de/projects/onyxflow", "en") -> "/projects/onyxflow"
 * getLocalizedPath("/education", "de") -> "/de/education"
 * getLocalizedPath("/#contact", "de") -> "/de#contact"
 * getLocalizedPath("/de#contact", "en") -> "/#contact"
 */
export function getLocalizedPath(currentPathname: string, targetLocale: Locale): string {
  if (!currentPathname) return targetLocale === "de" ? "/de" : "/";

  // Separate hash / query if present
  const [pathWithoutHash, hash] = currentPathname.split("#");
  const hashSuffix = hash ? `#${hash}` : "";

  // Strip leading /de if present
  let normalizedPath = pathWithoutHash;
  if (normalizedPath === "/de") {
    normalizedPath = "/";
  } else if (normalizedPath.startsWith("/de/")) {
    normalizedPath = normalizedPath.substring(3);
  } else if (normalizedPath === "/en") {
    normalizedPath = "/";
  } else if (normalizedPath.startsWith("/en/")) {
    normalizedPath = normalizedPath.substring(3);
  }

  // Ensure normalized path starts with /
  if (!normalizedPath.startsWith("/")) {
    normalizedPath = `/${normalizedPath}`;
  }

  if (targetLocale === "de") {
    const result = normalizedPath === "/" ? "/de" : `/de${normalizedPath}`;
    return `${result}${hashSuffix}`;
  }

  // Target is 'en'
  const result = normalizedPath;
  return `${result}${hashSuffix}`;
}

/**
 * Detects current locale from pathname.
 */
export function getLocaleFromPathname(pathname: string): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  if (pathname === "/de" || pathname.startsWith("/de/")) {
    return "de";
  }
  return "en";
}
