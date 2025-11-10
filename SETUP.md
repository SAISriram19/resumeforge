# ResumeForge - Setup Instructions

## Prerequisites
- Node.js installed
- Supabase account (https://supabase.com)
- Firebase project already configured (included)
- Gemini API key (included)

## 1. Supabase Setup

### Create Supabase Tables
1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `supabase_schema.sql` file in the root directory

### Get Credentials
1. Go to Project Settings > API
2. Copy:
   - Project URL (SUPABASE_URL)
   - anon/public key (VITE_SUPABASE_ANON_KEY for client)
   - service_role key (SUPABASE_SERVICE_KEY for server)

## 2. Environment Variables

### Client (.env in /client folder)
Update `client/.env`:
```
VITE_SUPABASE_URL=your_actual_supabase_url
VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
```

### Server (.env in /server folder)
Update `server/.env`:
```
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_actual_supabase_url
SUPABASE_SERVICE_KEY=your_actual_supabase_service_key
PORT=3001
```

## 3. Run the Application

### Terminal 1 - Start Backend Server
```bash
cd server
npm start
```
Server will run on http://localhost:3001

### Terminal 2 - Start Frontend Client
```bash
cd client
npm run dev
```
Client will run on http://localhost:5173 (or check terminal output)

## 4. Using the App

1. **Sign Up**: Go to /signup and create an account (email/password or Google)
2. **Build Profile**: 
   - Add professional summary
   - Add global skills
   - Add education entries
   - Add experiences (jobs, internships, etc.)
3. **Generate Resume**:
   - Switch to "Generate Resume" tab
   - Paste a job description
   - Click "Parse Job Description"
   - Click "Generate Tailored Resume"
   - View and export as PDF

## Features
- ✅ Firebase Authentication (Email/Password + Google OAuth)
- ✅ Profile Builder with Summary, Skills, Education, Experience
- ✅ RAG-powered resume generation using Gemini
- ✅ Job description parsing
- ✅ Tailored resume generation based on JD requirements
- ✅ PDF export
- ✅ Minimalist black UI theme
- ✅ Smooth Framer Motion transitions
- ✅ Previous resumes history

## Tech Stack
- **Frontend**: React + Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js + Express
- **Auth**: Firebase
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini API (RAG + Generation)
- **Export**: jsPDF

## Troubleshooting
- If client can't connect to server, ensure server is running on port 3001
- If Supabase errors occur, verify your credentials in .env files
- If Firebase auth fails, check Firebase console for project configuration
- For Gemini API errors, verify the API key is correct
