import React from "react";
import Logo from "../Logo";
import { Album } from "@spotify/web-api-ts-sdk";
import { Link } from "react-router-dom";

type AlbumByIdHeaderProps = {
  albumData: Album | undefined;
};

export const AlbumByIdHeader: React.FC<AlbumByIdHeaderProps> = ({
  albumData,
}) => {
  return (
    <>
      <div className="flex flex-col pt-2 pb-2 bg-black bg-opacity-30">
        <Logo />
        <div className="flex flex-row">
          <img
            src={albumData?.images[0].url}
            className="ml-4 rounded-sm w-72 h-72"
          />
          <div className="flex flex-col items-start justify-center h-full mt-16 mb-2 ml-6">
            <h1 className="mt-16 ml-3 text-6xl text-white">
              {albumData?.name}
            </h1>
            <div>
              <div className="mt-2 ml-4 text-lg text-white">
                {albumData?.artists.map((a) => a.name).join(", ")}
              </div>
            </div>

            <div className="flex flex-row ml-5 text-xs text-slate-100">
              <Link to={"/profile"}>
                <p className="mr-2">Profile</p>
              </Link>

              <Link to={"/playlists"}>
                <p>/ Albums</p>
              </Link>
              <p className="ml-2">/ {albumData?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
