# AI Wearables Waitlist

A Next.js waitlist application for Jarvis - The OS for AI Wearables, deployed on GitHub Pages with Supabase backend integration.

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [Supabase](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Run the migration script located at `supabase/migrations/001_create_waitlist_table.sql` to create the waitlist table
4. Go to **Settings** > **API** to get your credentials:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### 2. Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

### 3. GitHub Pages Deployment

1. Go to your repository **Settings** > **Secrets and variables** > **Actions**
2. Add the following secrets:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

3. The GitHub Actions workflow will automatically build and deploy to GitHub Pages on push to `main` branch.

## Database Schema

The waitlist table stores:
- `id` (UUID) - Primary key
- `email` (TEXT) - Unique email address
- `is_enterprise` (BOOLEAN) - Enterprise user flag
- `is_developer` (BOOLEAN) - Developer user flag
- `is_just_exploring` (BOOLEAN) - Exploring user flag
- `created_at` (TIMESTAMP) - Entry creation timestamp

## Features

- Client-side form validation
- Error handling for duplicate emails
- Responsive design
- Static site generation for GitHub Pages
- Secure Supabase integration with Row Level Security (RLS)

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Supabase** - Backend database
- **Tailwind CSS** - Styling
- **GitHub Pages** - Hosting


