import React, { useState } from 'react';
import { 
  Volume2, VolumeX, Sparkles, Zap, Flame, Trophy, 
  Star, Bell, MessageCircle, Hammer
} from 'lucide-react';
import { SOUNDBOARD_EFFECTS } from '../data/streamData';
import { soundEffects } from '../utils/audioSynth';

interface InteractiveSoundboardProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export const InteractiveSoundboard: React.FC<InteractiveSoundboardProps> = ({
  isMuted,
  onToggleMute,
}) => {
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  const [spamCount, setSpamCount] = useState(142);

  const handlePlaySound = (type: string, id: string) => {
    setActiveEffect(id);
    setSpamCount(prev => prev + 1);

    switch (type) {
      case 'airhorn':
        soundEffects.playAirhorn();
        break;
      case 'bonk':
        soundEffects.playBonk();
        break;
      case 'victory':
        soundEffects.playVictory();
        break;
      case 'sub':
        soundEffects.playSubAlert();
        break;
      case 'follow':
        soundEffects.playFollowAlert();
        break;
      case 'chat':
        soundEffects.playChatBlip();
        break;
      default:
        soundEffects.playChatBlip();
    }

    setTimeout(() => setActiveEffect(null), 600);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Volume2': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Hammer': return <Hammer className="w-5 h-5 text-blue-400" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'Star': return <Star className="w-5 h-5 text-[#a855f7]" />;
      case 'Bell': return <Bell className="w-5 h-5 text-pink-400" />;
      default: return <MessageCircle className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="soundboard" className="py-14 sm:py-16 bg-[#0a0b14] border-t border-[#1a1c2c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121422] to-[#16192c] border border-[#272b44] shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9146FF]/15 border border-[#9146FF]/30 text-[#a855f7] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Stream Interactive FX</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit',sans-serif]">
                The Duo Soundboard
              </h3>
              <p className="text-xs sm:text-sm text-[#8f93b5] mt-1">
                Click any sound button to fire off procedural synthesized sound effects just like channel point redemptions!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-[#1d2035] border border-[#2f3454] text-xs font-mono text-[#a3a7c8]">
                Sounds Triggered: <span className="text-[#00f2fe] font-bold">{spamCount}</span>
              </div>
              <button
                onClick={onToggleMute}
                className="px-3 py-1.5 rounded-xl bg-[#1d2035] hover:bg-[#252a46] border border-[#2f3454] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-red-400" />
                    <span>Unmute FX</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#9146FF]" />
                    <span>Mute FX</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sound Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {SOUNDBOARD_EFFECTS.map((fx) => {
              const isActive = activeEffect === fx.id;

              return (
                <button
                  key={fx.id}
                  onClick={() => handlePlaySound(fx.type, fx.id)}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col items-center text-center group cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-[#9146FF] border-white text-white shadow-xl shadow-[#9146FF]/50 scale-105'
                      : 'bg-[#181b2d] border-[#292e4a] hover:border-[#9146FF]/50 text-[#c2c5de] hover:bg-[#20243c]'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl mb-2.5 transition-transform group-hover:scale-110 ${
                    isActive ? 'bg-black/30' : 'bg-[#111320]'
                  }`}>
                    {getIcon(fx.icon)}
                  </div>
                  <span className="text-xs font-bold text-white block mb-0.5">{fx.name}</span>
                  <span className="text-[10px] text-[#7b80a0] leading-tight block">{fx.desc}</span>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
