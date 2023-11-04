import React from "react";
import { Track } from "@spotify/web-api-ts-sdk";
import { TrackCard } from "../TrackCard";
import { ShowAllButton } from "../ShowAllButton";

type ProfileTopTracksSectionProps = {
  topTracks: Track[];
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
      <div className="flex flex-col items-start mt-8 ml-6 sm:flex-row sm:flex-wrap sm:mt-8 sm:ml-16">
        {topTracks.map((track, index) => (
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
