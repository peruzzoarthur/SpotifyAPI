import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { Link } from "react-router-dom";
import { PlaylistCard } from "../PlaylistCard";
import React from "react";

interface PlaylistSectionProps {
  playlists: SimplifiedPlaylist[];
}

export const PlaylistsSection: React.FC<PlaylistSectionProps> = ({
  playlists,
}) => {
  return (
    <>
      <div className="pt-8 pb-4 min-h-640">
        <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {playlists.map((playlist, index) => (
            <Link key={index} to={`/playlists/${playlist.id}`}>
              <PlaylistCard
                image={playlist.images}
                name={playlist.name}
                totalTracks={playlist.tracks?.total}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
