import { useContext, useState } from "react";
import LikedSongsTracksCard from "./LikedSongsTracksCard";
// import { Link } from "react-router-dom";
import { TrackWithAudioFeatures } from "../../pages/LikedSongs";
import LikedSongsExpandedTracksCard from "./LikedSongsExpandedTracksCard";
import { CartContext } from "../recommendation/RecommendationContext";
import { Button } from "../ui/button";

interface LikedSongsTracksSectionProps {
  tracks: TrackWithAudioFeatures[] | null;
}

function LikedSongsTracksSection({ tracks }: LikedSongsTracksSectionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (track: TrackWithAudioFeatures) => {
    addToCart(track);
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="bg-slate-950 bg-opacity-80">
        <section className="w-full h-auto pb-2 bg-white bg-opacity-20">
          <div className="flex flex-col items-center justify-center pt-4 pb-2 pl-4 pr-4">
            <h1 className="pt-4 pl-2 mb-2 ml-4 text-center text-white text-8xl">
              💚 💚 💚
            </h1>

            <Button
              className="text-white bg-slate-900 bg-opacity-60"
              onClick={handleClick}
            >
              Expand
            </Button>
          </div>
          <section className="w-full h-auto pb-2">
            {!isExpanded ? (
              <div className="grid grid-cols-1 ml-5 place-self-stretch">
                {tracks?.map((track, index) => (
                  // <Link to={`/track/${track.id}`} key={index}>
                  <LikedSongsTracksCard
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
                  // </Link>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 ml-5">
                {tracks?.map((track, index) => (
                  // <Link to={`/track/${track.id}`} key={index}>
                  <LikedSongsExpandedTracksCard
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
                  // </Link>
                ))}
              </div>
            )}
          </section>
        </section>
      </div>
    </>
  );
}

export default LikedSongsTracksSection;
