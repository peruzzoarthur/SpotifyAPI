import { SimplifiedTrackProps } from "@/types";
import { formatDuration } from "@/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { Link } from "react-router-dom";
import { AddButton } from "./AddButton";

export const SimplifiedTrackTableRow: React.FC<SimplifiedTrackProps> = ({
  artists,
  duration,
  image,
  order,
  name,
  uri,
  handleClick,
}) => {
  return (
    <>
      <TableRow className="bg-black bg-opacity-10 hover:bg-green-200 hover:bg-opacity-10">
        <TableCell className="font-medium">{order}</TableCell>
        <TableCell>
          <Link to={`${uri}`}>
            <img className="max-h-36 max-w-36" src={image[0].url} alt={name} />
          </Link>
        </TableCell>
        <TableCell className="font-medium">{name}</TableCell>

        <TableCell className="pr-10 font-bold">{artists}</TableCell>

        <TableCell className="text-right">{formatDuration(duration)}</TableCell>

        {handleClick && (
          <TableCell>
            <AddButton
              handleClick={handleClick}
              className="w-6 h-6 ml-2 mr-2"
            />
          </TableCell>
        )}
      </TableRow>
    </>
  );
};
