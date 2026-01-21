-- PPM Audio Recording System - Database Schema
-- Run this SQL in your Supabase SQL Editor

-- 1. Create recordings table
CREATE TABLE IF NOT EXISTS recordings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  speaker VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  kelas VARCHAR(20) NOT NULL DEFAULT 'cepatan', -- 'cepatan' or 'lambatan'
  mangkulan VARCHAR(20) NOT NULL DEFAULT 'quran', -- 'quran' or 'hadits'
  description TEXT,
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size BIGINT,
  duration VARCHAR(20),
  play_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- If table already exists, update columns
ALTER TABLE recordings ADD COLUMN IF NOT EXISTS kelas VARCHAR(20) DEFAULT 'cepatan';
ALTER TABLE recordings ADD COLUMN IF NOT EXISTS mangkulan VARCHAR(20) DEFAULT 'quran';

-- Remove category column (no longer used)
ALTER TABLE recordings DROP COLUMN IF EXISTS category;

-- 2. Enable Row Level Security
ALTER TABLE recordings ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for public access (development)
-- Allow anyone to read recordings
CREATE POLICY "Allow public read" ON recordings 
  FOR SELECT USING (true);

-- Allow anyone to insert recordings
CREATE POLICY "Allow public insert" ON recordings 
  FOR INSERT WITH CHECK (true);

-- Allow anyone to update recordings
CREATE POLICY "Allow public update" ON recordings 
  FOR UPDATE USING (true);

-- Allow anyone to delete recordings
CREATE POLICY "Allow public delete" ON recordings 
  FOR DELETE USING (true);

-- 4. Create index for better query performance
CREATE INDEX idx_recordings_is_active ON recordings(is_active);
CREATE INDEX idx_recordings_created_at ON recordings(created_at DESC);

-- ============================================
-- STORAGE BUCKET SETUP
-- ============================================
-- Go to Storage in Supabase Dashboard and:
-- 1. Create a new bucket named "recordings"
-- 2. Make it PUBLIC
-- 3. Set max file size to 50MB
-- 4. Add policy to allow public uploads:
--
-- CREATE POLICY "Allow public upload" ON storage.objects
--   FOR INSERT WITH CHECK (bucket_id = 'recordings');
--
-- CREATE POLICY "Allow public read" ON storage.objects
--   FOR SELECT USING (bucket_id = 'recordings');
--
-- CREATE POLICY "Allow public delete" ON storage.objects
--   FOR DELETE USING (bucket_id = 'recordings');
