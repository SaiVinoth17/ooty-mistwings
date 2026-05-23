import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700"],
});

const siteUrl = "https://ootymistwings.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MistWings Holidays | Premium Ooty Tour Packages & Cab Services",
    template: "%s | MistWings Holidays",
  },
  description:
    "Discover the hidden gems of Ooty, Nilgiris with MistWings Holidays. Premium cab tours, Pykara waterfalls, Mudumalai safari, Coonoor heritage, honeymoon packages. Book now on WhatsApp!",
  keywords: [
    "Ooty tour packages",
    "Nilgiris cab service",
    "Pykara tour",
    "Mudumalai safari",
    "Coonoor tour",
    "Ooty sightseeing",
    "MistWings Holidays",
    "Ooty taxi",
    "Ooty travel packages",
    "honeymoon packages Ooty",
    "Ooty group tours",
    "Coimbatore to Ooty cab",
    "Mysore to Ooty transfer",
    "best tour packages Ooty",
  ],
  authors: [{ name: "MistWings Holidays", url: siteUrl }],
  creator: "MistWings Holidays",
  publisher: "MistWings Holidays",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "MistWings Holidays",
    title: "MistWings Holidays | Premium Ooty Tour Packages",
    description:
      "Experience the unseen beauty of Ooty with MistWings Holidays. Curated sightseeing tours, safari adventures & comfortable cab services.",
    images: [
      {
        url: `${siteUrl}/hero-bg.png`,
        width: 1200,
        height: 630,
        alt: "MistWings Holidays - Ooty Nilgiris Premium Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MistWings Holidays | Premium Ooty Tour Packages",
    description:
      "Experience the unseen beauty of Ooty with MistWings Holidays.",
    images: [`${siteUrl}/hero-bg.png`],
    creator: "@ootymistwings",
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "MistWings Holidays",
  description:
    "Premium Ooty tour packages, cab services, and sightseeing experiences in the Nilgiris.",
  url: siteUrl,
  telephone: ["+916381911347", "+919994228307"],
  email: "ootymistwings43@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Commercial Road, Charring Cross",
    addressLocality: "Ooty",
    addressRegion: "Tamil Nadu",
    postalCode: "643001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "11.4102",
    longitude: "76.6950",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday", "Sunday",
    ],
    opens: "06:00",
    closes: "21:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
  },
  priceRange: "₹₹",
  image: `${siteUrl}/logo.jpg`,
  sameAs: ["https://www.instagram.com/ooty_mistwings_/"],
  areaServed: [
    "Ooty", "Coonoor", "Kotagiri", "Mudumalai", "Pykara", "Coimbatore", "Mysore",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tour Packages",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Complete Ooty Sightseeing",
          description: "Full-day Ooty sightseeing covering Doddabetta Peak, Ooty Lake, Botanical Garden and more.",
        },
        price: "2000",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pykara Escapade",
          description: "Tour of Pykara Waterfalls, Lake, Pine Forest and surrounding scenic spots.",
        },
        price: "2500",
        priceCurrency: "INR",
      },
    ],
  },
};

import LenisScroller from "@/components/LenisScroller";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9546394205456045"
          crossOrigin="anonymous"
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          <LenisScroller />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
