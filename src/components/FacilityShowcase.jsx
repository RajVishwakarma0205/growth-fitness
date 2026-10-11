import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* =====================================================
   EDIT THIS LIST to change the photos and the text.
   ===================================================== */
const FACILITIES = [
  {
    id: 1,
    tag: 'STRENGTH & SPRINT TURF',
    title: 'MAIN ARENA FLOOR & TURF TRACK',
    desc: 'Spacious high-impact wood floor equipped with heavy cable crossover stations, dumbbell racks, smith machines, and central turf sprint track.',
    image: '/assets/gym-floor.jpg',
  },
  {
    id: 2,
    tag: 'AEROBICS & DANCE STUDIO',
    title: 'GLASS AEROBICS & DISCIPLINE STUDIO',
    desc: 'Glass-enclosed private group fitness studio featuring wall-to-wall mirrors, wooden sprung flooring, and motivational quote installations.',
    image: '/assets/aerobics-studio.jpg',
  },
  {
    id: 3,
    tag: 'CYBER CARDIO DECK',
    title: 'CARDIO & ENDURANCE ZONE',
    desc: 'State-of-the-art commercial treadmill line, air assault bikes, Swiss stability balls, and dedicated plyometric zone.',
    image: '/assets/cardio-zone.jpg',
  },
  {
    id: 4,
    tag: 'POWER RACKS & CABLE STACK',
    title: 'HEAVY COMPOUND STRENGTH RACKS',
    desc: 'Dedicated heavy power racks, Olympic squat cages, lat pulldown stacks, and chest press machines for serious lifters.',
    image: '/assets/strength-zone.png',
  },
];

const pad = (n) => String(n).padStart(2, '0');

export default function FacilityShowcase() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const counterRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const imgs = gsap.utils.toArray('.fs-img');

      // How far the row of panels has to slide sideways
      const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);

      // Photos are slightly zoomed so they can drift without showing edges
      gsap.set(imgs, { scale: 1.25 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance() * 1.2}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              FACILITIES.length - 1,
              Math.round(self.progress * (FACILITIES.length - 1))
            );
            if (counterRef.current) {
              counterRef.current.textContent = `${pad(idx + 1)} / ${pad(FACILITIES.length)}`;
            }
          },
        },
      });

      // The row of panels slides left
      tl.to(track, { x: () => -distance(), duration: 1 }, 0);
      // Photos drift slowly inside their frames (parallax)
      tl.fromTo(imgs, { xPercent: -8 }, { xPercent: 8, duration: 1 }, 0);
      // Progress bar fills
      tl.fromTo('.fs-bar', { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="facility"
      className="relative w-full h-screen overflow-hidden bg-[#0a0b0e] flex flex-col"
    >
      {/* Glow effects */}
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-[#ff1e27]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff1e27]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 shrink-0 pt-24 md:pt-28 px-6 md:px-[8vw]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-[#ff1e27]/30 text-[#ff1e27] text-xs font-bold uppercase mb-3">
          <Camera className="w-4 h-4" />
          <span>Our real facility &amp; arena</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wider">
          EXPLORE THE <span className="text-gradient-fire">GROWTH ARENA</span>
        </h2>
      </div>

      {/* Sliding row of panels */}
      <div className="relative z-10 flex-1 min-h-0 flex items-center">
        <div
          ref={trackRef}
          className="flex w-max items-center gap-6 md:gap-10 px-6 md:px-[8vw] will-change-transform"
        >
          {FACILITIES.map((f, i) => (
            <article
              key={f.id}
              className="relative shrink-0 w-[84vw] md:w-[72vw] lg:w-[900px] h-[56vh] min-h-[340px] max-h-[620px] rounded-3xl overflow-hidden glass-panel border border-white/10 flex flex-col md:flex-row"
            >
              {/* Photo */}
              <div className="relative h-[45%] md:h-full md:w-[46%] overflow-hidden shrink-0">
                <img
                  src={f.image}
                  alt={f.title}
                  className="fs-img absolute inset-0 w-full h-full object-cover"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#12151c]/80" />
              </div>

              {/* Text */}
              <div className="flex-1 p-5 md:p-10 flex flex-col justify-between min-h-0">
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="font-display text-5xl md:text-8xl leading-none text-transparent select-none"
                    style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}
                  >
                    {pad(i + 1)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-black/60 border border-white/20 text-[#ff1e27] uppercase text-right">
                    {f.tag}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl md:text-4xl uppercase tracking-wider text-white leading-tight mb-2 md:mb-4">
                    {f.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed line-clamp-4 md:line-clamp-none">
                    {f.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Counter and progress */}
      <div className="relative z-10 shrink-0 px-6 md:px-[8vw] pb-8 flex items-center gap-5">
        <span
          ref={counterRef}
          className="font-display text-lg tracking-widest text-white w-24"
        >
          {`${pad(1)} / ${pad(FACILITIES.length)}`}
        </span>
        <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="fs-bar h-full w-full bg-gradient-to-r from-[#ff1e27] to-[#ff4b2b]"
            style={{ transformOrigin: 'left center' }}
          />
        </div>
        <span className="hidden md:block text-[10px] font-extrabold uppercase tracking-[0.3em] text-white/40">
          Keep scrolling
        </span>
      </div>
    </section>
  );
}
