"use client";

import { Navigation } from "@/components/Navigation/Navigation";
import { Hero } from "@/components/Hero/Hero";
import { About } from "@/components/About/About";
import { ExploreSection } from "@/components/ExploreSection/ExploreSection";
import { ServicesSection } from "@/components/ServicesSection/ServicesSection";
import { Packages } from "@/components/Packages/Packages";
import { VisitingCard } from "@/components/VisitingCard/VisitingCard";
import { Footer } from "@/components/Footer/Footer";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { ScrollProgressBar, AmbientOrbs, NatureDivider } from "@/components/ScrollEffects/ScrollEffects";

// Dynamic imports (client-only / heavy)
const NatureParticles = dynamic(() => import("@/components/NatureParticles/NatureParticles"), { ssr: false });
const TrustSection = dynamic(() => import("@/components/TrustSection/TrustSection"), { ssr: false });
const Gallery = dynamic(() => import("@/components/Gallery/Gallery").then(m => ({ default: m.Gallery })), { ssr: false });
const Testimonials = dynamic(() => import("@/components/Testimonials/Testimonials").then(m => ({ default: m.Testimonials })), { ssr: false });
const FAQ = dynamic(() => import("@/components/FAQ/FAQ").then(m => ({ default: m.FAQ })), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact/Contact").then(m => ({ default: m.Contact })), { ssr: false });
const FloatingActions = dynamic(() => import("@/components/FloatingActions/FloatingActions"), { ssr: false });

export default function Home() {
  // Smooth scroll for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute("href");
        if (targetId && targetId.startsWith("#") && targetId.length > 1) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  }, []);

  return (
    <>
      {/* Global scroll & ambient effects */}
      <ScrollProgressBar />
      <AmbientOrbs />
      <NatureParticles intensity={1} />

      {/* Floating actions (WhatsApp + scroll-to-top) */}
      <FloatingActions />

      {/* Navigation */}
      <Navigation />

      <main>
        {/* 1. Hero — cinematic fullscreen */}
        <Hero />

        <NatureDivider />

        {/* 2. Trust / Stats — animated counters */}
        <TrustSection />

        <NatureDivider />

        {/* 3. About + Why Choose Us — story + 6-card grid */}
        <About />

        <NatureDivider />

        {/* 4. Services — honeymoon, group, team */}
        <ServicesSection />

        <NatureDivider />

        {/* 5. Packages — immersive booking flow */}
        <Packages />

        <NatureDivider />

        {/* 6. Gallery — masonry + lightbox */}
        <Gallery />

        <NatureDivider />

        {/* 7. Testimonials — auto-playing slider */}
        <Testimonials />

        <NatureDivider />

        {/* 8. Explore — satellite map */}
        <ExploreSection />

        <NatureDivider />

        {/* 9. FAQ — animated accordion */}
        <FAQ />

        <NatureDivider />

        {/* 10. Contact — premium inquiry form */}
        <Contact />

        {/* 11. Visiting Card */}
        <VisitingCard />
      </main>

      {/* 12. Footer — premium 4-col */}
      <Footer />
    </>
  );
}
