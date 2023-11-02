import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArtistProps } from "@/types";
import React from "react";
import { RemoveButton } from "./RemoveButton";

export const ArtistCard: React.FC<ArtistProps> = ({
  genres,
  image,
  name,
  handleClick,
}) => {
  return (
    <>
      <Card className="mt-2 mb-2 mr-2 text-white transition-all bg-white bg-opacity-10 hover:bg-purple-400 hover:bg-opacity-10 hover:pt-1 hover-pr-2 h-420 ">
        <CardHeader>
          <img src={image[0].url} alt={name} className="w-56 h-56 rounded-lg" />
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription className="text-sm font-thin">
            {genres}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <RemoveButton handleClick={handleClick} />
        </CardFooter>
      </Card>
    </>
  );
};
