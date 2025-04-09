# Docs

## Authentication setup

## /app routes
This folder is used by Next for the App router, which structures the URL routes which users have access to.

/app/
- Base route: shows dashboard if signed in, redirects to /app/signin page if signed out.

/app/signup
- Sign up page

/app/signin
- Sign in page

/app/game
/app/deckeditor

# Other routes

/contexts
- These are used to share tools and data between files. For example, the user instance is saved as a context so that every component can access data about the currently logged in user.

/utils
- Here there are two files which each have a createClient function, initializing a connection to the database. One is used for pages rendered by the server (determined via "use server" by Next.js) and for pages rendered by the client ("use client"). Please be sure to import the correct one. See Supabase Auth docs if confused.

/types
- Typescript types to be shared between files
/types/database.types.ts
- Database types here are generated through the method mentioned here: https://supabase.com/docs/guides/api/rest/generating-types
- Please make sure to regenerate this file after making any changes to database tables
- The project id can be found in the Project Settings menu

## Configuration
In `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

You can copy the keys from the Supabase dashboard > "connect" in the navigation bar > App Frameworks tab

## Database
### Tables

### SQL Snippit Functions
These are used for adding automated database functionality. For example, when a new user is added to the auth.users table (which is managed by supabase) we want to add a row to our public.user_storage table with the corresponding user id. To do this, we call the database with a SQL snippit. These can be found in the SQL editor in the Supabase web app.
- Note: if you ever create a snippit, it is automatically made private. If you want the rest of the team to use your snippit, make sure to right click it and share it with the team.
- More information: https://supabase.com/docs/guides/auth/managing-user-data?queryGroups=language&language=js
