# To See Welcome Screen Again

The welcome screen was hidden because localStorage remembered you've seen it.

## Quick Fix - Clear localStorage:

**Option 1: Use Browser Console**
1. Press F12 to open Developer Tools
2. Go to "Console" tab
3. Type: `localStorage.clear()`
4. Press Enter
5. Refresh page (Ctrl+R or F5)

**Option 2: Clear through Application Tab**
1. Press F12 to open Developer Tools
2. Go to "Application" tab
3. Click "Local Storage" in left sidebar
4. Click on your site URL
5. Right-click and select "Clear"
6. Refresh page

**Option 3: Logout and Login Again**
Just logout and login - it will show welcome screen for new session.

---

The welcome flow is:
1. Welcome screen with floating resume cards
2. Click "Get Started" → Choice screen
3. Choose "Start Fresh" or "Upload Resume"
4. If "Start Fresh" → Step-by-step onboarding with animated sketches
5. Complete steps → Profile Builder
