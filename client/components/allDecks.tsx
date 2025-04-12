'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/client";
import { Card } from "@/components/Card";

type Deck = Database["public"]["Tables"]["decks"]["Row"];

const DeckList = () => {
  const [loading, setLoading] = useState(true);
  const [decks, setDecks] = useState<Deck[]>([]);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchAllDecks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("decks")
        .select("*")
        .order("created_at", { ascending: false }) // optional: newest first

      if (error) {
        console.error("Failed to fetch decks:", error);
        setDecks([]);
      } else {
        setDecks(data.slice(0, 20));
      }

      setLoading(false);
    };

    fetchAllDecks();
  }, []);

  if (loading) return <p>Loading decks...</p>;
  if (!decks.length) return <p>No decks found.</p>;

  return (
    <div className="flex flex-col gap-4">
      {decks.map((deck) => (
        <Card
          key={deck.id}
          title={deck.name || "Untitled Deck"}
          details={`${deck.cards?.length || 0} card${deck.cards && deck.cards?.length > 1 ? `s` : ``}`}
          onClick={() => router.push(`/editor?deck=${deck.id}`)}
          isMenuOpt={false}
        />
      ))}
    </div>
  );
};

export default DeckList;
