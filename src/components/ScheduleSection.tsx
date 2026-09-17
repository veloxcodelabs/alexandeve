import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, Sparkles, Check, ChevronRight } from 'lucide-react';
import { ScheduleDay } from '../types';
import { soundEffects } from '../utils/audioSynth';

interface ScheduleSectionProps {
  schedule: ScheduleDay[];
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ schedule }) => {
  const [remindedDays, setRemindedDays] = useState<Record<string, boolean>>({});
  const [countdown, setCountdown] = useState({ hours: 14, minutes: 22, seconds: 40 });

  // Ticking countdown clock to the next stream
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleReminder = (day: string) => {
    soundEffects.playFollowAlert();
    setRemindedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <section id="schedule" className="py-16 sm:py-20 bg-[#090a12] border-t border-[#1a1c2c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Next Stream Countdown */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9146FF]/10 border border-[#9146FF]/30 text-[#a855f7] text-xs font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Broadcast Times</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
              Stream <span className="text-[#a855f7]">Schedule</span>
            </h2>
            <p className="mt-2 text-sm text-[#9fa3c2]">
              All broadcasts go live at <strong className="text-white">6:00 PM UTC</strong> on Twitch. Turn on notifications so you never miss a throw!
            </p>
          </div>

          {/* Next Stream Countdown Banner */}
          <div className="bg-[#121422] border border-[#262940] p-4 sm:p-5 rounded-2xl flex items-center gap-4 sm:gap-6 shadow-xl">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9146FF] to-pink-500 flex items-center justify-center text-white shadow-md">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-[#8e91aa] tracking-wider block">Next Live Stream</span>
                <span className="text-xs font-bold text-white">Thursday: Valorant Ranked Grind</span>
              </div>
            </div>

            {/* Live Digits */}
            <div className="flex items-center gap-2 font-mono text-center">
              <div className="bg-[#191c2e] px-2.5 py-1.5 rounded-lg border border-[#2b2f4a]">
                <span className="text-lg font-black text-white">{countdown.hours.toString().padStart(2, '0')}</span>
                <span className="text-[9px] text-[#787c9b] block uppercase">Hrs</span>
              </div>
              <span className="text-[#8e91aa] font-bold">:</span>
              <div className="bg-[#191c2e] px-2.5 py-1.5 rounded-lg border border-[#2b2f4a]">
                <span className="text-lg font-black text-white">{countdown.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[9px] text-[#787c9b] block uppercase">Min</span>
              </div>
              <span className="text-[#8e91aa] font-bold">:</span>
              <div className="bg-[#191c2e] px-2.5 py-1.5 rounded-lg border border-[#2b2f4a]">
                <span className="text-lg font-black text-[#00f2fe]">{countdown.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[9px] text-[#787c9b] block uppercase">Sec</span>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {schedule.map((slot) => {
            const hasReminder = !!remindedDays[slot.day];

            return (
              <div
                key={slot.day}
                className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  slot.isToday
                    ? 'bg-gradient-to-b from-[#181a2e] to-[#121320] border-[#9146FF]/60 shadow-lg shadow-[#9146FF]/10 ring-1 ring-[#9146FF]/30'
                    : 'bg-[#111320] border-[#222438] hover:border-[#313550]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-base font-extrabold tracking-tight font-['Outfit',sans-serif] ${
                      slot.isToday ? 'text-[#a855f7]' : 'text-white'
                    }`}>
                      {slot.day}
                    </span>
                    {slot.isToday && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase">
                        Today
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 mb-4">
                    <div className="text-xs font-semibold text-white">{slot.time}</div>
                    <div className="text-[11px] text-[#7d81a0] font-mono">{slot.timeEst}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#17192a] border border-[#25283f] mb-4">
                    <span className="text-[10px] font-bold text-[#a855f7] uppercase tracking-wider block mb-1">
                      {slot.category}
                    </span>
                    <h4 className="text-xs font-bold text-white leading-snug">
                      {slot.title}
                    </h4>
                  </div>
                </div>

                {/* Reminder action */}
                <button
                  onClick={() => toggleReminder(slot.day)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    hasReminder
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-[#1b1e32] hover:bg-[#252944] text-[#c4c7df] border border-[#2c304e]'
                  }`}
                >
                  {hasReminder ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Reminder Set</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-3.5 h-3.5 text-[#9146FF]" />
                      <span>Notify Me</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Calendar subscription note */}
        <div className="mt-8 text-center text-xs text-[#7f83a4]">
          Schedule changes or impromptu streams are always announced on our{' '}
          <a href="#socials" className="text-[#a855f7] hover:underline font-semibold">
            Discord #announcements
          </a>{' '}
          and Twitter feed.
        </div>

      </div>
    </section>
  );
};
