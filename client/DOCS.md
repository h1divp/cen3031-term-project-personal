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

# Src routes

/contexts
- These are used to share tools and data between files. For example, the user instance is saved as a context so that every component can access data about the currently logged in user.

/types
- Types are put here to be used between files. The types in /types/database.types.ts are generated from our public scheme in Supabase using the supabase CLI.

/utils
- Here there are two files which each have a createClient function, initializing a connection to the database. One is used for pages rendered by the server (determined via "use server" by Next.js) and for pages rendered by the client ("use client"). Please be sure to import the correct one. See Supabase Auth docs if confused.

## Configuration
`In .env.local`

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000

## Misc
### Generating Typescript types for Supabase
Please read this article: https://supabase.com/docs/guides/api/rest/generating-types
