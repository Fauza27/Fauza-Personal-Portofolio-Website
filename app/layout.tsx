import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SITE_CONFIG } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: "Muhammad Fauza - AI Software Engineer",
  description:
    "Portfolio of Muhammad Fauza, an AI Engineer building production-ready full-stack applications with machine learning and intelligent systems.",
  keywords: [
    "Muhammad Fauza",
    "AI Engineer",
    "AI Software Engineer",
    "Machine Learning Engineer",
    "Full Stack Engineer",
    "AI Applications",
    "LLM",
    "Computer Vision",
    "Portfolio",
  ],
  authors: [{ name: "Muhammad Fauza", url: SITE_CONFIG.url }],
  creator: "Muhammad Fauza",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_CONFIG.url,
    siteName: "Muhammad Fauza",
    title: "Muhammad Fauza - AI Engineer (Full-Stack Applications)",
    description: "Building AI-powered applications from model to production",
    images: [
      {
        url: "/me.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Fauza - AI Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Fauza - AI Software Engineer",
    description: "Building AI-powered applications from model to production",
    images: ["/me.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} ${inter.className}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
