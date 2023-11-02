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
}) => {
  return (
    <>
      <TableRow className="hover:bg-green-300 hover:bg-opacity-60">
        <TableCell className="font-medium">{order}</TableCell>
        <TableCell>
          <Link to={`${uri}`}>
            <img className="max-h-14 max-w-14" src={image[0].url} alt={name} />
          </Link>
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{artists}</TableCell>
        <TableCell className="text-right">{formatDuration(duration)}</TableCell>
      </TableRow>
    </>
  );
};
