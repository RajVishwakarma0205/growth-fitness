import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Each word has its own entrance effect: 'rise', 'impact' or 'expand'
const WORDS = [
  {
    word: 'DISCIPLINE',
    eyebrow: 'The first rule',
    tagline: 'Show up. Every single day.',
    effect: 'rise',
  },
  {
    word: 'STRENGTH',
    eyebrow: 'The second rule',
    tagline: 'Built one rep at a time.',
    effect: 'impact',
  },
  {
    word: 'PERFORMANCE',
    eyebrow: 'The result',
    tagline: 'This is what growth looks like.',
    effect: 'expand',
  },
];

export default function DisciplineSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // gsap.context makes cleanup safe (also under React StrictMode)
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.dc-panel');
      const navItems = gsap.utils.toArray('.dc-nav-item');
      const bar = section.querySelector('.dc-bar');

      gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=450%',
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      let t = 0;

      panels.forEach((panel, i) => {
        const effect = WORDS[i].effect;
        const isLast = i === panels.length - 1;
        const h2 = panel.querySelector('.dc-word');
        const letters = panel.querySelectorAll('.dc-letter');
        const meta = panel.querySelectorAll('.dc-meta');
        const glow = panel.querySelector('.dc-glow');

        const inDur = effect === 'expand' ? 1.5 : 1.2;
        const hold = isLast ? 1.6 : 0.9;
        const outDur = 0.7;

        // Panel becomes visible
        tl.fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, t);

        // Background glow fades in
        tl.fromTo(glow, { opacity: 0 }, { opacity: 1, duration: inDur }, t);

        // Small label and tagline
        tl.fromTo(
          meta,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
          t + 0.3
        );

        // Active item in the bottom navigation
        tl.to(navItems[i], { opacity: 1, duration: 0.3 }, t);

        // ---------- Entrance effects ----------
        if (effect === 'rise') {
          // Letters slide up out of a mask
          tl.fromTo(
            letters,
            { yPercent: 115, rotate: 6, opacity: 0 },
            {
              yPercent: 0,
              rotate: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.05,
              ease: 'power4.out',
            },
            t
          );
        } else if (effect === 'impact') {
          // Letters slam in from large and blurry
          tl.fromTo(
            letters,
            { scale: 2.6, opacity: 0, filter: 'blur(24px)' },
            {
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              stagger: { each: 0.05, from: 'center' },
              ease: 'power3.out',
            },
            t
          );
        } else {
          // Letters fade in while spacing tightens, with a red glow
          tl.fromTo(letters, { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.06 }, t);
          tl.fromTo(
            h2,
            { letterSpacing: '0.3em', textShadow: '0 0 0px rgba(255,30,39,0)' },
            {
              letterSpacing: '0.05em',
              textShadow: '0 0 45px rgba(255,30,39,0.7)',
              duration: inDur,
              ease: 'power3.out',
            },
            t
          );
        }

        // ---------- Exit (every word except the last) ----------
        const outStart = t + inDur + hold;

        if (!isLast) {
          if (effect === 'rise') {
            tl.to(
              letters,
              {
                yPercent: -115,
                rotate: -6,
                opacity: 0,
                duration: outDur,
                stagger: 0.03,
                ease: 'power3.in',
              },
              outStart
            );
          } else {
            tl.to(
              letters,
              {
                scale: 0.6,
                opacity: 0,
                filter: 'blur(12px)',
                duration: outDur,
                stagger: { each: 0.03, from: 'edges' },
                ease: 'power3.in',
              },
              outStart
            );
          }
          tl.to(meta, { y: -20, opacity: 0, duration: 0.4 }, outStart);
          tl.to(glow, { opacity: 0, duration: outDur }, outStart);
          tl.to(navItems[i], { opacity: 0.3, duration: 0.3 }, outStart);
          tl.to(panel, { autoAlpha: 0, duration: 0.05 }, outStart + outDur + 0.2);
          t = outStart + outDur + 0.1;
        } else {
          t = outStart; // last word stays on screen until the section unpins
        }
      });

      // Progress bar fills across the whole timeline
      tl.to(bar, { scaleX: 1, ease: 'none', duration: tl.duration() }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="discipline"
      className="relative w-full h-screen overflow-hidden bg-[#0a0b0e]"
    >
      {/* Background grid and vignette */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0b0e_85%)]" />

      {/* Static label so the screen is never empty */}
      <div className="absolute top-24 left-0 right-0 text-center z-10">
        <span className="text-[11px] md:text-xs font-extrabold uppercase tracking-[0.4em] text-white/40">
          The Growth Code
        </span>
      </div>

      {/* Word panels */}
      {WORDS.map((item, i) => (
        <div
          key={item.word}
          className="dc-panel absolute inset-0 flex flex-col items-center justify-center px-4 text-center invisible"
        >
          <div className="dc-glow absolute w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-[#ff1e27]/15 blur-[140px] pointer-events-none opacity-0" />

          <div className="relative z-10">
            <p className="dc-meta text-xs md:text-sm font-extrabold uppercase tracking-[0.35em] text-[#ff1e27] mb-4 md:mb-6">
              0{i + 1} / 03 &mdash; {item.eyebrow}
            </p>

            <h2
              aria-label={item.word}
              className={`dc-word font-display whitespace-nowrap select-none leading-[0.95] text-[clamp(2.6rem,11vw,12rem)] ${
                item.effect === 'rise' ? 'overflow-hidden py-2' : ''
              } ${item.effect === 'expand' ? 'text-[#ff1e27]' : 'text-white'}`}
            >
              {item.word.split('').map((char, idx) => (
                <span key={idx} aria-hidden="true" className="dc-letter inline-block will-change-transform">
                  {char}
                </span>
              ))}
            </h2>

            <p className="dc-meta mt-4 md:mt-6 text-sm md:text-lg text-gray-400 tracking-wide">
              {item.tagline}
            </p>
          </div>
        </div>
      ))}

      {/* Bottom navigation and progress */}
      <div className="absolute bottom-10 left-0 right-0 z-10 px-6">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between mb-3">
            {WORDS.map((item) => (
              <span
                key={item.word}
                className="dc-nav-item text-[10px] md:text-xs font-extrabold uppercase tracking-[0.25em] text-white opacity-30"
              >
                {item.word}
              </span>
            ))}
          </div>
          <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
            <div className="dc-bar h-full w-full bg-gradient-to-r from-[#ff1e27] to-[#ff4b2b]" />
          </div>
        </div>
      </div>
    </section>
  );
}
