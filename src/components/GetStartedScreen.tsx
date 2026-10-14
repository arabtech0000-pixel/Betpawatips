import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface SlideItem {
  id: number;
  image: string;
  titleLines: string[];
}

interface GetStartedScreenProps {
  onGetStarted: () => void;
}

export const GetStartedScreen: React.FC<GetStartedScreenProps> = ({ onGetStarted }) => {
  const slides: SlideItem[] = [
    {
      id: 0,
      image: '/slides/salah.jpg',
      titleLines: ['ELEVATE YOUR GAME', 'LIVE MATCHES', '& EXPERT TIPS'],
    },
    {
      id: 1,
      image: '/slides/mbappe.jpg',
      titleLines: ['UNSTOPPABLE SPEED', 'REAL-TIME STATS', '& PREDICTIONS'],
    },
    {
      id: 2,
      image: '/slides/neymar.jpg',
      titleLines: ['PURE ARTISTRY', 'EXPERT INSIGHTS', '& GLOBAL LEAGUES'],
    },
    {
      id: 3,
      image: '/slides/haaland.jpg',
      titleLines: ['GOAL MACHINE', 'CRUSH THE ODDS', '& TRACK FIXTURES'],
    },
    {
      id: 4,
      image: '/slides/messi.jpg',
      titleLines: ['LEGENDARY MOMENTS', 'FOLLOW THE GOAT', '& LIVE TRACKER'],
    },
    {
      id: 5,
      image: '/slides/ronaldo.jpg',
      titleLines: ['ELITE PERFORMANCE', 'CHAMPIONS MINDSET', '& SMART BETS'],
    },
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Auto advance every 4.5s with sliding from right
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (diff < -40) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
    setTouchStartX(null);
  };

  return (
    <div
      className="relative w-full h-full min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images with smooth sliding from right */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, idx) => {
          const isActive = currentSlide === idx;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${
                isActive
                  ? 'translate-x-0 opacity-100 z-10'
                  : 'translate-x-full opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt="Football Action"
                className="w-full h-full object-cover object-center scale-105 filter brightness-85 contrast-105"
              />

              {/* Scrim gradients for clean contrast & readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/95" />
            </div>
          );
        })}
      </div>

      {/* Top spacer (no player names or tags as requested) */}
      <div className="relative z-20 pt-8 px-6" />

      {/* Bottom Content Area */}
      <div className="relative z-20 px-6 pb-12 flex flex-col gap-6">
        <div className="space-y-0.5">
          {slides[currentSlide].titleLines.map((line, i) => (
            <h1
              key={i}
              className="text-[32px] sm:text-[38px] font-black tracking-tight leading-[1.02] text-white drop-shadow-lg uppercase font-display"
            >
              {line}
            </h1>
          ))}
        </div>

        {/* Bottom Bar: Slide Indicators & Get Started Button */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] py-1">
            {slides.map((_, idx) => {
              const isActive = currentSlide === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer shrink-0 ${
                    isActive
                      ? 'w-7 h-2 bg-[#ccff00]'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              );
            })}
          </div>

          <button
            onClick={onGetStarted}
            className="flex items-center gap-2 bg-[#ccff00] hover:bg-[#bbf722] active:scale-95 text-black font-extrabold px-6 py-3.5 rounded-full transition-all shadow-xl shadow-[#ccff00]/25 cursor-pointer"
          >
            <span className="text-sm uppercase tracking-wider font-display">Get Started</span>
            <div className="w-5 h-5 rounded-full bg-black/15 flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
