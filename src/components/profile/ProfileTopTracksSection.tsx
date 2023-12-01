import React from "react";
import { Track } from "@spotify/web-api-ts-sdk";
import { TrackCard } from "../TrackCard";
import { ShowAllButton } from "../ShowAllButton";

type ProfileTopTracksSectionProps = {
  topTracks: Track[] | undefined;
};

export const ProfileTopTracksSection: React.FC<
  ProfileTopTracksSectionProps
> = ({ topTracks }: ProfileTopTracksSectionProps) => {
  return (
    <>
      <div className="flex flex-col items-start justify-center mt-8">
        <h2 className="ml-6 text-5xl text-left text-white">Top Tracks</h2>
        <ShowAllButton url="/top-tracks" />
      </div>
      <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
        {topTracks?.map((track, index) => (
          <div key={index} className="mb-4 mr-4">
            <TrackCard
              artists={track.artists.map((a) => a.name).join(", ")}
              image={track.album.images}
              name={track.name}
              duration={track.duration_ms}
              popularity={track.popularity}
            />
          </div>
        ))}
      </div>
    </>
  );
};
