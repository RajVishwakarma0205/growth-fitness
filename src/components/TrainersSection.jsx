import React from 'react';
import { Award, Instagram, Twitter, ShieldCheck } from 'lucide-react';

export default function TrainersSection({ onOpenTrial }) {
  const trainers = [
    {
      name: 'VIKTOR STEELE',
      role: 'HEAD OF HYPERTROPHY & POWER',
      exp: '12+ YRS EXP',
      specialty: 'Biomechanical barbell loading & IFBB Pro prep.',
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1000&auto=format&fit=crop',
      color: '#00ff66'
    },
    {
      name: 'SARAH VANCE',
      role: 'MASTER HIIT & PHYSIQUE COACH',
      exp: '9+ YRS EXP',
      specialty: 'High-intensity conditioning, fat loss metabolism & core.',
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000&auto=format&fit=crop',
      color: '#00e5ff'
    },
    {
      name: 'DARIUS KING',
      role: 'ATHLETIC PERFORMANCE DIRECTOR',
      exp: '14+ YRS EXP',
      specialty: 'NFL & Olympic athlete speed, agility, and joint resilience.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
      color: '#ff2a5f'
    }
  ];

  return (
    <section id="trainers" className="py-24 relative bg-[#0d0e12] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-[#00ff66]/30 text-[#00ff66] text-xs font-bold uppercase mb-4">
            <Award className="w-4 h-4" />
            <span>WORLD-CLASS MASTERS</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wider mb-4">
            MEET OUR <span className="text-gradient-neon">ELITE COACHES</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Certified master trainers dedicated to engineering your customized training, nutrition, and recovery.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl overflow-hidden border-white/10 group hover:border-[#00ff66]/50 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={t.image} 
                  alt={t.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151c] via-black/30 to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-extrabold bg-black/60 border border-white/10 text-[#00ff66] uppercase">
                  {t.exp}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-extrabold font-display uppercase tracking-wider text-white mb-1">
                  {t.name}
                </h3>
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#00ff66] mb-3">
                  {t.role}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {t.specialty}
                </p>

                <button
                  onClick={onOpenTrial}
                  className="w-full py-3 rounded-xl glass-panel text-xs font-extrabold uppercase tracking-wider text-white hover:bg-[#00ff66] hover:text-black hover:border-transparent transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>BOOK PRIVATE SESSION</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
