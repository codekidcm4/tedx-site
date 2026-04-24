import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "TEDxHuntingValley",
    template: "%s | TEDxHuntingValley",
  },
  description: siteConfig.description,
  keywords: [
    "TEDx",
    "TEDxHuntingValley",
    "Cleveland",
    "ideas",
    "speakers",
    "student speakers",
    "Hunting Valley",
    "University School",
    "Gund Auditorium",
    "August 2026",
  ],
  authors: [{ name: "Charlie Martin" }, { name: "Jack Nelson" }],
  creator: "TEDxHuntingValley",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "TEDxHuntingValley | August 22, 2026",
    description: siteConfig.description,
    siteName: "TEDxHuntingValley",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TEDxHuntingValley — The Invisible Engine: The Forces We Forget",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDxHuntingValley | August 22, 2026",
    description: siteConfig.description,
    creator: "@tedxhuntingvalley",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`} data-scroll-behavior="smooth">
      <head>
        {/* Google Analytics placeholder — replace GA_MEASUREMENT_ID with your ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" /> */}
        {/* <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','GA_MEASUREMENT_ID');` }} /> */}
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#0a0a0a]">
        <Navbar />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
