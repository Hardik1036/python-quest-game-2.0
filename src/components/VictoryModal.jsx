import React from 'react';

export default function VictoryModal({ quest, onNextLevel, onReturnToMap, hasNextLevel }) {
  if (!quest) return null;

  const isLevel100 = quest.id === 100;
  const isCapstone = quest.isCapstone || quest.id > 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md">
      <div className={`relative w-full max-w-md overflow-hidden rounded-3xl border p-6 text-center text-white shadow-2xl ${
        isLevel100
          ? 'border-cyan-400/80 bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 shadow-cyan-500/40 ring-2 ring-cyan-400/50'
          : isCapstone
          ? 'border-cyan-500/40 bg-gradient-to-b from-slate-900 via-indigo-950/80 to-slate-950 shadow-cyan-500/20'
          : 'border-emerald-500/40 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 shadow-emerald-500/20'
      }`}>
        {/* Glow backdrop */}
        <div className={`absolute -top-16 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full blur-3xl pointer-events-none ${
          isLevel100 ? 'bg-cyan-400/30' : isCapstone ? 'bg-indigo-500/30' : 'bg-emerald-500/20'
        }`} />

        {/* Quest Icon & Crest */}
        <div className="relative mb-2">
          <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border text-4xl shadow-lg ${
            isLevel100
              ? 'border-cyan-400/80 bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 shadow-cyan-500/40 animate-pulse'
              : isCapstone
              ? 'border-cyan-400/40 bg-gradient-to-tr from-cyan-600 to-indigo-600 shadow-cyan-500/30'
              : 'border-emerald-400/40 bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-emerald-500/30'
          }`}>
            {isLevel100 ? '👑' : quest.icon || '🐍'}
          </div>
        </div>

        {/* 3 Animated Mastery Stars */}
        <div className="flex justify-center gap-2 my-3 text-3xl">
          <span className="drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">⭐</span>
          <span className="drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] scale-125">⭐</span>
          <span className="drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">⭐</span>
        </div>

        <h3 className={`text-2xl font-black tracking-tight text-transparent bg-clip-text ${
          isLevel100
            ? 'bg-gradient-to-r from-cyan-300 via-amber-300 to-purple-300'
            : isCapstone
            ? 'bg-gradient-to-r from-cyan-300 via-teal-200 to-amber-300'
            : 'bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300'
        }`}>
          {isLevel100 ? 'GRANDMASTER ACHIEVED!' : isCapstone ? 'CAPSTONE TRIAL CLEARED!' : 'QUEST COMPLETED!'}
        </h3>

        <p className="mt-1 text-base font-semibold text-white">
          {quest.title}
        </p>

        {isLevel100 ? (
          <div className="mt-3 rounded-xl border border-cyan-400/50 bg-cyan-950/70 p-3 text-xs text-cyan-200">
            🌌 <strong>REAL-WORLD CAPSTONE MATRIX UNLOCKED!</strong>
            <p className="mt-1 text-[11px] text-slate-300">
              You are now ready to tackle production-grade engineering problems (Levels 101 - 110).
            </p>
          </div>
        ) : (
          <p className="mt-2 text-xs text-slate-300">
            Mastery Unlocked: <span className="text-emerald-300 font-medium font-mono">[{quest.concept || 'Python Core'}]</span>
          </p>
        )}

        {/* Rewards pill */}
        <div className="mt-4 flex items-center justify-center gap-4 rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 px-4">
          <div className="flex items-center gap-1.5 text-sm font-bold text-amber-300">
            <span>⭐</span>
            <span>+3 Stars</span>
          </div>
          <div className="h-4 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5 text-sm font-bold text-cyan-400">
            <span>💎</span>
            <span>+{quest.xp || 100} XP</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          {hasNextLevel ? (
            <button
              onClick={onNextLevel}
              className={`w-full rounded-xl px-5 py-3 font-bold text-slate-950 shadow-lg transition-all hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] ${
                isLevel100
                  ? 'bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 shadow-cyan-500/30'
                  : isCapstone
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-400 shadow-cyan-500/30'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-emerald-500/30'
              }`}
            >
              {isLevel100 ? '🌌 Enter Capstone Matrix (Level 101) ➔' : 'Continue Quest ⚔️'}
            </button>
          ) : (
            <div className="rounded-xl bg-cyan-500/20 border border-cyan-500/40 p-3 text-sm font-bold text-cyan-300">
              🏆 You have conquered all 110 Levels including all Capstone Projects!
            </div>
          )}

          <button
            onClick={onReturnToMap}
            className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white active:scale-[0.98]"
          >
            🗺️ Return to Quest Map
          </button>
        </div>
      </div>
    </div>
  );
}
