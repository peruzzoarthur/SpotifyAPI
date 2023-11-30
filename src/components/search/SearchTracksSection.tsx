import { Track } from "@spotify/web-api-ts-sdk";
import React from "react";
import { TrackCardWithAddButton } from "../TrackCard";

type SearchTracksSectionProps = {
  tracks: Track[];
};

export const SearchTracksSection: React.FC<SearchTracksSectionProps> = ({
  tracks,
}: SearchTracksSectionProps) => {
  return (
    <>
      <div className="flex flex-col items-start justify-center mt-8">
        <h2 className="ml-6 text-5xl text-left text-white">Tracks</h2>
        <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {tracks.map((t, index) => (
            <TrackCardWithAddButton
              key={index}
              artists={t.artists.map((a) => a.name).join(", ")}
              name={t.name}
              image={t.album.images}
            />
          ))}
        </div>
      </div>
    </>
  );
};
