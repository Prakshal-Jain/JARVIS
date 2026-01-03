-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_enterprise BOOLEAN DEFAULT FALSE NOT NULL,
  is_developer BOOLEAN DEFAULT FALSE NOT NULL,
  is_just_exploring BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for public waitlist signup)
-- This allows anonymous users to insert, but you may want to restrict this further
CREATE POLICY "Allow public insert on waitlist"
  ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Optionally, create a policy to allow authenticated users to read
-- You may want to restrict this to admin users only
-- Uncomment and modify as needed:
-- CREATE POLICY "Allow authenticated read on waitlist"
--   ON waitlist
--   FOR SELECT
--   TO authenticated
--   USING (true);

