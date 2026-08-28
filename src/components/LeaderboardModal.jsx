import React, { useState, useEffect } from 'react';
import { fetchCloudLeaderboard } from '../services/playerService';

export default function LeaderboardModal({
  isOpen,
  onClose,
  playerXp,
  playerStars,
  playerCompletedCount,
  playerName
}) {
  const [cloudPlayers, setCloudPlayers] = useState([]);
  const [isLoadingCloud, setIsLoadingCloud] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoadingCloud(true);
      fetchCloudLeaderboard()
        .then((data) => {
          if (Array.isArray(data)) {
            setCloudPlayers(data);
          }
        })
        .finally(() => setIsLoadingCloud(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Determine current player League
  const getLeague = (xp) => {
    if (xp >= 15000) return { title: 'Grandmaster', badge: '👑', color: 'text-amber-300' };
    if (xp >= 10000) return { title: 'Diamond', badge: '💎', color: 'text-cyan-300' };
    if (xp >= 5000) return { title: 'Gold', badge: '🥇', color: 'text-yellow-400' };
    if (xp >= 2000) return { title: 'Silver', badge: '🥈', color: 'text-slate-300' };
    if (xp >= 500) return { title: 'Bronze', badge: '🥉', color: 'text-amber-600' };
    return { title: 'Apprentice', badge: '🌱', color: 'text-emerald-400' };
  };

  const playerLeague = getLeague(playerXp);

  // Current active player representation
  const currentPlayerObj = {
    id: 'current_user',
    name: playerName || 'You',
    title: `${playerLeague.title} Engineer`,
    xp: playerXp,
    stars: playerStars,
    quests: playerCompletedCount,
    avatar: '🐍',
    league: playerLeague.title,
    isCurrent: true
  };

  // Only include real cloud players from Supabase, removing duplicate entry for current user if present
  const otherRealPlayers = cloudPlayers.filter(
    (cp) => cp.name.toLowerCase() !== (playerName || '').toLowerCase()
  );

  // Combine only real players
  const allPlayers = [...otherRealPlayers, currentPlayerObj].sort((a, b) => b.xp - a.xp);
  const playerRank = allPlayers.findIndex((p) => p.id === 'current_user') + 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-700/80 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl text-white flex flex-col max-h-[90vh]">
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-44 w-96 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 text-2xl shadow-lg shadow-amber-500/30">
              🏆
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <span>Global Leaderboard</span>
                <span className="rounded bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 text-[10px] font-mono text-cyan-300 uppercase">
                  Live Supabase Players
                </span>
              </h2>
              <p className="text-xs text-slate-400">Real-time standings of registered players</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
          >
            ✕
          </button>
        </div>

        {/* Player Current Standings Highlight Card */}
        <div className="my-4 rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 p-4 shadow-xl shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 text-2xl shadow-md shadow-cyan-500/30">
                🐍
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-white">{playerName || 'You'}</span>
                  <span className={`text-xs font-bold ${playerLeague.color}`}>
                    {playerLeague.badge} {playerLeague.title}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {playerCompletedCount} Quests Mastered • {playerStars} Stars • ☁️ Real-time Cloud Sync
                </p>
              </div>
            </div>

            {/* Live Rank & XP */}
            <div className="flex items-center gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
              <div className="text-center sm:text-right">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Global Rank</span>
                <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-amber-300">
                  #{playerRank} <span className="text-xs text-slate-400">of {allPlayers.length}</span>
                </p>
              </div>
              <div className="h-8 w-px bg-slate-800 hidden sm:block" />
              <div className="text-center sm:text-right">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Total XP</span>
                <p className="text-xl font-black text-cyan-300 font-mono">
                  💎 {playerXp.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Roster Table */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
          {allPlayers.map((player, index) => {
            const rank = index + 1;
            const isTop1 = rank === 1;
            const isTop2 = rank === 2;
            const isTop3 = rank === 3;
            const isSelf = player.id === 'current_user';

            return (
              <div
                key={player.id}
                className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
                  isSelf
                    ? 'border-cyan-400/80 bg-cyan-950/40 shadow-md ring-1 ring-cyan-400/40'
                    : isTop1
                    ? 'border-amber-500/50 bg-amber-950/20'
                    : isTop2
                    ? 'border-slate-500/50 bg-slate-900/60'
                    : isTop3
                    ? 'border-amber-700/50 bg-amber-950/10'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                }`}
              >
                {/* Rank & Player Info */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* Rank Badge */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black">
                    {isTop1 ? '🥇' : isTop2 ? '🥈' : isTop3 ? '🥉' : <span className="text-xs text-slate-400 font-mono">#{rank}</span>}
                  </div>

                  <span className="text-xl">{player.avatar || '👤'}</span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold truncate ${isSelf ? 'text-cyan-300' : 'text-white'}`}>
                        {player.name} {isSelf && '(YOU)'}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 truncate block">
                      {player.title}
                    </span>
                  </div>
                </div>

                {/* Score Stats */}
                <div className="flex items-center gap-3 sm:gap-6 shrink-0 text-right">
                  <div className="hidden sm:block">
                    <span className="text-[10px] text-slate-400 block font-mono">Quests</span>
                    <span className="text-xs font-semibold text-slate-300 font-mono">{player.quests}</span>
                  </div>

                  <div className="hidden sm:block">
                    <span className="text-[10px] text-slate-400 block font-mono">Stars</span>
                    <span className="text-xs font-semibold text-amber-400 font-mono">⭐ {player.stars}</span>
                  </div>

                  <div className="min-w-[70px]">
                    <span className="text-[10px] text-slate-400 block font-mono">Earned XP</span>
                    <span className="text-xs font-black text-cyan-300 font-mono">💎 {player.xp.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {allPlayers.length === 1 && (
            <div className="text-center py-6 text-slate-400 text-xs bg-slate-950/40 rounded-xl border border-slate-800 p-4 mt-2">
              🌟 You are currently the first adventurer on the leaderboard! As other real players join and clear quests, they will appear here in real time.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>{isLoadingCloud ? '🔄 Fetching players from Supabase...' : '☁️ Real registered players leaderboard.'}</span>
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-1.5 font-bold text-white transition"
          >
            Close Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
