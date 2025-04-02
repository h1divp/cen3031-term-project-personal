"use client";

import { useUserContext } from "@/contexts/UserProvider";
import useSupabaseBrowser from "@/utils/supabase/client";
import { TypedSupabaseClient } from "@/utils/supabase/types";
import { Avatar } from "@heroui/avatar";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const AccountSection = () => {

  const session = useUserContext();
  // // TODO: get user id, make call to supabase tables, get user info, populate elements.

  // const getUserStorageData = (client: TypedSupabaseClient, user: User) => {
  //   if (user?.id) {
  //     return client
  //       .from('user_storage')
  //       .select(
  //         `
  //       games_won,
  //       decks_created,
  //       points_total
  //     `
  //       )
  //       .eq('id', user?.id)
  //       .throwOnError()
  //       .single()
  //   }
  // }

  // const supabase = useSupabaseBrowser();

  // useEffect(() => {
  //   const { data: games_won } = useQuery(getUserStorageData(supabase, session?.user))
  // }, [])

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <Avatar className="w-20 h-20" />
        {session?.user?.id ? (
          <p className="my-auto ml-2 text-left text-xl font-black">
            {session?.user?.id}</p>
        ) : (
          <p className="my-auto ml-2 text-left text-xl font-black">
            Logged out</p>
        )}
      </div>
      <div className="flex flex-col mt-1 text-lg text-left">
        <div className="flex flex-row place-content-around">
          <span>Games won: </span>
          <span>Decks created: </span>
        </div>
        <div className="flex flex-row place-content-around">
          <span>Most points: </span>
          <span>Account created: </span>
        </div>
      </div>
    </div>
  );
};
