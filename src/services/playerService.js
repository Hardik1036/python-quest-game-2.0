import { supabase } from '../lib/supabase';

const LOCAL_STORAGE_KEY = 'python_quest_save_data';
const ACTIVE_SESSION_KEY = 'py_quest_active_session';
const REGISTERED_USERS_KEY = 'py_quest_registered_users_registry';

/**
 * Get active player session credentials from local storage
 */
export function getActiveSession() {
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.playerName && parsed.dob) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not parse active session:', e);
  }
  return null;
}

/**
 * Store active player session
 */
export function setActiveSession(name, dob) {
  const session = {
    playerName: (name || '').trim(),
    dob: (dob || '').trim()
  };
  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
  return session;
}

/**
 * Clear active session on logout
 */
export function clearActiveSession() {
  localStorage.removeItem(ACTIVE_SESSION_KEY);
}

/**
 * Generate a unique player composite key from Name + DOB
 */
function getPlayerKey(name, dob) {
  const cleanName = (name || '').trim().toLowerCase();
  const cleanDob = (dob || '').trim();
  return cleanDob ? `${cleanName}_${cleanDob}` : cleanName;
}

/**
 * Get local registry of registered players (name -> dob)
 */
function getLocalRegistry() {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

/**
 * Save to local registry
 */
function updateLocalRegistry(name, dob) {
  try {
    const reg = getLocalRegistry();
    reg[name.trim().toLowerCase()] = (dob || '').trim();
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(reg));
  } catch (e) {
    // ignore
  }
}

/**
 * Strict Verification and Registration:
 * Checks either `profiles` or `player_progress` table.
 */
export async function verifyOrRegisterPlayer(playerName, dob) {
  const name = (playerName || '').trim();
  const cleanDob = (dob || '').trim();

  if (!name) {
    return { success: false, error: 'Please enter a valid Player Name.' };
  }
  if (!cleanDob) {
    return { success: false, error: 'Please enter your Date of Birth (DOB).' };
  }

  // 1. Check local registry first
  const localRegistry = getLocalRegistry();
  const registeredDob = localRegistry[name.toLowerCase()];
  if (registeredDob && registeredDob !== cleanDob) {
    return {
      success: false,
      error: `The player name "${name}" is already taken by another player with a different Date of Birth. Please choose a unique name or enter your registered DOB.`
    };
  }

  // 2. Check Supabase cloud database
  if (supabase) {
    try {
      // Check in profiles table (if user created a profiles table)
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('player_name', name)
        .maybeSingle();

      if (profileData) {
        const pDob = (profileData.dob || '').trim();
        if (pDob && pDob !== cleanDob) {
          return {
            success: false,
            error: `The player name "${name}" is already registered in Profiles with a different DOB. Please choose a unique name.`
          };
        }
      }

      // Check in player_progress table
      const { data: progData, error } = await supabase
        .from('player_progress')
        .select('*')
        .eq('player_name', name)
        .maybeSingle();

      if (!error && progData) {
        const dbDob = (progData.dob || '').trim();
        if (dbDob && dbDob !== cleanDob) {
          return {
            success: false,
            error: `The player name "${name}" is already taken by another adventurer with a different Date of Birth. Please choose a unique name.`
          };
        }

        updateLocalRegistry(name, cleanDob);
        const parsedProgress = {
          playerName: progData.player_name,
          dob: cleanDob,
          currentLevelIndex: progData.current_level_index ?? 0,
          completedLevels: Array.isArray(progData.completed_levels) ? progData.completed_levels : [],
          totalXp: progData.total_xp ?? 0,
          totalStars: progData.total_stars ?? 0,
          lastCode: progData.last_code || '',
          updatedAt: progData.updated_at
        };

        return {
          success: true,
          isNew: false,
          progress: parsedProgress
        };
      }
    } catch (err) {
      console.warn('Supabase verification fallback to local:', err.message);
    }
  }

  // 3. Player is new: register credentials
  updateLocalRegistry(name, cleanDob);

  // If profiles table exists, insert profile
  if (supabase) {
    try {
      await supabase
        .from('profiles')
        .upsert({ player_name: name, dob: cleanDob }, { onConflict: 'player_name,dob' });
    } catch (e) {
      // ignore if profiles table is not created
    }
  }

  const playerKey = getPlayerKey(name, cleanDob);
  let localData = null;
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${playerKey}`);
    if (raw) localData = JSON.parse(raw);
  } catch (e) {
    // ignore
  }

  return {
    success: true,
    isNew: !localData,
    progress: localData || null
  };
}

/**
 * Load player progress from Supabase by Name + DOB (or fallback to LocalStorage)
 */
export async function loadPlayerProgress(playerName, dob) {
  const name = (playerName || '').trim();
  const cleanDob = (dob || '').trim();
  if (!name) return null;

  const playerKey = getPlayerKey(name, cleanDob);
  let localData = null;

  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${playerKey}`);
    if (raw) {
      localData = JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Could not read local save cache:', e);
  }

  if (!supabase) {
    return localData || null;
  }

  try {
    let query = supabase
      .from('player_progress')
      .select('*')
      .eq('player_name', name);

    if (cleanDob) {
      query = query.eq('dob', cleanDob);
    }

    const { data, error } = await query.maybeSingle();

    if (!error && data) {
      const parsedData = {
        playerName: data.player_name,
        dob: data.dob || cleanDob,
        currentLevelIndex: data.current_level_index ?? 0,
        completedLevels: Array.isArray(data.completed_levels) ? data.completed_levels : [],
        totalXp: data.total_xp ?? 0,
        totalStars: data.total_stars ?? 0,
        lastCode: data.last_code || '',
        updatedAt: data.updated_at
      };

      try {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_${playerKey}`, JSON.stringify(parsedData));
      } catch (err) {
        // ignore
      }

      return parsedData;
    }
  } catch (err) {
    console.warn('Supabase load attempt failed, using local save:', err.message);
  }

  return localData || null;
}

/**
 * Save player progression to Supabase with Name + DOB
 */
export async function savePlayerProgress({
  playerName,
  dob,
  currentLevelIndex,
  completedLevels,
  totalXp,
  totalStars,
  lastCode
}) {
  const name = (playerName || '').trim();
  const cleanDob = (dob || '').trim();
  if (!name) return { success: false, error: 'No player name' };

  updateLocalRegistry(name, cleanDob);
  const playerKey = getPlayerKey(name, cleanDob);

  const payload = {
    playerName: name,
    dob: cleanDob,
    currentLevelIndex: Number(currentLevelIndex) || 0,
    completedLevels: Array.isArray(completedLevels) ? completedLevels : [],
    totalXp: Number(totalXp) || 0,
    totalStars: Number(totalStars) || 0,
    lastCode: lastCode || '',
    updatedAt: new Date().toISOString()
  };

  // Immediate local cache
  try {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_${playerKey}`, JSON.stringify(payload));
  } catch (e) {
    console.warn('Could not write to local storage:', e);
  }

  if (!supabase) {
    return { success: true, isCloud: false };
  }

  try {
    // Optionally upsert into profiles if profiles table exists
    try {
      await supabase
        .from('profiles')
        .upsert({ player_name: name, dob: cleanDob }, { onConflict: 'player_name,dob' });
    } catch (e) {
      // ignore
    }

    const { data, error } = await supabase
      .from('player_progress')
      .upsert(
        {
          player_name: name,
          dob: cleanDob,
          current_level_index: payload.currentLevelIndex,
          completed_levels: payload.completedLevels,
          total_xp: payload.totalXp,
          total_stars: payload.totalStars,
          last_code: payload.lastCode,
          updated_at: payload.updatedAt
        },
        { onConflict: 'player_name,dob' }
      )
      .select();

    if (error) {
      // Fallback if composite constraint is not present
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('player_progress')
        .upsert(
          {
            player_name: name,
            dob: cleanDob,
            current_level_index: payload.currentLevelIndex,
            completed_levels: payload.completedLevels,
            total_xp: payload.totalXp,
            total_stars: payload.totalStars,
            last_code: payload.lastCode,
            updated_at: payload.updatedAt
          },
          { onConflict: 'player_name' }
        )
        .select();

      if (fallbackError) {
        console.warn('Supabase save notice:', fallbackError.message);
        return { success: true, isCloud: false, error: fallbackError.message };
      }
      return { success: true, isCloud: true, data: fallbackData };
    }

    return { success: true, isCloud: true, data };
  } catch (err) {
    console.warn('Supabase save error:', err.message);
    return { success: true, isCloud: false, error: err.message };
  }
}

/**
 * Fetch top players for the Global Leaderboard from Supabase
 */
export async function fetchCloudLeaderboard() {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('player_progress')
      .select('player_name, dob, total_xp, total_stars, completed_levels, current_level_index, updated_at')
      .order('total_xp', { ascending: false })
      .limit(50);

    if (!error && Array.isArray(data) && data.length > 0) {
      return data.map((row, idx) => ({
        id: `cloud_${row.player_name}_${idx}`,
        name: row.player_name,
        dob: row.dob,
        title:
          (row.total_xp || 0) >= 15000
            ? 'Grandmaster Architect'
            : (row.total_xp || 0) >= 10000
            ? 'Diamond Engineer'
            : (row.total_xp || 0) >= 5000
            ? 'Gold Developer'
            : 'Adventurer',
        xp: row.total_xp || 0,
        stars:
          row.total_stars ||
          (Array.isArray(row.completed_levels) ? row.completed_levels.length * 3 : 0),
        quests: Array.isArray(row.completed_levels) ? row.completed_levels.length : 0,
        country: '☁️',
        avatar: '⚡',
        isCloudUser: true
      }));
    }
  } catch (err) {
    console.warn('Cloud leaderboard fetch fallback:', err.message);
  }

  return [];
}
