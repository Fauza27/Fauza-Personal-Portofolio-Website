import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muhammad Fauza - Fullstack & AI Engineer",
  description: "Portfolio of Muhammad Fauza - Building the future with code & AI. Fullstack developer and AI engineer passionate about creating intelligent systems.",
  keywords: ["Muhammad Fauza", "Fullstack Developer", "AI Engineer", "Web Development", "Machine Learning", "Portfolio"],
  authors: [{ name: "Muhammad Fauza" }],
  openGraph: {
    title: "Muhammad Fauza - Fullstack & AI Engineer",
    description: "Building the future with code & AI",
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
