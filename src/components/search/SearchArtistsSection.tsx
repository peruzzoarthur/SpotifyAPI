import React from "react";
import { Artist } from "@spotify/web-api-ts-sdk";
import { ArtistCardWithAddButton } from "../ArtistCard";

type SearchArtistsSectionProps = {
  artists: Artist[];
};

export const SearchArtistsSection: React.FC<SearchArtistsSectionProps> = ({
  artists,
}: SearchArtistsSectionProps) => {
  return (
    <>
      <div className="flex flex-col items-start justify-center mt-8">
        <h2 className="ml-6 text-5xl text-left text-white">Artists</h2>
        <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {artists.map((artist, index) => (
            <div key={index} className="mb-4 mr-4">
              <ArtistCardWithAddButton
                genres={artist.genres.join(" • ")}
                image={artist.images}
                name={artist.name}
                id={artist.id}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
