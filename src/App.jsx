import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import DisciplineSection from './components/DisciplineSection';
import GrowthOrbitSection from './components/GrowthOrbitSection';
import FacilityShowcase from './components/FacilityShowcase';
import DanceStudioSection from './components/DanceStudioSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

gsap.registerPlugin(ScrollTrigger);

export default function App() {

  // Initialize Lenis Smooth Momentum Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-white flex flex-col selection:bg-[#ff1e27] selection:text-white">
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Hero Pure 3D Video Scrubbing (Canvas Lerp + Pinning) */}
        <Hero3D />

        {/* Section 1.5: Pinned Discipline / Strength / Performance */}
        <DisciplineSection />

        {/* Section 1.75: Pinned GROWTH FITNESS photo ring */}
        <GrowthOrbitSection />

        {/* Section 2: Real Facility Tour Showcase */}
        <FacilityShowcase />

        {/* Section 3: Dance Studio for Rent */}
        <DanceStudioSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp button */}
      <WhatsAppButton />

    </div>
  );
}
