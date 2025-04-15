"use client";

import { Button } from "@heroui/button";

export const Card = ({
  title,
  details,
  onClick,
  isMenuOpt,
  isDisabled,
}: {
  title: string;
  details: string;
  onClick?: () => void;
  isMenuOpt: boolean;
  isDisabled?: boolean;
}) => {
  return (
    <>
      {isMenuOpt ? (
        <Button
          fullWidth
          variant="ghost"
          className="justify-center items-start h-auto"
          onClick={onClick}
          isDisabled={isDisabled}
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
          isDisabled={isDisabled}
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
