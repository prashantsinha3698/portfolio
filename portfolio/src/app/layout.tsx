import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono, VT323, Jersey_25 } from "next/font/google";
import ScrollObserver from "@/components/ui/ScrollObserver";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

const jersey25 = Jersey_25({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jersey-25",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://iam-prashant-sinha-portfolio.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Prashant Sinha | Salesforce Developer",
    template: "%s | Prashant Sinha",
  },
  description:
    "Prashant Sinha is a Salesforce Developer based in Raipur, India. Experience with Salesforce development, automation, integrations and software projects.",
  keywords: [
    "Prashant Sinha",
    "Salesforce Developer",
    "Systems Engineer",
    "Apex",
    "LWC",
    "SOQL",
    "REST APIs",
    "Python",
    "OnyxFlow",
    "Quantfolio",
    "Tata Consultancy Services",
    "Enterprise Integration",
  ],
  authors: [{ name: "Prashant Sinha", url: siteUrl }],
  creator: "Prashant Sinha",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "Prashant Sinha | Salesforce Developer & Systems Engineer",
    description:
      "Enterprise Salesforce integrations at scale + independent quantitative and algorithmic systems.",
    siteName: "Prashant Sinha",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prashant Sinha | Salesforce Developer & Systems Engineer",
    description:
      "Enterprise Salesforce integrations at scale + independent quantitative and algorithmic systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/picon.png", type: "image/png" }],
    shortcut: "/picon.png",
    apple: "/picon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F7F4" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0D0E" },
  ],
};

const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme');
      var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      var theme = stored || system;
      document.documentElement.setAttribute('data-theme', theme);
    } catch(e) {}
  })();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Prashant Sinha",
  jobTitle: "Salesforce Developer & Systems Engineer",
  description:
    "Salesforce Developer and Systems Engineer. 3+ years enterprise Salesforce integrations at Tata Consultancy Services.",
  url: siteUrl,
  email: "iam.prashantsinha@yahoo.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Raipur",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/in/prashant-sinha3",
    "https://github.com/prashantsinha3698",
    "https://www.codewars.com/users/prashant.sinha",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/picon.png" />
        <link rel="shortcut icon" href="/picon.png" />
        <link rel="apple-touch-icon" href="/picon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} ${vt323.variable} ${jersey25.variable}`}
        suppressHydrationWarning
      >
        <ScrollObserver />
        {children}
      </body>
    </html>
  );
}
