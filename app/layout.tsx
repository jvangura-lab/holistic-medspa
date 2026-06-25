import type { Metadata } from "next";
import { Spectral, Manrope, Istok_Web, Archivo } from "next/font/google";
import "./globals.css";

// DESIGN_SYSTEM.md §2.2 — 5 font families (Spectral cousin-swap from Branch baked in).
// Clash Display Variable loaded via Fontshare CDN @import in globals.css (not on Google Fonts).
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const istokWeb = Istok_Web({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-istok-web",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://holistic-v6.vercel.app"),
  title: {
    default: "Holistic Medspa — A small wellness clinic on Bayou Lafourche",
    template: "%s — Holistic Medspa",
  },
  description:
    "Holistic Medspa is a one-person wellness clinic on Bayou Lafourche in Cut Off, Louisiana. Mind · Body · Soul preventive care from Toya Terrebonne.",
  applicationName: "Holistic Medspa",
  authors: [{ name: "Holistic Medspa" }],
  generator: "Next.js",
  keywords: [
    "wellness clinic",
    "Cut Off Louisiana",
    "Bayou Lafourche",
    "preventive medicine",
    "Holistic Medspa",
    "Toya Terrebonne",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Holistic Medspa",
    title: "Holistic Medspa — A small wellness clinic on Bayou Lafourche",
    description:
      "Naturopathy consultations, lymphatic drainage, infrared sauna, ZYTO scans, and essential-oil care in Cut Off, Louisiana. By appointment, by hand, by Toya.",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/brand/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spectral.variable} ${manrope.variable} ${istokWeb.variable} ${archivo.variable}`}
    >
      <body className="min-h-svh antialiased">{children}</body>
    </html>
  );
}
