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
`In .env.local`

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

