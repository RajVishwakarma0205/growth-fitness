import React from 'react';
import { MessageCircle } from 'lucide-react';

/* =====================================================
   EDIT THESE: WhatsApp number and the first message
   ===================================================== */
const WHATSAPP_NUMBER = '919137195858'; // country code + number, no "+" and no spaces
const MESSAGE = "Hi! I'd like to know more about Growth Fitness.";

export default function WhatsAppButton() {
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Growth Fitness on WhatsApp"
      className="group fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[70] flex items-center gap-3"
    >
      <span className="hidden md:block px-4 py-2 rounded-xl bg-black/80 border border-white/10 text-xs font-extrabold uppercase tracking-wider text-white opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
        Chat with us
      </span>
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] hover:scale-105 transition-transform">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
        <MessageCircle className="relative w-7 h-7 fill-white" />
      </span>
    </a>
  );
}
