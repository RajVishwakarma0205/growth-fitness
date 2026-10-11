import React, { useState } from 'react';
import { MapPin, Phone, Instagram, Navigation, MessageCircle } from 'lucide-react';

/* =====================================================
   EDIT THESE: the gym's real details
   ===================================================== */
const GYM_ADDRESS =
  'Growth Fitness, Laxman Mhatre Rd, next to Urban Kirana, Lal Bahadur Shastri Nagar, Dahisar West, Mumbai, Maharashtra 400068';
const GYM_PHONE = '919137195858'; // country code + number, no "+" and no spaces
const GYM_PHONE_DISPLAY = '+91 91371 95858';
const WHATSAPP_URL = `https://wa.me/${GYM_PHONE}?text=${encodeURIComponent(
  "Hi! I'd like to know more about Growth Fitness."
)}`;
const INSTAGRAM_URL = 'https://www.instagram.com/growthfitnessoo7';
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(GYM_ADDRESS)}`;
// Map shown in the footer. It pins the address above.
// For an exact pin: open the gym on Google Maps > Share > Embed a map, then paste the link
// that is inside src="..." in place of the line below.
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(GYM_ADDRESS)}&output=embed`;

export default function Footer() {
  // The map ignores the mouse until it is clicked, so it never traps page scrolling
  const [mapActive, setMapActive] = useState(false);

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
            A gym and dance studio in Dahisar West, Mumbai. Train hard, stay consistent, and believe in yourself.
          </p>
          <div className="text-xs font-extrabold tracking-widest text-[#ff1e27] uppercase">
            #BELIEVE IN YOURSELF
          </div>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Growth Fitness on Instagram"
              className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-gray-400 hover:text-[#ff1e27] hover:border-[#ff1e27] transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#ff1e27] mb-4">QUICK LINKS</h4>
          <ul className="space-y-2 text-xs font-bold text-gray-400">
            <li><a href="#facility" className="hover:text-white transition-colors">Real Facility Tour</a></li>
            <li><a href="#studio" className="hover:text-white transition-colors">Dance Studio for Rent</a></li>
          </ul>
        </div>

        {/* Col 3: Hours & Facility */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">ARENA HOURS</h4>
          <ul className="space-y-2 text-xs text-gray-400 font-bold">
            <li className="flex justify-between"><span>Mon - Sat:</span> <span className="text-white">6:00 AM - 11:00 PM</span></li>
            <li className="flex justify-between"><span>Sunday:</span> <span className="text-white">9:00 AM - 2:00 PM</span></li>
          </ul>
        </div>

        {/* Col 4: Contact & Location */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-4">VISIT US</h4>
          <div className="space-y-3 text-xs text-gray-400 font-medium">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 hover:text-white transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#ff1e27] shrink-0 mt-0.5" />
              <span>{GYM_ADDRESS}</span>
            </a>
            <a href={`tel:+${GYM_PHONE}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-[#00e5ff] shrink-0" />
              <span>{GYM_PHONE_DISPLAY}</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

      {/* Google Map */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div
          className="relative rounded-2xl overflow-hidden border border-white/10 h-64 md:h-80"
          onClick={() => setMapActive(true)}
          onMouseLeave={() => setMapActive(false)}
        >
          <iframe
            title="Growth Fitness location on Google Maps"
            src={MAP_EMBED_URL}
            className={`absolute inset-0 w-full h-full border-0 ${mapActive ? '' : 'pointer-events-none'}`}
            style={{ filter: 'invert(90%) hue-rotate(180deg) contrast(0.9)' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#ff1e27] to-[#ff4b2b] text-white font-extrabold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(255,30,39,0.6)] transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
          </a>
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
