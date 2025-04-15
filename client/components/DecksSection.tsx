import { useEffect, useState } from "react";
import { useQueryContext } from "@/contexts/QueryProvider";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/UserProvider";
import { Card } from "@/components/Card";
import { Tables } from "@/types/database.types";

export const DecksSection = ({
  decks
}: {
  decks: Tables<"decks">[] | undefined;
}) => {
  const router = useRouter();
  const queryContext = useQueryContext();
  const userContext = useUserContext();

  const [isLoading, setIsLoading] = useState(true);

  const handleDeckClick = (deckId: string) => {
    router.push(`/editor?deck=${deckId}`);
  };

  useEffect(() => {
    if (decks === undefined) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [decks])

  if (isLoading) return (
    <p className="text-gray-500 mb-4">Loading decks...</p>
  )

  if (decks?.length === 0) return (
    <p className="mb-4">No decks found.</p>
  )

  return (
    <div className="flex flex-col gap-2 mb-4">
      {decks?.map((deck) => (
        <Card
          key={deck.id}
          title={deck.name || "Untitled Deck"}
          details={`${deck.cards?.length || 0} card${deck.cards && deck.cards?.length > 1 ? `s` : ``}`}
          onClick={() => handleDeckClick(deck.id)}
          isMenuOpt={false}
        />
      ))}
    </div>
  );
}
