import React from "react";
import { SavedAlbum } from "@spotify/web-api-ts-sdk";
import { AlbumCard } from "../AlbumCard";
import { ShowAllButton } from "../ShowAllButton";

type ProfileSavedAlbumsSectionProps = {
  savedAlbum: SavedAlbum[];
};

export const ProfileSavedAlbumsSection: React.FC<
  ProfileSavedAlbumsSectionProps
> = ({ savedAlbum }: ProfileSavedAlbumsSectionProps) => {
  return (
    <>
      <div className="flex flex-row items-start justify-between mt-6">
        <h2 className="justify-start ml-12 text-5xl text-left text-white">
          Saved Albums
        </h2>
        <ShowAllButton
          className="mt-4 mr-12 bg-black hover:bg-opacity-60"
          url="/albums"
        />
      </div>
      <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
        {savedAlbum.map((sa, index) => (
          <div key={index} className="mb-4 mr-4">
            <AlbumCard
              artists={sa.album.artists}
              id={sa.album.id}
              images={sa.album.images}
              name={sa.album.name}
            />
          </div>
        ))}
      </div>
    </>
  );
};
