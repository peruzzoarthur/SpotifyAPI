import React from "react";
import { Button } from "./ui/button";

type AddButtonProps = {
  handleClick?: () => void;
};

export const AddButton: React.FC<AddButtonProps> = ({ handleClick }) => {
  return (
    <Button
      onClick={handleClick}
      className="text-white transition-all duration-500 bg-green-600 bg-opacity-60 hover:scale-110 "
    >
      Add
    </Button>
  );
};
