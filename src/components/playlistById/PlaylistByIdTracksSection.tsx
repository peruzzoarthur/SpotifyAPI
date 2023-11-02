import { useContext, useState } from "react";
import TrackCard from "./PlaylistByIdTracksCard";
// import { Link } from "react-router-dom";
import ExpandedTrackCard from "./PlaylistByIdExpandedTracksCard";
import { CartContext } from "../recommendation/Recommendation";
import { Track } from "@spotify/web-api-ts-sdk";
import { TrackWithAudioFeatures } from "../../pages/LikedSongs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import logo from "../../styles/img/spotify_logologo.jpg";

interface PlaylistByIdTracksSectionProps {
  tracks: TrackWithAudioFeatures[] | null;
}
function PlaylistByIdTracksSection({ tracks }: PlaylistByIdTracksSectionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { addToCart, errorMessage, setErrorMessage } = useContext(CartContext);

  const handleAddToCart = (track: TrackWithAudioFeatures) => {
    addToCart(track as Track);
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsExpanded(!isExpanded);
  };

  const handleErrorMessage: React.MouseEventHandler<HTMLElement> = () => {
    setErrorMessage("");
  };

  return (
    <>
      <div className="bg-slate-950 bg-opacity-80">
        <section className="w-full h-auto pb-2 bg-white bg-opacity-20">
          <div className="flex flex-col items-center justify-center pt-4 pb-2 pl-4 pr-4">
            <h1 className="pt-4 pl-2 mb-2 ml-4 text-center text-white text-8xl">
              Your playlist tracks xD
            </h1>
            <button
              className="w-40 h-6 text-white rounded-lg shadow-xl bg-slate-900 bg-opacity-60 "
              onClick={handleClick}
            >
              Expand Tracks Info
            </button>
            {errorMessage && (
              <Alert
                variant="destructive"
                className="fixed text-white bg-red-800"
              >
                <img className="w-4 h-4" src={logo} />
                <AlertTitle>{errorMessage}</AlertTitle>
                <AlertDescription
                  className="cursor-pointer"
                  onClick={handleErrorMessage}
                >
                  Click to close message.
                </AlertDescription>
              </Alert>
            )}
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
              <div className="grid grid-flow-row-dense grid-cols-1 ml-5">
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
