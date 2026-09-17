import React, { useState } from 'react';
import { Radio, Heart, Volume2, VolumeX, Menu, X, ExternalLink, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/audioSynth';
import { duoAvatar } from '../data/streamData';

interface NavbarProps {
  isLive: boolean;
  viewers: number;
  followerCount: number;
  isFollowing: boolean;
  onToggleFollow: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isLive,
  viewers,
  followerCount,
  isFollowing,
  onToggleFollow,
  isMuted,
  onToggleMute,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Stream', href: '#stream' },
    { label: 'Meet the Duo', href: '#bios' },
    { label: 'Clips & Highlights', href: '#clips' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Soundboard', href: '#soundboard' },
    { label: 'Socials', href: '#socials' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0d0e17]/95 backdrop-blur-md border-b border-[#26283b] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo & Live Pill */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a href="#" className="flex items-center gap-2.5 group">
            {/* Custom Duo Twitch Logo */}
            <div className="relative w-11 h-11 rounded-xl overflow-hidden ring-2 ring-[#9146FF]/80 shadow-lg shadow-[#9146FF]/30 transition-transform group-hover:scale-105">
              <img src={duoAvatar} alt="Alex and Eve" className="w-full h-full object-cover" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#9146FF] rounded-full border-2 border-[#0d0e17] flex items-center justify-center text-[8px] text-white font-bold" title="Twitch Partner">
                ✓
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5 font-['Outfit',sans-serif]">
                Alex<span className="text-[#a855f7]">&</span>Eve
              </span>
              <span className="text-[11px] text-[#8e90a6] font-medium tracking-wide">
                twitch.tv/alexandeve
              </span>
            </div>
          </a>

          {/* Live Status Pill */}
          {isLive ? (
            <a
              href="#stream"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors shadow-sm shadow-red-500/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>LIVE</span>
              <span className="text-[#999bb2] text-[11px] font-normal">| {viewers.toLocaleString()} watching</span>
            </a>
          ) : (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs">
              <Radio className="w-3 h-3 text-slate-400" />
              <span>Offline</span>
            </div>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium text-[#c4c6dc] hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (Sound toggle, Follow button, Mobile menu) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Soundboard Audio FX Toggle */}
          <button
            onClick={onToggleMute}
            className="p-2 text-[#9da0ba] hover:text-white hover:bg-white/5 rounded-lg border border-[#26283b] transition-colors"
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            aria-label="Toggle Sound Effects"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#9146FF]" />}
          </button>

          {/* Interactive Twitch Follow Button */}
          <button
            id="twitch-follow-btn"
            onClick={() => {
              onToggleFollow();
              if (!isFollowing) soundEffects.playFollowAlert();
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md ${
              isFollowing
                ? 'bg-[#1b1c2b] text-[#c4c6dc] border border-[#373a52] hover:bg-[#232536]'
                : 'bg-[#9146FF] hover:bg-[#772ce8] text-white shadow-[#9146FF]/30 hover:scale-[1.02]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFollowing ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            <span>{isFollowing ? 'Following' : 'Follow Duo'}</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] rounded bg-black/20 font-mono">
              {(followerCount / 1000).toFixed(1)}k
            </span>
          </button>

          {/* Direct Twitch Link */}
          <a
            href="https://twitch.tv/alexandeve"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#a855f7] bg-[#9146FF]/10 hover:bg-[#9146FF]/20 border border-[#9146FF]/30 rounded-xl transition-colors"
          >
            <span>Open Twitch</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#9da0ba] hover:text-white rounded-lg border border-[#26283b]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e101a] border-b border-[#26283b] px-4 pt-3 pb-5 space-y-2">
          {/* Live indicator on mobile */}
          {isLive && (
            <div className="flex items-center gap-2 p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 font-semibold mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>LIVE NOW &bull; {viewers.toLocaleString()} watching Elden Ring</span>
            </div>
          )}

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#c4c6dc] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}

          <a
            href="https://twitch.tv/alexandeve"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full mt-2 py-2.5 bg-[#9146FF] text-white rounded-xl font-semibold text-sm shadow-md"
          >
            <span>Watch Live on Twitch</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
};
