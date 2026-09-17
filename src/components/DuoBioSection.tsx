import React, { useState } from 'react';
import { 
  Flame, Shield, Cpu, Monitor, Headphones, Mic, 
  Mouse, Keyboard, Award, Trophy, Coffee, Heart, 
  Brain, Sparkles, ChevronRight, Crosshair, Sword, Skull, HeartPulse, Puzzle, Check
} from 'lucide-react';
import { StreamerBio } from '../types';

interface DuoBioSectionProps {
  alexBio: StreamerBio;
  eveBio: StreamerBio;
}

export const DuoBioSection: React.FC<DuoBioSectionProps> = ({ alexBio, eveBio }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'setup' | 'games'>('profile');
  const [synergyBoost, setSynergyBoost] = useState(false);

  return (
    <section id="bios" className="py-16 sm:py-20 relative bg-[#0a0b12] border-t border-[#1e2030] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#9146FF]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9146FF]/10 border border-[#9146FF]/30 text-[#a855f7] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Stream Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Meet Alex <span className="text-[#a855f7]">&</span> Eve
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9fa3c2] leading-relaxed">
            One rushes headfirst into the boss room. The other actually reads the puzzle clues. Together, they create pure co-op chaos.
          </p>

          {/* Bio Navigation Tabs */}
          <div className="mt-6 inline-flex p-1 bg-[#141624] border border-[#26283b] rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#9146FF] text-white shadow-md shadow-[#9146FF]/30'
                  : 'text-[#8e91aa] hover:text-white'
              }`}
            >
              Streamer Profiles
            </button>
            <button
              onClick={() => setActiveTab('setup')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'setup'
                  ? 'bg-[#9146FF] text-white shadow-md shadow-[#9146FF]/30'
                  : 'text-[#8e91aa] hover:text-white'
              }`}
            >
              PC & Gear Specs
            </button>
            <button
              onClick={() => setActiveTab('games')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'games'
                  ? 'bg-[#9146FF] text-white shadow-md shadow-[#9146FF]/30'
                  : 'text-[#8e91aa] hover:text-white'
              }`}
            >
              Main Games
            </button>
          </div>
        </div>

        {/* Duo Dynamic / Synergy Card */}
        <div className="mb-10 p-5 rounded-2xl bg-[#111320] border border-[#24273c] shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-[#9146FF] flex items-center justify-center text-white shadow-md">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Duo Synergy Meter: 98.4% Harmonized</h4>
                <p className="text-xs text-[#8e91aa]">
                  Over 1,840+ hours streamed together across 62 co-op titles.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="flex-1 md:w-64">
                <div className="flex justify-between text-[11px] font-mono text-[#8e91aa] mb-1.5">
                  <span className="text-blue-400 font-semibold">Alex: 51% Chaos</span>
                  <span className="text-[#a855f7] font-semibold">Eve: 49% Strategy</span>
                </div>
                <div className="h-2 w-full bg-[#1e2033] rounded-full overflow-hidden flex">
                  <div className="h-full bg-blue-500 w-[51%]" />
                  <div className="h-full bg-[#a855f7] w-[49%]" />
                </div>
              </div>

              <button
                onClick={() => setSynergyBoost(!synergyBoost)}
                className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-[#1c1f30] hover:bg-[#252940] border border-[#2d314c] text-xs font-semibold text-[#00f2fe] transition-colors whitespace-nowrap"
              >
                {synergyBoost ? '⚡ Overclocked!' : 'Test Synergy'}
              </button>
            </div>
          </div>
        </div>

        {/* Side-by-Side Cards: Alex on Left, Eve on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* ================= ALEX'S CARD ================= */}
          <div className="flex flex-col bg-[#111320] border border-blue-900/30 hover:border-blue-500/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-xl relative overflow-hidden group">
            
            {/* Top Accent Gradient Ribbon */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500" />

            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 pb-6 border-b border-[#202336]">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-3 ring-blue-500/80 shadow-lg shadow-blue-500/20">
                  <img src={alexBio.avatar} alt="Alex" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wide border-2 border-[#111320]">
                  Alex
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-white font-['Outfit',sans-serif]">{alexBio.name}</h3>
                  <span className="text-xs text-blue-400 font-mono font-medium">{alexBio.handle}</span>
                </div>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  {alexBio.role}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {alexBio.badges.map(badge => (
                    <span key={badge} className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-300 font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Display based on active tab */}
            {activeTab === 'profile' && (
              <div className="flex-1 flex flex-col justify-between pt-6 space-y-6">
                {/* Signature Quote */}
                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-800/30 text-xs italic text-blue-200">
                  {alexBio.quote}
                </div>

                <p className="text-xs sm:text-sm text-[#a4a8c6] leading-relaxed">
                  {alexBio.bio}
                </p>

                {/* Fun Streamer Stats */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {alexBio.stats.map(stat => (
                    <div key={stat.label} className="p-3 rounded-xl bg-[#17192a] border border-[#25283f]">
                      <div className="text-base sm:text-lg font-black text-white font-mono">{stat.value}</div>
                      <div className="text-[11px] text-[#8589a6] mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'setup' && (
              <div className="flex-1 pt-6 space-y-3.5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span>Alex's Rig & Peripherals</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 bg-[#17192a] rounded-lg border border-[#25283f]">
                    <span className="text-[10px] text-[#787c9b] uppercase block">Graphics</span>
                    <span className="text-white font-medium">{alexBio.setup.gpu}</span>
                  </div>
                  <div className="p-2.5 bg-[#17192a] rounded-lg border border-[#25283f]">
                    <span className="text-[10px] text-[#787c9b] uppercase block">Processor</span>
                    <span className="text-white font-medium">{alexBio.setup.cpu}</span>
                  </div>
                  <div className="p-2.5 bg-[#17192a] rounded-lg border border-[#25283f]">
                    <span className="text-[10px] text-[#787c9b] uppercase block">Display</span>
                    <span className="text-white font-medium">{alexBio.setup.monitor}</span>
                  </div>
                  <div className="p-2.5 bg-[#17192a] rounded-lg border border-[#25283f]">
                    <span className="text-[10px] text-[#787c9b] uppercase block">Microphone</span>
                    <span className="text-white font-medium">{alexBio.setup.mic}</span>
                  </div>
                  <div className="p-2.5 bg-[#17192a] rounded-lg border border-[#25283f]">
                    <span className="text-[10px] text-[#787c9b] uppercase block">Mouse</span>
                    <span className="text-white font-medium">{alexBio.setup.mouse}</span>
                  </div>
                  <div className="p-2.5 bg-[#17192a] rounded-lg border border-[#25283f]">
                    <span className="text-[10px] text-[#787c9b] uppercase block">Keyboard</span>
                    <span className="text-white font-medium">{alexBio.setup.keyboard}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'games' && (
              <div className="flex-1 pt-6 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Alex's Most Played Titles
                </h4>
                {alexBio.topGames.map(game => (
                  <div key={game.name} className="p-3 rounded-xl bg-[#17192a] border border-[#25283f] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                        {game.icon === 'Sword' ? <Sword className="w-4 h-4" /> :
                         game.icon === 'Crosshair' ? <Crosshair className="w-4 h-4" /> :
                         <Skull className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{game.name}</div>
                        <div className="text-[11px] text-[#868aa8]">{game.role}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-blue-300">{game.hours}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Playstyle Tag */}
            <div className="mt-6 pt-4 border-t border-[#202336] flex items-center justify-between text-xs">
              <span className="text-[#8e91aa]">Playstyle:</span>
              <span className="font-semibold text-blue-400">{alexBio.playstyle}</span>
            </div>
          </div>

          {/* ================= EVE'S CARD ================= */}
          <div className="flex flex-col bg-[#111320] border border-purple-900/30 hover:border-purple-500/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-xl relative overflow-hidden group">
            
            {/* Top Accent Gradient Ribbon */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-[#9146FF] to-pink-500" />

            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 pb-6 border-b border-[#202336]">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-3 ring-[#9146FF]/80 shadow-lg shadow-purple-500/20">
                  <img src={eveBio.avatar} alt="Eve" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-[#9146FF] text-white text-[10px] font-extrabold uppercase tracking-wide border-2 border-[#111320]">
                  Eve
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-white font-['Outfit',sans-serif]">{eveBio.name}</h3>
                  <span className="text-xs text-[#a855f7] font-mono font-medium">{eveBio.handle}</span>
                </div>
                <p className="text-xs font-bold text-[#a855f7] uppercase tracking-wider">
                  {eveBio.role}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {eveBio.badges.map(badge => (
                    <span key={badge} className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-300 font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Display based on active tab */}
            {activeTab === 'profile' && (
              <div className="flex-1 flex flex-col justify-between pt-6 space-y-6">
                {/* Signature Quote */}
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/30 text-xs italic text-purple-200">
                  {eveBio.quote}
                </div>

                <p className="text-xs sm:text-sm text-[#a4a8c6] leading-relaxed">
                  {eveBio.bio}
                </p>

                {/* Fun Streamer Stats */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {eveBio.stats.map(stat => (
                    <div key={stat.label} className="p-3 rounded-xl bg-[#17192a] border border-[#25283f]">
                      <div className="text-base sm:text-lg font-black text-white font-mono">{stat.value}</div>
                      <div className="text-[11px] text-[#8589a6] mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'setup' && (
              <div className="flex-1 pt-6 space-y-3.5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#a855f7]" />
                  <span>Eve's Rig & Peripherals</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 bg-[#17192a] rounded-lg border border-[#25283f]">
                    <span className="text-[10px] text-[#787c9b] uppercase block">Graphics</span>
                    <span className="text-white font-medium">{eveBio.setup.gpu}</span>
                  </div>
                  <div className="p-2.5 bg-[#17192a] rounded-lg border border-[#25283f]">
                    <span className="text-[10px] text-[#787c9b] uppercase block">Processor</span>
                    <span className="text-white font-medium">{eveBio.setup.cpu}</span>
                  </div>
                  <div className="p-2.5 bg-[#17192a] rounded-lg border border-[#25283f]">
                    <span className="text-[10px] text-[#787c9b] uppercase block">Display</span>
                    <span className="text-white font-medium">{eveBio.setup.monitor}</span>
                  </div>
                  <div className="p-2.5 bg-[#17192a] rounded-lg border border-[#25283f]">
                    <span className="text-[10px] text-[#787c9b] uppercase block">Microphone</span>
                    <span className="text-white font-medium">{eveBio.setup.mic}</span>
                  </div>
                  <div className="p-2.5 bg-[#17192a] rounded-lg border border-[#25283f]">
                    <span className="text-[10px] text-[#787c9b] uppercase block">Mouse</span>
                    <span className="text-white font-medium">{eveBio.setup.mouse}</span>
                  </div>
                  <div className="p-2.5 bg-[#17192a] rounded-lg border border-[#25283f]">
                    <span className="text-[10px] text-[#787c9b] uppercase block">Keyboard</span>
                    <span className="text-white font-medium">{eveBio.setup.keyboard}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'games' && (
              <div className="flex-1 pt-6 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Eve's Most Played Titles
                </h4>
                {eveBio.topGames.map(game => (
                  <div key={game.name} className="p-3 rounded-xl bg-[#17192a] border border-[#25283f] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center">
                        {game.icon === 'Sparkles' ? <Sparkles className="w-4 h-4" /> :
                         game.icon === 'HeartPulse' ? <HeartPulse className="w-4 h-4" /> :
                         <Puzzle className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{game.name}</div>
                        <div className="text-[11px] text-[#868aa8]">{game.role}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-purple-300">{game.hours}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Playstyle Tag */}
            <div className="mt-6 pt-4 border-t border-[#202336] flex items-center justify-between text-xs">
              <span className="text-[#8e91aa]">Playstyle:</span>
              <span className="font-semibold text-[#a855f7]">{eveBio.playstyle}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
