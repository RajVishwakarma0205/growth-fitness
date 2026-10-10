import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Volume2, VolumeX, Flame } from 'lucide-react';

export default function Navbar({ onOpenTrial }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '3D Equipment', href: '#equipment-3d' },
    { name: 'Facility Tour', href: '#facility' },
    { name: 'Target Muscles', href: '#muscle-target' },
    { name: 'Programs', href: '#programs' },
    { name: 'Transformations', href: '#transformations' },
    { name: 'BMI Calculator', href: '#calculator' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2 bg-[#0a0b0e]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Official Growth Fitness Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src="/assets/logo.png" 
            alt="Growth Fitness Logo" 
            className="h-12 md:h-14 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,30,39,0.4)] group-hover:scale-105 transition-transform duration-300"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 glass-panel px-6 py-2.5 rounded-full border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-extrabold uppercase tracking-wider text-gray-300 hover:text-[#ff1e27] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Group */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl glass-panel text-gray-300 hover:text-[#ff1e27] hover:border-[#ff1e27] transition-all"
            title={soundEnabled ? 'Mute Gym Atmosphere' : 'Enable Gym Sound FX'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-[#ff1e27]" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <button
            onClick={onOpenTrial}
            className="px-6 py-2.5 bg-gradient-to-r from-[#ff1e27] to-[#ff4b2b] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-[0_0_25px_rgba(255,30,39,0.6)] transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>FREE PASS</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl glass-panel text-white hover:text-[#ff1e27]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0b0e]/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-extrabold uppercase tracking-wider text-gray-200 hover:text-[#ff1e27] py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTrial();
            }}
            className="w-full py-4 bg-gradient-to-r from-[#ff1e27] to-[#ff4b2b] text-white font-extrabold text-center uppercase tracking-wider rounded-xl hover:shadow-[0_0_25px_rgba(255,30,39,0.5)] mt-2 flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5 fill-white" />
            <span>CLAIM FREE 7-DAY PASS</span>
          </button>
        </div>
      )}
    </header>
  );
}
