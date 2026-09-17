import React, { useState } from 'react';
import { 
  Play, Eye, Clock, User, Share2, Heart, 
  ExternalLink, Sparkles, Filter, X, Check, Film
} from 'lucide-react';
import { HighlightClip } from '../types';
import { soundEffects } from '../utils/audioSynth';

interface ClipsGridSectionProps {
  clips: HighlightClip[];
}

export const ClipsGridSection: React.FC<ClipsGridSectionProps> = ({ clips }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeClipModal, setActiveClipModal] = useState<HighlightClip | null>(null);
  const [copiedClipId, setCopiedClipId] = useState<string | null>(null);
  const [likedClips, setLikedClips] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Highlights' },
    { id: 'clutch', label: '🔥 Clutches' },
    { id: 'chaos', label: '⚡ Duo Chaos' },
    { id: 'funny', label: '😂 Meltdowns' },
    { id: 'wholesome', label: '💜 Wholesome' },
  ];

  const filteredClips = selectedCategory === 'all' 
    ? clips 
    : clips.filter(clip => clip.category === selectedCategory);

  const toggleLikeClip = (clipId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playChatBlip();
    setLikedClips(prev => ({ ...prev, [clipId]: !prev[clipId] }));
  };

  const copyClipLink = (clip: HighlightClip, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(`https://twitch.tv/alexandeve/clip/${clip.id}`);
    setCopiedClipId(clip.id);
    soundEffects.playChatBlip();
    setTimeout(() => setCopiedClipId(null), 2500);
  };

  return (
    <section id="clips" className="py-16 sm:py-20 bg-[#0c0e18] border-t border-[#1e2032] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9146FF]/10 border border-[#9146FF]/30 text-[#a855f7] text-xs font-bold uppercase tracking-wider mb-2">
              <Film className="w-3.5 h-3.5" />
              <span>Top Stream VODs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
              Clips <span className="text-[#a855f7]">&</span> Highlights
            </h2>
            <p className="mt-2 text-sm text-[#9fa3c2]">
              The greatest throws, clutch defuses, and co-op disasters immortalized by chat.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#141624] p-1.5 rounded-2xl border border-[#24273c]">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#9146FF] text-white shadow-md shadow-[#9146FF]/30'
                    : 'text-[#8e91aa] hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClips.map((clip) => {
            const isLiked = !!likedClips[clip.id];

            return (
              <div
                key={clip.id}
                onClick={() => {
                  soundEffects.playChatBlip();
                  setActiveClipModal(clip);
                }}
                className="group bg-[#121422] rounded-2xl border border-[#222538] hover:border-[#9146FF]/50 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#9146FF]/10 flex flex-col"
              >
                {/* Thumbnail Stage */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/60">
                  <img
                    src={clip.thumbnail}
                    alt={clip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121422] via-transparent to-black/30" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#9146FF]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#9146FF] transition-all">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-mono font-semibold text-white">
                    {clip.duration}
                  </span>

                  {/* Game Tag Badge */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-medium text-white">
                    {clip.game}
                  </span>
                </div>

                {/* Clip Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <h3 className="text-sm font-bold text-white group-hover:text-[#a855f7] line-clamp-2 transition-colors">
                    {clip.title}
                  </h3>

                  <div className="pt-2 border-t border-[#1e2033] flex items-center justify-between text-xs text-[#8e91aa]">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-blue-400" />
                        {clip.views}
                      </span>
                      <span>&bull;</span>
                      <span>{clip.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => toggleLikeClip(clip.id, e)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isLiked ? 'text-red-400' : 'text-[#8e91aa] hover:text-white'
                        }`}
                        title="Like Clip"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>

                      <button
                        onClick={(e) => copyClipLink(clip, e)}
                        className="p-1.5 text-[#8e91aa] hover:text-white rounded-lg transition-colors"
                        title="Copy clip link"
                      >
                        {copiedClipId === clip.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#6d718e] font-mono">
                    Clipped by <span className="text-[#a4a8c4]">{clip.clippedBy}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More on Twitch Callout */}
        <div className="mt-10 text-center">
          <a
            href="https://twitch.tv/alexandeve/clips"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#161827] hover:bg-[#1f2238] border border-[#2b2e46] text-xs sm:text-sm font-bold text-white transition-all hover:scale-[1.02] shadow-md"
          >
            <span>Browse All 850+ Clips on Twitch</span>
            <ExternalLink className="w-4 h-4 text-[#a855f7]" />
          </a>
        </div>

      </div>

      {/* Interactive Clip Modal Theater */}
      {activeClipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#121422] border border-[#2c2f48] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="p-4 bg-[#181a2d] border-b border-[#262940] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#9146FF] text-[10px] font-bold text-white uppercase">
                  {activeClipModal.game}
                </span>
                <span className="text-xs text-[#8e91aa]">&bull; {activeClipModal.views} views</span>
              </div>
              <button
                onClick={() => setActiveClipModal(null)}
                className="p-1 rounded-lg text-[#8e91aa] hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={activeClipModal.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
                poster={activeClipModal.thumbnail}
              />
            </div>

            {/* Modal Footer Info */}
            <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                  {activeClipModal.title}
                </h3>
                <p className="text-xs text-[#8e91aa] mt-0.5">
                  Clipped by <span className="text-[#c4c7df] font-semibold">{activeClipModal.clippedBy}</span> on {activeClipModal.date}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => copyClipLink(activeClipModal)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1d2034] hover:bg-[#262a44] border border-[#313552] text-xs font-semibold text-white transition-colors"
                >
                  {copiedClipId === activeClipModal.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Link</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Clip</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://twitch.tv/alexandeve/clip/${activeClipModal.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#9146FF] hover:bg-[#772ce8] text-xs font-bold text-white transition-colors shadow-md shadow-[#9146FF]/30"
                >
                  <span>Open on Twitch</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
