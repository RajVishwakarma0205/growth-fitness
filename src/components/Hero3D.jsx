import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192; // frame files on disk: frame_001.webp ... frame_192.webp
const READY_COUNT = 24; // the hero appears as soon as this many frames are loaded

const frameUrl = (fileNumber) =>
  `${import.meta.env.BASE_URL}frames/frame_${String(fileNumber).padStart(3, '0')}.webp`;

export default function Hero3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [failedUrl, setFailedUrl] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');

    // On phones use every 2nd frame: half the download, still smooth
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const step = isMobile ? 2 : 1;
    const frameCount = Math.ceil(TOTAL_FRAMES / step);
    const readyCount = Math.min(READY_COUNT, frameCount);
    const maxDpr = isMobile ? 1.5 : 2;

    const images = new Array(frameCount);
    const loadedFlags = new Array(frameCount).fill(false);

    let cancelled = false;
    let started = false;
    let failed = false;
    let animationFrameId;
    let targetFrame = 0;
    let currentFrame = 0;
    let st;

    let firstSettled = 0;
    let firstLoaded = 0;
    let firstFailedUrl = null;

    // Finds the closest frame that has already loaded, so the canvas is never blank
    const getImage = (idx) => {
      for (let k = idx; k >= 0; k--) if (loadedFlags[k]) return images[k];
      for (let k = idx + 1; k < frameCount; k++) if (loadedFlags[k]) return images[k];
      return null;
    };

    // Draw a frame on the canvas, filling the screen (like object-fit: cover)
    const renderFrame = (frameIndex) => {
      const img = getImage(frameIndex);
      if (!img) return;

      const cWidth = canvas.width;
      const cHeight = canvas.height;
      const imgAspect = img.naturalWidth / img.naturalHeight;
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

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(Math.round(currentFrame));
    };

    // Smooth lerp loop for forward and reverse scrubbing
    const animLoop = () => {
      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) > 0.01) {
        currentFrame += diff * 0.15;
        renderFrame(Math.min(frameCount - 1, Math.max(0, Math.round(currentFrame))));
      }
      animationFrameId = requestAnimationFrame(animLoop);
    };

    // Pin the hero and map scroll position to a frame
    const initScrollTrigger = () => {
      st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 0.5,
        refreshPriority: 1, // measure the hero first so later pinned sections start in the right place
        onUpdate: (self) => {
          const frameIdx = Math.floor(self.progress * (frameCount - 1));
          targetFrame = Math.min(frameCount - 1, Math.max(0, frameIdx));
        },
      });
      // Recalculate every trigger now that the hero's pin spacing exists
      ScrollTrigger.refresh();
    };

    // Load one frame. First-batch frames decide when the hero can appear.
    const loadFrame = (i, isFirstBatch) => {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        loadedFlags[i] = true;
        // If the visitor is sitting on this exact frame, draw it now
        if (started && i === Math.round(currentFrame)) renderFrame(i);
        if (isFirstBatch) settle(true);
      };
      img.onerror = () => {
        if (cancelled) return;
        if (!firstFailedUrl) firstFailedUrl = img.src;
        if (isFirstBatch) settle(false);
      };
      img.src = frameUrl(i * step + 1);
      images[i] = img;
    };

    const start = () => {
      started = true;
      setIsLoaded(true);
      resizeCanvas();
      animLoop();
      initScrollTrigger();
      // Now load all the remaining frames quietly in the background
      for (let i = readyCount; i < frameCount; i++) loadFrame(i, false);
    };

    const settle = (ok) => {
      if (cancelled || started || failed) return;
      firstSettled++;
      if (ok) firstLoaded++;
      setLoadingProgress(Math.round((firstSettled / readyCount) * 100));

      if (firstSettled === readyCount) {
        if (firstLoaded === 0) {
          // Nothing loaded at all: show a clear message instead of a spinner
          console.error('[Hero3D] No frames could be loaded. First failed URL:', firstFailedUrl);
          failed = true;
          setFailedUrl(firstFailedUrl);
        } else {
          start();
        }
      }
    };

    // Step 1: load only the first batch
    for (let i = 0; i < readyCount; i++) loadFrame(i, true);

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      // Only kill this section's trigger, not every trigger on the page
      if (st) st.kill();
      images.forEach((img) => {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#0a0b0e] overflow-hidden">

      {/* Error overlay: shown only when no frame could be loaded */}
      {failedUrl && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#0a0b0e] text-white p-6 text-center">
          <div className="font-display text-3xl uppercase tracking-widest mb-3 text-[#ff1e27]">
            Hero frames not found
          </div>
          <p className="text-white/70 max-w-xl mb-2">
            The browser could not load the animation frames. Make sure the folder
            <span className="text-white font-semibold"> public/frames </span>
            exists and contains frame_001.webp to frame_192.webp.
          </p>
          <p className="text-white/50 text-sm break-all max-w-xl">
            Tried to load: {failedUrl}
          </p>
        </div>
      )}

      {/* Loading overlay: only until the first few frames are ready */}
      {!isLoaded && !failedUrl && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0a0b0e] text-white p-6">
          <div className="w-16 h-16 rounded-full border-4 border-[#ff1e27]/20 border-t-[#ff1e27] animate-spin mb-6" />
          <div className="font-display text-2xl font-extrabold uppercase tracking-widest mb-2">
            LOADING... {loadingProgress}%
          </div>
          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#ff1e27] to-[#ff4b2b] transition-all duration-200 rounded-full"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* WebP Image Sequence Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none select-none"
      />
    </div>
  );
}
