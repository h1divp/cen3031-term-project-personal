// components/InteractiveCard.tsx
"use client";

import { Button } from "@heroui/button";

export const InteractiveCard = ({
  title,
  details,
  onClick,
}: {
  title: string;
  details: string;
  onClick: () => void;
}) => {
  return (
    <Button
      fullWidth
      variant="bordered"
      className="hover:bg-purple-50 justify-between"
      onClick={onClick}
    >
      <div className="text-left">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{details}</p>
      </div>
      <span className="text-purple-600 text-sm">▶</span>
    </Button>
  );
};