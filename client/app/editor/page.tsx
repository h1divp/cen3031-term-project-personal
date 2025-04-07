"use client"
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Button } from "@heroui/button";
import { NavigationBar } from '@/components/Navbar';
import { Textarea } from '@heroui/input';

const Editor: React.FC = () => {
  const router = useRouter();

  // State for managing deck creation
  const [deckName, setDeckName] = useState<string>('');
  const [currentFront, setCurrentFront] = useState<string>('');
  const [currentBack, setCurrentBack] = useState<string>('');

  // State to track front and back texts before saving
  const [frontTexts, setFrontTexts] = useState<string[]>([]);
  const [backTexts, setBackTexts] = useState<string[]>([]);

  // Add a card to the current deck
  // const handleAddCard = () => {
  //   if (currentFront.trim() && currentBack.trim()) {
  //     setFrontTexts([...frontTexts, currentFront]);
  //     setBackTexts([...backTexts, currentBack]);

  //     // Clear input fields
  //     setCurrentFront('');
  //     setCurrentBack('');
  //   }
  // };

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

  const [deck, setDeck] = useState<{ front: string, back: string }[] | undefined>(undefined);
  const [deckId, setDeckId] = useState<string>("");
  const lorem = "Labore commodi est et sit sint accusamus. Sed laudantium impedit similique quis cumque a et. Nulla sit ut impedit itaque cupiditate quasi doloribus. Perspiciatis dolores nulla saepe occaecati exercitationem consequuntur. Dignissimos iusto nihil aut. Aut sit pariatur officiis qui reiciendis aut officiis et.";

  // Remove a card from the current deck
  // const handleRemoveCard = (index: number) => {
  //   const newFrontTexts = [...frontTexts];
  //   const newBackTexts = [...backTexts];

  //   newFrontTexts.splice(index, 1);
  //   newBackTexts.splice(index, 1);

  //   setFrontTexts(newFrontTexts);
  //   setBackTexts(newBackTexts);
  // };

  useEffect(() => {

  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />

      <div className="container mx-auto flex-1">
        {/*TODO: pull text data from loaded deck obj*/}
        <div className='flex flex-row'>
          <h1 className="text-2xl font-bold mb-4">New Deck</h1>
          <Button variant='ghost' size='sm' className='ml-2'>Edit Name</Button>
          <Button variant='ghost' size='sm' className='ml-2'>Save</Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Textarea
            label="New card front"
            value={currentFront}
            onChange={(e) => setCurrentFront(e.target.value)}
            className="w-full"
            labelPlacement="outside"
          />
          <Textarea
            label="New card back"
            value={currentBack}
            onChange={(e) => setCurrentBack(e.target.value)}
            className="w-full"
            labelPlacement="outside"
          />
        </div>
        <Button variant='ghost' size='sm' className='mt-2'>Add</Button>
        <Button variant='ghost' size='sm' className='mt-2 ml-2'>Clear</Button>
        <hr className='my-6' />

        {/* Card Preview */}
        <h1 className="font-bold mb-4">Added cards</h1>
        <div className='flex flex-col'>
          <div className="container mx-auto">
            <div className='container flex flex-row gap-6'>
              <div className='flex flex-col justify-center'>
                <p className='text-sm text-center'>1</p>
                <Button variant='ghost' size='sm' className='mt-2'>Edit</Button>
                <Button variant='ghost' size='sm' className='mt-2'>Delete</Button>
              </div>
              <Textarea
                label="Front"
                value={lorem}
                className="w-full"
                labelPlacement="outside"
                isReadOnly
              />
              <Textarea
                label="Back"
                value={lorem}
                className="w-full"
                labelPlacement="outside"
                isReadOnly
              />
            </div>
          </div>
        </div>
        <Button variant='ghost' size='sm' className='mt-2'>Save</Button>

        {/*        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">Added cards</h2>
          <div className="grid grid-cols-3 gap-4">
            {frontTexts.map((front, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 p-3 rounded shadow-sm relative"
              >
                <button
                  onClick={() => handleRemoveCard(index)}
                  className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
                <strong className="text-purple-600">Card {index + 1}</strong>
                <p className="text-sm mt-2"><strong>Front:</strong> {front}</p>
                <p className="text-sm mt-1"><strong>Back:</strong> {backTexts[index]}</p>
              </div>
            ))}
          </div>
        </div>
*/}      </div>
    </div>
  );
};

export default Editor;
