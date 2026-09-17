import React from 'react';
import { Heart, ArrowUp, Mail, Shield, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090f] border-t border-[#181a28] py-12 text-[#7f83a4] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#181a28]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#9146FF] to-[#6722d3] flex items-center justify-center text-white font-black text-sm">
              A&E
            </div>
            <div>
              <span className="text-base font-extrabold text-white font-['Outfit',sans-serif] block">
                Alex & Eve &bull; Duo Streaming
              </span>
              <span className="text-[11px] text-[#6d7190]">
                Official website for twitch.tv/alexandeve
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs">
            <a href="#stream" className="hover:text-white transition-colors">Stream</a>
            <a href="#bios" className="hover:text-white transition-colors">Meet the Duo</a>
            <a href="#clips" className="hover:text-white transition-colors">Highlights</a>
            <a href="#schedule" className="hover:text-white transition-colors">Schedule</a>
            <a href="#soundboard" className="hover:text-white transition-colors">Soundboard</a>
            <a href="#socials" className="hover:text-white transition-colors">Socials</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141624] hover:bg-[#1d2033] border border-[#24273c] text-white text-xs font-semibold transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#636785]">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} AlexAndEve. All rights reserved.</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              Business: <a href="mailto:business@alexandeve.gg" className="text-[#a855f7] hover:underline font-medium">business@alexandeve.gg</a>
            </span>
          </div>

          <p className="text-center md:text-right text-[#52556d]">
            Not directly affiliated with Twitch Interactive, Inc. All trademarks belong to their respective owners.
          </p>
        </div>

      </div>
    </footer>
  );
};
