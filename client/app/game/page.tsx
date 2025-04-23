"use client";

import { NavigationBar } from "@/components/Navbar";
import { useQueryContext } from "@/contexts/QueryProvider";
import { useUserContext } from "@/contexts/UserProvider";
import { Tables } from "@/types/database.types";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Game() {
  const [deck, setDeck] = useState<Tables<"decks"> | undefined>(undefined);
  const [gameInfo, setGameInfo] = useState<Tables<"games"> | undefined>(undefined);
  const [gameUuid, setGameUuid] = useState<string | null>(null);
  const [cardIndex, setCardIndex] = useState<Number>(0);
  const [showFront, setShowFront] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const query = useQueryContext();
  const session = useUserContext();

  const loadGameFromUuid = async () => {
    if (!gameUuid) return;
    query?.getGameById(gameUuid).then((game: any) => {
      setGameInfo(game[0]);

      query?.getDeckById(game[0]["deck"]).then((deck: any) => {
        setDeck(deck[0]);
        console.log(deck[0]);
      });

    })

  }

  const handleFlip = () => {

  }

  useEffect(() => {
    if (!gameUuid) return;
    loadGameFromUuid();
  }, [gameUuid])

  useEffect(() => {
    console.log("test")
    const param = searchParams.get("id");
    setGameUuid(param);
  }, [session?.user?.id, query])

  useEffect(() => {
    session?.getSessionData();
  })

  if (!gameUuid) return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />

      <p>There was a problem loading this deck.</p>

    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />

      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-center">{gameInfo?.name}</h2>

        <div className="max-w-sm">
          <Button
            variant="ghost"
            size="sm"
            onPress={() => handleFlip()}
          >Flip</Button>
        </div>


      </div>

    </div>
  )
}
