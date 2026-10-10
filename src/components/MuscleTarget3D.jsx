import React, { useState } from 'react';
import { Target, Flame, ChevronRight, Activity, Award, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MuscleTarget3D({ onOpenTrial }) {
  const [activeTarget, setActiveTarget] = useState('chest');

  const muscleGroups = {
    chest: {
      title: 'CHEST & PECTORALS',
      subtitle: 'Upper & Lower Pectoralis Major, Serratus Anterior',
      primaryMovements: ['Incline Heavy Dumbbell Press', 'Cable Flyes (High to Low)', 'Weighted Parallel Bar Dips'],
      hypertrophySet: '4 Sets × 8-12 Reps (RPE 8.5)',
      equipmentNeeded: '3D Dumbbells, Cable Crossover, Incline Bench',
      color: '#00ff66',
      anatomicalMetrics: { strengthGain: '+42%', activation: '96.2%', fatigueRecovery: '48h' },
      description: 'Sculpt thick, dense pectoral fibers through progressive overload, controlled negative tempo, and maximum isometric stretch.'
    },
    back: {
      title: 'LATS & UPPER BACK',
      subtitle: 'Latissimus Dorsi, Rhomboids, Trapezius, Teres Major',
      primaryMovements: ['Heavy Pendlay Barbell Rows', 'Wide-Grip Cable Pulldowns', 'Single-Arm Neutral Dumbbell Rows'],
      hypertrophySet: '5 Sets × 6-10 Reps (RPE 9)',
      equipmentNeeded: 'Olympic Barbell, Cable Lat Station, Heavy Dumbbells',
      color: '#00e5ff',
      anatomicalMetrics: { strengthGain: '+48%', activation: '98.5%', fatigueRecovery: '72h' },
      description: 'Build a V-taper frame with explosive lat drive, strict scapular retraction, and heavy vertical pulling mechanics.'
    },
    arms: {
      title: 'BICEPS & TRICEPS',
      subtitle: 'Biceps Brachii, Brachialis, Triceps Lateral/Long Head',
      primaryMovements: ['Incline Dumbbell Bicep Curls', 'EZ-Bar Skullcrushers', 'Heavy Cable Tricep Pushdowns'],
      hypertrophySet: '4 Sets × 10-15 Reps (Super-set)',
      equipmentNeeded: 'EZ-Curl Bar, Adjustable Bench, High Cable Pulley',
      color: '#ff2a5f',
      anatomicalMetrics: { strengthGain: '+38%', activation: '94.8%', fatigueRecovery: '36h' },
      description: 'Forge horseshoe triceps and peaked biceps with isolated elbow flexion/extension and peak contraction pauses.'
    },
    legs: {
      title: 'QUADS, HAMSTRINGS & GLUTES',
      subtitle: 'Rectus Femoris, Vastus Lateralis, Biceps Femoris, Gluteus Max',
      primaryMovements: ['Barbell Back Squats', 'Romanian Deadlifts (RDL)', 'Heavy Hack Squats & Leg Press'],
      hypertrophySet: '5 Sets × 5-8 Reps (Heavy Mechanical Strain)',
      equipmentNeeded: 'Power Rack, Bumper Plates, Hack Squat Machine',
      color: '#ff6b00',
      anatomicalMetrics: { strengthGain: '+55%', activation: '99.1%', fatigueRecovery: '72h' },
      description: 'Drive maximum systemic anabolic growth with full depth squats, hip hinge leverage, and hamstring isolation.'
    },
    core: {
      title: 'CORE & RECTUS ABDOMINIS',
      subtitle: 'Rectus Abdominis, Internal/External Obliques, Transverse Abdominis',
      primaryMovements: ['Hanging Leg Raises', 'Cable Ab Crunches', 'Weighted Ab Wheel Rollouts'],
      hypertrophySet: '4 Sets × 15-20 Reps (Time Under Tension)',
      equipmentNeeded: 'Pull-Up Bar, Heavy Cable Stack, Ab Wheel',
      color: '#ffd700',
      anatomicalMetrics: { strengthGain: '+35%', activation: '92.4%', fatigueRecovery: '24h' },
      description: 'Chisel an iron-clad 6-pack core designed for spine stabilization, rotational power, and aesthetic symmetry.'
    }
  };

  const current = muscleGroups[activeTarget];

  return (
    <section id="muscle-target" className="py-24 relative bg-[#0a0b0e] overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-[#00e5ff]/30 text-[#00e5ff] text-xs font-bold uppercase mb-4">
            <Target className="w-4 h-4" />
            <span>ANATOMICAL TARGET MATRIX</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wider mb-4">
            TARGET & ISOLATE <span className="text-gradient-fire">EVERY MUSCLE</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Select a muscle group to view biomechanical exercises, target muscle activation metrics, and expert programming.
          </p>
        </div>

        {/* Target Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: 'chest', label: 'Chest & Pecs' },
            { id: 'back', label: 'Lats & Back' },
            { id: 'arms', label: 'Biceps & Triceps' },
            { id: 'legs', label: 'Quads & Legs' },
            { id: 'core', label: 'Abs & Core' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTarget(tab.id)}
              className={`px-6 py-3 rounded-2xl font-bold uppercase text-xs md:text-sm tracking-wider transition-all duration-300 border ${activeTarget === tab.id ? 'bg-gradient-to-r from-[#00ff66] to-[#00e5ff] text-black border-transparent shadow-[0_0_20px_rgba(0,255,102,0.4)] scale-105' : 'glass-panel text-gray-400 border-white/10 hover:border-white/30 hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Display Card Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Anatomical Visualizer Box (Left 5 cols) */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border-white/10 flex flex-col justify-between relative overflow-hidden group">
            
            {/* Ambient Background Glow */}
            <div 
              className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-[100px] transition-all duration-700 pointer-events-none opacity-40"
              style={{ backgroundColor: current.color }}
            />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase font-extrabold tracking-widest text-gray-400">TARGET ANATOMY</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/5 border border-white/10 text-white">
                  BIOMECHANIC OPTIMIZED
                </span>
              </div>

              {/* Graphic Wireframe Representation */}
              <div className="h-64 my-6 rounded-2xl glass-panel border-white/10 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                <div 
                  className="w-32 h-32 rounded-full border-4 flex items-center justify-center animate-pulse"
                  style={{ borderColor: current.color, boxShadow: `0 0 40px ${current.color}40` }}
                >
                  <Activity className="w-16 h-16" style={{ color: current.color }} />
                </div>
                <span className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-300">
                  {current.title} ACTIVATED
                </span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
              <div className="glass-panel p-3 rounded-xl border-white/5">
                <div className="text-xl font-extrabold text-white font-display">{current.anatomicalMetrics.strengthGain}</div>
                <div className="text-[10px] text-gray-400 uppercase font-semibold">Strength Gain</div>
              </div>
              <div className="glass-panel p-3 rounded-xl border-white/5">
                <div className="text-xl font-extrabold text-[#00ff66] font-display">{current.anatomicalMetrics.activation}</div>
                <div className="text-[10px] text-gray-400 uppercase font-semibold">EMG Activation</div>
              </div>
              <div className="glass-panel p-3 rounded-xl border-white/5">
                <div className="text-xl font-extrabold text-[#00e5ff] font-display">{current.anatomicalMetrics.fatigueRecovery}</div>
                <div className="text-[10px] text-gray-400 uppercase font-semibold">Rest Window</div>
              </div>
            </div>

          </div>

          {/* Biomechanical Prescription Box (Right 7 cols) */}
          <div className="lg:col-span-7 glass-panel p-8 md:p-10 rounded-3xl border-white/10 flex flex-col justify-between">
            <div>
              
              <div className="flex items-center gap-3 mb-2">
                <Flame className="w-6 h-6" style={{ color: current.color }} />
                <span className="text-xs uppercase font-extrabold tracking-widest text-gray-400">{current.subtitle}</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-extrabold uppercase font-display tracking-wide mb-4 text-white">
                {current.title}
              </h3>

              <p className="text-gray-300 text-base leading-relaxed mb-8">
                {current.description}
              </p>

              {/* Primary Movements List */}
              <div className="mb-8">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#00ff66]" /> TOP 3 HYPERTROPHY MOVEMENTS:
                </h4>
                <div className="space-y-3">
                  {current.primaryMovements.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-3 glass-panel p-3.5 rounded-xl border-white/5 hover:border-white/20 transition-all">
                      <span className="w-6 h-6 rounded-lg bg-[#00ff66]/10 text-[#00ff66] font-extrabold text-xs flex items-center justify-center">
                        0{idx + 1}
                      </span>
                      <span className="text-sm font-bold text-gray-200">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prescriptions Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="glass-panel p-4 rounded-xl border-white/10">
                  <div className="text-xs font-bold text-gray-400 uppercase">Recommended Dose:</div>
                  <div className="text-sm font-extrabold text-white mt-1">{current.hypertrophySet}</div>
                </div>
                <div className="glass-panel p-4 rounded-xl border-white/10">
                  <div className="text-xs font-bold text-gray-400 uppercase">Optimal Equipment:</div>
                  <div className="text-sm font-extrabold text-[#00ff66] mt-1">{current.equipmentNeeded}</div>
                </div>
              </div>

            </div>

            {/* Action CTA */}
            <button
              onClick={onOpenTrial}
              className="w-full py-4 bg-[#00ff66] text-black font-extrabold uppercase tracking-wider rounded-2xl hover:bg-[#00e5ff] hover:shadow-[0_0_30px_rgba(0,255,102,0.4)] transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>GET CUSTOMIZED {current.title.split('&')[0]} WORKOUT PLAN</span>
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
