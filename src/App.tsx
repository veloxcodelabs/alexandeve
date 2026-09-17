/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroStreamEmbed } from './components/HeroStreamEmbed';
import { DuoBioSection } from './components/DuoBioSection';
import { ClipsGridSection } from './components/ClipsGridSection';
import { ScheduleSection } from './components/ScheduleSection';
import { InteractiveSoundboard } from './components/InteractiveSoundboard';
import { SocialsSection } from './components/SocialsSection';
import { Footer } from './components/Footer';

import { 
  STREAM_INFO, 
  ALEX_BIO, 
  EVE_BIO, 
  HIGHLIGHT_CLIPS, 
  SCHEDULE, 
  SOCIAL_CHANNELS,
  alexBanner,
  alexAvatar,
  eveAvatar 
} from './data/streamData';
import { soundEffects } from './utils/audioSynth';

export default function App() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(148520);
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleFollow = () => {
    setIsFollowing(prev => {
      const next = !prev;
      setFollowerCount(c => next ? c + 1 : c - 1);
      return next;
    });
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEffects.isMuted = next;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c13] text-[#e8e9f2] selection:bg-[#9146ff] selection:text-white">
      {/* Top Fixed Twitch Navbar */}
      <Navbar
        isLive={STREAM_INFO.isLive}
        viewers={STREAM_INFO.viewers}
        followerCount={followerCount}
        isFollowing={isFollowing}
        onToggleFollow={handleToggleFollow}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      <main className="flex-1">
        {/* Live Stream Status & Embed Stage */}
        <HeroStreamEmbed
          streamInfo={STREAM_INFO}
          isFollowing={isFollowing}
          onToggleFollow={handleToggleFollow}
          alexAvatar={alexAvatar}
          eveAvatar={eveAvatar}
          alexBanner={alexBanner}
        />

        {/* Side-by-Side Alex & Eve Bio Section */}
        <DuoBioSection
          alexBio={ALEX_BIO}
          eveBio={EVE_BIO}
        />

        {/* Embedded Clips & Highlights Grid */}
        <ClipsGridSection
          clips={HIGHLIGHT_CLIPS}
        />

        {/* Stream Schedule & Next Broadcast Countdown */}
        <ScheduleSection
          schedule={SCHEDULE}
        />

        {/* Interactive Soundboard */}
        <InteractiveSoundboard
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />

        {/* Social Channels & Community Links */}
        <SocialsSection
          socials={SOCIAL_CHANNELS}
        />
      </main>

      {/* Website Footer */}
      <Footer />
    </div>
  );
}
