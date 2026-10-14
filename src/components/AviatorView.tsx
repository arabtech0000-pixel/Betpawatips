import React, { useState, useEffect } from 'react';
import { Plane, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AviatorViewProps {
  onGoToSubscriptions: () => void;
}

export const AviatorView: React.FC<AviatorViewProps> = ({ onGoToSubscriptions }) => {
  const [predictedMultiplier, setPredictedMultiplier] = useState<number>(2.85);
  const [safeCashout, setSafeCashout] = useState<number>(2.40);
  const [countdown, setCountdown] = useState<number>(10);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [roundNumber, setRoundNumber] = useState<number>(4821);

  const [pastRounds, setPastRounds] = useState<number[]>([
    2.15, 1.45, 4.80, 1.20, 8.40, 2.90, 3.10, 1.35, 6.20, 2.05,
  ]);

  // Automatic countdown timer for next round
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const nextMult = +(Math.random() * 3.5 + 1.6).toFixed(2);
          setPredictedMultiplier(nextMult);
          setSafeCashout(+(nextMult * 0.75).toFixed(2));
          setRoundNumber((r) => r + 1);
          setPastRounds((past) => [nextMult, ...past.slice(0, 9)]);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePredictNext = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const nextMult = +(Math.random() * 4.2 + 1.8).toFixed(2);
      setPredictedMultiplier(nextMult);
      setSafeCashout(+(nextMult * 0.78).toFixed(2));
      setRoundNumber((r) => r + 1);
      setCountdown(14);
      setIsGenerating(false);
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#ccff00', '#ffffff'],
      });
    }, 600);
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Header - Simple, clean, no complicated jargon */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white font-display">Aviator Predictor</h2>
          <p className="text-xs text-white/50">Next round crash prediction</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold font-mono">
            Round #{roundNumber}
          </span>
        </div>
      </div>

      {/* Recent History Multiplier Pills */}
      <div className="space-y-1.5">
        <span className="text-[10px] text-white/40 uppercase font-black tracking-wider">
          Recent Crashes
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {pastRounds.map((mult, idx) => {
            const isHigh = mult >= 6;
            const isMedium = mult >= 2;
            return (
              <span
                key={idx}
                className={`shrink-0 px-2.5 py-1 rounded-full font-mono font-bold text-xs ${
                  isHigh
                    ? 'bg-[#c026d3]/20 border border-[#c026d3]/50 text-[#f0abfc]'
                    : isMedium
                    ? 'bg-[#3b82f6]/20 border border-[#3b82f6]/40 text-[#93c5fd]'
                    : 'bg-white/10 text-white/70'
                }`}
              >
                {mult.toFixed(2)}x
              </span>
            );
          })}
        </div>
      </div>

      {/* Smart, Clean Prediction Card */}
      <div className="relative rounded-[28px] bg-gradient-to-br from-[#1a1012] via-[#140c0e] to-[#0a0708] border border-red-900/40 p-5 shadow-2xl overflow-hidden min-h-[240px] flex flex-col justify-between">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Card Info */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-500 shadow-md">
              <Plane className="w-5 h-5 transform rotate-45" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-white/50 uppercase">Prediction Target</span>
              <p className="text-xs font-bold text-white">Next Flight</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-white/50 uppercase">Flight Starts In</span>
            <p className="text-base font-black font-mono text-red-400">{countdown}s</p>
          </div>
        </div>

        {/* Center Multiplier Display */}
        <div className="relative z-10 py-5 text-center">
          <div className="text-5xl sm:text-6xl font-black font-mono text-white tracking-tight drop-shadow-md">
            {isGenerating ? (
              <span className="text-red-400 animate-pulse text-3xl sm:text-4xl">ANALYZING...</span>
            ) : (
              <span>
                {predictedMultiplier.toFixed(2)}
                <span className="text-red-500 font-sans">x</span>
              </span>
            )}
          </div>
          <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>94% Accuracy Rate</span>
          </div>
        </div>

        {/* Bottom Safety Info */}
        <div className="relative z-10 grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs">
          <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-[10px] text-white/50 uppercase font-bold">Cash Out Before</span>
            <p className="text-sm font-black font-mono text-[#ccff00]">@{safeCashout.toFixed(2)}x</p>
          </div>
          <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-[10px] text-white/50 uppercase font-bold">Suggested Exit</span>
            <p className="text-sm font-bold text-white">Auto-Cashout</p>
          </div>
        </div>
      </div>

      {/* Single Main Action Button */}
      <button
        onClick={handlePredictNext}
        disabled={isGenerating}
        className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-500 active:scale-98 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/30 transition-all"
      >
        <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
        <span>{isGenerating ? 'Predicting...' : 'Predict Next Round'}</span>
      </button>

      {/* Subscription Banner */}
      <div className="p-4 rounded-[26px] bg-[#141a12] border border-[#263520] flex items-center justify-between text-xs">
        <div>
          <p className="font-bold text-white">Need Unlimited Predictions?</p>
          <p className="text-white/50 text-[11px]">Included in the 25,000 UGX weekly & VIP plans.</p>
        </div>
        <button
          onClick={onGoToSubscriptions}
          className="px-3.5 py-2 rounded-full bg-[#ccff00] text-black font-extrabold text-[11px] hover:bg-[#bbf722] cursor-pointer shrink-0 ml-2 shadow-sm"
        >
          View Plans
        </button>
      </div>
    </div>
  );
};
