import React from "react";
import Logo from "../Logo";
import { useAlbumByIdGetInfo } from "@/hooks/useAlbumByIdGetInfo";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

type AlbumByIdHeaderProps = {
  sdk: SpotifyApi;
};

export const AlbumByIdHeader: React.FC<AlbumByIdHeaderProps> = ({ sdk }) => {
  const { data } = useAlbumByIdGetInfo({ sdk });

  return (
    <div className="flex flex-col bg-black bg-opacity-30 h-320">
      <Logo />
      <h1>{data?.name}</h1>
    </div>
  );
};
