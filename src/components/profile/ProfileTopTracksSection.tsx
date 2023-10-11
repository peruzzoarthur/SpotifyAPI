import { Track } from "@spotify/web-api-ts-sdk";
import ProfileTopTracksCard from "./ProfileTopTracksCard";
import { Link } from "react-router-dom";

interface ProfileTopTracksSectionProps {
  topTracks: Track[];
}

function ProfileTopTracksSection({ topTracks }: ProfileTopTracksSectionProps) {
  return (
    <>
      <section className="bg-white bg-opacity-20 w-full h-auto pb-2">
        <h1 className="text-white text-8xl pt-4 pl-2 mb-2 ml-4">Top tracks</h1>
        <section className=" w-full h-auto pb-2">
          <div className="grid grid-cols-1 ml-5 ">
            {topTracks.map((track, index) => (
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
