import React from 'react';

export default function CapstonePortalModal({ isOpen, onClose, onEnterCapstone }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border-2 border-cyan-500/50 bg-gradient-to-b from-slate-900 via-indigo-950/80 to-slate-950 p-8 shadow-2xl shadow-cyan-500/30 text-white text-center">
        {/* Futuristic glowing backdrop orb */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-10 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

        {/* Portal Rune Crest */}
        <div className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-cyan-400/60 bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 text-5xl shadow-2xl shadow-cyan-500/50 animate-pulse">
          🌌
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/60 px-4 py-1 text-xs font-mono font-bold uppercase tracking-widest text-cyan-300 shadow-inner">
          <span>⚡ REALM ASCENSION • LEVEL 100+</span>
        </div>

        {/* Main Heading */}
        <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-amber-300">
          ENTER THE CAPSTONE REALM
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          You have mastered all 100 fundamental Python trials. The gates to the <strong className="text-cyan-300">Real-World Engineering Matrix</strong> are now open!
        </p>

        {/* Capstone Features Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <div className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3.5">
            <span className="text-2xl">📊</span>
            <div>
              <h4 className="text-xs font-bold text-cyan-300">Production Log ETL</h4>
              <p className="text-[11px] text-slate-400">Server log parsing, regex analysis & IP aggregation.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3.5">
            <span className="text-2xl">🚰</span>
            <div>
              <h4 className="text-xs font-bold text-cyan-300">Rate Limiter Engines</h4>
              <p className="text-[11px] text-slate-400">Token-bucket algorithms for high-throughput APIs.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3.5">
            <span className="text-2xl">📡</span>
            <div>
              <h4 className="text-xs font-bold text-cyan-300">Pub-Sub Event Buses</h4>
              <p className="text-[11px] text-slate-400">Asynchronous decoupled event broker systems.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3.5">
            <span className="text-2xl">🧠</span>
            <div>
              <h4 className="text-xs font-bold text-cyan-300">ML Model Evaluation</h4>
              <p className="text-[11px] text-slate-400">Precision, Recall & F1-score metric engines.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onEnterCapstone}
            className="flex-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 px-6 py-3.5 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/30 transition hover:scale-105 hover:brightness-110 active:scale-95"
          >
            🚀 Enter Capstone Realm (Levels 101 - 110)
          </button>
          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-700 bg-slate-800/80 px-5 py-3 text-xs font-bold text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            Stay on Map
          </button>
        </div>
      </div>
    </div>
  );
}
