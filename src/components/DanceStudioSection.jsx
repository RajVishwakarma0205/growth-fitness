import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Music,
  Lightbulb,
  Maximize2,
  Layers,
  Snowflake,
  MessageCircle,
  Phone,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* =====================================================
   EDIT THESE: placeholder details for the studio
   ===================================================== */
const STUDIO_PHONE = '919137195858'; // country code + number, no "+" and no spaces
const STUDIO_PHONE_DISPLAY = '+91 91371 95858'; // how the number is shown on the page
const DANCE_STYLES = ['Salsa', 'Zumba', 'Bollywood', 'Hip Hop', 'Contemporary', 'Aerobics'];

const FEATURES = [
  { icon: Maximize2, title: 'Full-wall mirrors', text: 'Check every move' },
  { icon: Lightbulb, title: 'LED mood lighting', text: 'Warm, stage-style glow' },
  { icon: Layers, title: 'Wooden-finish floor', text: 'Smooth, easy on the feet' },
  { icon: Snowflake, title: 'Air-conditioned', text: 'Stay cool while you dance' },
];

// These three labels fade in one after another while the photo moves
const PAN_LABELS = [
  { title: 'LED mood lighting', text: 'A warm glow that sets the mood' },
  { title: 'Full-wall mirrors', text: 'See every step, every angle' },
  { title: 'Wooden-finish floor', text: 'Space to move freely' },
];

export default function DanceStudioSection() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!section || !frame || !img) return;

    const ctx = gsap.context(() => {
      // 1) Text blocks rise in once when the section comes into view
      gsap.from('.ds-reveal', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      });

      // 2) The photo slowly moves from the ceiling down to the floor
      const labels = gsap.utils.toArray('.ds-label');
      const distance = () => Math.max(0, img.offsetHeight - frame.offsetHeight);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: frame,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(img, { y: 0 }, { y: () => -distance(), ease: 'none', duration: 3 }, 0);

      // Label 1: ceiling
      tl.fromTo(labels[0], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3 }, 0.05);
      tl.to(labels[0], { opacity: 0, y: -12, duration: 0.3 }, 0.9);
      // Label 2: mirrors
      tl.fromTo(labels[1], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3 }, 1.05);
      tl.to(labels[1], { opacity: 0, y: -12, duration: 0.3 }, 1.9);
      // Label 3: floor (stays until the end)
      tl.fromTo(labels[2], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3 }, 2.05);
    }, section);

    return () => ctx.revert();
  }, []);

  const whatsappLink = `https://wa.me/${STUDIO_PHONE}?text=${encodeURIComponent(
    "Hi! I'd like to know about renting the dance studio at Growth Fitness."
  )}`;

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="relative py-24 md:py-32 bg-[#0a0b0e] overflow-hidden"
    >
      {/* Warm gold glows to match the studio lighting */}
      <div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-[#ffb42a]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#ff8a1e]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* ---------- Text side ---------- */}
        <div>
          <div className="ds-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-[#ffb42a]/40 text-[#ffb42a] text-xs font-bold uppercase mb-6">
            <Music className="w-4 h-4" />
            <span>Dance studio &middot; available for rent</span>
          </div>

          <h2 className="ds-reveal text-5xl md:text-7xl font-extrabold uppercase tracking-wider leading-[1.02] mb-6">
            YOUR STAGE.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffd36e] to-[#ff9d2e]">
              YOUR RHYTHM.
            </span>
          </h2>

          <p className="ds-reveal text-gray-400 text-base md:text-lg max-w-xl mb-8">
            A private, glass-front studio with full-wall mirrors and warm mood lighting, open for
            hire. Ideal for dance classes, rehearsals, workshops and practice sessions.
          </p>

          {/* Dance styles */}
          <div className="ds-reveal mb-8">
            <span className="block text-xs font-extrabold uppercase tracking-[0.25em] text-gray-500 mb-3">
              Perfect for
            </span>
            <div className="flex flex-wrap gap-2">
              {DANCE_STYLES.map((style) => (
                <span
                  key={style}
                  className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#ffd36e] border border-[#ffb42a]/30 bg-[#ffb42a]/5"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="ds-reveal grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-3 glass-panel rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl bg-[#ffb42a]/10 text-[#ffb42a] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold uppercase tracking-wide text-white">
                    {title}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="ds-reveal flex flex-col sm:flex-row gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#ffd36e] to-[#ff9d2e] text-black font-extrabold text-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(255,180,42,0.5)] transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Rent the Studio</span>
            </a>
            <a
              href={`tel:+${STUDIO_PHONE}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-panel text-white font-extrabold text-sm uppercase tracking-wider hover:border-[#ffb42a] hover:text-[#ffb42a] transition-all"
            >
              <Phone className="w-5 h-5" />
              <span>{STUDIO_PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>

        {/* ---------- Photo side ---------- */}
        <div className="relative w-full max-w-[460px] mx-auto lg:mx-0 lg:ml-auto mb-10 lg:mb-0">
          <div
            ref={frameRef}
            className="relative h-[70vh] min-h-[440px] max-h-[640px] overflow-hidden rounded-3xl border border-[#ffb42a]/30 shadow-[0_0_80px_rgba(255,180,42,0.15)] bg-[#12151c]"
          >
            <img
              ref={imgRef}
              src="/assets/studio-room.jpg"
              alt="Growth Fitness dance studio with full-wall mirrors, LED ceiling lights and a wooden-finish floor"
              className="block w-full h-auto min-h-full object-cover will-change-transform"
              onLoad={() => ScrollTrigger.refresh()}
            />

            {/* Dark fade so the labels are easy to read */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

            {/* Labels: all stacked in the same spot, shown one at a time */}
            <div className="absolute left-5 right-5 bottom-5 grid pointer-events-none">
              {PAN_LABELS.map((label) => (
                <div key={label.title} className="ds-label col-start-1 row-start-1 opacity-0">
                  <div className="text-lg md:text-xl font-display uppercase tracking-widest text-[#ffd36e]">
                    {label.title}
                  </div>
                  <div className="text-xs md:text-sm text-gray-200">{label.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Small entrance photo */}
          <div className="absolute -bottom-8 -left-2 md:-left-8 w-28 md:w-36 rounded-2xl overflow-hidden border-2 border-[#0a0b0e] ring-1 ring-[#ffb42a]/40 shadow-2xl">
            <img
              src="/assets/studio-entrance.jpg"
              alt="Glass entrance to the dance studio"
              className="block w-full h-auto"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] md:text-[10px] font-extrabold uppercase tracking-widest text-white text-center py-1">
              Glass entrance
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
