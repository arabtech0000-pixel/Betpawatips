import React, { useState } from 'react';
import { X, CheckCircle2, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import { BetSlipItem } from '../data/mockData';
import confetti from 'canvas-confetti';

interface BetSlipDrawerProps {
  items: BetSlipItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onPlaceBet: (totalStake: number, potentialReturn: number, items: BetSlipItem[]) => void;
  userBalance: number;
  freeBetBalance: number;
}

export const BetSlipDrawer: React.FC<BetSlipDrawerProps> = ({
  items,
  onRemoveItem,
  onClearAll,
  onPlaceBet,
  userBalance,
  freeBetBalance,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [useFreeBet, setUseFreeBet] = useState(false);
  const [customStake, setCustomStake] = useState<number>(10);
  const [betPlacedSuccess, setBetPlacedSuccess] = useState(false);

  if (items.length === 0) return null;

  // Total odds calculation (accumulator style if multiple)
  const totalOdds = items.reduce((acc, item) => acc * item.odds, 1);
  const effectiveStake = useFreeBet ? Math.min(customStake, freeBetBalance) : customStake;
  const potentialReturn = (effectiveStake * totalOdds).toFixed(2);

  const handleConfirmBet = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ccff00', '#22c55e', '#ffffff'],
    });
    setBetPlacedSuccess(true);
    onPlaceBet(effectiveStake, Number(potentialReturn), items);
    setTimeout(() => {
      setBetPlacedSuccess(false);
      setIsExpanded(false);
      onClearAll();
    }, 2200);
  };

  const presetStakes = [5, 10, 25, 50];

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 px-4 max-w-md mx-auto pointer-events-none">
      <div className="pointer-events-auto rounded-3xl bg-[#141a12] border border-[#2b3a24] shadow-2xl text-white overflow-hidden transition-all duration-300">
        {/* Compact Header Bar */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#1b2518] to-[#151c13] cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#ccff00] text-black font-black text-xs flex items-center justify-center">
              {items.length}
            </div>
            <div>
              <span className="text-xs font-bold text-white tracking-tight">Prediction Slip</span>
              <span className="text-[11px] text-[#ccff00] ml-2 font-mono">
                {items.length > 1 ? `Combo @ ${totalOdds.toFixed(2)}` : `@ ${items[0].odds.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-white/90">
              Est. ${potentialReturn}
            </span>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-white/60" />
            ) : (
              <ChevronUp className="w-4 h-4 text-white/60" />
            )}
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="p-4 bg-[#121811] space-y-4 border-t border-[#23301d] max-h-72 overflow-y-auto no-scrollbar">
            {/* List of match picks */}
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#1a2217] border border-white/5"
                >
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-white/50">{item.matchTitle}</p>
                    <p className="text-xs font-bold text-white flex items-center gap-2">
                      <span>Pick: {item.selectedTeam || item.selection}</span>
                      <span className="text-[#ccff00] font-mono">@{item.odds.toFixed(2)}</span>
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveItem(item.id);
                    }}
                    className="p-1 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Free bet toggle */}
            {freeBetBalance > 0 && (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#202c1b] border border-[#ccff00]/20">
                <div className="text-xs">
                  <span className="font-bold text-white">Use Free Bet Bonus</span>
                  <p className="text-[10px] text-[#ccff00]">Available: ${freeBetBalance.toFixed(2)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setUseFreeBet(!useFreeBet)}
                  className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                    useFreeBet ? 'bg-[#ccff00]' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                      useFreeBet ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            )}

            {/* Stake selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/70">Wager Stake ($)</span>
                <span className="text-white/40 text-[11px]">Wallet: ${userBalance.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {presetStakes.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setCustomStake(val)}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      customStake === val
                        ? 'bg-[#ccff00] text-black font-extrabold'
                        : 'bg-[#1e261a] text-white/80 hover:bg-[#253021]'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1 text-xs">
              <div className="flex justify-between text-white/60">
                <span>Total Odds</span>
                <span className="font-mono text-white font-bold">{totalOdds.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Stake</span>
                <span className="font-mono text-white font-bold">${effectiveStake.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#ccff00] font-bold pt-1 border-t border-white/10">
                <span>Potential Win</span>
                <span className="font-mono text-sm">${potentialReturn}</span>
              </div>
            </div>

            {/* Submit Action */}
            {betPlacedSuccess ? (
              <div className="w-full py-3 rounded-full bg-emerald-500 text-black font-bold text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>Prediction Confirmed!</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClearAll}
                  className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/15 text-xs text-white/70"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBet}
                  className="flex-1 py-3 rounded-full bg-[#ccff00] hover:bg-[#bbf722] active:scale-98 text-black font-extrabold text-xs tracking-tight transition-all shadow-md shadow-[#ccff00]/20 cursor-pointer"
                >
                  Place Prediction (${effectiveStake})
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
