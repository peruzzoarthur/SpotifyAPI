import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrackProps } from "@/types";
import React from "react";
// import { Button } from "./ui/button";
import { RemoveButton } from "./RemoveButton";

export const TrackCard: React.FC<TrackProps> = ({
  artists,
  image,
  name,
  handleClick,
}) => {
  return (
    <>
      <Card className="mt-2 mb-2 mr-2 text-white transition-all bg-white bg-opacity-10 hover:bg-green-400 hover:bg-opacity-10 hover:pt-1 hover-pr-2 h-420">
        <CardHeader>
          <img
            src={image[0].url}
            alt={name}
            className="w-56 h-56 rounded-full"
          />
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription className="text-sm">{artists}</CardDescription>
        </CardHeader>
        <CardFooter>
          <RemoveButton handleClick={handleClick} />
        </CardFooter>
      </Card>
    </>
  );
};
