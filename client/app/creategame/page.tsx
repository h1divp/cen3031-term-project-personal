"use client";
import { NavigationBar } from "@/components/Navbar";
import { Button, ButtonGroup } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { NumberInput } from "@heroui/number-input";
import { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { useUserContext } from "@/contexts/UserProvider";
import { useQueryContext } from "@/contexts/QueryProvider";
import { Tables } from "@/types/database.types";

export default function Game() {

  const session = useUserContext();
  const query = useQueryContext();

  const [gameName, setGameName] = useState<string>("New Game");
  const [deckName, setDeckName] = useState<string>("");
  const [isNewGame, setIsNewGame] = useState<boolean>(true);
  const [isPublicDeck, setIsPublicDeck] = useState<boolean>(false);
  const [publicDeckList, setPublicDeckList] = useState<Tables<"decks">[] | undefined>(undefined);
  const [privateDeckList, setPrivateDeckList] = useState<Tables<"decks">[] | undefined>(undefined);

  const handleGameNameChange = (e: any) => {
    setGameName(e);
  }

  const handleCreateGame = () => {

  }

  const handleSetDeckPublic = () => {
    setIsPublicDeck(!isPublicDeck);
  }

  const getPublicDeckItems = () => {


  }

  useEffect(() => {
    session?.getSessionData();
  }, [])

  useEffect(() => {
    const fetchDecks = async () => {
      if (!session?.user?.id) return;

      query?.getUserDecks(session.user.id).then((decks: any) => {
        setPrivateDeckList(decks);
        console.log("private list", privateDeckList, decks);
      });
      query?.getRecentPublicDecks().then((decks: any) => {
        setPublicDeckList(decks);
        console.log("public list", publicDeckList, decks);
      });
    };

    fetchDecks();
  }, [session?.user?.id, query]);

  return (
    <div className="min-h-sreen flex flex-col">
      <NavigationBar />

      <div className="container mx-auto gap-4">
        <Input
          className='max-w-sm mb-4'
          size='lg'
          variant='bordered'
          value={gameName}
          onValueChange={(e) => { handleGameNameChange(e) }}
          isClearable={isNewGame}
          isReadOnly={!isNewGame}
          isDisabled={!isNewGame}
        />
        <div className="flex flex-row gap-2 mb-2">
          <Button
            variant="ghost"
            size="sm"
          >Create Game</Button>
          {/*Ready*/}
          <Button
            variant="ghost"
            size="sm"
          >Ready</Button>
        </div>
        <div className="flex flex-row mx-auto gap-4">
          {/* -- Columns -- */}
          {/*Joined Players*/}
          <div className="flex-1 flex-col gap-4">
            <p className="text-lg font-bold mb-4">Joined Players</p>
          </div>
          {/*Cards from selected deck*/}
          <div className="flex-1 flex-col gap-4">
            {deckName.length ? (
              <p className="text-lg font-bold mb-4">{deckName}</p>
            ) : (
              <p className="text-md text-grey-500 font-bold mb-4">No deck selected</p>
            )}
          </div>
          {/*Settings*/}
          <div className="flex-1 flex-col">
            <div className="gap-4">
              <p className="text-lg font-bold mb-4">Game settings</p>
              <p className="mb-2">Deck type</p>
              <ButtonGroup className="mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  isDisabled={isPublicDeck}
                  onClick={handleSetDeckPublic}
                >Public</Button>
                <Button
                  variant="ghost"
                  size="sm"
                  isDisabled={!isPublicDeck}
                  onClick={handleSetDeckPublic}
                >Private</Button>
              </ButtonGroup>
              {isPublicDeck ? (
                <Select
                  className="max-w-sm mb-2"
                  size="sm"
                  placeholder="Deck name"
                  items={publicDeckList}
                >
                  {(deck) => <SelectItem>{deck.name}</SelectItem>}
                </Select>
              ) : (
                <Select
                  className="max-w-sm mb-2"
                  size="sm"
                  placeholder="Deck name"
                  items={privateDeckList}
                >
                  {(deck) => <SelectItem>{deck.name}</SelectItem>}
                </Select>
              )}
              <NumberInput className="max-w-sm mb-2" defaultValue={1} size="sm" label="Max players" minValue={1} maxValue={15} />
              <Button
                variant="ghost"
                size="sm"
              >Delete Game</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
