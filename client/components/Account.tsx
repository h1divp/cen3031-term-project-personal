"use client";

import { useQueryContext } from "@/contexts/QueryProvider";
import { useUserContext } from "@/contexts/UserProvider";
import { Database, Json } from "@/types/database.types";
import { Avatar } from "@heroui/avatar";
import { colorVariants } from "@heroui/theme";
import { Input } from "@heroui/input";
import { Button, ButtonGroup } from "@heroui/button";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { createClient } from '@/utils/supabase/client';
import { User } from "@supabase/supabase-js";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";
import { title } from "process";


export const AccountSection = () => {

  type profileColorType = Database["public"]["Tables"]["user_storage"]["Row"]["profile_color"];

  const session = useUserContext();
  const query = useQueryContext();
  const router = useRouter();

  const [createdDate, setCreatedDate] = useState<Date | undefined>(undefined);
  const [displayName, setDisplayName] = useState<string>("no name");
  const [profileColor, setProfileColor] = useState<profileColorType>({ color: "#555555" });
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passError, setPassError] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState('');

  // Runs after session changes
  useEffect(() => {
    if (session?.user) {
      query?.getUserStorageRowFromId(session?.user?.id);
    }
  }, [session]);

  // Runs after query changes
  useEffect(() => {
    if (session?.user && query?.userData) {
      const { display_name } = session?.user?.user_metadata;
      setDisplayName(display_name);
      setCreatedDate(new Date(session?.user?.created_at));
      setProfileColor(query.userData.profile_color);
    }
  }, [query])

  const changeUsernameOnClick = () => {
    session?.changeUsername(newUsername);
    // router.refresh();
    addToast({
      title: "Username Changed! Refresh the page"
    })
  }

  const changePasswordOnClick = () => {
    if (newPassword.length < 6) {
      setPassError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPassError('Passwords must be the same');
      return;
    }
    session?.changePassword(newPassword);
    router.refresh();
  }

  const changeEmailOnClick = () => {
    session?.changeEmail(newEmail);
  }

  return (
    <>
      {session?.user && query?.userData ? (
        <div className="flex flex-col">
          {/*"name" field must be left as a space to get rid of icon*/}
          <Avatar className="w-20 h-20 mx-auto" style={{ "backgroundColor": profileColor?.color }} name=" " isBordered />
          <p className="mt-2 text-center text-2xl font-black">
            {displayName}
          </p>
          <div className="flex flex-col mt-1 text-lg text-left">
            <div className="flex flex-col text-center place-content-around">
              <span>Games won: {query?.userData.games_won}</span>
              <span>Decks created: {query?.userData.decks_created}</span>
              <span>Most points: {query?.userData.points_total}</span>
              <span>Account created: {createdDate?.toDateString()}</span>
            </div>
            <Accordion>
              <AccordionItem key="1" title="Change Email">
                <div className="flex flex-col gap-2">
                  <Input
                    label="New email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                    variant="bordered"
                  />
                  <Button
                    onPress={() => changeEmailOnClick()}
                  >Change Email</Button>
                </div>
              </AccordionItem>
              <AccordionItem key="2" title="Change Username">
                <div className="flex flex-col gap-2">
                  <Input
                    label="New username"
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                    variant="bordered"
                  />
                  <Button
                    onPress={() => changeUsernameOnClick()}
                  >Change Username</Button>
                </div>
              </AccordionItem>
              <AccordionItem key="3" title="Change Password">
                <div className="flex flex-col gap-2">
                  {passError && (
                    <div className="text-red-500 text-sm text-center p-3 bg-red-50 rounded-md">
                      {passError}
                    </div>
                  )}
                  <Input
                    label="New password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    variant="bordered"
                  />
                  <Input
                    label="Confirm new password"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                    placeholder="Confirm your new password"
                    variant="bordered"
                  />
                  <Button
                    onPress={() => changePasswordOnClick()}
                  >Change Password</Button>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
