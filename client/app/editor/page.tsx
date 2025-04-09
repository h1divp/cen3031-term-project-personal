"use client"
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Button } from "@heroui/button";
import { NavigationBar } from '@/components/Navbar';
import { Input, Textarea } from '@heroui/input';
import { groupDataFocusVisibleClasses } from '@heroui/theme';
import { Database } from '@/types/database.types';
import { useUserContext } from '@/contexts/UserProvider';
import { useQueryContext } from '@/contexts/QueryProvider';
import { v4 as uuid } from 'uuid';

const Editor: React.FC = () => {
  const router = useRouter();
  const session = useUserContext();
  const query = useQueryContext();

  type Card = { front: string, back: string }

  const [deck, setDeck] = useState<Card[]>([]);
  const [deckId, setDeckId] = useState<string>("");
  const [deckName, setDeckName] = useState<string>("New Deck");
  const [currentCard, setCurrentCard] = useState<Card>({ front: "", back: "" });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isNewDeck, setIsNewDeck] = useState<boolean>(true);

  // TODO:
  // 1. see if deck uuid is passed to url search parameters
  // -> fetch deck, load into state, render
  // -> add proper save functionality
  // 2. once new deck is created, update search parameters with new deck uuid, and fetch newly created deck
  // -> editing functionality should work

  const handleAddCard = () => {
    setDeck([...deck, currentCard]);
    setCurrentCard({ front: "", back: "" })
  }

  const handleEditCardFront = (index: number, e: any) => {
    setDeck(deck.map(card => {
      if (card === deck.at(index)) {
        return { ...card, front: e.target.value }
      } else {
        return card;
      }
    }))
  }

  const handleEditCardBack = (index: number, e: any) => {
    setDeck(deck.map(card => {
      if (card === deck.at(index)) {
        return { ...card, back: e.target.value }
      } else {
        return card;
      }
    }))
  }

  const handleDeleteCard = (index: number) => {
    if (index < 0 || index >= deck.length) return;
    deck.splice(index, 1);
    setDeck([...deck])
  }

  const handleClearNewCard = () => {
    setCurrentCard({ front: "", back: "" })
  }

  const handleCreateDeck = () => {
    setIsNewDeck(!isNewDeck);
  }

  const handleUpsertDeck = () => {
    if (!session?.user) return;

    setIsEditing(!isEditing);

    const newDeck: Database["public"]["Tables"]["decks"]["Row"] = {
      id: uuid(),
      author: session?.user.id,
      name: deckName,
      cards: [...deck],
      total_cards: deck.length
    }

    query?.upsertDeck(newDeck);
  }

  const handleEditDeck = () => {
    setIsEditing(!isEditing);
  }

  const handleDeleteDeck = () => {
    setDeck([]);
    setDeckName("New Deck");
    setIsEditing(false);
    setIsNewDeck(true);
  }

  useEffect(() => {
    if (session?.user) {
      console.log("hit")
      query?.getUserDecks(session?.user?.id);
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />

      <div className="container mx-auto flex-1">
        {/*TODO: pull text data from loaded deck obj*/}
        <h1 className="text-2xl font-bold mb-4">Create Deck</h1>

        <div className="grid grid-cols-2 gap-6">
          <Textarea
            label="New card front"
            value={currentCard.front}
            onChange={(e) => setCurrentCard({ ...currentCard, front: e.target.value })}
            className="w-full"
            labelPlacement="outside"
            variant='bordered'
          />
          <Textarea
            label="New card back"
            value={currentCard.back}
            onChange={(e) => setCurrentCard({ ...currentCard, back: e.target.value })}
            className="w-full"
            labelPlacement="outside"
            variant='bordered'
          />
        </div>
        <div className='flex flex-row mt-2 gap-2'>
          <Button variant='ghost' size='sm' onPress={() => handleAddCard()}>Add Card</Button>
          <Button variant='ghost' size='sm' onPress={() => handleClearNewCard()}>Clear</Button>
        </div>

        {/* Deck Preview */}
        {deck.length == 0 ? (
          <></>
        ) : (
          <>
            <hr className='my-6' />
            <div className='flex flex-row gap-2 mb-6 items-center'>
              <Input
                className='w-auto'
                size='sm'
                variant='bordered'
                value={deckName}
                onValueChange={setDeckName}
                isClearable={isEditing || isNewDeck}
                isReadOnly={!isEditing && !isNewDeck}
                isDisabled={!isEditing && !isNewDeck}
              />
              <>
                {isNewDeck ? (
                  <Button variant='ghost' size='sm' onPress={() => handleUpsertDeck()}>Create Deck</Button>
                ) : (
                  <>
                    {!isEditing ? (
                      <Button variant='ghost' size='sm' onPress={() => handleEditDeck()}>Edit Deck</Button>
                    ) : (
                      <>
                        <Button variant='ghost' size='sm' onPress={() => handleEditDeck()}>Save Deck</Button>
                        <Button variant='ghost' size='sm' onPress={() => handleDeleteDeck()}>Delete Deck</Button>
                      </>
                    )}
                  </>
                )}
              </>
            </div>
            <div className='flex flex-col gap-2'>
              {deck.map((card, index) => (
                <div className="container mx-auto" key={index}>
                  <div className='container flex flex-row gap-6 h-20'>
                    <div className='flex flex-col justify-center gap-1'>
                      <p className='text-sm text-center'>{index + 1}</p>
                      <Button variant='ghost' size='sm' onPress={() => handleDeleteCard(index)}
                        isDisabled={!isEditing}
                      >Delete</Button>
                    </div>
                    <Textarea
                      value={card.front}
                      className="w-full"
                      labelPlacement="outside"
                      variant='bordered'
                      onChange={(e) => handleEditCardFront(index, e)}
                      isReadOnly={!isEditing && !isNewDeck}
                      isDisabled={!isEditing && !isNewDeck}
                    />
                    <Textarea
                      value={card.back}
                      className="w-full"
                      labelPlacement="outside"
                      variant='bordered'
                      onChange={(e) => handleEditCardBack(index, e)}
                      isReadOnly={!isEditing && !isNewDeck}
                      isDisabled={!isEditing && !isNewDeck}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className='mb-6' />
          </>
        )}
      </div>
    </div>
  );
};

export default Editor;
