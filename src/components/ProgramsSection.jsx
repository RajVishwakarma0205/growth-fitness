import React, { useState } from 'react';
import { Dumbbell, Zap, Flame, HeartPulse, Shield, Clock, Users, ArrowUpRight } from 'lucide-react';

export default function ProgramsSection({ onOpenTrial }) {
  const [filter, setFilter] = useState('all');

  const programs = [
    {
      id: 1,
      category: 'hypertrophy',
      title: '3D HYPERTROPHY & TURF ENGINE',
      level: 'ADVANCED / INTERMEDIATE',
      duration: '12 WEEKS',
      calories: '650 KCAL/SESSION',
      icon: Dumbbell,
      badge: 'MAIN ARENA FLOOR',
      color: '#ff1e27',
      image: '/assets/gym-floor.jpg',
      desc: 'Progressive overload training utilizing our central turf sprint track, cable crossover stations, and dumbbell arena.'
    },
    {
      id: 2,
      category: 'hiit',
      title: 'DISCIPLINE GROUP AEROBICS',
      level: 'ALL LEVELS',
      duration: '8 WEEKS',
      calories: '850 KCAL/SESSION',
      icon: Flame,
      badge: 'GLASS STUDIO',
      color: '#ff6b00',
      image: '/assets/aerobics-studio.jpg',
      desc: 'High-intensity group fitness, dance, and conditioning inside our private mirror glass-enclosed aerobics studio.'
    },
    {
      id: 3,
      category: 'hiit',
      title: 'CYBER CARDIO & METABOLIC BURN',
      level: 'ALL LEVELS',
      duration: '8 WEEKS',
      calories: '750 KCAL/SESSION',
      icon: HeartPulse,
      badge: 'CARDIO DECK',
      color: '#00e5ff',
      image: '/assets/cardio-zone.jpg',
      desc: 'Endurance conditioning combining commercial treadmills, air assault bikes, Swiss ball core, and sprint intervals.'
    },
    {
      id: 4,
      category: 'strength',
      title: 'BEAST POWER RACKS & HEAVY STRENGTH',
      level: 'ADVANCED',
      duration: '16 WEEKS',
      calories: '600 KCAL/SESSION',
      icon: Shield,
      badge: 'HEAVY POWER RACKS',
      color: '#ffd700',
      image: '/assets/strength-zone.png',
      desc: 'Master compound lifts in our heavy squat rack and lat pulldown arena. Biomechanical power analysis for maximum PR gains.'
    }
  ];

  const filteredPrograms = filter === 'all' ? programs : programs.filter(p => p.category === filter);

  return (
    <section id="programs" className="py-24 relative bg-[#0d0e12] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-[#ff1e27]/30 text-[#ff1e27] text-xs font-bold uppercase mb-4">
              <Zap className="w-4 h-4" />
              <span>ELITE WORKOUT ARCHITECTURE</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wider text-white">
              OUR ARENA <span className="text-gradient-fire">PROGRAMS</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 glass-panel p-2 rounded-2xl border-white/10 self-start md:self-auto">
            {[
              { id: 'all', name: 'ALL PROGRAMS' },
              { id: 'hypertrophy', name: 'HYPERTROPHY & TURF' },
              { id: 'hiit', name: 'CARDIO & AEROBICS' },
              { id: 'strength', name: 'POWER RACKS' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${filter === t.id ? 'bg-[#ff1e27] text-white shadow-[0_0_15px_rgba(255,30,39,0.5)]' : 'text-gray-400 hover:text-white'}`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPrograms.map((p) => {
            return (
              <div 
                key={p.id}
                className="glass-panel rounded-3xl overflow-hidden border-white/10 group hover:border-[#ff1e27]/50 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Header Banner */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151c] via-black/40 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.badge}
                  </div>

                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                    <h3 className="text-2xl md:text-3xl font-extrabold font-display uppercase tracking-wider text-white">
                      {p.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      {p.desc}
                    </p>

                    {/* Spec Pills */}
                    <div className="grid grid-cols-3 gap-3 mb-8 text-xs font-bold text-gray-300">
                      <div className="glass-panel p-3 rounded-xl border-white/5 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#ff1e27]" />
                        <span>{p.duration}</span>
                      </div>
                      <div className="glass-panel p-3 rounded-xl border-white/5 flex items-center gap-2">
                        <Flame className="w-4 h-4 text-amber-400" />
                        <span>{p.calories}</span>
                      </div>
                      <div className="glass-panel p-3 rounded-xl border-white/5 flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#00e5ff]" />
                        <span>{p.level}</span>
                      </div>
                    </div>
                  </div>

                  {/* Enroll CTA */}
                  <button
                    onClick={onOpenTrial}
                    className="w-full py-3.5 rounded-xl glass-panel text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#ff1e27] hover:border-transparent transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>ENROLL IN THIS PROGRAM</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
