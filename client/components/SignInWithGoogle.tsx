"use client";

import { signInWithGoogle } from "@/utils/supabase/actions"
import { Button } from "@heroui/button"
import React from "react"

const SignInWithGoogle = () => {
  return (
    <form>
      <Button variant="ghost" formAction={signInWithGoogle} type="submit">Sign in with Google</Button>
    </form>
  )
}

export default signInWithGoogle
