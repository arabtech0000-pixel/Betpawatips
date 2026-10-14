import React, { useState } from 'react';
import { Calendar as CalendarIcon, X, Check } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onSelectDate,
}) => {
  const [activeDate, setActiveDate] = useState(selectedDate);

  if (!isOpen) return null;

  const todayDateObj = new Date();
  const tomorrowDateObj = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const todayFormatted = todayDateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const tomorrowFormatted = tomorrowDateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  const dates = [
    { label: 'All Fixtures', value: 'all', desc: 'Today & Tomorrow matches' },
    { label: `Today (${todayFormatted})`, value: 'Today', isToday: true, desc: 'Live & scheduled today' },
    { label: `Tomorrow (${tomorrowFormatted})`, value: 'Tomorrow', desc: 'Upcoming next day matches' },
  ];

  const handleApply = (val: string) => {
    setActiveDate(val);
    onSelectDate(val);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xs rounded-[28px] bg-[#141913] border border-[#2e3d28] p-5 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#ccff00]/15 flex items-center justify-center text-[#ccff00]">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold">Upcoming Fixtures</h3>
            <p className="text-[11px] text-white/50">Filter matches by date</p>
          </div>
        </div>

        <div className="space-y-2">
          {dates.map((d) => {
            const isSelected = activeDate === d.value;
            return (
              <button
                key={d.value}
                onClick={() => handleApply(d.value)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-colors ${
                  isSelected
                    ? 'bg-[#ccff00] text-black font-bold'
                    : 'bg-[#1b2217] text-white/80 hover:bg-[#252f20]'
                }`}
              >
                <div className="text-left">
                  <div>{d.label}</div>
                  <div className={`text-[10px] ${isSelected ? 'text-black/70' : 'text-white/40'}`}>
                    {d.desc}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isSelected && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
