import { useEffect, useState } from "react";
import { useQueryContext } from "@/contexts/QueryProvider";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/UserProvider";
import { Card } from "@/components/Card";

export default function UserDecksSection() {
  const router = useRouter();
  const queryContext = useQueryContext();
  const userContext = useUserContext();
  const [decks, setDecks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDecks = async () => {
      if (userContext?.user?.id) {
        setIsLoading(false);
        const fetchedDecks = await queryContext?.getUserDecks(userContext.user.id); // <-- await here
        setDecks(fetchedDecks ?? []);
      }
    };
  
    fetchUserDecks();
  }, [userContext?.user?.id, queryContext]);

  const handleDeckClick = (deckId: string) => {
    router.push(`/editor?deck=${deckId}`);
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      {isLoading ? (
        <p className="text-gray-500">Loading your decks...</p>
      ) : decks && decks.length > 0 ? (
        decks.map((deck) => (
            <Card
            key={deck.id}
            title={deck.name || "Untitled Deck"}
            details={`${deck.cards?.length || 0} cards`}
            onClick={() => handleDeckClick(deck.id)}
            isMenuOpt={false}
          />
        ))
      ) : (
        <p className="text-gray-500">You don't have any decks yet</p>
      )}
    </div>
  );
}
