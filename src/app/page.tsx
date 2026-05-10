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
            targetElement.scrollIntoView({
              behavior: "smooth",
            });
          }
        }
      });
    });
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <ExploreSection />
        <ServicesSection />
        <Packages />
        <VisitingCard />
      </main>
      <Footer />
    </>
  );
}
