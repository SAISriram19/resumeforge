# ResumeForge

AI-powered resume builder with RAG-based tailoring for job applications.

## Features

- 🔐 Firebase Authentication (Email/Password + Google OAuth)
- 📝 Profile Builder (Summary, Skills, Education, Experience)
- 🤖 AI-Powered Resume Generation using Google Gemini
- 🎯 RAG-based Job Description Matching
- 📄 PDF Export
- 🎨 Modern Black Minimalist UI
- ✨ Smooth Animations with Framer Motion

## Tech Stack

- **Frontend**: React + Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js + Express
- **Auth**: Firebase
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini API
- **Export**: jsPDF

## Getting Started

See [START.md](START.md) for quick setup instructions or [SETUP.md](SETUP.md) for detailed configuration.

### Prerequisites

- Node.js (v16+)
- Supabase account
- Firebase project (pre-configured)
- Google Gemini API key

### Quick Start

1. Setup Supabase database using `supabase_schema.sql`
2. Configure environment variables (see `.env.example` files in client/ and server/)
3. Install dependencies and run:

```bash
# Using the start script
start-dev.bat

# Or manually:
# Terminal 1
cd server && npm install && npm start

# Terminal 2
cd client && npm install && npm run dev
```

## Environment Variables

### Client (`client/.env`)
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Server (`server/.env`)
```
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
PORT=3001
```

## Deployment

### Frontend on Vercel

1. **Push to GitHub** (this repo)
2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" → Import from GitHub
   - Select this repository
3. **Configure Project**:
   - Framework Preset: `Vite`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Add Environment Variables** (from `client/.env`):
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```
5. **Deploy** → Your app will be live at `your-app.vercel.app`

### Backend on Railway/Render

**Option 1: Railway**
1. Go to [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Select this repo
4. **Settings**:
   - Root Directory: `server`
   - Start Command: `npm start`
5. **Add Environment Variables** (from `server/.env`):
   ```
   GEMINI_API_KEY=your_gemini_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_KEY=your_service_key
   PORT=3001
   ```
6. Deploy → Copy the backend URL

**Option 2: Render**
1. Go to [render.com](https://render.com)
2. "New +" → "Web Service"
3. Connect GitHub repo
4. **Settings**:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables from `server/.env`
6. Deploy → Copy the backend URL

### Connect Frontend to Backend
Update your frontend API calls to use your deployed backend URL instead of `http://localhost:3001`

## License

MIT
