const GEMINI_HELPER_KEY =
  import.meta.env.VITE_GEMINI_API_KEY_HELPER ||
  import.meta.env.VITE_GEMINI_API_KEY_TEACHER ||
  import.meta.env.VITE_GEMINI_API_KEY_CAPSTONE;

const GEMINI_CAPSTONE_KEY =
  import.meta.env.VITE_GEMINI_API_KEY_CAPSTONE ||
  import.meta.env.VITE_GEMINI_API_KEY_TEACHER ||
  import.meta.env.VITE_GEMINI_API_KEY_HELPER;

const GEMINI_TEACHER_KEY =
  import.meta.env.VITE_GEMINI_API_KEY_TEACHER ||
  import.meta.env.VITE_GEMINI_API_KEY_CAPSTONE ||
  import.meta.env.VITE_GEMINI_API_KEY_HELPER;

// Models priority list: Gemini 3.1 Flash Lite -> Gemini 2.0 Flash Lite -> Gemini 2.0 Flash -> Gemini 1.5 Flash
const GEMINI_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-2.0-flash-lite-001',
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash',
  'gemini-1.5-flash'
];

/**
 * Low-level caller for Gemini 3.1 Flash Lite API with multi-model fallback cascade
 */
async function callGeminiApi(apiKey, prompt, systemInstruction = '') {
  if (!apiKey) {
    throw new Error('Gemini API key is not configured.');
  }

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1000
    }
  };

  if (systemInstruction) {
    payload.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  let lastError = null;

  for (const model of GEMINI_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const outputText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (outputText) {
          return outputText;
        }
      } else {
        const errText = await response.text();
        lastError = new Error(`Model ${model} returned ${response.status}: ${errText}`);
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('All Gemini API model attempts failed.');
}

/**
 * 1. AI Hint Oracle: Analyze player's current code using Gemini 3.1 Flash Lite
 */
export async function generateGeminiHint({ quest, userCode }) {
  const prompt = `
You are the Wise Python Quest Oracle in a fantasy developer RPG.
The player is currently solving the following coding trial:

[QUEST TITLE]: "${quest.title}"
[REALM / TOPIC]: "${quest.world}" - ${quest.concept}
[OBJECTIVE]: "${quest.description}"
[EXPECTED TERMINAL OUTPUT]:
${quest.expectedOutput}

[PLAYER'S CURRENT CODE]:
\`\`\`python
${userCode || '# (empty)'}
\`\`\`

Give the player a smart, encouraging, and clear pedagogical hint (2-4 sentences).
Point out what logic, syntax, or Python method to look at without giving away the full copy-paste solution directly. Speak as a wise, friendly master wizard of Python code.
`;

  try {
    const text = await callGeminiApi(
      GEMINI_HELPER_KEY,
      prompt,
      'You are the Oracle of Python Quest powered by Gemini 3.1 Flash Lite, providing pedagogical and encouraging hints to coding adventurers.'
    );
    return text.trim();
  } catch (err) {
    console.warn('Gemini 3.1 Flash Lite hint fallback notice:', err.message);
    return `Oracle's Wisdom: Focus on matching the expected output "${quest.expectedOutput}". Check your logic for ${quest.concept} and ensure your print statements match exact casing.`;
  }
}

/**
 * 2. Gemini Capstone Project Generator: Creates real-world Python engineering challenges using Gemini 3.1 Flash Lite
 */
export async function generateGeminiCapstoneProject(stageNumber) {
  const prompt = `
Generate a unique, industry-grade real-world Python Capstone Engineering Challenge for Stage ${stageNumber + 1}.
Topics to choose from: distributed rate limiters, LRU caches, JWT verification, custom JSON serializers, inverted search index, trie autocomplete, token bucket algorithms, mini-blockchain hashing, Prometheus metric parsers, or async task queues.

Respond ONLY with a valid JSON object matching this exact schema (no markdown, no backticks):
{
  "title": "Short Epic Project Title (e.g. Distributed Token Bucket Limiter)",
  "taskName": "Real-World Industrial Name",
  "icon": "Single tech emoji (e.g. ⚡, 🛡️, 🌐, 🛰️, 🧬, 🚀)",
  "concept": "Core Python Concept (e.g. Object-Oriented Cache Architecture)",
  "description": "2-3 sentences explaining the industry purpose and objective",
  "starterCode": "# Python code with function/class signatures and TODOs",
  "expectedOutput": "Exact terminal output string when solved and executed",
  "hint": "Helpful tip for solving this engineering problem",
  "xp": 1500
}
`;

  try {
    const text = await callGeminiApi(
      GEMINI_CAPSTONE_KEY,
      prompt,
      'You are the Lead Systems Architect of Python Quest powered by Gemini 3.1 Flash Lite, designing production-grade real-world challenges. Output strictly raw JSON.'
    );

    const cleanJson = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    return {
      id: stageNumber + 1,
      title: parsed.title || `Capstone Trial Mk ${stageNumber + 1}`,
      taskName: parsed.taskName || parsed.title || 'Production Engineering Trial',
      icon: parsed.icon || '🌌',
      world: 'Realm 11: Capstone Matrix',
      concept: parsed.concept || 'Real-World Python Systems',
      isCapstone: true,
      description: parsed.description || 'Solve this real-world production challenge.',
      starterCode: parsed.starterCode || '# Write your solution\nprint("Production Ready")',
      expectedOutput: parsed.expectedOutput || 'Production Ready',
      hint: parsed.hint || 'Carefully inspect the data structures and class design.',
      xp: Number(parsed.xp) || 1500
    };
  } catch (err) {
    console.warn('Gemini 3.1 Flash Lite Capstone fallback notice:', err.message);
    return null;
  }
}

/**
 * 3. Gemini RPG Task Naming: Creates quest titles and task names using Gemini 3.1 Flash Lite
 */
export async function generateGeminiTaskName({ realm, concept, levelNumber }) {
  const prompt = `
Generate a single creative RPG quest title and a short task name for a Python challenge:
Level Number: ${levelNumber}
Realm: ${realm}
Concept: ${concept}

Respond ONLY with raw JSON:
{
  "title": "Epic RPG Quest Title (e.g. The Cryptic Dictionary of the Citadel)",
  "taskName": "Short Task Objective"
}
`;

  try {
    const text = await callGeminiApi(
      GEMINI_TEACHER_KEY,
      prompt,
      'You are the Python Quest Lore Master powered by Gemini 3.1 Flash Lite. Output raw JSON only.'
    );
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (err) {
    return {
      title: `Trial of ${concept}`,
      taskName: `Master ${concept}`
    };
  }
}
