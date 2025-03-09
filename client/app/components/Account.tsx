// components/AccountSection.tsx
"use client";
import { InteractiveCard } from "./Card";
export const AccountSection = () => {
  // Define click handlers here
  const handleDeckClick = (deckId: number) => {
    console.log(`Deck ${deckId} clicked`);
  };

  return (
    <div className="mt-6">
      <h4 className="font-semibold mb-3 text-purple-600">Your Decks</h4>
      <div className="space-y-2">
        <InteractiveCard
          title="Discrete Structures"
          details="30 cards"
          onClick={() => handleDeckClick(4)}
        />
        <InteractiveCard
          title="Organic Chemistry"
          details="45 cards"
          onClick={() => handleDeckClick(5)}
        />
        <InteractiveCard
          title="Pokemon"
          details="28 cards"
          onClick={() => handleDeckClick(6)}
        />
      </div>
    </div>
  );
};