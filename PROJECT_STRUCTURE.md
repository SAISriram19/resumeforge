# ResumeForge - Project Structure

```
resume/
│
├── client/                          # Frontend React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx       # Login page with email/Google auth
│   │   │   │   └── Signup.jsx      # Signup page
│   │   │   └── Dashboard/
│   │   │       ├── Dashboard.jsx   # Main dashboard with tabs
│   │   │       ├── ProfileBuilder.jsx  # Profile management UI
│   │   │       └── ResumeGenerator.jsx # JD parsing & resume generation
│   │   ├── config/
│   │   │   ├── firebase.js         # Firebase auth config
│   │   │   └── supabase.js         # Supabase client config
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx     # Auth state management
│   │   ├── App.jsx                 # Main app with routing
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles + Tailwind
│   ├── .env                        # Supabase credentials (client)
│   ├── tailwind.config.js          # Tailwind config (black theme)
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Backend Express API
│   ├── config/
│   │   ├── gemini.js               # Gemini API config
│   │   └── supabase.js             # Supabase client (server)
│   ├── routes/
│   │   ├── profile.js              # Profile CRUD endpoints
│   │   └── gemini.js               # JD parsing & resume generation
│   ├── index.js                    # Express server entry
│   ├── .env                        # API keys & Supabase credentials
│   └── package.json
│
├── .env                            # Root env (Gemini + Supabase URLs)
├── supabase_schema.sql             # Database schema (run in Supabase)
├── firbase.js                      # Original Firebase config reference
├── SETUP.md                        # Setup instructions
└── PROJECT_STRUCTURE.md            # This file

```

## Key Files Explained

### Frontend
- **Login/Signup**: Firebase auth with email/password + Google OAuth
- **Dashboard**: Main UI with tabs (Profile Builder & Resume Generator)
- **ProfileBuilder**: Forms for Summary, Skills, Education, Experience with modals
- **ResumeGenerator**: Upload JD → Parse → Generate → Export PDF
- **AuthContext**: Global auth state (currentUser, login, logout)

### Backend
- **profile.js routes**: CRUD for profiles, skills, education, experiences
- **gemini.js routes**: 
  - `/parse-jd`: Extract requirements from job description
  - `/generate-resume`: RAG-based tailored resume generation
  - `/resumes/:userId`: Get user's previous resumes
- **gemini.js config**: Gemini model setup + embeddings
- **supabase.js config**: Database client

### Database (Supabase)
- **users**: Firebase UID + email
- **profiles**: User profile with summary
- **skills**: Global skills list
- **education**: Education entries
- **experiences**: Jobs, internships, projects, etc.
- **resumes**: Generated resumes with JD content

## API Endpoints

### Profile
- `POST /api/profile/create` - Create profile
- `GET /api/profile/:userId` - Get full profile
- `PUT /api/profile/update` - Update summary
- `POST /api/profile/skills/add` - Add skill
- `DELETE /api/profile/skills/:skillId` - Delete skill
- `POST /api/profile/education/add` - Add education
- `PUT /api/profile/education/:educationId` - Update education
- `DELETE /api/profile/education/:educationId` - Delete education
- `POST /api/profile/experience/add` - Add experience
- `PUT /api/profile/experience/:experienceId` - Update experience
- `DELETE /api/profile/experience/:experienceId` - Delete experience

### Gemini/Resume
- `POST /api/gemini/parse-jd` - Parse job description
- `POST /api/gemini/generate-resume` - Generate tailored resume (RAG)
- `GET /api/gemini/resumes/:userId` - Get user's resumes

## RAG Implementation
1. **Embed JD**: Convert job description to vector using Gemini embeddings
2. **Embed Experiences**: Convert each experience to vector
3. **Cosine Similarity**: Find top 5 most relevant experiences
4. **Generate**: Pass relevant experiences + full profile + JD to Gemini for tailored resume

## UI Theme
- **Background**: Black (#000000)
- **Text**: White (#FFFFFF)
- **Accents**: Dark gray (#333333, #1a1a1a)
- **Transitions**: 0.3s ease on all elements
- **Background Effect**: Subtle radial gradients (2-3% opacity)
