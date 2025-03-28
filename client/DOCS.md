# Docs

## Authentication setup

## /app Routes
This folder is used by Next for the App router, which structures the URL routes which users have access to.

/app/.
- Base route: shows dashboard if signed in, redirects to /app/signin page if signed out.

/app/signup
- Sign up page

/app/signin
- Sign in page

/app/game
/app/deckeditor

/utils
- Here there are two files which each have a createClient function, initializing a connection to the database. One is used for pages rendered by the server (determined via "use server" by Next.js) and for pages rendered by the client ("use client"). Please be sure to import the correct one. See Supabase Auth docs if confused.

## Configuration
`In .env.local`

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000

