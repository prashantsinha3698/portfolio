import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://iam-prashant-sinha-portfolio.vercel.app");

  const routes = [
    { path: "", dePath: "/de", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/projects", dePath: "/de/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/projects/onyxflow", dePath: "/de/projects/onyxflow", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/projects/quantfolio", dePath: "/de/projects/quantfolio", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/experience", dePath: "/de/experience", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/skills", dePath: "/de/skills", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/education", dePath: "/de/education", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", dePath: "/de/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", dePath: "/de/contact", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const r of routes) {
    // English entry
    entries.push({
      url: `${baseUrl}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates: {
        languages: {
          en: `${baseUrl}${r.path}`,
          de: `${baseUrl}${r.dePath}`,
        },
      },
    });

    // German entry
    entries.push({
      url: `${baseUrl}${r.dePath}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates: {
        languages: {
          en: `${baseUrl}${r.path}`,
          de: `${baseUrl}${r.dePath}`,
        },
      },
    });
  }

  return entries;
}
