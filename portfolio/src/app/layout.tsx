import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
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
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prashantsinha.dev"),
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
  authors: [{ name: "Prashant Sinha", url: "https://prashantsinha.dev" }],
  creator: "Prashant Sinha",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://prashantsinha.dev",
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
  url: "https://prashantsinha.dev",
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
        suppressHydrationWarning
      >
        <ScrollObserver />
        {children}
      </body>
    </html>
  );
}
