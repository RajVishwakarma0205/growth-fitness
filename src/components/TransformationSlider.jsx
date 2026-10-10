import React, { useState } from 'react';
import { Sparkles, Trophy, ArrowLeftRight, CheckCircle } from 'lucide-react';

export default function TransformationSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
    {
      name: 'MARCUS VANCE',
      timeframe: '12-WEEK SHRED',
      stats: 'Lost 14kg Fat | Gained 4.5kg Lean Muscle',
      quote: 'Growth Fitness changed my physique completely. The 3D biomechanical guidance and coaching blew my expectations out of the water.',
      beforeImg: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop', // Male fitness transformation
      afterImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop'
    },
    {
      name: 'ELENA ROSTOVA',
      timeframe: '16-WEEK HYPERTROPHY',
      stats: 'Lost 9kg Fat | Squat +45kg Increase',
      quote: 'The community and high-energy atmosphere push you past every mental limit. I have never felt stronger or more confident.',
      beforeImg: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop',
      afterImg: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  const current = stories[activeStory];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  return (
    <section id="transformations" className="py-24 relative bg-[#0a0b0e] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00e5ff]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-[#00ff66]/30 text-[#00ff66] text-xs font-bold uppercase mb-4">
            <Trophy className="w-4 h-4" />
            <span>REAL ATHLETE RESULTS</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wider mb-4">
            PROVEN <span className="text-gradient-neon">TRANSFORMATIONS</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Drag the interactive slider below to reveal real client physique transformations achieved at Growth Fitness.
          </p>
        </div>

        {/* Story Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {stories.map((s, idx) => (
            <button
              key={idx}
              onClick={() => { setActiveStory(idx); setSliderPos(50); }}
              className={`px-6 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-all border ${activeStory === idx ? 'bg-[#00ff66] text-black border-transparent shadow-[0_0_15px_rgba(0,255,102,0.4)]' : 'glass-panel text-gray-400 border-white/10 hover:text-white'}`}
            >
              {s.name} ({s.timeframe})
            </button>
          ))}
        </div>

        {/* Interactive Comparison Viewport */}
        <div className="max-w-4xl mx-auto">
          <div 
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[480px] md:h-[540px] rounded-3xl overflow-hidden glass-panel border-white/10 select-none cursor-ew-resize shadow-2xl"
          >
            {/* After Image (Background Full) */}
            <img 
              src={current.afterImg} 
              alt="After Transformation"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6 z-10 px-4 py-2 rounded-full glass-panel bg-black/60 border-emerald-500/30 text-[#00ff66] text-xs font-extrabold uppercase tracking-wider">
              AFTER ({current.timeframe})
            </div>

            {/* Before Image (Clipped Overlay) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img 
                src={current.beforeImg} 
                alt="Before Transformation"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="absolute top-6 left-6 z-10 px-4 py-2 rounded-full glass-panel bg-black/60 border-white/20 text-white text-xs font-extrabold uppercase tracking-wider">
                BEFORE DAY 01
              </div>
            </div>

            {/* Vertical Divider Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-[#00ff66] shadow-[0_0_20px_#00ff66] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#00ff66] text-black flex items-center justify-center shadow-lg border-2 border-black">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Testimonial Quote Banner */}
          <div className="mt-8 glass-panel p-6 md:p-8 rounded-2xl border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#00ff66] text-sm font-extrabold uppercase mb-1">
                <CheckCircle className="w-4 h-4" />
                <span>{current.stats}</span>
              </div>
              <p className="text-gray-300 italic text-base md:text-lg">"{current.quote}"</p>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-xl font-extrabold font-display text-white">{current.name}</span>
              <div className="text-xs text-gray-400 font-bold uppercase">{current.timeframe} MEMBER</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
