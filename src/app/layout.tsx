import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

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
    default: "Ooty Taxi Service & Tour Packages | MistWings Holidays",
    template: "%s | MistWings Holidays",
  },
  description:
    "Explore Ooty with MistWings Holidays. Book reliable Ooty taxi services, sightseeing tours, customized holiday packages and outstation cab services at competitive prices.",
  keywords: [
    "Ooty taxi service",
    "Ooty cab service",
    "Ooty tour packages",
    "Ooty sightseeing taxi",
    "outstation cab Ooty",
    "Pykara tour taxi",
    "Mudumalai safari cab",
    "Coonoor cab tour",
    "Coimbatore to Ooty cab",
    "Mysore to Ooty taxi",
    "MistWings Holidays",
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
    title: "Ooty Taxi Service & Tour Packages | MistWings Holidays",
    description:
      "Explore Ooty with MistWings Holidays. Book reliable Ooty taxi services, sightseeing tours, customized holiday packages and outstation cab services at competitive prices.",
    images: [
      {
        url: `${siteUrl}/hero-bg.png`,
        width: 1200,
        height: 630,
        alt: "MistWings Holidays - Ooty Taxi Service & Tour Packages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ooty Taxi Service & Tour Packages | MistWings Holidays",
    description:
      "Explore Ooty with MistWings Holidays. Book reliable Ooty taxi services, sightseeing tours, customized holiday packages and outstation cab services at competitive prices.",
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
  "@type": ["TravelAgency", "LocalBusiness"],
  "@id": `${siteUrl}/#travelagency`,
  name: "MistWings Holidays",
  alternateName: "MistWings Holidays - Ooty Taxi Service & Tour Packages",
  description:
    "Explore Ooty with MistWings Holidays. Book reliable Ooty taxi services, sightseeing tours, customized holiday packages and outstation cab services at competitive prices.",
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
    latitude: 11.4102,
    longitude: 76.695,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
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
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Credit Card, Debit Card",
  image: `${siteUrl}/logo.jpg`,
  sameAs: ["https://www.instagram.com/ooty_mistwings_/"],
  areaServed: [
    {
      "@type": "City",
      name: "Ooty",
    },
    {
      "@type": "City",
      name: "Coonoor",
    },
    {
      "@type": "City",
      name: "Kotagiri",
    },
    {
      "@type": "Place",
      name: "Mudumalai",
    },
    {
      "@type": "Place",
      name: "Pykara",
    },
    {
      "@type": "City",
      name: "Coimbatore",
    },
    {
      "@type": "City",
      name: "Mysore",
    },
    {
      "@type": "City",
      name: "Mettupalayam",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Ooty Taxi Services & Tour Packages",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Complete Ooty Sightseeing",
          description:
            "Full-day Ooty sightseeing taxi tour covering Doddabetta Peak, Tea Factory, Ooty Lake, Rose Garden, Botanical Garden and more.",
        },
        price: "2000",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pykara Escapade",
          description:
            "Scenic tour covering Pine Forest, Kamraj Sagar Dam, Wenlock Downs 9th Mile, Pykara Waterfalls, and Lake Boating.",
        },
        price: "2500",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mudumalai Safari & Wildlife Tour",
          description:
            "Wildlife safari and sightseeing cab tour to Mudumalai National Park, Elephant Camp, and Moyar Gorge.",
        },
        price: "3500",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pykara & Mudumalai Combo Tour",
          description:
            "Combined sightseeing cab tour covering Pykara waterfalls, lake boating, and Mudumalai wildlife sanctuary.",
        },
        price: "3500",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Heritage Coonoor Tour",
          description:
            "Coonoor sightseeing taxi covering Ketti Valley, Sims Park, Tea Estates, Lambs Rock, and Dolphins Nose.",
        },
        price: "2500",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Coimbatore to Ooty Cab Transfer",
          description:
            "Reliable station or airport pickup and drop taxi service between Coimbatore and Ooty.",
        },
        price: "3500",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mysore to Ooty Taxi Transfer",
          description:
            "Interstate cab transfer between Mysore Railway Station and Ooty via Bandipur National Park.",
        },
        price: "4500",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mettupalayam to Ooty Taxi Transfer",
          description:
            "Convenient pickup and drop taxi service between Mettupalayam Railway Station and Ooty.",
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
        <script
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
