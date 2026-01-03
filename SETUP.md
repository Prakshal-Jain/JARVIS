# Quick Setup Guide for Supabase Integration

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in project details:
   - Name: `ai-wearables-waitlist` (or any name you prefer)
   - Database Password: Create a strong password (save this!)
   - Region: Choose closest to your users
4. Click "Create new project" and wait for setup to complete (~2 minutes)

## Step 2: Create Waitlist Table

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy and paste the entire contents of `supabase/migrations/001_create_waitlist_table.sql`
4. Click **Run** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

## Step 3: Get Your API Credentials

1. In Supabase dashboard, go to **Settings** (gear icon) > **API**
2. You'll see two values you need:
   - **Project URL** - Copy this (starts with `https://`)
   - **anon/public** key - Copy the long key under "Project API keys" section

## Step 4: Configure Environment Variables

### For Local Development:

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual values from Step 3.

### For GitHub Pages Deployment:

1. Go to your GitHub repository
2. Click **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Add two secrets:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`, Value: (your project URL)
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`, Value: (your anon key)

## Step 5: Test Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and try submitting the waitlist form. Check your Supabase dashboard:
- Go to **Table Editor** > **waitlist** to see submitted entries

## Step 6: Deploy to GitHub Pages

1. Commit and push your changes to the `main` branch
2. The GitHub Actions workflow will automatically build and deploy
3. Your site will be available at: `https://your-username.github.io/ai-wearables-waitlist/`

## Verify Everything Works

After deployment, test the form on your live site. You should see entries appearing in your Supabase `waitlist` table in real-time.

## Troubleshooting

- **Form not saving?** Check browser console for errors and verify environment variables are set correctly
- **Duplicate email error?** This is expected - the database prevents duplicate emails
- **Build fails on GitHub?** Make sure secrets are set correctly in repository settings

