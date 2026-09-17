import React, { useState } from 'react';
import { 
  Tv, Youtube, MessageSquare, Twitter, Video, 
  Music, ExternalLink, Check, Bell, Sparkles, Send, Heart
} from 'lucide-react';
import { SocialChannel } from '../types';
import { soundEffects } from '../utils/audioSynth';

interface SocialsSectionProps {
  socials: SocialChannel[];
}

export const SocialsSection: React.FC<SocialsSectionProps> = ({ socials }) => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    soundEffects.playFollowAlert();
    setIsSubscribed(true);
    setEmailInput('');
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  const getPlatformIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tv': return <Tv className="w-5 h-5 text-[#9146FF]" />;
      case 'Youtube': return <Youtube className="w-5 h-5 text-red-500" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-[#5865F2]" />;
      case 'Twitter': return <Twitter className="w-5 h-5 text-sky-400" />;
      case 'Video': return <Video className="w-5 h-5 text-cyan-400" />;
      case 'Music': return <Music className="w-5 h-5 text-emerald-400" />;
      default: return <ExternalLink className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="socials" className="py-16 sm:py-20 bg-[#0c0e18] border-t border-[#1e2032] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9146FF]/10 border border-[#9146FF]/30 text-[#a855f7] text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#a855f7]" />
            <span>Join The Duo Den</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Connect <span className="text-[#a855f7]">&</span> Follow
          </h2>
          <p className="mt-3 text-sm text-[#9fa3c2]">
            Stay updated across every platform. From daily stream clips on TikTok to cozy discord movie nights and game lobbies.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-5 rounded-2xl bg-[#121422] border border-[#23263b] ${social.hoverBorder} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#181a2b] border border-[#2b2e46] flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getPlatformIcon(social.icon)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#a855f7] transition-colors">
                        {social.name}
                      </h3>
                      <span className="text-xs text-[#8084a3] font-mono">{social.handle}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-[#a2a6c6] border border-white/10">
                    {social.badge}
                  </span>
                </div>

                <p className="text-xs text-[#9aa0bd] leading-relaxed mb-4">
                  {social.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1e2135] flex items-center justify-between text-xs font-semibold">
                <span className="text-white font-mono">{social.stats}</span>
                <span className="inline-flex items-center gap-1 text-[#a855f7] group-hover:translate-x-1 transition-transform">
                  <span>Visit Channel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Discord & Stream VIP Callout Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#5865F2]/20 via-[#9146FF]/20 to-purple-900/20 border border-[#5865F2]/40 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center lg:text-left">
            <h4 className="text-lg sm:text-xl font-black text-white font-['Outfit',sans-serif]">
              Want to play in our Subscriber Custom Lobbies?
            </h4>
            <p className="text-xs sm:text-sm text-[#c4c7e2]">
              Join our verified Discord server! We host weekly Lethal Company, Mario Kart, and Minecraft community events with voice channels.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#5865F2]/30 transition-all hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Join 21.8k on Discord</span>
            </a>

            <a
              href="https://twitch.tv/alexandeve"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#9146FF] hover:bg-[#772ce8] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#9146FF]/30 transition-all hover:scale-[1.02]"
            >
              <Tv className="w-4 h-4" />
              <span>Twitch Channel</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
