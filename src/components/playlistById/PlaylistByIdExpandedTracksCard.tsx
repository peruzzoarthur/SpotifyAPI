import { AudioFeatures } from "@spotify/web-api-ts-sdk";
import { formatDuration } from "../../utils";

export interface TrackInfoCardProps {
  imageUrl: string;
  audioFeatures: AudioFeatures | undefined;
  name: string | undefined;
  artists: string | undefined;
  duration: number;
  order: number;
  popularity: number;
  id: string;
  handleAddToCart: () => void;
}
function PlaylistByIdExpandedTracksCard({
  imageUrl,
  audioFeatures,
  name,
  artists,
  duration,
  order,
  popularity,
  handleAddToCart,
}: TrackInfoCardProps) {
  const sortOptions = [
    { key: "danceability", icon: "💃🕺" },
    { key: "energy", icon: "🧨" },
    { key: "loudness", icon: "🔊" },
    { key: "speechiness", icon: "🗣️" },
    { key: "acousticness", icon: "🎻" },
    { key: "instrumentalness", icon: "🎷" },
    { key: "liveness", icon: "🔆" },
    { key: "valence", icon: "🎭" },
  ];

  const filteredAudioFeatures = audioFeatures
    ? Object.fromEntries(
        Object.entries(audioFeatures).filter(([key]) =>
          sortOptions.map((option) => option.key).includes(key)
        )
      )
    : {};

  return (
    <div className="flex flex-row items-center justify-center pt-4 pl-10 m-4 duration-500 ease-in-out rounded-lg h-52 text-slate-200 bg-slate-900 bg-opacity-30 drop-shadow-lg min-w-1280 hover:bg-green-200 hover:bg-opacity-30 hover:shadow-md">
      <div className="absolute left-0 flex flex-row pl-4">
        <p className="ml-4 text-lg">{order}</p>
      </div>

      <img src={imageUrl} alt={name} className="w-48 mb-4 ml-10" />
      <div className="flex flex-col ml-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-base">{artists}</p>
        <p className="text-base">{formatDuration(duration)}</p>
      </div>

      <div className="flex justify-end flex-grow">
        {Object.entries(filteredAudioFeatures).length > 0 && (
          <div className="grid grid-cols-10 pl-16 mt-4">
            {sortOptions.map(({ key, icon }) => (
              <div
                key={key}
                className="flex flex-col items-center pb-2 text-center"
              >
                <p className="text-3xl">{icon}</p>
                <div className="mt-1 mb-1">
                  <p className="text-sm">{key}</p>
                  <p className="text-sm">{filteredAudioFeatures[key]}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex pr-6">
          <p className="mt-10 mr-10">Popularity: {popularity}</p>
          <button
            className="w-32 h-10 mt-10 bg-green-400 rounded-full bg-opacity-10 font-sm"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaylistByIdExpandedTracksCard;
