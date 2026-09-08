import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prashantsinha.dev"),
  title: {
    default: "Prashant Sinha | Salesforce Developer & Independent Builder",
    template: "%s | Prashant Sinha",
  },
  description:
    "Prashant Sinha is a Salesforce Developer, Systems Thinker and Independent Builder based in Raipur, India. Builder of OnyxFlow, an algorithmic crypto futures trading platform.",
  keywords: [
    "Prashant Sinha",
    "Salesforce Developer",
    "Systems Thinker",
    "Independent Builder",
    "Software Engineer",
    "OnyxFlow",
    "Raipur",
    "India",
    "Salesforce Administrator",
    "Python",
    "Algorithmic Trading",
  ],
  authors: [{ name: "Prashant Sinha", url: "https://prashantsinha.dev" }],
  creator: "Prashant Sinha",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://prashantsinha.dev",
    title: "Prashant Sinha | Salesforce Developer & Independent Builder",
    description:
      "Salesforce Developer, Systems Thinker and Independent Builder. Builder of OnyxFlow.",
    siteName: "Prashant Sinha",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prashant Sinha | Salesforce Developer & Independent Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prashant Sinha | Salesforce Developer & Independent Builder",
    description:
      "Salesforce Developer, Systems Thinker and Independent Builder. Builder of OnyxFlow.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
    { media: "(prefers-color-scheme: light)", color: "#F3EBDD" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0E0D" },
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
  jobTitle: "Salesforce Developer",
  description:
    "Salesforce Developer, Systems Thinker and Independent Builder based in Raipur, India.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
