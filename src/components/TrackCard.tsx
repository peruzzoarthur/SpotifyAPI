import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrackProps } from "@/types";
import React from "react";
import { RemoveButton } from "./RemoveButton";

export const TrackCard: React.FC<TrackProps> = ({
  artists,
  image,
  name,
  handleClick,
}) => {
  return (
    <>
      <Card className="mt-2 mb-2 mr-2 text-white transition-all duration-700 bg-black bg-opacity-60 hover:bg-black hover:bg-opacity-20 hover:pt-2 hover:pl-7 h-460">
        <CardHeader>
          <img
            src={image[0].url}
            alt={name}
            className="w-56 h-56 rounded-full"
          />
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription className="font-light">{artists}</CardDescription>
        </CardHeader>
        <CardFooter className="">
          <RemoveButton handleClick={handleClick} />
        </CardFooter>
      </Card>
    </>
  );
};
