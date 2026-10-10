import React, { useState } from 'react';
import { Camera, Maximize2, X, MapPin, ShieldCheck, Dumbbell, Sparkles } from 'lucide-react';

export default function FacilityShowcase() {
  const [activeImg, setActiveImg] = useState(null);

  const facilities = [
    {
      id: 1,
      title: 'MAIN ARENA FLOOR & TURF TRACK',
      tag: 'STRENGTH & SPRINT TURF',
      desc: 'Spacious high-impact wood floor equipped with heavy cable crossover stations, dumbbell racks, smith machines, and central turf sprint track.',
      image: '/assets/gym-floor.jpg'
    },
    {
      id: 2,
      tag: 'AEROBICS & DANCE STUDIO',
      title: 'GLASS AEROBICS & DISCIPLINE STUDIO',
      desc: 'Glass-enclosed private group fitness studio featuring wall-to-wall mirrors, wooden sprung flooring, and motivational quote installations.',
      image: '/assets/aerobics-studio.jpg'
    },
    {
      id: 3,
      tag: 'CYBER CARDIO DECK',
      title: 'CARDIO & ENDURANCE ZONE',
      desc: 'State-of-the-art commercial treadmill line, air assault bikes, Swiss stability balls, and dedicated plyometric zone.',
      image: '/assets/cardio-zone.jpg'
    },
    {
      id: 4,
      tag: 'POWER RACKS & CABLE STACK',
      title: 'HEAVY COMPOUND STRENGTH RACKS',
      desc: 'Dedicated heavy power racks, Olympic squat cages, lat pulldown stacks, and chest press machines for serious lifters.',
      image: '/assets/strength-zone.png'
    }
  ];

  return (
    <section id="facility" className="py-24 relative bg-[#0a0b0e] overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-[#ff1e27]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-[#ff1e27]/30 text-[#ff1e27] text-xs font-bold uppercase mb-4">
            <Camera className="w-4 h-4" />
            <span>OUR REAL FACILITY & ARENA</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wider mb-4">
            EXPLORE THE <span className="text-gradient-fire">GROWTH ARENA</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Take a virtual tour of our actual facility—featuring world-class compound power racks, glass group studios, sprint turf, and cardio decks.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilities.map((f) => (
            <div
              key={f.id}
              onClick={() => setActiveImg(f)}
              className="glass-panel rounded-3xl overflow-hidden border-white/10 group cursor-pointer hover:border-[#ff1e27]/60 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-72 md:h-80 overflow-hidden">
                <img 
                  src={f.image} 
                  alt={f.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151c] via-black/30 to-transparent" />
                
                {/* Tag Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold bg-black/70 backdrop-blur-md border border-white/20 text-[#ff1e27] uppercase">
                  {f.tag}
                </div>

                {/* Expand Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:bg-[#ff1e27] group-hover:border-transparent transition-all">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-2xl font-extrabold font-display uppercase tracking-wider text-white">
                    {f.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div className="p-6">
                <p className="text-xs text-gray-300 leading-relaxed">
                  {f.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Full Screen Lightbox Modal */}
      {activeImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative max-w-5xl w-full glass-panel p-4 md:p-6 rounded-3xl border-white/20 shadow-2xl">
            <button
              onClick={() => setActiveImg(null)}
              className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-black/80 text-white hover:text-[#ff1e27]"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={activeImg.image} 
              alt={activeImg.title} 
              className="w-full h-[500px] md:h-[600px] object-cover rounded-2xl mb-4"
            />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#ff1e27] uppercase">{activeImg.tag}</span>
                <h4 className="text-2xl font-extrabold font-display text-white">{activeImg.title}</h4>
              </div>
              <p className="text-xs text-gray-300 max-w-lg">{activeImg.desc}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
