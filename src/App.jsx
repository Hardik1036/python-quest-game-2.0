import React, { useState, useEffect, useCallback } from 'react';
import LevelMap from './components/LevelMap';
import VictoryModal from './components/VictoryModal';
import LeaderboardModal from './components/LeaderboardModal';
import LoginScreen from './components/LoginScreen';
import { starterQuests } from './data/quests';
import { generateNextCapstoneQuest } from './utils/capstoneGenerator';
import {
  generateGeminiHint,
  generateGeminiCapstoneProject,
  generateGeminiTaskName
} from './services/geminiService';
import {
  loadPlayerProgress,
  savePlayerProgress,
  verifyOrRegisterPlayer,
  getActiveSession,
  setActiveSession,
  clearActiveSession
} from './services/playerService';

export default function App() {
  const [session, setSession] = useState(() => getActiveSession());
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getActiveSession());
  const [playerName, setPlayerName] = useState(() => getActiveSession()?.playerName || '');
  const [playerDob, setPlayerDob] = useState(() => getActiveSession()?.dob || '');
  const [authError, setAuthError] = useState('');

  const [currentView, setCurrentView] = useState('map'); // 'map' | 'game'
  const [pyodide, setPyodide] = useState(null);
  const [isLoadingEngine, setIsLoadingEngine] = useState(true);
  const [isLoadingPlayer, setIsLoadingPlayer] = useState(false);
  const [quests, setQuests] = useState(starterQuests);
  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [spentXp, setSpentXp] = useState(0);
  const [aiHints, setAiHints] = useState({}); // { [questId]: hintString }
  const [isLoadingAiHint, setIsLoadingAiHint] = useState(false);
  const [hintNotification, setHintNotification] = useState('');
  const [userCode, setUserCode] = useState(starterQuests[0].starterCode);
  const [status, setStatus] = useState('Your Python quest begins.');
  const [output, setOutput] = useState('');
  const [feedback, setFeedback] = useState('Solve the challenge to unlock the next realm stage.');
  const [isGeneratingTask, setIsGeneratingTask] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [syncStatus, setSyncStatus] = useState('saved'); // 'saved' | 'syncing'

  const currentQuest = quests[currentQuestIndex] || quests[0];
  const progressPercent = Math.round((completedLevels.length / quests.length) * 100);

  // Total gross XP earned from completed quests
  const grossXp = completedLevels.reduce((sum, qId) => {
    const q = quests.find((item) => item.id === qId);
    return sum + (q?.xp || 100);
  }, 0);

  // Net player XP after spending on Gemini hints
  const playerTotalXp = Math.max(0, grossXp - spentXp);
  const playerTotalStars = completedLevels.length * 3;

  // Initialize Pyodide WebAssembly engine
  useEffect(() => {
    async function initPyodide() {
      if (window.loadPyodide) {
        try {
          const py = await window.loadPyodide();
          setPyodide(py);
          setIsLoadingEngine(false);
        } catch (err) {
          console.error("Failed to load Pyodide engine:", err);
          setIsLoadingEngine(false);
        }
      }
    }

    initPyodide();
  }, []);

  // Restore saved player progression when session is active
  const restoreUserProgress = useCallback(async (name, dob) => {
    if (!name || !dob) return;
    setIsLoadingPlayer(true);
    setSyncStatus('syncing');
    try {
      const saved = await loadPlayerProgress(name, dob);
      if (saved) {
        if (Array.isArray(saved.completedLevels) && saved.completedLevels.length > 0) {
          setCompletedLevels(saved.completedLevels);
        } else {
          setCompletedLevels([]);
        }

        if (typeof saved.currentLevelIndex === 'number' && saved.currentLevelIndex >= 0) {
          const restoredIndex = Math.min(saved.currentLevelIndex, quests.length - 1);
          setCurrentQuestIndex(restoredIndex);
          setUserCode(saved.lastCode || quests[restoredIndex]?.starterCode || starterQuests[0].starterCode);
          setStatus(`Welcome back, ${name}! Resumed at Stage ${restoredIndex + 1}.`);
        } else {
          setCurrentQuestIndex(0);
          setUserCode(quests[0]?.starterCode || starterQuests[0].starterCode);
          setStatus(`Welcome, ${name}! Your Python journey begins.`);
        }
      } else {
        // Fresh player profile
        setCurrentQuestIndex(0);
        setCompletedLevels([]);
        setUserCode(quests[0]?.starterCode || starterQuests[0].starterCode);
        setStatus(`Welcome, ${name}! Your Python journey begins.`);
      }
      setSyncStatus('saved');
    } catch (err) {
      console.warn('Progress restoration notice:', err);
      setSyncStatus('saved');
    } finally {
      setIsLoadingPlayer(false);
    }
  }, [quests]);

  // Handle active session restore on mount
  useEffect(() => {
    if (session?.playerName && session?.dob) {
      restoreUserProgress(session.playerName, session.dob);
    }
  }, [session, restoreUserProgress]);

  // Strict Login handler with Name & DOB uniqueness validation
  const handleLogin = async (name, dob) => {
    setAuthError('');
    setIsLoadingPlayer(true);

    try {
      const authResult = await verifyOrRegisterPlayer(name, dob);

      if (!authResult.success) {
        setAuthError(authResult.error || 'Authentication error. Please try again.');
        setIsLoadingPlayer(false);
        return;
      }

      // Success
      setActiveSession(name, dob);
      setPlayerName(name);
      setPlayerDob(dob);
      setSession({ playerName: name, dob });
      setIsLoggedIn(true);

      if (authResult.progress) {
        const saved = authResult.progress;
        if (Array.isArray(saved.completedLevels)) {
          setCompletedLevels(saved.completedLevels);
        }
        if (typeof saved.currentLevelIndex === 'number') {
          const idx = Math.min(saved.currentLevelIndex, quests.length - 1);
          setCurrentQuestIndex(idx);
          setUserCode(saved.lastCode || quests[idx]?.starterCode || starterQuests[0].starterCode);
          setStatus(`Welcome back, ${name}! Resumed at Stage ${idx + 1}.`);
        }
      } else {
        setCurrentQuestIndex(0);
        setCompletedLevels([]);
        setUserCode(quests[0]?.starterCode || starterQuests[0].starterCode);
        setStatus(`Welcome, ${name}! New profile registered.`);
      }
    } catch (err) {
      setAuthError('Could not connect to authentication service. Please check your network.');
    } finally {
      setIsLoadingPlayer(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    clearActiveSession();
    setSession(null);
    setIsLoggedIn(false);
    setPlayerName('');
    setPlayerDob('');
    setAuthError('');
    setCurrentQuestIndex(0);
    setCompletedLevels([]);
    setUserCode(starterQuests[0].starterCode);
    setCurrentView('map');
  };

  // Persist progression whenever completedLevels, currentQuestIndex, or code changes
  const persistCurrentProgress = useCallback(
    async (overrideIndex, overrideCompleted, overrideCode, overrideSpentXp) => {
      if (!isLoggedIn || !playerName || !playerDob) return;

      setSyncStatus('syncing');
      const idx = overrideIndex !== undefined ? overrideIndex : currentQuestIndex;
      const completed = overrideCompleted !== undefined ? overrideCompleted : completedLevels;
      const code = overrideCode !== undefined ? overrideCode : userCode;
      const usedXp = overrideSpentXp !== undefined ? overrideSpentXp : spentXp;

      const gross = completed.reduce((sum, qId) => {
        const q = quests.find((item) => item.id === qId);
        return sum + (q?.xp || 100);
      }, 0);

      const netXp = Math.max(0, gross - usedXp);
      const stars = completed.length * 3;

      const res = await savePlayerProgress({
        playerName,
        dob: playerDob,
        currentLevelIndex: idx,
        completedLevels: completed,
        totalXp: netXp,
        totalStars: stars,
        lastCode: code
      });

      setSyncStatus(res?.isCloud ? 'saved' : 'saved');
    },
    [isLoggedIn, playerName, playerDob, currentQuestIndex, completedLevels, userCode, spentXp, quests]
  );

  const handleUpdatePlayerName = (newName) => {
    setPlayerName(newName);
    setActiveSession(newName, playerDob);
  };

  const handleSelectLevel = (index) => {
    if (index >= 0 && index < quests.length) {
      setCurrentQuestIndex(index);
      setUserCode(quests[index].starterCode);
      setOutput('');
      setHintNotification('');
      setStatus(`Entering Stage ${index + 1}: ${quests[index].title}...`);
      setFeedback('Execute your Python code to master this trial!');
      setCurrentView('game');

      persistCurrentProgress(index, completedLevels, quests[index].starterCode);
    }
  };

  // GEMINI AI HINT ORACLE (SPENDING 50 XP FOR CUSTOM CODE HINT)
  const handleRequestGeminiHint = async (cost = 50) => {
    if (playerTotalXp < cost) {
      setHintNotification(`⚠️ You need at least ${cost} XP to summon the Oracle. Clear earlier stages to earn more XP!`);
      return;
    }

    setIsLoadingAiHint(true);
    setHintNotification('');

    try {
      const hint = await generateGeminiHint({
        quest: currentQuest,
        userCode: userCode
      });

      const newSpent = spentXp + cost;
      setSpentXp(newSpent);
      setAiHints((prev) => ({
        ...prev,
        [currentQuest.id]: hint
      }));

      setHintNotification(`🔮 Oracle guidance unlocked (-${cost} XP)!`);

      // Persist updated XP
      persistCurrentProgress(currentQuestIndex, completedLevels, userCode, newSpent);
    } catch (err) {
      setHintNotification('⚠️ Could not consult the Oracle right now. Please try again.');
    } finally {
      setIsLoadingAiHint(false);
    }
  };

  const runCode = async () => {
    if (!pyodide || !currentQuest) return;

    setStatus('Running Python code in WebAssembly engine...');
    setOutput('');

    try {
      pyodide.globals.set('user_code', userCode);
      const result = await pyodide.runPythonAsync(`
import sys
from io import StringIO

buffer = StringIO()
old_stdout = sys.stdout
sys.stdout = buffer
try:
    exec(user_code)
finally:
    sys.stdout = old_stdout

output = buffer.getvalue().strip()
output
`);

      const actualOutput = String(result ?? '').trim();
      setOutput(actualOutput);

      if (actualOutput === currentQuest.expectedOutput) {
        const isNewlyCompleted = !completedLevels.includes(currentQuest.id);
        const updatedCompleted = isNewlyCompleted
          ? [...completedLevels, currentQuest.id]
          : completedLevels;

        if (isNewlyCompleted) {
          setCompletedLevels(updatedCompleted);
        }

        setStatus(`⚔️ Quest Cleared! Stage ${currentQuestIndex + 1} (${currentQuest.title}) complete.`);
        setFeedback(`Trial mastered! +${currentQuest.xp || 100} XP earned.`);
        setShowVictoryModal(true);

        persistCurrentProgress(currentQuestIndex, updatedCompleted, userCode);
      } else {
        setStatus(`Not quite yet. Expected "${currentQuest.expectedOutput}".`);
        setFeedback(currentQuest.hint);
      }
    } catch (error) {
      setStatus(`Execution error: ${error.message}`);
      setOutput('');
      setFeedback('Check your syntax and try again.');
    }
  };

  const goToNextLevel = () => {
    setShowVictoryModal(false);
    if (!currentQuest) return;

    if (currentQuestIndex < quests.length - 1) {
      const nextIndex = currentQuestIndex + 1;
      setCurrentQuestIndex(nextIndex);
      setUserCode(quests[nextIndex].starterCode);
      setStatus(`Quest ${nextIndex + 1} unlocked.`);
      setOutput('');
      setFeedback('New trial prepared.');
      setHintNotification('');
      setCurrentView('game');

      persistCurrentProgress(nextIndex, completedLevels, quests[nextIndex].starterCode);
    } else {
      generateEndlessCapstoneQuest();
    }
  };

  // GEMINI POWERED ENDLESS CAPSTONE GENERATOR
  const generateEndlessCapstoneQuest = async () => {
    setIsGeneratingTask(true);
    setStatus('🌌 Gemini AI Architect is generating a real-world Capstone Project...');

    try {
      const geminiCapstone = await generateGeminiCapstoneProject(quests.length);
      const newCapstone = geminiCapstone || generateNextCapstoneQuest(quests.length);

      const nextIndex = quests.length;
      setQuests((prev) => [...prev, newCapstone]);
      setCurrentQuestIndex(nextIndex);
      setUserCode(newCapstone.starterCode);
      setStatus(`🌌 Gemini Capstone Stage ${nextIndex + 1}: "${newCapstone.title}" unlocked!`);
      setFeedback('Real-world engineering challenge ready.');
      setCurrentView('game');

      persistCurrentProgress(nextIndex, completedLevels, newCapstone.starterCode);
    } catch (e) {
      const fallbackCapstone = generateNextCapstoneQuest(quests.length);
      const nextIndex = quests.length;
      setQuests((prev) => [...prev, fallbackCapstone]);
      setCurrentQuestIndex(nextIndex);
      setUserCode(fallbackCapstone.starterCode);
      setCurrentView('game');
    } finally {
      setIsGeneratingTask(false);
    }
  };

  // IF NOT LOGGED IN, PROMPT PLAYER FOR NAME AND DOB
  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        initialName=""
        initialDob=""
        isLoading={isLoadingPlayer}
        authError={authError}
      />
    );
  }

  return (
    <>
      {/* Global Leaderboard Modal */}
      <LeaderboardModal
        isOpen={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
        playerXp={playerTotalXp}
        playerStars={playerTotalStars}
        playerCompletedCount={completedLevels.length}
        playerName={playerName}
        onUpdatePlayerName={handleUpdatePlayerName}
      />

      {/* Victory Celebration Modal */}
      {showVictoryModal && (
        <VictoryModal
          quest={currentQuest}
          hasNextLevel={true}
          onNextLevel={goToNextLevel}
          onReturnToMap={() => {
            setShowVictoryModal(false);
            setCurrentView('map');
          }}
        />
      )}

      {/* VIEW 1: 100+ CAPSTONE REALM MAP */}
      {currentView === 'map' && (
        <LevelMap
          quests={quests}
          completedLevels={completedLevels}
          currentQuestIndex={currentQuestIndex}
          onSelectLevel={handleSelectLevel}
          onGenerateAiQuest={generateEndlessCapstoneQuest}
          onGenerateCapstoneQuest={generateEndlessCapstoneQuest}
          onOpenLeaderboard={() => setShowLeaderboardModal(true)}
          playerName={playerName}
          playerDob={playerDob}
          onLogout={handleLogout}
          isGeneratingTask={isGeneratingTask}
          isLoadingEngine={isLoadingEngine}
        />
      )}

      {/* VIEW 2: QUEST CODING & TRIAL VIEW */}
      {currentView === 'game' && (
        <div className="min-h-screen bg-slate-950 p-4 sm:p-6 text-white font-sans selection:bg-cyan-500 selection:text-slate-950">
          {/* Header Bar with Back to Map button */}
          <header className="mx-auto mb-6 max-w-7xl rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-md p-4 shadow-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentView('map')}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-700 hover:text-white active:scale-95 shadow"
                  title="Return to Realm Map"
                >
                  <span>🗺️</span>
                  <span>Quest Map</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-2xl border ${currentQuest?.isCapstone || currentQuestIndex >= 100
                      ? 'bg-indigo-950/80 border-cyan-500/40 text-cyan-300'
                      : 'bg-emerald-950/80 border-emerald-500/30'
                    }`}>
                    {currentQuest?.icon || '🐍'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${currentQuest?.isCapstone || currentQuestIndex >= 100 ? 'text-cyan-400' : 'text-emerald-400'
                        }`}>
                        {currentQuest?.world}
                      </span>
                      <span className={`rounded px-1.5 py-0.2 text-[10px] font-mono ${currentQuest?.isCapstone || currentQuestIndex >= 100
                          ? 'bg-indigo-950 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-800 text-emerald-300'
                        }`}>
                        {currentQuest?.concept}
                      </span>
                    </div>
                    <h1 className="text-xl font-black text-white sm:text-2xl">
                      Stage {currentQuestIndex + 1}: {currentQuest?.title}
                    </h1>
                  </div>
                </div>
              </div>

              {/* Quest indicator, Cloud Sync, Leaderboard & progress */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Adventurer Profile Pill */}
                <div className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300">
                  <span className="text-cyan-300">👤 {playerName}</span>
                  {playerDob && <span className="text-[10px] text-slate-500 font-mono">({playerDob})</span>}
                  <button
                    onClick={handleLogout}
                    className="ml-1 text-[10px] text-red-400 hover:underline font-bold"
                    title="Logout / Switch Player"
                  >
                    [Exit]
                  </button>
                </div>

                {/* Cloud Sync Status */}
                <div className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-[11px] font-mono text-slate-300">
                  <span className={`h-2 w-2 rounded-full ${syncStatus === 'syncing' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                  <span>{syncStatus === 'syncing' ? 'Syncing...' : '☁️ Synced'}</span>
                </div>

                <button
                  onClick={() => setShowLeaderboardModal(true)}
                  className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-950/40 px-3 py-1 text-xs font-bold text-amber-300 transition hover:scale-105 hover:border-amber-300"
                >
                  <span>🏆</span>
                  <span>Rankings</span>
                </button>

                <div className="rounded-full border border-cyan-700 bg-cyan-950/60 px-3.5 py-1 text-xs font-bold text-cyan-300 font-mono">
                  Level {currentQuestIndex + 1} of {quests.length}
                </div>

                <div className="rounded-full border border-amber-500/30 bg-amber-950/50 px-3 py-1 text-xs font-bold text-amber-300 font-mono">
                  💎 {playerTotalXp.toLocaleString()} XP
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800 border border-slate-800">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-purple-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </header>

          {/* Two-Column Play Workspace */}
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left: Quest Briefing & Task Goal */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-md p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <p className={`text-xs uppercase tracking-[0.3em] font-bold ${currentQuest?.isCapstone || currentQuestIndex >= 100 ? 'text-cyan-400' : 'text-emerald-400'
                    }`}>
                    {currentQuest?.isCapstone ? 'Capstone Engineering Objective' : `Quest Objective #${currentQuestIndex + 1}`}
                  </p>
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${completedLevels.includes(currentQuest?.id)
                      ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                      : 'border-amber-500/30 bg-amber-950/30 text-amber-300'
                    }`}>
                    {completedLevels.includes(currentQuest?.id) ? '✓ Mastered' : '● In Progress'}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white">
                  {currentQuest?.taskName || currentQuest?.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {currentQuest?.description}
                </p>

                {/* Standard Hint Box */}
                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-400 flex items-center gap-1">
                    <span>💡</span> Quest Hint
                  </p>
                  <p className="mt-1.5 text-sm text-amber-300">
                    {currentQuest?.hint}
                  </p>
                </div>

                {/* GEMINI AI HINT ORACLE (XP SPENDING) */}
                <div className="mt-4 rounded-xl border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-slate-950 to-indigo-950/40 p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.2em] font-bold text-purple-300 flex items-center gap-1.5">
                      <span className="text-base animate-pulse">🔮</span> Gemini AI Oracle
                    </p>

                    {aiHints[currentQuest.id] ? (
                      <button
                        onClick={() => handleRequestGeminiHint(25)}
                        disabled={isLoadingAiHint}
                        className="text-[11px] font-bold text-purple-300 hover:text-purple-200 underline font-mono disabled:opacity-50"
                      >
                        {isLoadingAiHint ? 'Thinking...' : '🔄 Re-Analyze Code (-25 XP)'}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRequestGeminiHint(50)}
                        disabled={isLoadingAiHint}
                        className="flex items-center gap-1.5 rounded-lg border border-purple-400/60 bg-purple-900/40 px-3 py-1 text-xs font-bold text-purple-200 shadow hover:bg-purple-800/60 transition disabled:opacity-50 active:scale-95"
                      >
                        <span>{isLoadingAiHint ? '🔮 Consulting Oracle...' : '🔮 Unlock AI Code Hint (-50 XP)'}</span>
                      </button>
                    )}
                  </div>

                  {hintNotification && (
                    <p className="mt-2 text-xs font-medium text-amber-300">
                      {hintNotification}
                    </p>
                  )}

                  {aiHints[currentQuest.id] ? (
                    <div className="mt-2.5 rounded-lg border border-purple-800/50 bg-slate-950/90 p-3">
                      <p className="text-xs text-purple-200 leading-relaxed">
                        {aiHints[currentQuest.id]}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-1.5 text-xs text-slate-400">
                      Stuck? Spend 50 XP to let the Gemini Oracle analyze your code and provide targeted guidance!
                    </p>
                  )}
                </div>

                {/* Goal Box */}
                <div className={`mt-4 rounded-xl border p-4 ${currentQuest?.isCapstone || currentQuestIndex >= 100
                    ? 'border-cyan-800/60 bg-cyan-950/30'
                    : 'border-emerald-800/60 bg-emerald-950/30'
                  }`}>
                  <p className={`text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-1 ${currentQuest?.isCapstone || currentQuestIndex >= 100 ? 'text-cyan-400' : 'text-emerald-400'
                    }`}>
                    <span>🎯</span> Expected Terminal Output
                  </p>
                  <p className={`mt-1.5 font-mono text-sm px-3 py-1.5 rounded border inline-block whitespace-pre-wrap ${currentQuest?.isCapstone || currentQuestIndex >= 100
                      ? 'bg-slate-950/80 text-cyan-300 border-cyan-900/40'
                      : 'bg-slate-950/60 text-emerald-300 border-emerald-900/40'
                    }`}>
                    {currentQuest?.expectedOutput}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={runCode}
                    disabled={isLoadingEngine}
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold text-slate-950 shadow-lg transition hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] disabled:opacity-50 ${currentQuest?.isCapstone || currentQuestIndex >= 100
                        ? 'bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-300 shadow-cyan-500/30'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-emerald-500/20'
                      }`}
                  >
                    <span>⚡</span>
                    <span>{isLoadingEngine ? 'Loading Pyodide Engine...' : 'Run Python Code'}</span>
                  </button>

                  <button
                    onClick={goToNextLevel}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-bold transition hover:bg-slate-800 active:scale-[0.98] ${currentQuest?.isCapstone || currentQuestIndex >= 100
                        ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-300'
                        : 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300'
                      }`}
                  >
                    <span>Next Level</span>
                    <span>➔</span>
                  </button>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setCurrentView('map')}
                    className="w-1/2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
                  >
                    🗺️ Return to Map
                  </button>

                  <button
                    onClick={generateEndlessCapstoneQuest}
                    disabled={isGeneratingTask}
                    className="w-1/2 rounded-xl border border-cyan-700/60 bg-cyan-950/40 px-4 py-2.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-900/50 disabled:opacity-50"
                  >
                    {isGeneratingTask ? '🌌 Gemini Generating...' : '⚡ Gemini Capstone'}
                  </button>
                </div>
              </div>
            </section>

            {/* Right: Code Console & Terminal */}
            <section className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-md p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className={`text-base font-bold flex items-center gap-2 ${currentQuest?.isCapstone || currentQuestIndex >= 100 ? 'text-cyan-400' : 'text-emerald-400'
                  }`}>
                  <span>💻</span> Python Editor & Terminal
                </h3>
                <span className="text-[11px] font-mono text-slate-400">Pyodide WASM</span>
              </div>

              {/* Code Editor Textarea */}
              <div className="relative mt-3">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className={`h-56 w-full resize-none rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm outline-none shadow-inner ${currentQuest?.isCapstone || currentQuestIndex >= 100
                      ? 'text-cyan-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                      : 'text-emerald-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                    }`}
                  spellCheck="false"
                  placeholder="# Write your Python code here..."
                />
              </div>

              {/* Console Output */}
              <div className="mt-4 min-h-[110px] rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-inner">
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-400 flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full inline-block animate-pulse ${currentQuest?.isCapstone || currentQuestIndex >= 100 ? 'bg-cyan-400' : 'bg-emerald-500'
                    }`} />
                  Terminal Output
                </p>
                <pre className={`mt-2 whitespace-pre-wrap font-mono text-sm ${currentQuest?.isCapstone || currentQuestIndex >= 100 ? 'text-cyan-300' : 'text-emerald-300'
                  }`}>
                  {output || '> No output yet. Click "Run Python Code" to execute.'}
                </pre>
              </div>

              {/* Status & Feedback */}
              <div className="mt-3 flex flex-col gap-2">
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs text-slate-300">
                  <span className="font-semibold text-slate-400">Status: </span>
                  {status}
                </div>

                <div className="rounded-lg border border-cyan-900/40 bg-cyan-950/20 px-3 py-2 text-xs text-cyan-300">
                  <span className="font-semibold text-cyan-400">Quest Guide: </span>
                  {feedback}
                </div>
              </div>

              {/* Quest Map Mini Roster */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-400">
                    Quick Stage Select ({quests.length} Total)
                  </p>
                  <button
                    onClick={() => setCurrentView('map')}
                    className="text-xs text-cyan-400 hover:underline font-semibold"
                  >
                    Open Realm Map ➔
                  </button>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 scrollbar-thin">
                  {quests.map((quest, index) => {
                    const isCleared = completedLevels.includes(quest.id);
                    const isCurrent = index === currentQuestIndex;
                    const isUnlocked = index === 0 || completedLevels.includes(quests[index - 1]?.id) || isCleared;
                    const isCapstone = quest.isCapstone || index >= 100;

                    return (
                      <button
                        key={quest.id}
                        disabled={!isUnlocked}
                        onClick={() => handleSelectLevel(index)}
                        className={`w-full flex items-center justify-between rounded-lg border px-3 py-1.5 text-xs transition ${isCurrent
                            ? isCapstone
                              ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-300 font-bold'
                              : 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300 font-bold'
                            : isCleared
                              ? isCapstone
                                ? 'border-cyan-500/30 bg-cyan-950/20 text-slate-200 hover:border-cyan-400'
                                : 'border-emerald-500/30 bg-emerald-950/20 text-slate-200 hover:border-emerald-400'
                              : isUnlocked
                                ? 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-600'
                                : 'border-slate-900 bg-slate-950/40 text-slate-600 cursor-not-allowed'
                          }`}
                      >
                        <span className="truncate flex items-center gap-2">
                          <span>{quest.icon || (isCapstone ? '🌌' : '🐍')}</span>
                          <span>{index + 1}. {quest.title}</span>
                        </span>
                        <span>
                          {isCleared ? '⭐ Mastered' : isCurrent ? '● Active' : isUnlocked ? 'Ready' : '🔒'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}