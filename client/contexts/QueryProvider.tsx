import { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/client";
import { createContext, useContext, useEffect, useState } from "react"

// TODO: Refactor types to have shorthand type support; reference https://supabase.com/docs/reference/javascript/typescript-support

type QueryContextType = {
  userData: Database["public"]["Tables"]["user_storage"]["Row"] | undefined;
  getUserStorageRowFromId: (id: Database["public"]["Tables"]["user_storage"]["Row"]["id"]) => void;
  getUserDecks: (id: Database["public"]["Tables"]["user_storage"]["Row"]["id"]) => void;
  getDeckById: (deckId: Database["public"]["Tables"]["decks"]["Row"]["id"]) => void;
  upsertDeck: (deck: Database["public"]["Tables"]["decks"]["Row"]) => void;
  deleteDeckById: (deckId: Database["public"]["Tables"]["decks"]["Row"]["id"]) => void;
}

const QueryContext = createContext<QueryContextType | undefined>(undefined);

// This allows the the context to be accessed via any component or page. Use something like "session = useUserContext()" and you can access state and functions via "session?.user?.id" "session?.signOut()" etc
export const useQueryContext = () => {
  return useContext(QueryContext);
}

// Please read to better understand:
// https://vercel.com/guides/react-context-state-management-nextjs
// https://react.dev/reference/react/useContext
//
// This function is used in app/providers.tsx in order to implement the context as a way for the user session to be accessed globally.
export const QueryProvider = ({ children }: { children: React.ReactNode }) => {

  const supabase = createClient();

  const [userData, setUserData] = useState<Database["public"]["Tables"]["user_storage"]["Row"] | undefined>(undefined);

  const [userDecks, setUserDecks] = useState<Database["public"]["Tables"]["decks"]["Row"][] | undefined>(undefined);

  const getUserStorageRowFromId = async (id: Database["public"]["Tables"]["user_storage"]["Row"]["id"]) => {
    // TODO: refactor to return data
    const { data, error } = await supabase.from("user_storage").select().eq("id", id);
    if (data) setUserData(data[0]);
    if (error) console.log(error);
  }

  const getUserDecks = async (id: Database["public"]["Tables"]["user_storage"]["Row"]["id"]) => {
    const { data, error } = await supabase.from("decks").select('*').eq("author", id);
    if (data) setUserDecks(data);
    if (error) console.log(error);
    return data || []
  }

  const getDeckById = async (deckId: Database["public"]["Tables"]["decks"]["Row"]["id"]) => {
    const { data, error } = await supabase.from("decks").select().eq("id", deckId);
    if (error) console.log(error);
    return data;
  }

  const upsertDeck = async (deck: Database["public"]["Tables"]["decks"]["Row"]) => {
    const { error } = await supabase.from("decks").upsert(deck);
    if (error) console.log(error);
    console.log("Query Context: deck upsertion handled");
  }

  const deleteDeckById = async (deckId: Database["public"]["Tables"]["decks"]["Row"]["id"]) => {
    const { error } = await supabase.from("decks").delete().eq("id", deckId);
    if (error) console.log(error);
    console.log("Query Context: deck deletion handled");
  }


  return (
    <QueryContext.Provider value={{ userData, getUserStorageRowFromId, getUserDecks, getDeckById, upsertDeck, deleteDeckById }} >
      {children}
    </QueryContext.Provider>
  )
}
