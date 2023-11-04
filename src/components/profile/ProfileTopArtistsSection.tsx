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
      <div className="flex flex-col items-start mt-8 ml-6 sm:flex-row sm:flex-wrap sm:mt-8 sm:ml-16">
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
