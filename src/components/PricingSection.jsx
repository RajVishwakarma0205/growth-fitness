import React, { useState } from 'react';
import { Check, Zap, ShieldCheck, Flame, Star } from 'lucide-react';

export default function PricingSection({ onOpenTrial }) {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'DAY PASS / EXPLORER',
      price: annual ? '$19' : '$25',
      period: 'per pass',
      desc: 'Perfect for drop-in sessions and experiencing our 3D facility & equipment.',
      features: [
        'Full Access to 3D Gym Floor',
        'Locker & Steam Sauna Access',
        'Biometric Smart Wristband',
        'Standard Recovery Lounge'
      ],
      popular: false,
      cta: 'BUY PASS NOW'
    },
    {
      name: 'PRO ATHLETE PASS',
      price: annual ? '$79' : '$99',
      period: 'per month',
      desc: 'Our flagship tier for dedicated lifters wanting full access, 3D bio-analytics & classes.',
      features: [
        'Unlimited 24/7 Biometric Gym Access',
        'All Group Classes (HIIT, Boxing, Power)',
        'Interactive 3D Body & Muscle Analysis',
        'Custom Nutrition & Hypertrophy Macro Plan',
        'Free Guest Pass Every Month',
        'Cryotherapy & Sauna Access'
      ],
      popular: true,
      cta: 'CLAIM PRO ATHLETE MEMBERSHIP'
    },
    {
      name: 'VIP ELITE COACHING',
      price: annual ? '$199' : '$249',
      period: 'per month',
      desc: '1-on-1 Dedicated Master Trainer, custom meal prep delivery, and private VIP lounge.',
      features: [
        'Includes Everything in Pro Pass',
        'Dedicated 1-on-1 Master Trainer (8x/mo)',
        'Weekly DXA Body Fat Scanning',
        'Private VIP Locker & Towel Service',
        'Customized Supplement Stacks',
        '24/7 Direct WhatsApp Coach Access'
      ],
      popular: false,
      cta: 'JOIN VIP ELITE'
    }
  ];

  return (
    <section id="pricing" className="py-24 relative bg-[#0a0b0e] overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-[#00ff66]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-[#00ff66]/30 text-[#00ff66] text-xs font-bold uppercase mb-4">
            <Zap className="w-4 h-4" />
            <span>TRANSPARENT MEMBERSHIP TIERS</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wider mb-4">
            INVEST IN YOUR <span className="text-gradient-neon">PHYSICAL REVOLUTION</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-8">
            No long-term lock-in contracts. Upgrade or cancel anytime with our 100% satisfaction guarantee.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center gap-4 glass-panel p-2 rounded-full border-white/10">
            <span className={`text-xs font-extrabold uppercase px-4 ${!annual ? 'text-[#00ff66]' : 'text-gray-400'}`}>
              MONTHLY BILLING
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="w-14 h-8 bg-[#12151c] rounded-full p-1 border border-white/20 relative transition-colors"
            >
              <div 
                className={`w-6 h-6 rounded-full bg-[#00ff66] shadow-[0_0_10px_#00ff66] transition-transform duration-300 ${annual ? 'translate-x-6' : 'translate-x-0'}`} 
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-extrabold uppercase px-2 ${annual ? 'text-[#00ff66]' : 'text-gray-400'}`}>
                ANNUAL BILLING
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#00ff66]/20 border border-[#00ff66]/40 text-[#00ff66] text-[10px] font-extrabold uppercase animate-pulse">
                SAVE 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 relative ${p.popular ? 'glass-panel-glow scale-105 border-[#00ff66] z-10' : 'glass-panel border-white/10 hover:border-white/30'}`}
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00ff66] text-black text-xs font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,102,0.6)] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-black" />
                  <span>MOST RECOMMENDED</span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-extrabold font-display uppercase tracking-wider text-white mb-2">
                  {p.name}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed min-h-[36px] mb-6">
                  {p.desc}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-white/10">
                  <span className="text-6xl font-extrabold font-display text-white tracking-tight">{p.price}</span>
                  <span className="text-xs font-bold text-gray-400 uppercase">/ {p.period}</span>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400 block mb-2">WHAT'S INCLUDED:</span>
                  {p.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-xs text-gray-200 font-medium">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${p.popular ? 'bg-[#00ff66]/20 text-[#00ff66]' : 'bg-white/10 text-white'}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <button
                onClick={onOpenTrial}
                className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-300 ${p.popular ? 'bg-[#00ff66] text-black hover:bg-[#00e5ff] shadow-[0_0_25px_rgba(0,255,102,0.4)]' : 'glass-panel text-white hover:border-[#00ff66] hover:text-[#00ff66]'}`}
              >
                {p.cta}
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
