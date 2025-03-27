"use client"
import { ButtonGroup, Button } from "@heroui/button"
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";
import { AccountSection } from "@/components/Account";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import { useEffect, useState } from "react";
import { User, UserResponse } from "@supabase/supabase-js";

export default function Home() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getSessionData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user)
      }
      console.log("user id", user?.id);
    }

    getSessionData();
  }, []);

  const signOut = () => {
    supabase.auth.signOut()
    setUser(undefined);
  }


  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-white p-4 text-purple-500">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">GitGud At Studying</div>
          {user ? (
            <div>
              <p>Logged in as {(user?.id).slice(0, 10)}...</p>
              <Button variant="ghost" onClick={signOut}>Sign out</Button>
            </div>
          ) : (
            <ButtonGroup>
              <Button
                variant="ghost"
                onClick={() => router.push('/login')}
              >Log In</Button>
              <Button
                variant="ghost"
                onClick={() => router.push('/signup')}
              >Sign Up</Button>
              {/*<SignInWithGoogle />*/}
            </ButtonGroup>
          )}
        </div>
      </nav>

      {/* Main Content - Three Columns */}
      <div className="flex-1 container mx-auto p-4 flex gap-4">
        {/* Column 1 - Recent Games */}
        <div className="flex-1 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Recent Games</h2>
          <div className="space-y-3">
            {/*<Card title="Math Basics" details="50 cards" />*/}
          </div>
        </div>

        {/* Column 2 - Community Decks */}
        <div className="flex-1 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Community Decks</h2>
          <div className="space-y-3">
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex-1">
          <div className="grow bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Account</h2>
            <AccountSection />
          </div>
          <div className="grow bg-gray-100 p-4 mt-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Your Decks</h2>
            {/*<div className="space-y-3">
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
