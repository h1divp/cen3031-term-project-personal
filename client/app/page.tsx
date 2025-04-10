"use client"
import { ButtonGroup, Button } from "@heroui/button"
import { AccountSection } from "@/components/Account";
import { NavigationBar } from "@/components/Navbar";
import { Card } from "@/components/Card";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/UserProvider";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter();
  const session = useUserContext();

  useEffect(() => {
    session?.getSessionData();
  }, [])

  return (
    <>
      {session?.user ? (
        <div className="min-h-screen flex flex-col">
          <NavigationBar />
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
                <div className="flex flex-col center-items">
                  <Card title="Create deck" details="" onClick={() => { router.push("/editor") }} isMenuOpt />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col">
          <div className="flex flex-col items-center align-center my-auto">
            <p className="text-xl">Welcome to GitGud</p>
            <ButtonGroup className="mx- my-2">
              <Button
                variant="ghost"
                onClick={() => router.push('/login')}
              >Log In</Button>
              <Button
                variant="ghost"
                onClick={() => router.push('/signup')}
              >Sign Up</Button>
            </ButtonGroup>
          </div>
        </div>
      )
      }
    </>
  );
};
