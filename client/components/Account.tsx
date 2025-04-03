"use client";

import { useQueryContext } from "@/contexts/QueryProvider";
import { useUserContext } from "@/contexts/UserProvider";
import { Avatar } from "@heroui/avatar";
import { User } from "@supabase/supabase-js";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect } from "react";

export const AccountSection = () => {

  const session = useUserContext();
  const query = useQueryContext();

  useEffect(() => {
    if (session?.user) {
      query?.getUserStorageRowFromId(session?.user?.id);
    }
  }, [session])

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <Avatar className="w-20 h-20" />
        <p className="my-auto ml-2 text-left text-xl font-black"> Username
        </p>
      </div>
      <div className="flex flex-col mt-1 text-lg text-left">
        {query?.userStorageRow ? (
          <div className="flex flex-col place-content-around">
            <span>Games won: {query.userStorageRow.games_won}</span>
            <span>Decks created: {query.userStorageRow.decks ? query.userStorageRow.decks.length : 0}</span>
            <span>Most points: {query.userStorageRow.points_total}</span>
            <span>Account created: {session?.user?.created_at}</span>
          </div>
        ) : (
          <div>
            <div className="flex flex-row place-content-around">
              <span>Games won: </span>
              <span>Decks created: </span>
            </div>
            <div className="flex flex-row place-content-around">
              <span>Most points: </span>
              <span>Account created: </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
