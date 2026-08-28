-- ==============================================================================
-- PYTHON QUEST ADVENTURE - SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Paste and run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- ==============================================================================
-- 1. PROFILES TABLE (Player Identity & Verification)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  dob TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_player_profile UNIQUE (player_name, dob)
);

-- ==============================================================================
-- 2. PLAYER_PROGRESS TABLE (Levels, Saved Code, Stars & XP)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.player_progress (
  player_name TEXT NOT NULL,
  dob TEXT NOT NULL DEFAULT '',
  current_level_index INTEGER DEFAULT 0,
  completed_levels INTEGER[] DEFAULT '{}',
  total_xp INTEGER DEFAULT 0,
  total_stars INTEGER DEFAULT 0,
  last_code TEXT DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (player_name, dob)
);

-- ==============================================================================
-- 3. INDEXES FOR PERFORMANCE & FAST LOOKUP
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_player_progress_total_xp 
  ON public.player_progress (total_xp DESC);

CREATE INDEX IF NOT EXISTS idx_player_progress_lookup 
  ON public.player_progress (player_name, dob);

CREATE INDEX IF NOT EXISTS idx_profiles_lookup 
  ON public.profiles (player_name, dob);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_progress ENABLE ROW LEVEL SECURITY;

-- Allow public access for game sessions on profiles
DROP POLICY IF EXISTS "Allow public all profiles" ON public.profiles;
CREATE POLICY "Allow public all profiles"
  ON public.profiles
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Allow public access for game sessions on player_progress
DROP POLICY IF EXISTS "Allow public all player_progress" ON public.player_progress;
CREATE POLICY "Allow public all player_progress"
  ON public.player_progress
  FOR ALL
  USING (true)
  WITH CHECK (true);
