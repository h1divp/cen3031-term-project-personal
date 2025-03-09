"use client";
import { Button, ButtonGroup } from "@heroui/button";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import { InteractiveCard } from "./components/Card";
import { AccountSection } from "./components/Account";

export default function Home() {
  // Example click handlers
  const handleGameClick = (gameId: number) => {
    console.log(`Game ${gameId} clicked`);
  };

  const handleDeckClick = (deckId: number) => {
    console.log(`Deck ${deckId} clicked`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-white p-4 text-purple-500">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">GitGud At Studying</div>
          <ButtonGroup>
            <Button variant="ghost">Login</Button>
            <Button variant="ghost">Sign Up</Button>
          </ButtonGroup>
        </div>
      </nav>

      {/* Main Content - Three Columns */}
      <div className="flex-1 container mx-auto p-4 flex gap-4">
        {/* Column 1 - Recent Games */}
        <div className="flex-1 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Recent Games</h2>
          <div className="space-y-3">
            <Button
              fullWidth
              variant="bordered"
              onClick={() => handleGameClick(1)}
            >
              <div className="w-full text-left">
                <p className="font-medium">Math Basics</p>
                <p className="text-sm text-gray-500">5m ago • 82% score</p>
              </div>
            </Button>
            <Button
              fullWidth
              variant="bordered"
              onClick={() => handleGameClick(2)}
            >
              <div className="w-full text-left">
                <p className="font-medium">Chemistry Quiz</p>
                <p className="text-sm text-gray-500">2h ago • 91% score</p>
              </div>
            </Button>
            <Button
              fullWidth
              variant="bordered"
              onClick={() => handleGameClick(3)}
            >
              <div className="w-full text-left">
                <p className="font-medium">History Challenge</p>
                <p className="text-sm text-gray-500">Yesterday • 75% score</p>
              </div>
            </Button>
          </div>
        </div>

        {/* Column 2 - Community Decks */}
        <div className="flex-1 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Community Decks</h2>
          <div className="space-y-3">
            <Button
              fullWidth
              variant="bordered"
              onClick={() => handleDeckClick(1)}
            >
              <div className="w-full text-left">
                <p className="font-medium">Advanced Calculus</p>
                <p className="text-sm text-gray-500">1.2k users • 95 cards</p>
              </div>
            </Button>
            <Button
              fullWidth
              variant="bordered"
              onClick={() => handleDeckClick(2)}
            >
              <div className="w-full text-left">
                <p className="font-medium">Bio 101</p>
                <p className="text-sm text-gray-500">850 users • 120 cards</p>
              </div>
            </Button>
            <Button
              fullWidth
              variant="bordered"
              onClick={() => handleDeckClick(3)}
            >
              <div className="w-full text-left">
                <p className="font-medium">World History</p>
                <p className="text-sm text-gray-500">2.3k users • 200 cards</p>
              </div>
            </Button>
          </div>
        </div>

        {/* Column 3 - Account */}
<div className="flex-1 bg-gray-100 p-4 rounded-lg">
  <h2 className="text-xl font-bold mb-4">Account</h2>
  
  {/* Account Details */}
  <div className="bg-white rounded-lg p-4 shadow-sm">
    {/* Profile Section */}
    <div className="flex items-center mb-4">
      {/* Profile Picture */}
      <div className="relative">
        <img 
          src="https://placehold.co/100x100" 
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-purple-200 mr-3 object-cover"
        />
        <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          ✎
        </div>
      </div>
      
      {/* Username & Date */}
      <div>
        <h3 className="text-lg font-semibold text-purple-600">JohnDoe123</h3>
        <p className="text-sm text-gray-500">Member since: March 15, 2022</p>
      </div>
    </div>
    
    {/* Stats Section */}
    <div className="grid grid-cols-2 gap-4 text-center">
      <div className="bg-purple-50 p-3 rounded-lg">
        <p className="text-sm text-gray-600">Matches Played</p>
        <p className="text-xl font-bold text-purple-600">142</p>
      </div>
      <div className="bg-purple-50 p-3 rounded-lg">
        <p className="text-sm text-gray-600">Win Rate</p>
        <p className="text-xl font-bold text-purple-600">68%</p>
      </div>
    </div>
  </div>

  {/* Your Decks Section */}
  <div className="mt-6">
    <h4 className="font-semibold mb-3 text-purple-600">Your Decks</h4>
    <div className="space-y-2">
      <Button
        fullWidth
        variant="ghost"
        onClick={() => handleDeckClick(4)}
      >
        <div className="flex justify-between items-center w-full">
          <span>Discrete Structures</span>
          <span className="text-sm text-gray-500">30 cards</span>
        </div>
      </Button>
      <Button
        fullWidth
        variant="ghost"
        onClick={() => handleDeckClick(5)}
      >
        <div className="flex justify-between items-center w-full">
          <span>Organic Chemistry</span>
          <span className="text-sm text-gray-500">45 cards</span>
        </div>
      </Button>
      <Button
        fullWidth
        variant="ghost"
        onClick={() => handleDeckClick(6)}
      >
        <div className="flex justify-between items-center w-full">
          <span>Pokemon</span>
          <span className="text-sm text-gray-500">28 cards</span>
        </div>
      </Button>
    </div>
  </div>
</div>
</div>

      {/* Bottom Bar - Current Games */}
      <footer className="bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto">
          <ButtonGroup className="justify-center">
            <Button variant="ghost" onClick={() => handleGameClick(4)}>
              <div className="flex items-center gap-2">
                <span>🎮 Current Match</span>
                <span className="text-sm text-gray-500">Turn 5/10</span>
              </div>
            </Button>
            <Button variant="ghost" onClick={() => handleGameClick(5)}>
              <div className="flex items-center gap-2">
                <span>🏆 Tournament</span>
                <span className="text-sm text-gray-500">Rank #15</span>
              </div>
            </Button>
            <Button variant="ghost" onClick={() => handleGameClick(6)}>
              <div className="flex items-center gap-2">
                <span>⏳ Practice Mode</span>
                <span className="text-sm text-gray-500">45m remaining</span>
              </div>
            </Button>
          </ButtonGroup>
        </div>
      </footer>
    </div>
  );
}