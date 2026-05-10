import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MistWings Holidays",
  description: "Experience the immersive beauty and hidden gems of Ooty with MistWings Holidays.",
};

import LenisScroller from "@/components/LenisScroller";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          <LenisScroller />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
