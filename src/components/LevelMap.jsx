import React, { useState, useMemo } from 'react';
import CapstonePortalModal from './CapstonePortalModal';

export default function LevelMap({
  quests,
  completedLevels,
  currentQuestIndex,
  onSelectLevel,
  onGenerateAiQuest,
  onGenerateCapstoneQuest,
  onOpenLeaderboard,
  playerName,
  playerDob,
  onLogout,
  isGeneratingTask,
  isLoadingEngine
}) {
  const [selectedRealm, setSelectedRealm] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPortalModal, setShowPortalModal] = useState(false);

  const totalStars = completedLevels.length * 3;
  const totalXp = completedLevels.reduce((sum, qId) => {
    const q = quests.find((item) => item.id === qId);
    return sum + (q?.xp || 100);
  }, 0);
  const progressPercent = Math.round((completedLevels.length / quests.length) * 100);

  // Extract all unique realms
  const realms = useMemo(() => {
    const realmSet = new Set();
    quests.forEach((q) => {
      if (q.world) realmSet.add(q.world);
    });
    return Array.from(realmSet);
  }, [quests]);

  // Filter quests based on realm selection and search query
  const filteredQuests = useMemo(() => {
    return quests.filter((q) => {
      const matchesRealm = selectedRealm === 'all' || q.world === selectedRealm;
      const matchesSearch =
        searchQuery === '' ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.id.toString() === searchQuery.trim();
      return matchesRealm && matchesSearch;
    });
  }, [quests, selectedRealm, searchQuery]);

  // Alternating alignment pattern for winding quest trail
  const getNodeAlignment = (index) => {
    const pattern = [
      'justify-center',
      'justify-start md:translate-x-10',
      'justify-center',
      'justify-end md:-translate-x-10'
    ];
    return pattern[index % pattern.length];
  };

  const capstoneCount = quests.filter((q) => q.isCapstone || q.id > 100).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-slate-950 pb-24">
      {/* Capstone Ascension Modal */}
      <CapstonePortalModal
        isOpen={showPortalModal}
        onClose={() => setShowPortalModal(false)}
        onEnterCapstone={() => {
          setShowPortalModal(false);
          setSelectedRealm('Realm 11: Capstone Matrix');
          const capstoneIndex = quests.findIndex((q) => q.id === 101);
          if (capstoneIndex !== -1) {
            onSelectLevel(capstoneIndex);
          }
        }}
      />

      {/* Ambient RPG Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[130px]" />
        <div className="absolute bottom-32 right-1/4 h-96 w-96 rounded-full bg-cyan-500/15 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[160px]" />
      </div>

      {/* Top Sticky Player Quest Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md px-4 py-3 shadow-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-amber-400 text-xl shadow-md shadow-cyan-500/30">
              🐍
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white sm:text-xl flex items-center gap-2">
                <span>Python Quest</span>
                <span className="rounded bg-gradient-to-r from-cyan-950 to-emerald-950 border border-cyan-500/40 px-2 py-0.5 text-[10px] font-mono uppercase text-cyan-300">
                  Endless Capstone Realm
                </span>
              </h1>
              <p className="text-xs text-slate-400">100 Core Trials • {capstoneCount} Endless Capstone Projects</p>
            </div>
          </div>

          {/* Stats & Global Actions Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Global Leaderboard Button */}
            <button
              onClick={onOpenLeaderboard}
              className="flex items-center gap-1.5 rounded-full border border-amber-500/50 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-600/20 px-3.5 py-1 text-xs font-bold text-amber-300 shadow-md shadow-amber-500/10 transition hover:scale-105 hover:border-amber-400"
            >
              <span>🏆</span>
              <span>Global Rankings</span>
            </button>

            {/* Stars */}
            <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 px-3 py-1 text-xs font-bold text-amber-300 shadow-inner">
              <span className="text-sm">⭐</span>
              <span>{totalStars} Stars</span>
            </div>

            {/* XP */}
            <div className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-bold text-cyan-300 shadow-inner">
              <span className="text-sm">💎</span>
              <span>{totalXp.toLocaleString()} XP</span>
            </div>

            {/* Capstone Gateway Pill Button */}
            <button
              onClick={() => setShowPortalModal(true)}
              className="flex items-center gap-1.5 rounded-full border border-cyan-400/50 bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-cyan-900/80 px-3 py-1 text-xs font-bold text-cyan-300 shadow-lg shadow-cyan-500/20 transition hover:scale-105 hover:border-cyan-300"
            >
              <span>🌌</span>
              <span>Portal</span>
            </button>

            {/* Adventurer Profile & Logout Button */}
            <div className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/90 px-3 py-1 text-xs text-slate-300">
              <span className="text-cyan-300">👤 {playerName || 'Adventurer'}</span>
              {playerDob && <span className="text-[10px] text-slate-500 font-mono">({playerDob})</span>}
              <button
                onClick={onLogout}
                className="ml-1 text-[10px] font-bold text-red-400 hover:text-red-300 hover:underline"
                title="Switch Adventurer / Logout"
              >
                [Exit]
              </button>
            </div>

            {/* Jump to Active Quest */}
            <button
              onClick={() => onSelectLevel(currentQuestIndex)}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-1 text-xs font-black text-slate-950 shadow-md shadow-emerald-500/30 transition hover:scale-105 hover:brightness-110 active:scale-95"
            >
              <span>⚔️ Level {currentQuestIndex + 1}</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mx-auto mt-2 max-w-6xl">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
            <span>Overall Python Mastery & Capstone Progress</span>
            <span className="text-cyan-300 font-mono">
              {progressPercent}% ({completedLevels.length}/{quests.length} Completed)
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-900 border border-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-purple-400 transition-all duration-500 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Realm Selection & Search Filter Toolbar */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 backdrop-blur-md">
          {/* Realm Selector Dropdown / Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Realm:
            </span>
            <button
              onClick={() => setSelectedRealm('all')}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition whitespace-nowrap ${selectedRealm === 'all'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
            >
              All Realms ({quests.length})
            </button>
            {realms.map((realm) => {
              const realmQuests = quests.filter((q) => q.world === realm);
              const realmCleared = realmQuests.filter((q) => completedLevels.includes(q.id)).length;
              const isCapstone = realm.includes('Capstone');

              return (
                <button
                  key={realm}
                  onClick={() => setSelectedRealm(realm)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${selectedRealm === realm
                      ? isCapstone
                        ? 'bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30'
                        : 'bg-emerald-500 text-slate-950 shadow-md'
                      : isCapstone
                        ? 'border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                >
                  <span>{isCapstone ? '🌌 Capstone Matrix' : realm.split(':')[0]}</span>
                  <span className="opacity-70 text-[10px]">({realmCleared}/{realmQuests.length})</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative shrink-0 md:w-56">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic or level #..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-cyan-300 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Quest Map Trail */}
      <main className="relative mx-auto max-w-4xl px-4 pt-6">
        {/* Realm Header */}
        <div className="mb-8 text-center">
          <span className={`rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-widest ${selectedRealm.includes('Capstone')
              ? 'border-cyan-400/50 bg-cyan-950/60 text-cyan-300 animate-pulse'
              : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
            }`}>
            {selectedRealm === 'all'
              ? '🗺️ Complete 100-Level & Endless Capstone Adventure'
              : selectedRealm}
          </span>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
            {selectedRealm === 'all'
              ? 'The Python Grandmaster Journey'
              : selectedRealm.split(':')[1] || selectedRealm}
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-md mx-auto">
            Showing {filteredQuests.length} of {quests.length} stages.
            {selectedRealm.includes('Capstone')
              ? ' Endless real-world engineering tasks: Log ETL, Rate Limiters, JWT, Redis & ML Metrics.'
              : ' Complete challenges to unlock the next realm!'}
          </p>
        </div>

        {/* DIMENSIONAL ASCENSION PORTAL CARD */}
        {(selectedRealm === 'all' || selectedRealm.includes('Capstone')) && (
          <div className="my-8 overflow-hidden rounded-3xl border-2 border-cyan-500/50 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-center shadow-2xl shadow-cyan-500/20 backdrop-blur-xl relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full bg-cyan-500/30 blur-2xl pointer-events-none" />
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/80 px-3 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300 mb-2">
              <span>⚡ ENDLESS REAL-WORLD PYTHON CAPSTONE MATRIX</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-amber-300">
              Infinite Production Engineering Challenges
            </h3>
            <p className="mt-1 text-xs text-slate-300 max-w-md mx-auto">
              Build production architectures: Server Log ETL, Token Bucket Limiters, Pub-Sub Buses, JWT Decoders, and ML Models. Summon infinite challenges to climb the Global Leaderboard!
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <button
                onClick={onGenerateCapstoneQuest}
                disabled={isGeneratingTask || isLoadingEngine}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 px-5 py-2.5 text-xs font-black text-white shadow-lg shadow-cyan-500/30 transition hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-50"
              >
                <span>⚡ Summon Endless Capstone Project</span>
              </button>

              <button
                onClick={() => setShowPortalModal(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/50 bg-slate-900/80 px-4 py-2.5 text-xs font-bold text-cyan-300 transition hover:bg-slate-800"
              >
                <span>🌌 Realm Details</span>
              </button>
            </div>
          </div>
        )}

        {/* Quest Trail Container */}
        <div className="relative flex flex-col gap-6 md:gap-8 my-6">
          {/* Connector Spine */}
          <div className="absolute left-1/2 top-8 bottom-8 -translate-x-1/2 w-0.5 border-r-2 border-dashed border-slate-700/60 pointer-events-none hidden md:block" />

          {filteredQuests.map((quest, index) => {
            const actualIndex = quests.findIndex((q) => q.id === quest.id);
            const isCleared = completedLevels.includes(quest.id);
            const isCurrent = actualIndex === currentQuestIndex;
            const isUnlocked =
              actualIndex === 0 ||
              completedLevels.includes(quests[actualIndex - 1]?.id) ||
              isCleared;
            const alignment = getNodeAlignment(index);
            const isCapstone = quest.isCapstone || quest.id > 100;

            return (
              <div
                key={quest.id}
                className={`relative flex items-center ${alignment} transition-all duration-300`}
              >
                {/* Quest Card Container */}
                <div
                  className={`group relative flex w-full max-w-md items-center gap-3.5 rounded-2xl border p-4 backdrop-blur-md transition-all duration-300 ${isCurrent
                      ? isCapstone
                        ? 'border-cyan-400/90 bg-slate-900/95 shadow-2xl shadow-cyan-500/30 scale-[1.03] ring-2 ring-cyan-400/50'
                        : 'border-emerald-400/90 bg-slate-900/95 shadow-xl shadow-emerald-500/20 scale-[1.03] ring-2 ring-emerald-400/40'
                      : isCleared
                        ? isCapstone
                          ? 'border-cyan-500/40 bg-slate-900/80 hover:border-cyan-400 shadow-md'
                          : 'border-emerald-500/40 bg-slate-900/80 hover:border-emerald-400 shadow-md'
                        : isUnlocked
                          ? isCapstone
                            ? 'border-cyan-700/60 bg-slate-900/60 hover:border-cyan-500'
                            : 'border-slate-700/80 bg-slate-900/60 hover:border-slate-500'
                          : 'border-slate-800/40 bg-slate-950/50 opacity-60'
                    }`}
                >
                  {/* Current Active Quest Pill / Capstone Pill */}
                  {isCurrent ? (
                    <div className={`absolute -top-3.5 right-4 z-10 flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-md animate-pulse ${isCapstone
                        ? 'bg-gradient-to-r from-cyan-400 to-indigo-300 shadow-cyan-500/50'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-emerald-500/40'
                      }`}>
                      <span>{isCapstone ? '⚡ Active Capstone' : '📍 Active Stage'}</span>
                    </div>
                  ) : isCapstone ? (
                    <div className="absolute -top-2.5 right-4 z-10 flex items-center gap-1 rounded-full border border-cyan-400/40 bg-cyan-950/90 px-2 py-0.2 text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-300 shadow">
                      <span>INDUSTRY TIER</span>
                    </div>
                  ) : null}

                  {/* Quest Node Icon / Orb */}
                  <div className="relative shrink-0">
                    <button
                      disabled={!isUnlocked}
                      onClick={() => onSelectLevel(actualIndex)}
                      className={`relative flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-black shadow-lg transition-transform ${isCurrent
                          ? isCapstone
                            ? 'bg-gradient-to-tr from-cyan-500 via-indigo-400 to-purple-400 text-slate-950 shadow-cyan-500/50 scale-105 hover:scale-110 active:scale-95 ring-4 ring-cyan-400/30'
                            : 'bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-300 text-slate-950 shadow-emerald-500/40 scale-105 hover:scale-110 active:scale-95 ring-4 ring-emerald-400/20'
                          : isCleared
                            ? isCapstone
                              ? 'bg-gradient-to-tr from-cyan-700 to-indigo-500 text-white shadow-cyan-500/30 hover:scale-105 active:scale-95'
                              : 'bg-gradient-to-tr from-emerald-700 to-teal-500 text-white shadow-emerald-500/20 hover:scale-105 active:scale-95'
                            : isUnlocked
                              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105'
                              : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                        }`}
                    >
                      {quest.icon || (isUnlocked ? quest.id : '🔒')}

                      {/* Level Number Sub-Badge */}
                      <span className={`absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-slate-950 text-[10px] font-bold text-white shadow ${isCapstone ? 'bg-indigo-900 border-cyan-400/50' : 'bg-slate-800'
                        }`}>
                        {quest.id}
                      </span>
                    </button>
                  </div>

                  {/* Quest Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider truncate ${isCapstone ? 'text-cyan-400' : 'text-emerald-400'
                        }`}>
                        {quest.world}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className={`rounded px-1.5 py-0.2 text-[10px] font-mono truncate ${isCapstone
                          ? 'bg-indigo-950 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-800 text-emerald-300'
                        }`}>
                        {quest.concept}
                      </span>
                    </div>

                    <h3 className="mt-0.5 truncate text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {quest.title}
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">
                      {quest.description}
                    </p>

                    {/* Star Rating & Action */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs">
                        {isCleared ? (
                          <>
                            <span className="text-amber-400">⭐</span>
                            <span className="text-amber-400">⭐</span>
                            <span className="text-amber-400">⭐</span>
                            <span className={`ml-1 text-[10px] font-bold font-mono ${isCapstone ? 'text-cyan-400' : 'text-emerald-400'
                              }`}>
                              Mastered
                            </span>
                          </>
                        ) : isUnlocked ? (
                          <>
                            <span className="text-slate-600">☆</span>
                            <span className="text-slate-600">☆</span>
                            <span className="text-slate-600">☆</span>
                            <span className="ml-1 text-[10px] font-bold text-amber-400">Ready</span>
                          </>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                            🔒 Locked
                          </span>
                        )}
                      </div>

                      {/* Play Action Button */}
                      {isUnlocked && (
                        <button
                          onClick={() => onSelectLevel(actualIndex)}
                          className={`rounded-lg px-2.5 py-1 text-xs font-bold transition shadow-sm ${isCurrent
                              ? isCapstone
                                ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'
                                : 'bg-emerald-400 text-slate-950 hover:bg-emerald-300'
                              : isCleared
                                ? isCapstone
                                  ? 'border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50'
                                  : 'border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/50'
                                : 'border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                            }`}
                        >
                          {isCurrent ? 'Play Stage ⚔️' : isCleared ? 'Replay ↺' : 'Start ▶'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* The AI Oracle Nexus Portal */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 p-6 text-center shadow-2xl backdrop-blur-md">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-400 text-3xl shadow-lg shadow-indigo-500/30 mb-3">
            🤖
          </div>
          <h3 className="text-xl font-black text-indigo-300">
            The AI Oracle Nexus (Infinite Capstone Trials)
          </h3>
          <p className="mt-1 text-xs text-slate-400 max-w-md mx-auto">
            Summon procedurally generated advanced real-world Python engineering challenges generated on-demand by AI!
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={onGenerateCapstoneQuest}
              disabled={isGeneratingTask || isLoadingEngine}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-50"
            >
              <span>⚡ Generate Endless Capstone</span>
            </button>

            <button
              onClick={onGenerateAiQuest}
              disabled={isGeneratingTask || isLoadingEngine}
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-950/40 px-5 py-3 text-sm font-bold text-indigo-200 transition hover:bg-indigo-900/60 disabled:opacity-50"
            >
              <span>{isGeneratingTask ? '✨ Oracle is Conjuring Quest...' : '✨ Summon AI Trial'}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
