import { useContext, useState } from "react";
import TrackCard from "./PlaylistByIdTracksCard";
// import { Link } from "react-router-dom";
import ExpandedTrackCard from "./PlaylistByIdExpandedTracksCard";
import { CartContext } from "../recommendation/Recommendation";
import { Track } from "@spotify/web-api-ts-sdk";
import { TrackWithAudioFeatures } from "../../pages/LikedSongs";

interface PlaylistByIdTracksSectionProps {
  tracks: TrackWithAudioFeatures[] | null;
}
function PlaylistByIdTracksSection({ tracks }: PlaylistByIdTracksSectionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (track: TrackWithAudioFeatures) => {
    addToCart(track as Track);
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="bg-slate-950 bg-opacity-80">
        <section className="bg-white bg-opacity-20 w-full h-auto pb-2">
          <div className="flex flex-col justify-center items-center pl-4 pr-4 pt-4 pb-2">
            <h1 className="text-white  text-center text-8xl pt-4 pl-2 mb-2 ml-4">
              Your playlist tracks xD
            </h1>
            <button
              className="bg-slate-900 text-white bg-opacity-60 shadow-xl w-40 h-6 rounded-lg "
              onClick={handleClick}
            >
              Expand Tracks Info
            </button>
          </div>
          <section className="w-full h-auto pb-2">
            {!isExpanded ? (
              <div className="grid grid-cols-1 ml-5">
                {tracks?.map((track, index) => (
                  <TrackCard
                    key={index}
                    index={index}
                    id={track.id}
                    image={track.album.images}
                    name={track.name}
                    duration={track.duration_ms}
                    order={index + 1}
                    artists={track.artists
                      .map((artist) => artist.name)
                      .join(", ")}
                    handleAddToCart={() => handleAddToCart(track)}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 ml-5 grid-flow-row-dense">
                {tracks?.map((track, index) => (
                  <ExpandedTrackCard
                    key={index}
                    imageUrl={track.album.images[0].url}
                    name={track.name}
                    duration={track.duration_ms}
                    order={index + 1}
                    artists={track.artists
                      .map((artist) => artist.name)
                      .join(", ")}
                    audioFeatures={track.audio_features}
                    popularity={track.popularity}
                    id={track.id}
                    handleAddToCart={() => handleAddToCart(track)}
                  />
                ))}
              </div>
            )}
          </section>
        </section>
      </div>
    </>
  );
}

export default PlaylistByIdTracksSection;
