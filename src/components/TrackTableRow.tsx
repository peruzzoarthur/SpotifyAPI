import { TrackProps } from "@/types";
import { formatDuration } from "@/utils";
import { TableCell, TableRow } from "@/components/ui/table";

import React from "react";
import { Link } from "react-router-dom";

export const TrackTableRow: React.FC<TrackProps> = ({
  artists,
  duration,
  image,
  order,
  name,
  uri,
  audio_features,
}) => {
  return (
    <>
      <TableRow className="bg-black bg-opacity-10 hover:bg-green-200 hover:bg-opacity-10">
        <TableCell className="font-medium">{order}</TableCell>
        <TableCell>
          <Link to={`${uri}`}>
            <img className="max-h-32 max-w-32" src={image[0].url} alt={name} />
          </Link>
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{artists}</TableCell>

        <TableCell>{audio_features?.danceability}</TableCell>
        <TableCell>{audio_features?.energy}</TableCell>
        <TableCell>{audio_features?.loudness}</TableCell>
        <TableCell>{audio_features?.speechiness}</TableCell>
        <TableCell>{audio_features?.acousticness}</TableCell>
        <TableCell>{audio_features?.instrumentalness}</TableCell>
        <TableCell>{audio_features?.liveness}</TableCell>
        <TableCell>{audio_features?.valence}</TableCell>

        <TableCell className="text-right">{formatDuration(duration)}</TableCell>
      </TableRow>
    </>
  );
};
