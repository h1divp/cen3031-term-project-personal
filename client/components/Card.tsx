"use client";

import { Button } from "@heroui/button";

export const Card = ({
  title,
  details,
  onClick,
  isMenuOpt,
}: {
  title: string;
  details: string;
  onClick?: () => void;
  isMenuOpt: boolean;
}) => {
  return (
    <>
      {isMenuOpt ? (
        <Button
          fullWidth
          variant="ghost"
          className="justify-center items-start h-auto"
          onClick={onClick}
        >
          <div className="text-left my-1">
            <p className="font-medium">{title}</p>
            <p className="text-sm">{details}</p>
          </div>
        </Button>
      ) : (
        <Button
          fullWidth
          color="secondary"
          variant="flat"
          className="justify-start items-start h-auto"
          onClick={onClick}
        >
          <div className="text-left my-1">
            <p className="font-medium">{title}</p>
            <p className="text-sm">{details}</p>
          </div>
        </Button>
      )}
    </>
  );
};
