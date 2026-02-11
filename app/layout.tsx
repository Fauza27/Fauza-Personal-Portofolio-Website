import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
  authors: [{ name: "Muhammad Fauza" }],
  openGraph: {
    title: "Muhammad Fauza - AI Engineer (Full-Stack Applications)",
    description: "Building AI-powered applications from model to production",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
