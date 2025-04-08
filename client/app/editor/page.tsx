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

const Editor: React.FC = () => {
  const router = useRouter();
  const session = useUserContext();

  // Save the entire deck
  // const handleSaveDeck = async () => {
  //   if (deckName.trim() && frontTexts.length > 0) {
  //     try {
  //       // Prepare the deck object
  //       const newDeck: Deck = {
  //         ownerID: currentUserID,
  //         user_saved: [], // Initially empty
  //         Front: frontTexts,
  //         Back: backTexts
  //       };

  //       // Insert the deck
  //       const { data, error } = await supabase
  //         .from('decks')
  //         .insert(newDeck)
  //         .select();

  //       if (error) throw error;

  //       // Reset form
  //       setFrontTexts([]);
  //       setBackTexts([]);
  //       setDeckName('');
  //       alert('Deck saved successfully!');
  //     } catch (error) {
  //       console.error('Error saving deck:', error);
  //       alert('Failed to save deck');
  //     }
  //   }
  // };

  type Card = { front: string, back: string }

  const [deck, setDeck] = useState<Card[]>([]);
  const [deckId, setDeckId] = useState<string>("");
  const [deckName, setDeckName] = useState<string>("New Deck");
  const [currentCard, setCurrentCard] = useState<Card>({ front: "", back: "" });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isNewDeck, setIsNewDeck] = useState<boolean>(true);
  const lorem = "Labore commodi est et sit sint accusamus. Sed laudantium impedit similique quis cumque a et. Nulla sit ut impedit itaque cupiditate quasi doloribus. Perspiciatis dolores nulla saepe occaecati exercitationem consequuntur. Dignissimos iusto nihil aut. Aut sit pariatur officiis qui reiciendis aut officiis et.";

  // 1. If passed a deck id, load the deck; if not, fill in inputs for a new deck
  // 2. If passed a deck id, db query deck and load into local state, render an error warning if error
  // Update deck name col when name save button is pressed
  // Implement edit buttons
  // Implement delete buttons
  // Update db row when deck save button is pressed

  const handleAddCard = () => {
    setDeck([...deck, currentCard]);
    setCurrentCard({ front: "", back: "" })
    console.log(deck)
  }

  const handleDeleteCard = (index: number) => {
    if (index < 0 || index >= deck.length) return;
    deck.splice(index, 1);
    setDeck([...deck])
  }

  const handleEditCard = () => {
    setIsEditing(!isEditing);
  }

  const handleClearNewCard = () => {
    setCurrentCard({ front: "", back: "" })
  }

  const handleSaveDeck = () => {
    setIsEditing(!isEditing);
  }

  const handleCreateDeck = () => {
    setIsNewDeck(!isNewDeck);
  }

  const handleDeleteDeck = () => {
    setDeck([]);
    setDeckName("New Deck");
    setIsEditing(false);
    setIsNewDeck(true);
  }

  useEffect(() => {
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
                isClearable
              />
              <>
                {isNewDeck ? (
                  <Button variant='ghost' size='sm' onPress={() => handleCreateDeck()}>Create Deck</Button>
                ) : (
                  <>
                    {!isEditing ? (
                      <Button variant='ghost' size='sm' onPress={() => handleEditCard()}>Edit Deck</Button>
                    ) : (
                      <>
                        <Button variant='ghost' size='sm' onPress={() => handleSaveDeck()}>Save Deck</Button>
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
                      isReadOnly
                      isDisabled={!isEditing}
                    />
                    <Textarea
                      value={card.back}
                      className="w-full"
                      labelPlacement="outside"
                      variant='bordered'
                      isReadOnly
                      isDisabled={!isEditing}
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
