import React, { useState } from 'react';
import { X, CheckCircle, Gift, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: (amount: number) => void;
  isClaimed: boolean;
}

export const PromoModal: React.FC<PromoModalProps> = ({ isOpen, onClose, onClaim, isClaimed }) => {
  const [claimedLocal, setClaimedLocal] = useState(isClaimed);

  if (!isOpen) return null;

  const handleClaim = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ccff00', '#ffffff', '#22c55e', '#eab308'],
    });
    setClaimedLocal(true);
    onClaim(30);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm rounded-[28px] bg-[#141913] border border-[#2e3d28] p-6 text-white shadow-2xl overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#ccff00]/15 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ccff00]/15 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00]">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#ccff00]">Limited Offer</span>
            <h3 className="text-xl font-bold font-display">Free bets of $30</h3>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden my-4 border border-white/10">
          <img
            src="/src/assets/images/soccer_ball_grass_promo_1791827123606.jpg"
            alt="Soccer pitch"
            className="w-full h-32 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-3">
            <span className="text-xs text-white/90 font-medium">Valid on all Football matches until Nov 20th</span>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-white/70 mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#ccff00] shrink-0" />
            <span>Zero deposit needed — instant credit to your prediction wallet</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#ccff00] shrink-0" />
            <span>Usable on 1/2 finals, Premier League, Champions League</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#ccff00] shrink-0" />
            <span>Keep 100% of your predicted winnings with instant payout</span>
          </div>
        </div>

        {claimedLocal ? (
          <div className="w-full py-3.5 rounded-full bg-white/10 text-[#ccff00] font-bold text-sm text-center flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>$30 Credited to Wallet!</span>
          </div>
        ) : (
          <button
            onClick={handleClaim}
            className="w-full py-3.5 rounded-full bg-[#ccff00] hover:bg-[#bbf722] text-black font-bold text-sm text-center tracking-tight transition-all active:scale-95 shadow-lg shadow-[#ccff00]/25 cursor-pointer"
          >
            Claim $30 Free Bets Now
          </button>
        )}
      </div>
    </div>
  );
};
