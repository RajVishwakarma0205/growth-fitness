import React, { useState } from 'react';
import { X, Zap, CheckCircle2, Flame, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TrialModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    goal: 'Hypertrophy & Muscle Build',
    preferredTime: 'Morning (6 AM - 12 PM)'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00ff66', '#00e5ff', '#ffffff']
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl glass-panel-glow p-8 rounded-3xl border-[#00ff66]/40 shadow-2xl bg-[#0d0e12]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full glass-panel text-gray-400 hover:text-white hover:border-white/30"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-[#00ff66] text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 fill-[#00ff66]" />
              <span>CLAIM YOUR 7-DAY VIP PASS</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-extrabold font-display uppercase tracking-wider text-white mb-2">
              START YOUR <span className="text-gradient-neon">3D EVOLUTION</span>
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Full access to 3D equipment, biometric tracking, and group classes for 7 days with zero obligation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#12151c] text-white px-4 py-3 rounded-xl border border-white/10 text-sm focus:border-[#00ff66] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">Email Address:</label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#12151c] text-white px-4 py-3 rounded-xl border border-white/10 text-sm focus:border-[#00ff66] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">Phone Number:</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#12151c] text-white px-4 py-3 rounded-xl border border-white/10 text-sm focus:border-[#00ff66] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">Primary Fitness Goal:</label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full bg-[#12151c] text-white px-4 py-3 rounded-xl border border-white/10 text-sm focus:border-[#00ff66] outline-none font-bold"
                >
                  <option>Hypertrophy & Muscle Build</option>
                  <option>Fat Oxidation & Metabolic Shred</option>
                  <option>Beast Powerlifting & Strength</option>
                  <option>Athletic Conditioning & Boxing</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#00ff66] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:bg-[#00e5ff] hover:shadow-[0_0_25px_rgba(0,255,102,0.5)] transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Flame className="w-5 h-5 fill-black" />
                <span>CONFIRM MY FREE VIP PASS</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#00ff66]/20 text-[#00ff66] flex items-center justify-center mx-auto mb-4 border border-[#00ff66]/40 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-extrabold font-display uppercase text-white mb-2">
              YOU'RE IN, {formData.fullName.toUpperCase()}!
            </h3>
            <p className="text-sm text-gray-300 max-w-md mx-auto mb-6">
              Your 7-Day Free VIP Pass pass key has been activated. Check your inbox at <span className="text-[#00ff66] font-bold">{formData.email}</span> for your instant QR access code.
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="px-8 py-3 bg-[#00ff66] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#00e5ff]"
            >
              CLOSE & RETURN TO ARENA
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
