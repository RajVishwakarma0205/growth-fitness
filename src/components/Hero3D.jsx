import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192; // Total extracted WebP frames

// Helper to format frame filename: frame_001.webp
const currentFrameUrl = (index) => {
  const paddedIndex = String(index + 1).padStart(3, '0');
  return `/frames/frame_${paddedIndex}.webp`;
};

export default function Hero3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let targetFrame = 0;
    let currentFrame = 0;

    // Responsive Canvas Resize preserving aspect ratio (object-fit: cover)
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(Math.round(currentFrame));
    };

    // Render WebP Frame to Canvas with Aspect Ratio Preservation
    const renderFrame = (frameIndex) => {
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cWidth = canvas.width;
      const cHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      const imgAspect = imgWidth / imgHeight;
      const canvasAspect = cWidth / cHeight;

      let renderW, renderH, xOffset, yOffset;

      if (canvasAspect > imgAspect) {
        renderW = cWidth;
        renderH = cWidth / imgAspect;
        xOffset = 0;
        yOffset = (cHeight - renderH) / 2;
      } else {
        renderW = cHeight * imgAspect;
        renderH = cHeight;
        xOffset = (cWidth - renderW) / 2;
        yOffset = 0;
      }

      ctx.clearRect(0, 0, cWidth, cHeight);
      ctx.drawImage(img, xOffset, yOffset, renderW, renderH);
    };

    // Continuous 60fps Lerp Animation Loop for Smooth Forward & Reverse Scrub
    const animLoop = () => {
      // Smooth linear interpolation towards target frame
      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) > 0.01) {
        currentFrame += diff * 0.15; // Smooth lerp factor
        renderFrame(Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrame))));
      }
      animationFrameId = requestAnimationFrame(animLoop);
    };

    // Preload All 192 WebP Frames
    let loadedCount = 0;
    const images = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = currentFrameUrl(i);
      img.onload = () => {
        loadedCount++;
        const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadingProgress(percent);

        if (loadedCount === 1) {
          // Render initial frame immediately once frame 1 is ready
          resizeCanvas();
          renderFrame(0);
        }

        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
          resizeCanvas();
          animLoop();
          initScrollTrigger();
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    window.addEventListener('resize', resizeCanvas);

    // GSAP ScrollTrigger Section Pinning & Scroll-to-Frame Mapping
    let st;
    const initScrollTrigger = () => {
      st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=250%', // Pinned scroll length
        pin: true,
        scrub: 0.5, // Buttery smooth response forward & reverse
        onUpdate: (self) => {
          const frameIdx = Math.floor(self.progress * (TOTAL_FRAMES - 1));
          targetFrame = Math.min(TOTAL_FRAMES - 1, Math.max(0, frameIdx));
        },
      });
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      if (st) st.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#0a0b0e] overflow-hidden">
      
      {/* Loading Indicator Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0a0b0e] text-white p-6">
          <div className="w-16 h-16 rounded-full border-4 border-[#ff1e27]/20 border-t-[#ff1e27] animate-spin mb-6" />
          <div className="font-display text-2xl font-extrabold uppercase tracking-widest mb-2">
            PRELOADING 3D WEBP FRAMES... {loadingProgress}%
          </div>
          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#ff1e27] to-[#ff4b2b] transition-all duration-200 rounded-full"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* 60fps WebP Image Sequence Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none select-none"
      />
    </div>
  );
}
