import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrackProps } from "@/types";
import React from "react";

export const TrackCard: React.FC<TrackProps> = ({ artists, image, name }) => {
  return (
    <>
      <Card className="mt-6 mb-2 ml-6 mr-6 text-white transition-all duration-700 bg-black bg-opacity-60 hover:bg-black hover:bg-opacity-20 hover:pt-2 hover:pl-3 h-460 w-300">
        <CardHeader>
          <img
            src={image[0].url}
            alt={name}
            className="w-56 h-56 rounded-full"
          />
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription className="font-light">{artists}</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
};
