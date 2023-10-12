import { useState } from "react";
import LikedSongsTracksCard from "./LikedSongsTracksCard";
import { Link } from "react-router-dom";
import { TrackWithAudioFeatures } from "../../pages/LikedSongs";

interface LikedSongsTracksSectionProps {
  tracks: TrackWithAudioFeatures[];
}

function LikedSongsTracksSection({ tracks }: LikedSongsTracksSectionProps) {
  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  // Use the selected pageSize to slice the array
  const displayedTracks = tracks.slice(0, pageSize);

  return (
    <>
      <section className="bg-white bg-opacity-20 w-full h-auto pb-2">
        <div className="flex items-center justify-center pl-4 pr-4 pt-4 pb-2">
          <h1 className="text-white text-center text-8xl pt-4 pl-2 mb-2 ml-4">
            💚 💚 💚
          </h1>
          <div>
            <label>Select Page Size: </label>
            <select
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
              <option value={tracks.length}>All Tracks</option>
            </select>
          </div>
        </div>
        <section className="w-full h-auto pb-2">
          <div className="grid grid-cols-1 ml-5">
            {displayedTracks.map((track, index) => (
              <Link to={`/track/${track.id}`} key={index}>
                <LikedSongsTracksCard
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

export default LikedSongsTracksSection;
