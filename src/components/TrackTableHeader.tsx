import { TableHeader, TableHead, TableRow } from "@/components/ui/table";

import React from "react";

export const TrackTableHeader: React.FC = () => {
  return (
    <>
      <TableHeader className="font-2xl">
        <TableRow>
          <TableHead className="font-2xl">Order</TableHead>
          <TableHead> </TableHead>
          <TableHead>Track name</TableHead>
          <TableHead>Artists</TableHead>

          <TableHead>danceability</TableHead>
          <TableHead>energy</TableHead>
          <TableHead>loudness</TableHead>
          <TableHead>speechiness</TableHead>
          <TableHead>acousticness</TableHead>
          <TableHead>instrumentalness</TableHead>
          <TableHead>liveness</TableHead>
          <TableHead>valence</TableHead>

          <TableHead className="text-right">Duration</TableHead>
        </TableRow>
      </TableHeader>
    </>
  );
};
