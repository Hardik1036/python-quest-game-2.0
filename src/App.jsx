import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import { supabase } from './lib/supabase';

const INITIAL_QUEST = {
  level: 1,
  title: "Level 1: The First Words",
  topic: "Printing & Strings",
  description: "Welcome to Python Quest! Write a line of code that prints `Hello, World!` to start your journey.",
  starterCode: `# Write your print statement below\n`,
  expectedOutput: "Hello, World!",
  hint: "Use print('Hello, World!')"
};

// Highlights ONLY backticked words (e.g. `name` or `print()`)
const renderTaskDescription = (text) => {
  if (!text) return null;
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <span key={index} className="text-lg font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-mono inline-block my-0.5">
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
};

export default function App() {
  const [pyodide, setPyodide] = useState(null);
  const [isLoadingEngine, setIsLoadingEngine] = useState(true);
  const [xp, setXp] = useState(100);

  // Gameplay & Trackers
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuest, setCurrentQuest] = useState(INITIAL_QUEST);
  const [userCode, setUserCode] = useState(INITIAL_QUEST.starterCode);
  const [status, setStatus] = useState('');
  const [unlockedHints, setUnlockedHints] = useState([]);
  const [isLevelCleared, setIsLevelCleared] = useState(false);
  const [isGeneratingNext, setIsGeneratingNext] = useState(false);

  // Performance Trackers
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [stars, setStars] = useState(0);

  // Pop-up AI Helper State
  const [helperFeedback, setHelperFeedback] = useState(null);
  const [isHelperOpen, setIsHelperOpen] = useState(false);

  // Player Registration State
  const [username, setUsername] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  // Timer Ref
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Pyodide WASM Engine Setup
  useEffect(() => {
    async function initPyodide() {
      try {
        if (window.loadPyodide) {
          const py = await window.loadPyodide();
          setPyodide(py);
          setIsLoadingEngine(false);
        } else {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
          script.onload = async () => {
            const py = await window.loadPyodide();
            setPyodide(py);
            setIsLoadingEngine(false);
          };
          document.body.appendChild(script);
        }
      } catch (e) {
        console.error("Pyodide loading error:", e);
      }
    }
    initPyodide();
  }, []);

  // Keyboard Auto-Indentation & Tab Handling
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = userCode.substring(0, start) + '    ' + userCode.substring(end);
      setUserCode(newCode);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }

    if (e.key === 'Enter') {
      const start = e.target.selectionStart;
      const lines = userCode.substring(0, start).split('\n');
      const currentLine = lines[lines.length - 1];
      const currentIndent = currentLine.match(/^\s*/)[0];
      const endsWithColon = currentLine.trim().endsWith(':');
      const indentToApply = currentIndent + (endsWithColon ? '    ' : '');

      if (indentToApply.length > 0) {
        e.preventDefault();
        const newCode = userCode.substring(0, start) + '\n' + indentToApply + userCode.substring(start);
        setUserCode(newCode);
        setTimeout(() => {
          e.target.selectionStart = e.target.selectionEnd = start + 1 + indentToApply.length;
        }, 0);
      }
    }
  };

  // ----------------------------------------------------
  // API KEY 2: AI HELPER AGENT (Pop-Up Feedback)
  // ----------------------------------------------------
  const triggerAiHelper = async (errorMessage) => {
    try {
      const keyHelper = import.meta.env.VITE_GEMINI_API_KEY_HELPER || import.meta.env.VITE_GEMINI_API_KEY;
      if (!keyHelper) return;

      const prompt = `Student Task: "${currentQuest.description}"
      Student Code:
      ${userCode}
      Execution Error/Output:
      ${errorMessage}

      Act as an encouraging Python Tutor Helper. Explain in 2 concise bullet points:
      1. What went wrong in simple terms.
      2. The exact conceptual fix without giving away the direct full code answer.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${keyHelper}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );

      const data = await response.json();
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        setHelperFeedback(data.candidates[0].content.parts[0].text);
        setIsHelperOpen(true);
      }
    } catch (e) {
      console.error("Helper API Error:", e);
    }
  };

  // Run Code Execution Engine
  const runCode = async () => {
    if (!pyodide) return;
    setStatus('⏳ Running code...');
    const currentAttempt = attempts + 1;
    setAttempts(currentAttempt);

    try {
      await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
      `);

      await pyodide.runPythonAsync(userCode);
      const printedOutput = await pyodide.runPythonAsync(`sys.stdout.getvalue().strip()`);

      if (printedOutput === currentQuest.expectedOutput) {
        setIsTimerRunning(false);
        setIsLevelCleared(true);

        // Calculate Star Rating based on speed (<45s = 3 stars) and 1st attempt
        let earnedStars = 1;
        if (currentAttempt === 1 && timer <= 45) earnedStars = 3;
        else if (currentAttempt <= 2 && timer <= 90) earnedStars = 2;
        setStars(earnedStars);

        const baseReward = 50;
        const totalAwardedXp = baseReward + (earnedStars * 10);
        setXp((prev) => prev + totalAwardedXp);

        setStatus(`🎉 Level Cleared! Stars: ${'⭐'.repeat(earnedStars)} (+${totalAwardedXp} XP)`);
        saveProgressToDb(currentLevel, xp + totalAwardedXp);
      } else {
        // XP Penalty on multiple failed attempts
        if (currentAttempt > 2) {
          setXp((prev) => Math.max(0, prev - 5));
        }
        const mismatchError = `Output mismatch!\nExpected: "${currentQuest.expectedOutput}"\nGot: "${printedOutput}"`;
        setStatus(`❌ ${mismatchError}`);
        triggerAiHelper(mismatchError);
      }
    } catch (err) {
      if (currentAttempt > 2) {
        setXp((prev) => Math.max(0, prev - 5));
      }
      setStatus(`⚠️ Python Syntax Error on line ${err.lineNumber || 'code block'}`);
      triggerAiHelper(err.message);
    }
  };

  // ----------------------------------------------------
  // API KEY 1 & 3: TASK GENERATOR & REAL-WORLD CAPSTONE AGENTS
  // ----------------------------------------------------
  const generateNextQuest = async () => {
    setIsGeneratingNext(true);
    setStatus('🤖 Crafting your next challenge...');
    setIsLevelCleared(false);
    setIsHelperOpen(false);
    setUnlockedHints([]);
    setAttempts(0);
    setTimer(0);
    setIsTimerRunning(true);

    const nextLevelNum = currentLevel + 1;
    const isCapstone = nextLevelNum >= 5; // Level 5+ triggers Capstone Real-World API

    // Choose key based on level progression
    const apiKey = isCapstone
      ? (import.meta.env.VITE_GEMINI_API_KEY_CAPSTONE || import.meta.env.VITE_GEMINI_API_KEY)
      : (import.meta.env.VITE_GEMINI_API_KEY_TEACHER || import.meta.env.VITE_GEMINI_API_KEY);

    const prompt = isCapstone
      ? `You are an Advanced Software Engineer. Generate Level ${nextLevelNum}: A REAL-WORLD INDUSTRY PROBLEM.
         Make sure the description clearly states the EXACT value/format required.
         Return ONLY raw JSON:
         {
           "level": ${nextLevelNum},
           "title": "Level ${nextLevelNum}: Capstone Challenge",
           "topic": "Real-World Engineering",
           "description": "Clear real-world prompt with explicit instructions. Wrap code keywords in backticks like \`user_name\`.",
           "starterCode": "# Real-world boilerplate code\\n",
           "expectedOutput": "exact_expected_stdout_string",
           "hint": "Engineering guidance hint"
         }`
      : `You are a Strict, Adaptive Human Python Teacher.
         
         PLAYER PERFORMANCE REPORT:
         - Current Level Completed: ${currentLevel}
         - Topic Just Tested: "${currentQuest.topic}"
         - Total Failed Attempts Before Passing: ${attempts}

         TEACHING RULES:
         1. IF attempts > 1 (the student struggled or failed multiple times on level ${currentLevel}):
            - DO NOT jump to a new topic.
            - Generate Level ${nextLevelNum} as a REINFORCEMENT PRACTICE task on the EXACT SAME TOPIC ("${currentQuest.topic}").
            - Give them a fresh, different scenario using the same concepts so they can master it.

         2. IF attempts <= 1 (the student passed easily):
            - Move forward smoothly to the next logical Python concept.

         Return ONLY raw JSON with NO markdown wrapping:
         {
           "level": ${nextLevelNum},
           "title": "Level ${nextLevelNum}: Title Here",
           "topic": "Topic Name",
           "description": "Clear challenge briefing (wrap code keywords in backticks like \`energy\`).",
           "starterCode": "# Starter code\\n",
           "expectedOutput": "exact_expected_stdout_string",
           "hint": "Helpful hint"
         }`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );

      const data = await response.json();
      const rawText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim();
      const nextQuest = JSON.parse(rawText);

      setCurrentLevel(nextLevelNum);
      setCurrentQuest(nextQuest);
      setUserCode(nextQuest.starterCode);
      setStatus(`🎯 Level ${nextLevelNum} (${isCapstone ? '🚀 Capstone' : '📖 Guided'}) Ready!`);
    } catch (err) {
      console.error("Task Generator Error:", err);
      const fallbackQuest = {
        level: nextLevelNum,
        title: `Level ${nextLevelNum}: Working with Variables`,
        topic: "Variables",
        description: "Create a variable named 'course' and set it to 'Python', then print 'course'.",
        starterCode: `# Create variable and print it\n`,
        expectedOutput: "Python",
        hint: "Write course = 'Python' and print(course)"
      };
      setCurrentLevel(nextLevelNum);
      setCurrentQuest(fallbackQuest);
      setUserCode(fallbackQuest.starterCode);
      setStatus(`🎯 Level ${nextLevelNum} Ready!`);
    } finally {
      setIsGeneratingNext(false);
    }
  };

  const useHint = () => {
    if (xp < 10 && unlockedHints.length === 0) {
      alert("You need at least 10 XP to unlock a hint!");
      return;
    }
    if (!unlockedHints.includes(currentQuest.hint)) {
      setXp((prev) => Math.max(0, prev - 10));
      setUnlockedHints([...unlockedHints, currentQuest.hint]);
    }
  };

  const saveProgressToDb = async (level, updatedXp) => {
    if (!supabase || !username) return;
    try {
      await supabase.from('profiles').upsert(
        { username: username, total_xp: updatedXp, completed_quests: [level] },
        { onConflict: 'username' }
      );
    } catch (e) {
      console.log('Database sync offline.');
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-950 text-white flex flex-col font-sans overflow-hidden relative">
      {/* Registration Modal Overlay */}
      {!isRegistered && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl text-center">
            <h2 className="text-3xl font-black text-amber-400 mb-2">🐍 PYTHON QUEST</h2>
            <p className="text-slate-300 text-sm mb-6">Enter a player username to save progress & synchronize stats with the database.</p>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (inputUsername.trim()) {
                setUsername(inputUsername.trim());
                setIsRegistered(true);
              }
            }}>
              <input
                type="text"
                placeholder="Enter Username (e.g. ShadowCoder)"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 mb-4 text-center font-mono"
                required
              />
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-3.5 rounded-xl transition text-base"
              >
                Start Quest & Save Progress →
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Header HUD with Player Name */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-black text-amber-400 tracking-wide">🐍 PYTHON QUEST</h1>
          <span className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2.5 py-1 rounded-full font-bold">
            {currentQuest.title}
          </span>
          {currentLevel >= 5 && (
            <span className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2.5 py-1 rounded-full font-black animate-pulse">
              🚀 Capstone Mode
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Active Player Name Badge */}
          {username && (
            <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-slate-400">Player:</span>
              <span className="text-amber-400 font-mono text-sm">{username}</span>
            </div>
          )}

          {/* Live Timer Corner */}
          <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-amber-300 flex items-center gap-1.5">
            ⏱️ {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
          </div>

          <div className="text-xs font-bold text-slate-400">
            Engine: {isLoadingEngine ? <span className="text-amber-400">⏳ Loading...</span> : <span className="text-emerald-400">🟢 Ready</span>}
          </div>

          <div className="bg-slate-800 px-3.5 py-1.5 rounded-lg border border-slate-700 font-extrabold text-emerald-400 text-xs">
            ⚡ {xp} XP
          </div>
        </div>
      </header>

      {/* Main Split Screen */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Panel: Briefing */}
        <div className="bg-slate-900/60 border-r border-slate-800 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Topic: {currentQuest.topic}
              </span>
              <span className="text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded">
                +50 XP
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-100 mb-4">{currentQuest.title}</h2>
            <p className="text-slate-300 text-base leading-relaxed mb-6">
              {renderTaskDescription(currentQuest.description)}
            </p>

            {/* Stars Unlocked Banner */}
            {isLevelCleared && (
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl mb-4 text-center">
                <div className="text-3xl mb-1">{'⭐'.repeat(stars)}</div>
                <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
                  {stars === 3 ? 'Perfect Performance!' : stars === 2 ? 'Great Speed!' : 'Level Cleared!'}
                </div>
              </div>
            )}

            {unlockedHints.length > 0 && (
              <div className="bg-amber-950/30 border border-amber-500/40 p-4 rounded-xl mb-4">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">💡 Unlocked Hint (-10 XP)</h3>
                {unlockedHints.map((hint, idx) => (
                  <p key={idx} className="text-sm text-amber-200/90 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800">
                    {hint}
                  </p>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={useHint}
            disabled={unlockedHints.length > 0}
            className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-amber-400 font-bold py-3 rounded-xl border border-slate-700 text-sm transition"
          >
            {unlockedHints.length > 0 ? '💡 Hint Unlocked' : '💡 Unlock Hint (-10 XP)'}
          </button>
        </div>

        {/* Right Panel: Prism Editor */}
        <div className="bg-slate-950 p-6 flex flex-col justify-between overflow-hidden">
          <div className="flex-1 flex flex-col mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Python Sandbox Editor</span>

            <div className="relative flex-1 w-full rounded-xl border border-slate-800 bg-slate-900 overflow-hidden font-mono text-base">
              <pre
                aria-hidden="true"
                className="absolute inset-0 p-4 pointer-events-none overflow-auto whitespace-pre-wrap break-words leading-relaxed m-0 text-slate-200"
                dangerouslySetInnerHTML={{
                  __html: Prism.highlight(userCode || '', Prism.languages.python, 'python') + '\n'
                }}
              />
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-emerald-400 font-mono text-base focus:outline-none resize-none leading-relaxed"
                spellCheck="false"
              />
            </div>
          </div>

          <div>
            {!isLevelCleared ? (
              <button
                onClick={runCode}
                disabled={isLoadingEngine}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-black py-3.5 rounded-xl transition text-base"
              >
                {isLoadingEngine ? '⏳ Loading Engine...' : '▶ Submit & Run Code'}
              </button>
            ) : (
              <button
                onClick={generateNextQuest}
                disabled={isGeneratingNext}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3.5 rounded-xl transition text-base animate-pulse"
              >
                {isGeneratingNext ? '🤖 Crafting Next Level...' : '✨ Continue to Next Level →'}
              </button>
            )}

            {status && (
              <div className="mt-4 p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono whitespace-pre-wrap">
                {status}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* POP-UP SIDE DRAWER: AI Tutor Helper */}
      {isHelperOpen && (
        <div className="fixed right-6 top-20 w-80 bg-slate-900 border border-amber-500/40 rounded-2xl p-5 shadow-2xl z-50 animate-slide-in">
          <div className="flex justify-between items-center mb-3 border-b border-slate-800 pb-2">
            <h3 className="text-sm font-black text-amber-400 flex items-center gap-2">
              🤖 AI Tutor Helper
            </h3>
            <button
              onClick={() => setIsHelperOpen(false)}
              className="text-slate-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>
          </div>
          <div className="text-xs text-slate-300 font-sans leading-relaxed">
            {helperFeedback && renderTaskDescription(helperFeedback.replace(/\*\*/g, ''))}
          </div>
        </div>
      )}
    </div>
  );
}