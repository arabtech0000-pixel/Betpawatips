import React from 'react';
import { X, Award, Trophy, Zap, CheckCircle2, ChevronRight } from 'lucide-react';

interface UserProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  freeBets: number;
}

export const UserProfileDrawer: React.FC<UserProfileDrawerProps> = ({
  isOpen,
  onClose,
  balance,
  freeBets,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xs rounded-[30px] bg-[#141a12] border border-[#2b3a24] p-5 text-white shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center mt-2 mb-4">
          <div className="relative mb-3">
            <img
              src="/src/assets/images/user_avatar_profile_1791827144674.jpg"
              alt="Alex Mercer"
              className="w-18 h-18 rounded-full object-cover border-2 border-[#ccff00] shadow-lg shadow-[#ccff00]/20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#ccff00] flex items-center justify-center text-black">
              <CheckCircle2 className="w-3.5 h-3.5 fill-[#ccff00] text-black" />
            </div>
          </div>
          <h3 className="text-lg font-bold font-display">Alex Mercer</h3>
          <span className="text-xs text-[#ccff00] font-semibold">Pro Predictor • Level 8</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 my-4">
          <div className="p-3 rounded-2xl bg-[#1a2318] border border-white/5 text-center">
            <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Win Rate</span>
            <p className="text-xl font-black font-display text-[#ccff00] mt-0.5">78.4%</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#1a2318] border border-white/5 text-center">
            <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Total Won</span>
            <p className="text-xl font-black font-display text-white mt-0.5">$382.50</p>
          </div>
        </div>

        {/* Balance status */}
        <div className="p-3.5 rounded-2xl bg-[#1c261a] border border-[#ccff00]/20 flex items-center justify-between text-xs">
          <div>
            <span className="text-white/60">Demo Balance</span>
            <p className="font-mono font-bold text-white text-sm">${balance.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <span className="text-white/60">Free Bets</span>
            <p className="font-mono font-bold text-[#ccff00] text-sm">${freeBets.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
