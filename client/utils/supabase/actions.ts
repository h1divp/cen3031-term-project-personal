"use server"

import { redirect } from "next/navigation";
import { createClient } from "./server"

const signInWith = provider => async () => {
  const supabase = await createClient()

  const auth_callback_url = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`;

  const { data, error } =
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      scopes: 'https://www.googleapis.com/auth/userinfo.email'
    },
  })

  console.log(data)

  if (error) {
    console.log(error)
  }

  redirect(`${data.url}`)
}

const signInWithGoogle = signInWith('google')

export { signInWithGoogle }
