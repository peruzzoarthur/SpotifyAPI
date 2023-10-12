import { Track } from "@spotify/web-api-ts-sdk";
import ProfileTopTracksCard from "./ProfileTopTracksCard";
import { Link } from "react-router-dom";
import ProfileShowAllButton from "./ProfileShowAllButton";

interface ProfileTopTracksSectionProps {
  topTracks: Track[];
}

function ProfileTopTracksSection({ topTracks }: ProfileTopTracksSectionProps) {
  const top10Tracks = topTracks.slice(0, 10);

  return (
    <>
      <section className="bg-white bg-opacity-20 w-full h-auto pb-2">
        <div className="flex items-center justify-between pl-4 pr-4 pt-4 pb-2">
          <h1 className="text-indigo-500 text-8xl pt-2 mb-2">Top Tracks</h1>
          <ProfileShowAllButton url={`/tracks/`} />
        </div>
        <section className=" w-full h-auto pb-2">
          <div className="grid grid-cols-1 ml-5 ">
            {top10Tracks.map((track, index) => (
              <Link to={`/track/${track.id}`}>
                <ProfileTopTracksCard
                  key={index}
                  image={track.album.images}
                  name={track.name}
                  duration={track.duration_ms}
                  order={index + 1}
                  artists={track.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                />
              </Link>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

export default ProfileTopTracksSection;
