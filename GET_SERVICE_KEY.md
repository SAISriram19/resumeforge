# Missing: Supabase Service Key

## You need to get the SERVICE KEY from Supabase:

1. Go to: https://supabase.com/dashboard/project/gyviexlghhgflpoiktml
2. Click "Settings" (gear icon in left sidebar)
3. Click "API" 
4. Scroll down to "Project API keys"
5. Copy the **service_role** key (NOT the anon key)
6. Add it to `server/.env` like this:

```env
SUPABASE_SERVICE_KEY=paste_the_service_role_key_here
```

⚠️ The service_role key is different from the anon key and has admin privileges.
