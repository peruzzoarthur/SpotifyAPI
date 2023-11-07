import React from "react";
import { Artist } from "@spotify/web-api-ts-sdk";
import { ArtistCard } from "../ArtistCard";
import { ShowAllButton } from "../ShowAllButton";

type ProfileTopArtistsSectionProps = {
  topArtists: Artist[];
};

export const ProfileTopArtistsSection: React.FC<
  ProfileTopArtistsSectionProps
> = ({ topArtists }: ProfileTopArtistsSectionProps) => {
  return (
    <>
      <div className="flex flex-col items-start justify-center mt-8">
        <h2 className="ml-6 text-5xl text-left text-white">Top Artists</h2>
        <ShowAllButton url="/top-artists" />
      </div>
      <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
        {topArtists.map((artist, index) => (
          <div key={index} className="mb-4 mr-4">
            <ArtistCard
              genres={artist.genres.join(",")}
              image={artist.images}
              name={artist.name}
            />
          </div>
        ))}
      </div>
    </>
  );
};
