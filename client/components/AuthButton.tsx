"use client"
import { signInWithGoogle } from "@/utils/supabase/actions"
import { Button } from "@heroui/button"
import React from "react"

const AuthButton = () => {
  return (
    <div>
      <form>
        <Button variant="ghost" formAction={signInWithGoogle} type="submit">Sign in with Google</Button>
      </form>
    </div>
  )
}

export default AuthButton
