import React, { useState } from 'react';
import { Crown, Check, Sparkles, ShieldCheck, Zap, ArrowRight, Clock, Star, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubscriptionViewProps {
  onPlanActivated?: (planName: string) => void;
}

interface Plan {
  id: 'weekly' | 'monthly' | 'vip';
  title: string;
  badge?: string;
  duration: string;
  priceUGX: string;
  priceRaw: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  isVip?: boolean;
}

export const SubscriptionView: React.FC<SubscriptionViewProps> = ({ onPlanActivated }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<'weekly' | 'monthly' | 'vip'>('monthly');
  const [activePlan, setActivePlan] = useState<string | null>('Weekly Pass (3 days left)');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'airtel' | 'card'>('mtn');
  const [phoneNumber, setPhoneNumber] = useState('0771234567');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      id: 'weekly',
      title: 'Weekly Pass',
      duration: '1 Week (7 Days)',
      priceUGX: '25,000 UGX',
      priceRaw: 25000,
      description: 'Instant full access to all verified sports betting tips & real-time Aviator crash predictor.',
      features: [
        '7 Days Complete Access',
        'Daily Football & Sports Tips (88%+ Accuracy)',
        'Live Aviator Predictor Multiplier Signals',
        'Safe Cashout Multiplier Recommendations',
        'Standard In-App Support',
      ],
    },
    {
      id: 'monthly',
      title: 'Monthly Plan',
      badge: 'Best Value',
      duration: '1 Month (30 Days)',
      priceUGX: '55,000 UGX',
      priceRaw: 55000,
      description: 'Extended full access to all betting predictions and Aviator signals with massive savings.',
      isPopular: true,
      features: [
        '30 Days Complete Access',
        'Daily Premium Betting Tips (Over/Under, GG, 1X2)',
        'All Sports Covered: Football, Basketball, Tennis',
        'Full Aviator Crash Predictor & Crash Alerts',
        'Historical Analytics & Win Rates',
        'Priority Customer Support',
      ],
    },
    {
      id: 'vip',
      title: 'VIP Infinity Plan',
      badge: 'Most Accurate',
      duration: 'VIP Unlimited',
      priceUGX: '90,000 UGX',
      priceRaw: 90000,
      description: 'The ultimate VIP experience with maximum algorithmic precision and infinity daily tips.',
      isVip: true,
      features: [
        'VIP Exclusive Predictions (94%+ Verified Accuracy)',
        'Infinity Tips: Unlimited Daily High-Odds Matches',
        'High Multiplier Aviator Signals (10x - 50x Alerts)',
        'Direct Access to VIP Predictor Telegram Feed',
        'Zero Adverts & Instant Real-Time Push Alerts',
        '24/7 Dedicated VIP Account Manager',
      ],
    },
  ];

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[1];

  const handleSubscribeClick = (planId: 'weekly' | 'monthly' | 'vip') => {
    setSelectedPlanId(planId);
    setPaymentModalOpen(true);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentModalOpen(false);
      confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#ccff00', '#facc15', '#22c55e', '#ffffff'],
      });
      setActivePlan(`${selectedPlan.title} (Active)`);
      setSuccessMessage(`Subscribed to ${selectedPlan.title} (${selectedPlan.priceUGX})!`);
      if (onPlanActivated) onPlanActivated(selectedPlan.title);
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-5 pb-24 animate-fade-in">
      {/* Header Banner */}
      <div className="relative rounded-[32px] bg-gradient-to-br from-[#1b2617] via-[#141d11] to-[#0c1209] border border-[#2b3a24] p-6 shadow-2xl overflow-hidden">
        <div className="absolute -top-12 -right-12 w-52 h-52 bg-[#ccff00]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3.5 mb-2.5">
          <div className="w-13 h-13 rounded-2xl bg-[#ccff00]/15 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00]">
            <Crown className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#ccff00]">
              KickPredict Subscriptions
            </span>
            <h2 className="text-2xl sm:text-[26px] font-black text-white font-display">Premium Plans</h2>
          </div>
        </div>

        <p className="text-sm text-white/75 leading-relaxed">
          Unlock high-confidence sports betting tips and real-time Aviator crash prediction signals with instant Uganda Mobile Money activation.
        </p>

        {activePlan && (
          <div className="mt-3.5 py-2.5 px-4 rounded-xl bg-[#202c1b] border border-[#ccff00]/30 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse" />
              <span className="text-white/80 font-medium">Current Status:</span>
              <span className="font-bold text-[#ccff00]">{activePlan}</span>
            </div>
            <Clock className="w-4 h-4 text-[#ccff00]" />
          </div>
        )}

        {successMessage && (
          <div className="mt-3.5 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold flex items-center gap-2.5">
            <Check className="w-4.5 h-4.5 text-emerald-400 stroke-[3]" />
            <span>{successMessage}</span>
          </div>
        )}
      </div>

      {/* Plans List - Sizing enlarged matching HomeScreen */}
      <div className="space-y-4">
        {plans.map((plan) => {
          return (
            <div
              key={plan.id}
              className={`relative rounded-[32px] p-6 transition-all duration-200 border ${
                plan.isVip
                  ? 'bg-gradient-to-br from-[#1d1f11] via-[#161a12] to-[#11160e] border-[#facc15]/40 shadow-2xl shadow-[#facc15]/5'
                  : plan.isPopular
                  ? 'bg-gradient-to-br from-[#172114] via-[#131b10] to-[#0f150d] border-[#ccff00]/40 shadow-2xl shadow-[#ccff00]/5'
                  : 'bg-[#141b12] border-[#253220]'
              }`}
            >
              {/* Top Badge */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-xl font-black text-white font-display">{plan.title}</h3>
                  {plan.badge && (
                    <span
                      className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                        plan.isVip
                          ? 'bg-[#facc15] text-black'
                          : 'bg-[#ccff00] text-black'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs sm:text-sm text-white/50 font-bold">{plan.duration}</span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-1.5 my-2.5">
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#ccff00] tracking-tight">
                  {plan.priceUGX}
                </span>
                <span className="text-xs sm:text-sm text-white/50">/ one-time</span>
              </div>

              <p className="text-sm text-white/75 mb-4 leading-relaxed">{plan.description}</p>

              {/* Feature Bullets */}
              <div className="space-y-2.5 mb-5 pt-3.5 border-t border-white/5">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/85">
                    <div
                      className={`w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.isVip ? 'bg-[#facc15]/20 text-[#facc15]' : 'bg-[#ccff00]/20 text-[#ccff00]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSubscribeClick(plan.id)}
                className={`w-full py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 shadow-lg ${
                  plan.isVip
                    ? 'bg-[#facc15] hover:bg-[#eab308] text-black shadow-[#facc15]/25'
                    : plan.isPopular
                    ? 'bg-[#ccff00] hover:bg-[#bbf722] text-black shadow-[#ccff00]/25'
                    : 'bg-[#1f291a] hover:bg-[#283622] text-white border border-white/10'
                }`}
              >
                <span>Subscribe for {plan.priceUGX}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee */}
      <div className="p-4.5 rounded-2xl bg-[#141a12] border border-white/5 flex items-center gap-3.5 text-xs sm:text-sm text-white/75">
        <ShieldCheck className="w-7 h-7 text-[#ccff00] shrink-0" />
        <div>
          <p className="font-bold text-white">Instant Automated Activation</p>
          <p className="text-xs text-white/50">Supports MTN MoMo and Airtel Money with zero transaction delays.</p>
        </div>
      </div>

      {/* Uganda Mobile Money Payment Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-[32px] bg-[#151b13] border border-[#2c3c25] p-6 sm:p-7 text-white shadow-2xl">
            <h3 className="text-xl font-black font-display text-white">Subscribe to {selectedPlan.title}</h3>
            <p className="text-sm text-white/60 mt-0.5">Amount: <span className="text-[#ccff00] font-mono font-bold text-base">{selectedPlan.priceUGX}</span></p>

            {/* Provider Selector */}
            <div className="mt-4.5 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-white/50">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mtn')}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'mtn'
                      ? 'bg-[#ffcc00]/15 border-[#ffcc00] text-[#ffcc00] font-bold'
                      : 'bg-[#1b2217] border-white/10 text-white/70'
                  }`}
                >
                  <span className="block text-sm font-black">MTN MoMo</span>
                  <span className="text-xs opacity-75">*165#</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('airtel')}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'airtel'
                      ? 'bg-[#ff0000]/15 border-[#ff3333] text-[#ff4444] font-bold'
                      : 'bg-[#1b2217] border-white/10 text-white/70'
                  }`}
                >
                  <span className="block text-sm font-black">Airtel Money</span>
                  <span className="text-xs opacity-75">*185#</span>
                </button>
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="mt-4.5 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-white/50">Uganda Mobile Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="077XXXXXXX"
                className="w-full px-4 py-3.5 rounded-2xl bg-[#1b2318] border border-white/10 text-white font-mono text-base focus:outline-none focus:border-[#ccff00]"
              />
              <span className="text-[11px] text-white/40">You will receive a USSD PIN prompt on your phone</span>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentModalOpen(false)}
                className="flex-1 py-3.5 rounded-full bg-white/10 text-white/70 hover:text-white text-xs sm:text-sm font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleConfirmPayment}
                className="flex-2 py-3.5 rounded-full bg-[#ccff00] hover:bg-[#bbf722] text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#ccff00]/25"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending USSD...
                  </span>
                ) : (
                  <span>Pay {selectedPlan.priceUGX}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
