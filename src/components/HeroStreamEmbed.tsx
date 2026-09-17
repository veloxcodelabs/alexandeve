import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, Share2, 
  Sparkles, Users, Clock, Gamepad2, Radio, Send, Smile, 
  Gift, Heart, Shield, Check, MessageSquare, Flame, Trophy,
  Camera, RotateCcw, Upload
} from 'lucide-react';
import { StreamInfo, ChatMessage } from '../types';
import { INITIAL_CHAT_MESSAGES } from '../data/streamData';
import { soundEffects } from '../utils/audioSynth';

interface HeroStreamEmbedProps {
  streamInfo: StreamInfo;
  isFollowing: boolean;
  onToggleFollow: () => void;
  alexAvatar: string;
  eveAvatar: string;
  alexBanner: string;
}

export const HeroStreamEmbed: React.FC<HeroStreamEmbedProps> = ({
  streamInfo,
  isFollowing,
  onToggleFollow,
  alexAvatar,
  eveAvatar,
  alexBanner,
}) => {
  const [playerMode, setPlayerMode] = useState<'showcase' | 'twitch'>('showcase');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [userChatInput, setUserChatInput] = useState('');
  const [userBadge, setUserBadge] = useState<'sub' | 'vip' | 'mod' | 'prime'>('sub');
  const [viewerCount, setViewerCount] = useState(7835);
  const [uptimeSeconds, setUptimeSeconds] = useState(5510); // 01:31:50 from stream
  const [subCount, setSubCount] = useState(8);
  const [subTarget, setSubTarget] = useState(20);
  const [recentAlert, setRecentAlert] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [customStreamPhoto, setCustomStreamPhoto] = useState<string | null>(null);

  const streamContainerRef = useRef<HTMLDivElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomStreamPhoto(result);
          try {
            localStorage.setItem('alexandeve_custom_stream_photo', result);
          } catch (err) {
            console.warn('Could not save to localStorage', err);
          }
          soundEffects.playVictory();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    setCustomStreamPhoto(null);
    try {
      localStorage.removeItem('alexandeve_custom_stream_photo');
    } catch {
      // ignore
    }
    soundEffects.playChatBlip();
  };

  // Uptime and viewer count live tick
  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds(prev => prev + 1);
      // Fluctuate viewers slightly for realistic feeling
      if (Math.random() > 0.6) {
        const delta = Math.floor(Math.random() * 11) - 5;
        setViewerCount(prev => Math.max(4800, prev + delta));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format uptime
  const formatUptime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  };

  // Auto-scroll chat disabled per user request

  // Periodic simulated community chat
  useEffect(() => {
    const simulatedUsers = [
      { name: 'Kappafied', badge: 'sub', text: 'Alex missed the parry AGAIN no shot LUL', color: '#f59e0b' },
      { name: 'MoonlightEve', badge: 'vip', text: 'Eve\'s positioning is actually god-tier though', color: '#a855f7' },
      { name: 'PogChampion', badge: 'sub', text: 'CLUTCH OR KICK!! POGGERS', color: '#38bdf8' },
      { name: 'CoffeeBean77', badge: 'prime', text: 'That combo was insane!! AlexAndEveHype', color: '#10b981' },
      { name: 'DuoEnjoyer', badge: 'sub', text: 'This stream is pure comedy 10/10 best co-op', color: '#ec4899' },
    ];

    const chatInterval = setInterval(() => {
      const randomMsg = simulatedUsers[Math.floor(Math.random() * simulatedUsers.length)];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setChatMessages(prev => [
        ...prev.slice(-30),
        {
          id: Math.random().toString(),
          user: randomMsg.name,
          badges: [randomMsg.badge as 'sub' | 'vip' | 'prime'],
          text: randomMsg.text,
          color: randomMsg.color,
          timestamp: timeStr,
        }
      ]);
    }, 7000);

    return () => clearInterval(chatInterval);
  }, []);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userChatInput.trim()) return;

    soundEffects.playChatBlip();
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      user: 'You',
      badges: [userBadge],
      text: userChatInput.trim(),
      color: '#00f2fe',
      timestamp: timeStr,
    };

    setChatMessages(prev => [...prev, newMsg]);
    setUserChatInput('');
  };

  const triggerCheerOrSub = (type: 'sub' | 'gift' | 'bits') => {
    soundEffects.playSubAlert();
    if (type === 'sub') {
      setSubCount(prev => prev + 1);
      setRecentAlert('🎉 You subscribed at Tier 1! Welcome to the Duo Den!');
    } else if (type === 'gift') {
      setSubCount(prev => prev + 5);
      setRecentAlert('🎁 You gifted 5 Subs to the community! Alex & Eve are cheering!');
    } else {
      setRecentAlert('✨ You cheered 500 Bits! "Clutch the boss!"');
    }
    setShowSubModal(false);
    setTimeout(() => setRecentAlert(null), 5000);
  };

  const copyStreamUrl = () => {
    navigator.clipboard.writeText('https://twitch.tv/alexandeve');
    setCopiedLink(true);
    soundEffects.playChatBlip();
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

  return (
    <section id="stream" className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#9146FF]/15 via-[#6722d3]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stream Header & Title Card */}
        <div className="mb-4 sm:mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider animate-pulse">
                <Radio className="w-3.5 h-3.5" />
                Live Broadcast
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1f2133] border border-[#2e314a] text-xs font-semibold text-[#c8cbdf]">
                <Gamepad2 className="w-3.5 h-3.5 text-[#9146FF]" />
                {streamInfo.game}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a1c2b] border border-[#27293e] text-xs font-mono text-[#a2a5c0]">
                <Users className="w-3.5 h-3.5 text-[#00f2fe]" />
                {viewerCount.toLocaleString()} viewers
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a1c2b] border border-[#27293e] text-xs font-mono text-[#a2a5c0]">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {formatUptime(uptimeSeconds)}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug font-['Outfit',sans-serif]">
              {streamInfo.title}
            </h1>
          </div>

          {/* Player Mode Switcher & Chat Toggle */}
          <div className="flex items-center gap-2 self-start lg:self-center">
            <div className="bg-[#151724] p-1 rounded-xl border border-[#27293e] flex items-center gap-1 text-xs font-medium">
              <button
                onClick={() => setPlayerMode('showcase')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  playerMode === 'showcase'
                    ? 'bg-[#9146FF] text-white font-semibold shadow-md shadow-[#9146FF]/30'
                    : 'text-[#8e90a6] hover:text-white'
                }`}
              >
                Showcase Stream
              </button>
              <button
                onClick={() => setPlayerMode('twitch')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  playerMode === 'twitch'
                    ? 'bg-[#9146FF] text-white font-semibold shadow-md shadow-[#9146FF]/30'
                    : 'text-[#8e90a6] hover:text-white'
                }`}
              >
                Twitch Embed
              </button>
            </div>

            {/* Custom Photo Upload Trigger */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-xl border border-[#27293e] bg-[#151724] hover:bg-[#202235] text-white transition-all text-xs flex items-center gap-1.5 font-medium hover:border-[#9146FF]/50"
              title="Upload exact original photo from your device"
            >
              <Camera className="w-3.5 h-3.5 text-[#00f2fe]" />
              <span className="hidden sm:inline">{customStreamPhoto ? 'Change Photo' : 'Upload Main Photo'}</span>
            </button>
            {customStreamPhoto && (
              <button
                onClick={handleResetPhoto}
                className="p-1.5 rounded-xl border border-[#27293e] bg-[#151724] hover:bg-red-500/20 text-[#8e90a6] hover:text-red-400 transition-all text-xs"
                title="Reset to default stream photo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => setShowChat(!showChat)}
              className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 font-medium ${
                showChat
                  ? 'bg-[#202235] text-white border-[#3b3e5b]'
                  : 'bg-[#151724] text-[#8e90a6] border-[#27293e] hover:text-white'
              }`}
              title="Toggle Live Chat"
            >
              <MessageSquare className="w-4 h-4 text-[#a855f7]" />
              <span className="hidden sm:inline">{showChat ? 'Hide Chat' : 'Show Chat'}</span>
            </button>
          </div>
        </div>

        {/* Real-time Notification Banner (Sub / Follow Alert) */}
        {recentAlert && (
          <div className="mb-4 p-3.5 rounded-xl bg-gradient-to-r from-[#9146FF]/20 via-[#a855f7]/20 to-[#00f2fe]/20 border border-[#9146FF]/40 text-white text-sm font-semibold flex items-center justify-between shadow-lg animate-bounce">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>{recentAlert}</span>
            </div>
            <button
              onClick={() => setRecentAlert(null)}
              className="text-xs text-white/70 hover:text-white underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main Stream + Chat Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-start">
          
          {/* Stream Video Player Stage (8 or 12 cols depending on chat) */}
          <div className={`${showChat ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12'} transition-all`}>
            <div 
              ref={streamContainerRef}
              className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#090a10] border border-[#26283b] shadow-2xl shadow-black/80 group"
            >
              
              {playerMode === 'showcase' ? (
                /* Interactive Showcase Stream of Alex & Eve Live Broadcast */
                <div className="relative w-full h-full bg-[#0a0b12] overflow-hidden group">
                  {/* Stream Main Broadcast Feed */}
                  <img
                    src={customStreamPhoto || alexBanner}
                    alt="Alex and Eve Live Stream Broadcast"
                    className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-[1.01]"
                  />

                  {/* Dark gradient overlay for game HUD & webcams */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none" />

                  {/* Stream Broadcast Tag - Top Center */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs shadow-xl">
                    <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span>SUB GOAL: {subCount} / {subTarget}</span>
                    </div>
                    <div className="w-24 bg-white/20 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#9146FF] to-[#00f2fe] h-full rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (subCount / subTarget) * 100)}%` }} 
                      />
                    </div>
                  </div>

                  {/* Streamers Identity Tag Overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#0d0e17]/90 backdrop-blur-md p-1.5 pr-3 rounded-xl border border-blue-500/50 shadow-xl">
                    <div className="relative">
                      <img src={alexAvatar} alt="Alex" className="w-10 h-10 rounded-lg object-cover ring-2 ring-blue-500" />
                      <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-black animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white">Alex</span>
                        <span className="px-1 text-[9px] bg-blue-500/30 text-blue-300 font-mono rounded">TALKING</span>
                      </div>
                      <p className="text-[10px] text-[#9ca3af]">"Tap in tap in chat!"</p>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#0d0e17]/90 backdrop-blur-md p-1.5 pr-3 rounded-xl border border-purple-500/50 shadow-xl">
                    <div className="relative">
                      <img src={eveAvatar} alt="Eve" className="w-10 h-10 rounded-lg object-cover ring-2 ring-purple-500" />
                      <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-black animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white">Eve</span>
                        <span className="px-1 text-[9px] bg-purple-500/30 text-purple-300 font-mono rounded">LIVE</span>
                      </div>
                      <p className="text-[10px] text-[#9ca3af]">"Moody today honestly..."</p>
                    </div>
                  </div>

                  {/* Player Controls Hover Bar */}
                  <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-between bg-gradient-to-t from-black/90 to-transparent">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setIsPlaying(!isPlaying);
                          if (!isPlaying) {
                            soundEffects.playChatBlip();
                          }
                        }}
                        className="p-2 bg-white/10 hover:bg-[#9146FF] rounded-lg text-white transition-colors"
                        title={isPlaying ? 'Pause Stream Sound' : 'Play Stream Sound'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => {
                          setIsMuted(!isMuted);
                          if (isMuted) soundEffects.playFollowAlert();
                        }}
                        className="p-2 bg-white/10 hover:bg-[#9146FF] rounded-lg text-white transition-colors"
                        title={isMuted ? 'Unmute Stream' : 'Mute Stream'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-white" />}
                      </button>

                      <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span>LIVE 1080p60 Source</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowSubModal(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#9146FF] hover:bg-[#772ce8] text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-[#9146FF]/30"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>Subscribe</span>
                      </button>

                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 bg-white/10 hover:bg-[#9146FF] rounded-lg text-white transition-colors"
                        title={customStreamPhoto ? 'Change Photo (Upload custom file)' : 'Upload exact photo from device'}
                      >
                        <Camera className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (streamContainerRef.current) {
                            if (document.fullscreenElement) {
                              document.exitFullscreen();
                            } else {
                              streamContainerRef.current.requestFullscreen();
                            }
                          }
                        }}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                        title="Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Official Twitch Player Embed */
                <iframe
                  src={`https://player.twitch.tv/?channel=alexandeve&parent=${currentHost}&muted=false`}
                  height="100%"
                  width="100%"
                  allowFullScreen
                  className="w-full h-full border-0"
                  title="Twitch Stream Player - AlexAndEve"
                />
              )}
            </div>

            {/* Stream Interaction Bar (Follow, Sub, Share, Channel Points) */}
            <div className="mt-4 p-4 rounded-2xl bg-[#12131f] border border-[#24263a] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-blue-500 shadow-md z-10">
                    <img src={alexAvatar} alt="Alex" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-[#9146FF] shadow-md z-20">
                    <img src={eveAvatar} alt="Eve" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">AlexAndEve</h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#9146FF]/20 text-[#a855f7] border border-[#9146FF]/40 text-[11px] font-semibold">
                      Twitch Partner
                    </span>
                  </div>
                  <p className="text-xs text-[#8f92ae]">
                    Playing <span className="text-white font-medium">{streamInfo.game}</span> &bull; {streamInfo.tags.slice(0, 3).map(t => `#${t}`).join(' ')}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  onClick={onToggleFollow}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                    isFollowing
                      ? 'bg-[#1e2030] text-[#c4c6dc] border border-[#343750] hover:bg-[#25283c]'
                      : 'bg-[#9146FF] hover:bg-[#772ce8] text-white shadow-[#9146FF]/30'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFollowing ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  <span>{isFollowing ? 'Following Duo' : 'Follow on Twitch'}</span>
                </button>

                <button
                  onClick={() => setShowSubModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-600/20 transition-all"
                >
                  <Gift className="w-4 h-4" />
                  <span>Subscribe</span>
                </button>

                <button
                  onClick={copyStreamUrl}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1a1c2b] hover:bg-[#23253b] text-[#c4c6dc] border border-[#2b2e46] text-xs font-semibold transition-all"
                  title="Share Stream URL"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Share</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Stream Tags & Extra Details */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {streamInfo.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-[#161826] border border-[#24263a] text-xs text-[#9fa3c0] hover:text-white hover:border-[#9146FF]/50 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Live Twitch Chat Simulator (4 or 3 cols) */}
          {showChat && (
            <div className="lg:col-span-4 xl:col-span-3 flex flex-col h-[520px] lg:h-[580px] bg-[#0f101a] rounded-2xl border border-[#26283b] overflow-hidden shadow-xl">
              {/* Chat Header */}
              <div className="p-3.5 bg-[#141624] border-b border-[#26283b] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Stream Chat</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[#8e91aa] font-mono">Slow Mode (3s)</span>
                </div>
              </div>

              {/* Chat Messages Feed */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 text-xs font-sans scrollbar-thin">
                <div className="p-2.5 bg-[#181a2b]/80 border border-[#26283d] rounded-xl text-[11px] text-[#9396b2] mb-3">
                  💬 Welcome to <strong className="text-white">AlexAndEve's</strong> room! Please be respectful to both streamers and fellow viewers.
                </div>

                {chatMessages.map((msg) => (
                  <div key={msg.id} className="leading-relaxed hover:bg-white/5 p-1 rounded-lg transition-colors">
                    <span className="text-[10px] text-[#6d7088] mr-1.5 font-mono">{msg.timestamp}</span>
                    
                    {/* Badges */}
                    {msg.badges.map((b, idx) => (
                      <span
                        key={idx}
                        className={`inline-block mr-1 px-1 py-0.2 rounded text-[9px] font-bold uppercase ${
                          b === 'sub' ? 'bg-[#9146FF] text-white' :
                          b === 'mod' ? 'bg-emerald-600 text-white' :
                          b === 'vip' ? 'bg-pink-600 text-white' :
                          b === 'prime' ? 'bg-blue-600 text-white' :
                          'bg-amber-600 text-white'
                        }`}
                      >
                        {b}
                      </span>
                    ))}

                    <span style={{ color: msg.color }} className="font-bold mr-1.5">
                      {msg.user}:
                    </span>
                    <span className="text-[#e2e4f0] break-words">{msg.text}</span>
                  </div>
                ))}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Emote Quick Reactions Bar */}
              <div className="px-3 py-1.5 bg-[#141624]/60 border-t border-[#202235] flex items-center justify-between text-xs">
                <span className="text-[10px] text-[#787b96] font-medium">Quick emotes:</span>
                <div className="flex items-center gap-1.5">
                  {['PogChamp', 'LUL', 'Kappa', 'AlexDuo', 'EveCarry'].map(emote => (
                    <button
                      key={emote}
                      onClick={() => setUserChatInput(prev => `${prev} ${emote}`.trim())}
                      className="px-1.5 py-0.5 rounded bg-[#1e2033] hover:bg-[#9146FF] text-[10px] text-[#c4c7df] hover:text-white transition-colors"
                    >
                      {emote}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input Box */}
              <form onSubmit={handleSendChat} className="p-3 bg-[#131522] border-t border-[#26283b] space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#8e91aa]">
                  <span>Chatting as <strong className="text-[#00f2fe]">You</strong></span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setUserBadge(prev => prev === 'sub' ? 'vip' : prev === 'vip' ? 'mod' : 'sub')}
                      className="px-1.5 py-0.5 rounded bg-[#202235] text-[10px] text-white font-mono hover:bg-[#9146FF] transition-colors"
                      title="Cycle your chat badge"
                    >
                      Badge: {userBadge.toUpperCase()}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={userChatInput}
                    onChange={(e) => setUserChatInput(e.target.value)}
                    placeholder="Send a message to Alex & Eve..."
                    className="flex-1 bg-[#1a1c2d] border border-[#2d304a] focus:border-[#9146FF] rounded-xl px-3 py-2 text-xs text-white placeholder-[#686b86] outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-[#9146FF] hover:bg-[#772ce8] text-white rounded-xl transition-transform active:scale-95 shadow-md shadow-[#9146FF]/30"
                    title="Send chat message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>

      {/* Subscribe / Support Modal */}
      {showSubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#141624] border border-[#2f324d] rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#9146FF] flex items-center justify-center text-white">
                  <Gift className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">Subscribe to AlexAndEve</h3>
              </div>
              <button
                onClick={() => setShowSubModal(false)}
                className="text-[#8e91aa] hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#a4a7c4] mb-5 leading-relaxed">
              Unlock 35+ custom duo emotes, ad-free viewing, Discord VIP roles, and subscriber co-op game access!
            </p>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => triggerCheerOrSub('sub')}
                className="w-full p-3.5 rounded-xl bg-[#1b1e30] hover:bg-[#23273e] border border-[#313552] hover:border-[#9146FF] text-left flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#a855f7]">Tier 1 Subscription</div>
                  <div className="text-xs text-[#8e91aa]">$4.99 / month or Free with Prime</div>
                </div>
                <span className="px-2 py-1 rounded bg-[#9146FF] text-[11px] font-bold text-white">Select</span>
              </button>

              <button
                onClick={() => triggerCheerOrSub('gift')}
                className="w-full p-3.5 rounded-xl bg-[#1b1e30] hover:bg-[#23273e] border border-[#313552] hover:border-[#00f2fe] text-left flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#00f2fe]">Gift 5 Community Subs</div>
                  <div className="text-xs text-[#8e91aa]">Surprise 5 lucky viewers in chat!</div>
                </div>
                <span className="px-2 py-1 rounded bg-[#00f2fe] text-[11px] font-bold text-[#0d0e17]">Gift 5</span>
              </button>

              <button
                onClick={() => triggerCheerOrSub('bits')}
                className="w-full p-3.5 rounded-xl bg-[#1b1e30] hover:bg-[#23273e] border border-[#313552] hover:border-amber-400 text-left flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-amber-400">Cheer 500 Bits</div>
                  <div className="text-xs text-[#8e91aa]">Show up on the live on-stream ticker</div>
                </div>
                <span className="px-2 py-1 rounded bg-amber-400 text-[11px] font-bold text-[#0d0e17]">Cheer</span>
              </button>
            </div>

            <div className="text-center">
              <a
                href="https://twitch.tv/alexandeve"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#9146FF] hover:underline font-semibold"
              >
                Or subscribe directly on twitch.tv/alexandeve →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
