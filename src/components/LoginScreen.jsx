import React, { useState, useEffect } from 'react';

export default function LoginScreen({ onLogin, initialName = '', initialDob = '', isLoading, authError }) {
  const [name, setName] = useState(initialName || '');
  const [dob, setDob] = useState(initialDob || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your Player Name.');
      return;
    }
    if (!dob) {
      setError('Please select your Date of Birth (DOB).');
      return;
    }

    setError('');
    onLogin(name.trim(), dob);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-emerald-500/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-500/15 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-purple-500/10 blur-[170px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-700/80 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-center">
        {/* Top Glow Crest */}
        <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-500/40 bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 text-4xl shadow-xl shadow-cyan-500/30">
          🐍
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/60 px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 mb-2">
          <span>🔒 UNIQUE PLAYER IDENTIFICATION & CLOUD SAVE</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Python Quest Adventure
        </h1>
        <p className="mt-1.5 text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
          Enter your <strong className="text-cyan-300">Player Name</strong> and <strong className="text-cyan-300">DOB</strong>. Each player name is reserved uniquely to protect your progress.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
          {error && (
            <div className="rounded-xl border border-amber-500/50 bg-amber-950/40 p-3 text-xs text-amber-200 font-medium leading-relaxed">
              ⚠️ {error}
            </div>
          )}

          {/* Name Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Player Name</span>
              <span className="text-[10px] text-cyan-400 font-mono">Unique Identifier</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Enter your player name..."
              maxLength={25}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-inner"
              autoFocus
            />
          </div>

          {/* Date of Birth Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Date of Birth (DOB)</span>
              <span className="text-[10px] text-cyan-400 font-mono">Verification Key</span>
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
                setError('');
              }}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-inner [color-scheme:dark]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 px-5 py-3.5 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/25 transition hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] disabled:opacity-50 mt-2"
          >
            {isLoading ? '🔄 Verifying Credentials with Supabase...' : '⚔️ Log In / Start Quest'}
          </button>
        </form>

        <p className="mt-4 text-[11px] text-slate-500">
          Returning players will instantly resume from their last cleared stage.
        </p>

        {/* Feature Badges */}
        <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-2">
            <span className="text-base block">📜</span>
            <span className="text-[10px] font-bold text-slate-300">100 Levels</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-2">
            <span className="text-base block">🌌</span>
            <span className="text-[10px] font-bold text-cyan-300">Capstone Realm</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-2">
            <span className="text-base block">🏆</span>
            <span className="text-[10px] font-bold text-amber-300">Global Ranks</span>
          </div>
        </div>
      </div>
    </div>
  );
}
