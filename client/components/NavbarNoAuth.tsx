"use client";

import { useUserContext } from "@/contexts/UserProvider"
import { Button, ButtonGroup } from "@heroui/button"
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar"
import { User } from "@supabase/supabase-js"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const NavigationBarNoAuth = () => {
  return (
    <Navbar maxWidth="full">
      <NavbarBrand className="text-purple-700">
        {/*self made icon from figma*/}
        <svg width="111" height="100" viewBox="0 0 111 100" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="size-9 mr-1 pb-1">
          <rect x="55.0901" y="16.96" width="55.9099" height="76.1532" rx="8" fill="#7C1CD0" />
          <rect x="0.0110953" y="25.7221" width="61.9099" height="82.1532" rx="11" transform="rotate(-25.0841 0.0110953 25.7221)" fill="#7C1CD0" stroke="white" strokeWidth="6" />
        </svg>
        <Link className="font-bold text-2xl" href="/">GitGud</Link>
      </NavbarBrand>
    </Navbar>
  )
}
