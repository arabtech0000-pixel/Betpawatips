import React, { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, Gift, History, PlusCircle, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WalletViewProps {
  balance: number;
  freeBets: number;
  onAddFunds: (amount: number) => void;
  onOpenPromo: () => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  balance,
  freeBets,
  onAddFunds,
  onOpenPromo,
}) => {
  const [selectedTopup, setSelectedTopup] = useState<number>(20);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleDeposit = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ccff00', '#22c55e'],
    });
    onAddFunds(selectedTopup);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="space-y-5 animate-fade-in pb-16">
      {/* Wallet Card */}
      <div className="relative rounded-[28px] bg-gradient-to-br from-[#1c2718] via-[#141d11] to-[#0d140a] border border-[#2b3a24] p-6 shadow-xl overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#ccff00]/10 rounded-full blur-2xl" />

        <div className="flex justify-between items-start">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">Total Balance</span>
            <h2 className="text-3xl font-black font-mono text-white mt-1">
              ${balance.toFixed(2)}
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#ccff00]/15 text-[#ccff00] text-xs font-bold border border-[#ccff00]/30">
            Active
          </span>
        </div>

        {/* Free Bet Voucher Section */}
        <div className="mt-5 p-3.5 rounded-2xl bg-[#192216]/80 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ccff00]/15 flex items-center justify-center text-[#ccff00]">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Free Bets Available</p>
              <p className="text-[11px] text-[#ccff00] font-mono">${freeBets.toFixed(2)} USD</p>
            </div>
          </div>
          <button
            onClick={onOpenPromo}
            className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#ccff00] text-black hover:bg-[#bbf722] cursor-pointer"
          >
            {freeBets > 0 ? 'View Offer' : 'Claim $30'}
          </button>
        </div>
      </div>

      {/* Quick Deposit */}
      <div className="rounded-[28px] bg-[#141a12] border border-[#263520] p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
          Quick Demo Deposit
        </h3>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[10, 20, 50, 100].map((amt) => (
            <button
              key={amt}
              onClick={() => setSelectedTopup(amt)}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTopup === amt
                  ? 'bg-[#ccff00] text-black'
                  : 'bg-[#1e261a] text-white/80 hover:bg-[#273322]'
              }`}
            >
              +${amt}
            </button>
          ))}
        </div>
        <button
          onClick={handleDeposit}
          className="w-full py-3 rounded-full bg-[#ccff00] hover:bg-[#bbf722] text-black font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#ccff00]/20"
        >
          {addedNotice ? (
            <>
              <Check className="w-4 h-4 text-black stroke-[3]" />
              <span>Added +${selectedTopup} Successfully!</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4 text-black" />
              <span>Add ${selectedTopup} Demo Funds</span>
            </>
          )}
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="rounded-[28px] bg-[#141a12] border border-[#263520] p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
            Recent Activity
          </h3>
          <span className="text-[11px] text-white/40">Verified</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1b2217]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ArrowDownLeft className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Won Prediction: FCB vs CHE</p>
                <p className="text-[10px] text-white/40">Yesterday, 22:15</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">+$44.00</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1b2217]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#ccff00]/20 text-[#ccff00] flex items-center justify-center">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Promo Voucher Claimed</p>
                <p className="text-[10px] text-white/40">12 Oct 2026</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#ccff00]">+$30.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
