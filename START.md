# Quick Start Guide

## ⚠️ IMPORTANT: Before Running

### 1. Setup Supabase (REQUIRED)
1. Go to https://supabase.com and create a free account
2. Create a new project
3. Once created, go to SQL Editor and run the contents of `supabase_schema.sql`
4. Go to Project Settings > API and copy:
   - Project URL
   - anon/public key
   - service_role key

### 2. Update Environment Variables

**In `client/.env`:**
```env
VITE_SUPABASE_URL=paste_your_project_url_here
VITE_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

**In `server/.env`:**
```env
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=paste_your_project_url_here
SUPABASE_SERVICE_KEY=paste_your_service_role_key_here
PORT=3001
```

## 🚀 Running the App

### Step 1: Start the Backend (Terminal 1)
```bash
cd server
npm start
```
✅ You should see: "Server running on port 3001"

### Step 2: Start the Frontend (Terminal 2)
```bash
cd client
npm run dev
```
✅ You should see a local URL (usually http://localhost:5173)

### Step 3: Open Browser
Open the URL shown in Terminal 2 (e.g., http://localhost:5173)

## 📝 First Time Usage

1. **Sign Up**: Click "Sign up" and create an account
   - Use email/password OR
   - Click "Continue with Google"

2. **Build Your Profile**:
   - Add a professional summary (3-4 sentences)
   - Add your skills
   - Add education entries
   - Add experiences (jobs, internships, projects)

3. **Generate Resume**:
   - Switch to "Generate Resume" tab
   - Paste a job description
   - Click "Parse Job Description"
   - Click "Generate Tailored Resume"
   - View the generated resume
   - Click "Export as PDF" to download

## 🔍 Troubleshooting

### Server won't start
- Check that port 3001 is not in use
- Verify Supabase credentials in `server/.env`

### Client shows connection errors
- Make sure server is running on port 3001
- Check browser console for specific errors

### Auth not working
- Firebase is already configured
- Try clearing browser cache/cookies

### Supabase errors
- Verify you ran `supabase_schema.sql` in Supabase SQL Editor
- Double-check credentials match between Supabase dashboard and .env files

## 📦 What's Included

✅ Authentication (Email + Google)
✅ Profile Builder
✅ RAG-powered Resume Generation
✅ Job Description Parsing
✅ PDF Export
✅ Black Minimalist UI
✅ Smooth Animations

## 🎯 Next Steps After MVP

- Add resume upload & parsing feature
- Add ability to edit generated resumes
- Improve PDF export styling
- Add more resume templates
- Implement resume version history
