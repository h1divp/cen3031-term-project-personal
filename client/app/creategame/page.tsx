"use client";
import { NavigationBar } from "@/components/Navbar";
import { Button, ButtonGroup } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { NumberInput } from "@heroui/number-input";
import { useState } from "react";
import { Input } from "@heroui/input";

export default function Game() {

  const [gameName, setGameName] = useState<string>("New Game");
  const [deckName, setDeckName] = useState<string>("");
  const [isNewGame, setIsNewGame] = useState<boolean>(true);

  const handleGameNameChange = (e: any) => {
    setGameName(e);
  }

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
                >Public</Button>
                <Button
                  variant="ghost"
                  size="sm"
                >Private</Button>
              </ButtonGroup>
              <Select className="max-w-sm mb-2" size="sm" placeholder="Deck name">
                <SelectItem key="1">test</SelectItem>
                <SelectItem key="2">test 2</SelectItem>
              </Select>
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
