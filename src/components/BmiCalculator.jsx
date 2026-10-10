import React, { useState } from 'react';
import { Calculator, Flame, Activity, Zap, CheckCircle2 } from 'lucide-react';

export default function BmiCalculator() {
  const [height, setHeight] = useState(178); // cm
  const [weight, setWeight] = useState(76); // kg
  const [age, setAge] = useState(25);
  const [activity, setActivity] = useState(1.55); // Moderate activity factor
  const [gender, setGender] = useState('male');

  // BMI Calculation
  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

  // Daily Energy Expenditure (TDEE BMR Formula)
  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = Math.round(bmr * activity);

  const getBmiCategory = (val) => {
    const num = parseFloat(val);
    if (num < 18.5) return { category: 'Underweight', color: '#00e5ff', status: 'Lean Bulk Needed' };
    if (num <= 24.9) return { category: 'Normal & Athletic', color: '#00ff66', status: 'Prime Fitness Zone' };
    if (num <= 29.9) return { category: 'Overweight', color: '#ff6b00', status: 'Body Recomposition' };
    return { category: 'Obese Zone', color: '#ff2a5f', status: 'High Cut Needed' };
  };

  const bmiMeta = getBmiCategory(bmi);

  return (
    <section id="calculator" className="py-24 relative bg-[#0d0e12] overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#00ff66]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-[#00ff66]/30 text-[#00ff66] text-xs font-bold uppercase mb-4">
            <Calculator className="w-4 h-4" />
            <span>AI METABOLIC CALCULATOR</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wider mb-4">
            CALCULATE YOUR <span className="text-gradient-neon">MACROS & BMI</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Input your biometric parameters to reveal your target daily caloric intake, BMI status, and muscle-building macros.
          </p>
        </div>

        {/* Calculator Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Input Controls (Left 7 Cols) */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border-white/10 space-y-6">
            
            {/* Gender Toggle */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 block">Biological Gender:</label>
              <div className="grid grid-cols-2 gap-4">
                {['male', 'female'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`py-3 rounded-xl font-bold uppercase text-xs tracking-wider transition-all border ${gender === g ? 'bg-[#00ff66] text-black border-transparent shadow-[0_0_15px_rgba(0,255,102,0.3)]' : 'glass-panel text-gray-400 border-white/10 hover:text-white'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Height Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Height:</span>
                <span className="text-lg font-extrabold text-[#00ff66] font-display">{height} CM ({Math.floor(height/30.48)}' {Math.round((height%30.48)/2.54)}")</span>
              </div>
              <input
                type="range"
                min="130"
                max="220"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00ff66]"
              />
            </div>

            {/* Weight Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Weight:</span>
                <span className="text-lg font-extrabold text-[#00e5ff] font-display">{weight} KG ({(weight * 2.20462).toFixed(0)} LBS)</span>
              </div>
              <input
                type="range"
                min="40"
                max="160"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00e5ff]"
              />
            </div>

            {/* Age Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Age:</span>
                <span className="text-lg font-extrabold text-amber-400 font-display">{age} YEARS</span>
              </div>
              <input
                type="range"
                min="15"
                max="80"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Activity Level Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 block">Activity Level:</label>
              <select
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="w-full bg-[#12151c] text-white p-3.5 rounded-xl border border-white/10 text-sm font-bold focus:border-[#00ff66] outline-none"
              >
                <option value={1.2}>Sedentary (Office Job / No Exercise)</option>
                <option value={1.375}>Lightly Active (1-3 Days Workout/Week)</option>
                <option value={1.55}>Moderately Active (3-5 Days Workout/Week)</option>
                <option value={1.725}>Very Active (6-7 Heavy Days Workout/Week)</option>
                <option value={1.9}>Athletic / Twice Daily Extreme Training</option>
              </select>
            </div>

          </div>

          {/* Results Visualizer Gauge (Right 5 Cols) */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-extrabold uppercase tracking-widest text-gray-400">YOUR METABOLIC SPECS</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/5 border border-white/10 text-[#00ff66]">
                  LIVE ESTIMATE
                </span>
              </div>

              {/* Big BMI Number Circle */}
              <div className="text-center my-6">
                <div className="relative inline-flex items-center justify-center w-44 h-44 rounded-full border-4 border-white/10 glass-panel shadow-2xl">
                  <div className="flex flex-col items-center">
                    <span className="text-5xl font-extrabold font-display" style={{ color: bmiMeta.color }}>
                      {bmi}
                    </span>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400 mt-1">BMI INDEX</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <span className="text-lg font-extrabold uppercase tracking-wider text-white">
                    Status: <span style={{ color: bmiMeta.color }}>{bmiMeta.category}</span>
                  </span>
                  <p className="text-xs text-gray-400 mt-1">{bmiMeta.status}</p>
                </div>
              </div>

              {/* TDEE Daily Calorie Burn Box */}
              <div className="glass-panel p-5 rounded-2xl border-white/10 my-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Flame className="w-8 h-8 text-[#00ff66]" />
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase">Maintenance Energy (TDEE):</div>
                    <div className="text-2xl font-extrabold text-white font-display">{tdee.toLocaleString()} KCAL / DAY</div>
                  </div>
                </div>
              </div>

              {/* Target Macro Breakdown */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-gray-400 uppercase mb-2">Recommended Hypertrophy Macros:</div>
                <div className="flex items-center justify-between glass-panel p-3 rounded-xl border-white/5 text-xs">
                  <span className="font-bold text-white">Protein (40%):</span>
                  <span className="font-extrabold text-[#00ff66]">{Math.round((tdee * 0.4) / 4)}g / day</span>
                </div>
                <div className="flex items-center justify-between glass-panel p-3 rounded-xl border-white/5 text-xs">
                  <span className="font-bold text-white">Carbohydrates (40%):</span>
                  <span className="font-extrabold text-[#00e5ff]">{Math.round((tdee * 0.4) / 4)}g / day</span>
                </div>
                <div className="flex items-center justify-between glass-panel p-3 rounded-xl border-white/5 text-xs">
                  <span className="font-bold text-white">Healthy Fats (20%):</span>
                  <span className="font-extrabold text-amber-400">{Math.round((tdee * 0.2) / 9)}g / day</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
