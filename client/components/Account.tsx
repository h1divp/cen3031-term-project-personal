"use client";
import { Avatar } from "@heroui/avatar";

// TODO: Pass in User object as state, so that stats, username, avatar, etc can be pulled from it.
export const AccountSection = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <Avatar className="w-20 h-20" />
        <p className="my-auto ml-2 text-left text-xl font-black">Logged out</p>
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
