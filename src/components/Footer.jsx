import React from 'react';
import { MapPin, Phone, Mail, Instagram, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#07080a] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* Col 1: Official Logo & Tagline */}
        <div className="space-y-4">
          <a href="#" className="inline-block">
            <img 
              src="/assets/logo.png" 
              alt="Growth Fitness Logo" 
              className="h-14 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,30,39,0.4)]"
            />
          </a>
          <p className="text-xs text-gray-400 leading-relaxed">
            The next-generation 3D experiential fitness arena. Engineering human physical performance through biomechanical precision, elite coaching, and 3D tech.
          </p>
          <div className="text-xs font-extrabold tracking-widest text-[#ff1e27] uppercase">
            #BELIEVE IN YOURSELF
          </div>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-gray-400 hover:text-[#ff1e27] hover:border-[#ff1e27] transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-gray-400 hover:text-[#ff1e27] hover:border-[#ff1e27] transition-all">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-gray-400 hover:text-[#ff1e27] hover:border-[#ff1e27] transition-all">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#ff1e27] mb-4">QUICK LINKS</h4>
          <ul className="space-y-2 text-xs font-bold text-gray-400">
            <li><a href="#equipment-3d" className="hover:text-white transition-colors">3D Interactive Gear Lab</a></li>
            <li><a href="#facility" className="hover:text-white transition-colors">Real Facility Tour</a></li>
            <li><a href="#muscle-target" className="hover:text-white transition-colors">Anatomical Muscle Target</a></li>
            <li><a href="#programs" className="hover:text-white transition-colors">Hypertrophy Programs</a></li>
            <li><a href="#transformations" className="hover:text-white transition-colors">Athlete Transformations</a></li>
            <li><a href="#calculator" className="hover:text-white transition-colors">BMI & Macro Calculator</a></li>
          </ul>
        </div>

        {/* Col 3: Hours & Facility */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">ARENA HOURS</h4>
          <ul className="space-y-2 text-xs text-gray-400 font-bold">
            <li className="flex justify-between"><span>Mon - Fri:</span> <span className="text-white">5:00 AM - 11:00 PM</span></li>
            <li className="flex justify-between"><span>Saturday:</span> <span className="text-white">6:00 AM - 10:00 PM</span></li>
            <li className="flex justify-between"><span>Sunday:</span> <span className="text-white">7:00 AM - 8:00 PM</span></li>
            <li className="flex justify-between text-[#ff1e27]"><span>VIP 24/7 Access:</span> <span>ALWAYS OPEN</span></li>
          </ul>
        </div>

        {/* Col 4: Contact & Location */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-4">GROWTH FITNESS HQ</h4>
          <div className="space-y-3 text-xs text-gray-400 font-medium">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#ff1e27] shrink-0 mt-0.5" />
              <span>Growth Fitness Arena, Main Street, Fitness Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#00e5ff] shrink-0" />
              <span>+1 (800) 555-GROWTH</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>contact@growthfitness.com</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 font-medium">
        <div>
          © {new Date().getFullYear()} GROWTH FITNESS. ALL RIGHTS RESERVED. BELIEVE IN YOURSELF.
        </div>
        <div className="flex gap-6 mt-2 md:mt-0">
          <a href="#" className="hover:text-gray-400">PRIVACY POLICY</a>
          <a href="#" className="hover:text-gray-400">TERMS OF SERVICE</a>
        </div>
      </div>
    </footer>
  );
}
