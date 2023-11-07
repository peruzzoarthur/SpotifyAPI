import { Playlist } from "@spotify/web-api-ts-sdk";
import React from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";

interface PlaylistByIdHeaderProps {
  playlistData: Playlist;
}

export const PlaylistByIdHeader: React.FC<PlaylistByIdHeaderProps> = ({
  playlistData,
}) => {
  return (
    <div className="flex flex-col bg-black bg-opacity-50 ">
      <Logo />

      <div className="flex flex-row">
        <img
          src={playlistData.images[0].url}
          className="w-56 h-56 ml-4 rounded-sm"
        />
        <div className="flex flex-col items-end justify-end h-full mb-24 ml-4">
          <h1 className="ml-3 text-6xl text-white">{playlistData.name}</h1>
          <div>
            <div className="mt-2 ml-4 text-lg text-white">
              {playlistData.description}
            </div>
          </div>

          <div className="flex flex-row ml-5 text-xs text-slate-100">
            <Link to={"/profile"}>
              <p className="mr-2">Profile</p>
            </Link>

            <Link to={"/playlists"}>
              <p>/ Playlists</p>
            </Link>
            <p className="ml-2">/ {playlistData.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
