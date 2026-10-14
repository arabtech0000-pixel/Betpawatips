import React from 'react';
import { Sliders, HelpCircle, ShieldCheck, RefreshCw, Smartphone, Eye, Volume2, Award } from 'lucide-react';

interface MenuViewProps {
  onGoToGetStarted: () => void;
  oddsFormat: 'decimal' | 'fractional' | 'american';
  onSetOddsFormat: (fmt: 'decimal' | 'fractional' | 'american') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
  onGoToGetStarted,
  oddsFormat,
  onSetOddsFormat,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <div className="space-y-4 pb-16 animate-fade-in">
      {/* Intro slider launcher */}
      <div className="rounded-[26px] bg-gradient-to-r from-[#1c2718] to-[#131b10] border border-[#2e4026] p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ccff00]/15 flex items-center justify-center text-[#ccff00]">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Get Started Screen</h4>
            <p className="text-[11px] text-white/50">Return to the Messi & Ronaldo onboarding slider</p>
          </div>
        </div>
        <button
          onClick={onGoToGetStarted}
          className="mt-3 w-full py-2.5 rounded-full bg-[#ccff00] hover:bg-[#bbf722] text-black font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-[#ccff00]/20"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Launch Onboarding Slider</span>
        </button>
      </div>

      {/* Preferences */}
      <div className="rounded-[26px] bg-[#141a12] border border-[#24331f] p-4 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
          Preferences & Controls
        </h3>

        {/* Odds Format */}
        <div className="flex items-center justify-between py-1">
          <span className="text-xs text-white/80">Odds Display</span>
          <div className="flex gap-1 bg-[#1a2216] p-1 rounded-xl">
            {(['decimal', 'fractional', 'american'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => onSetOddsFormat(fmt)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors capitalize ${
                  oddsFormat === fmt
                    ? 'bg-[#ccff00] text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Sound toggle */}
        <div className="flex items-center justify-between py-1 border-t border-white/5">
          <span className="text-xs text-white/80">Sound & Audio Cues</span>
          <button
            onClick={onToggleSound}
            className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
              soundEnabled ? 'bg-[#ccff00]' : 'bg-white/20'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                soundEnabled ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Sport Analytics & Rules */}
      <div className="rounded-[26px] bg-[#141a12] border border-[#24331f] p-4 space-y-2.5 text-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
          Prediction Information
        </h3>
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1b2217] text-white/80">
          <Award className="w-4 h-4 text-[#ccff00] shrink-0" />
          <span>Algorithm Confidence Model: Multi-league Poisson & Elo Rating</span>
        </div>
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1b2217] text-white/80">
          <ShieldCheck className="w-4 h-4 text-[#ccff00] shrink-0" />
          <span>Zero Real Currency Risk: Demonstration & Practice Prediction Mode</span>
        </div>
      </div>
    </div>
  );
};
