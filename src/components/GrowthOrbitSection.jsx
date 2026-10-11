import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* =====================================================
   EDIT THIS LIST to change the photos in the ring.
   Use any images from public/assets (6 photos looks best).
   "pos" controls which part of the photo is shown in the card.
   ===================================================== */
const ORBIT_PHOTOS = [
  { src: '/assets/gym-floor.jpg', label: 'Gym Floor', pos: 'center' },
  { src: '/assets/aerobics-studio.jpg', label: 'Aerobics Studio', pos: 'center' },
  { src: '/assets/studio-room.jpg', label: 'Dance Studio', pos: 'center 40%' },
  { src: '/assets/cardio-zone.jpg', label: 'Cardio Zone', pos: 'center' },
  { src: '/assets/strength-zone.png', label: 'Strength Zone', pos: 'center' },
  { src: '/assets/studio-entrance.jpg', label: 'Studio Entrance', pos: 'center' },
];

export default function GrowthOrbitSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.go-card');
      const count = cards.length;

      // Values that the scroll animates: how far out the ring is, and how far it has turned
      const state = { angle: Math.PI / 2, r: 0.15 };

      gsap.set(cards, { xPercent: -50, yPercent: -50 });

      // Puts every card on the ring. Cards at the "back" are smaller and dimmer,
      // cards at the "front" are bigger and pass in front of the title.
      const layout = () => {
        const W = stage.clientWidth;
        const H = stage.clientHeight;
        const small = W < 768;
        const rx = W * (small ? 0.34 : 0.38);
        const ry = H * (small ? 0.24 : 0.27);
        const appear = Math.min(1, state.r / 0.5);

        cards.forEach((card, i) => {
          const a = state.angle + (i / count) * Math.PI * 2;
          const depth = (Math.sin(a) + 1) / 2; // 0 = back, 1 = front
          gsap.set(card, {
            x: Math.cos(a) * rx * state.r,
            y: Math.sin(a) * ry * state.r,
            scale: 0.55 + depth * 0.55,
            opacity: (0.3 + depth * 0.7) * appear,
            rotation: Math.cos(a) * 5,
            zIndex: Math.round(depth * 100), // the title sits at 50
          });
        });
      };

      layout();

      const tl = gsap.timeline({
        onUpdate: layout,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onRefresh: layout,
        },
      });

      // Photos spread out from the center into a ring
      tl.to(state, { r: 1, duration: 1, ease: 'power2.out' }, 0);
      // The ring makes one full turn while you scroll
      tl.to(state, { angle: Math.PI / 2 + Math.PI * 2, duration: 6, ease: 'none' }, 0);
      // Title grows in slightly
      tl.fromTo(
        '.go-title',
        { scale: 0.88, opacity: 0.4 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' },
        0
      );
      // Short pause at the end before the page continues
      tl.to({}, { duration: 0.5 }, 6);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="growth"
      className="relative isolate w-full h-screen overflow-hidden bg-[#0a0b0e]"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-[#ff1e27]/10 blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_35%,#0a0b0e_90%)]" />

      {/* Photo ring */}
      <div ref={stageRef} className="absolute inset-0 pointer-events-none">
        {ORBIT_PHOTOS.map((photo) => (
          <div
            key={photo.label}
            className="go-card absolute left-1/2 top-1/2 w-[26vw] sm:w-36 md:w-44 lg:w-52 aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)] will-change-transform"
          >
            <img
              src={photo.src}
              alt={photo.label}
              className="w-full h-full object-cover"
              style={{ objectPosition: photo.pos }}
              draggable="false"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent pt-8 pb-2 px-2 text-center">
              <span className="text-[9px] md:text-[11px] font-extrabold uppercase tracking-widest text-white">
                {photo.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Title in the middle: photos pass in front of and behind it */}
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
        <h2 className="go-title text-center font-display uppercase leading-[0.85] select-none">
          <span className="block text-[clamp(3.6rem,16vw,14rem)] text-white">GROWTH</span>
          <span className="block text-[clamp(3.6rem,16vw,14rem)] bg-clip-text text-transparent bg-gradient-to-r from-[#ff1e27] to-[#ff4b2b]">
            FITNESS
          </span>
        </h2>
      </div>

      {/* Tagline */}
      <div className="absolute bottom-8 left-0 right-0 z-[60] text-center pointer-events-none">
        <span className="text-[11px] md:text-xs font-extrabold uppercase tracking-[0.4em] text-white/50">
          Believe in yourself
        </span>
      </div>
    </section>
  );
}
