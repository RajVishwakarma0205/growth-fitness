import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import EquipmentViewer3D from './components/EquipmentViewer3D';
import FacilityShowcase from './components/FacilityShowcase';
import MuscleTarget3D from './components/MuscleTarget3D';
import BmiCalculator from './components/BmiCalculator';
import TransformationSlider from './components/TransformationSlider';
import ProgramsSection from './components/ProgramsSection';
import PricingSection from './components/PricingSection';
import TrainersSection from './components/TrainersSection';
import TrialModal from './components/TrialModal';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [trialModalOpen, setTrialModalOpen] = useState(false);

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
      <Navbar onOpenTrial={() => setTrialModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Hero Pure 3D Video Scrubbing (Canvas Lerp + Pinning) */}
        <Hero3D />

        {/* Section 2: Real Facility Tour Showcase */}
        <FacilityShowcase />

        {/* Section 3: 3D Interactive Equipment Configurator Studio */}
        <EquipmentViewer3D />

        {/* Section 4: 3D Muscle Target & Biomechanical Anatomy Matrix */}
        <MuscleTarget3D onOpenTrial={() => setTrialModalOpen(true)} />

        {/* Section 5: Arena Programs */}
        <ProgramsSection onOpenTrial={() => setTrialModalOpen(true)} />

        {/* Section 6: Interactive Athlete Transformation Slider */}
        <TransformationSlider />

        {/* Section 7: AI Metabolic & BMI Calculator */}
        <BmiCalculator />

        {/* Section 8: Pricing Tiers & Membership */}
        <PricingSection onOpenTrial={() => setTrialModalOpen(true)} />

        {/* Section 9: Master Trainers */}
        <TrainersSection onOpenTrial={() => setTrialModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Free Pass Booking Modal */}
      <TrialModal 
        isOpen={trialModalOpen} 
        onClose={() => setTrialModalOpen(false)} 
      />
    </div>
  );
}
