import { TrackCardProps } from "@/types";
import { formatDuration } from "@/utils";
import { TableCell } from "@/components/ui/table";

import React from "react";

export const TrackTableRow: React.FC<TrackCardProps> = ({
  artists,
  duration,
  image,
  order,
  name,
}) => {
  return (
    <>
      <TableCell className="font-medium">{order}</TableCell>
      <TableCell>
        <img className="max-h-14 max-w-14" src={image[0].url} alt={name} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{artists}</TableCell>
      <TableCell className="text-right">{formatDuration(duration)}</TableCell>
    </>
  );
};
