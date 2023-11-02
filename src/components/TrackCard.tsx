import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrackProps } from "@/types";
import React from "react";
import { Button } from "./ui/button";

export const TrackCard: React.FC<TrackProps> = ({
  artists,
  image,
  name,
  handleClick,
}) => {
  return (
    <>
      <Card className="mt-2 mb-2 mr-2 text-white bg-white bg-opacity-10">
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
          <Button
            onClick={handleClick}
            className="text-white bg-red-600 bg-opacity-60"
          >
            Remove
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
