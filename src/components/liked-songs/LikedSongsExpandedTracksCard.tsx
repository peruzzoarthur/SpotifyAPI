import { AudioFeatures } from "@spotify/web-api-ts-sdk";
import { formatDuration } from "../../utils";

interface TrackInfoCardProps {
  imageUrl: string;
  audioFeatures: AudioFeatures | undefined;
  name: string | undefined;
  artists: string | undefined;
  //   album: string | undefined;
  duration: number;
  order: number;
  popularity: number;
}

function LikedSongsExpandedTracksCard({
  imageUrl,
  audioFeatures,
  name,
  artists,
  //   album,
  duration,
  order,
  popularity,
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
    <div
      className="flex flex-row pt-4  m-4 items-center w-640 h-52
     text-slate-200 bg-slate-900 bg-opacity-30 drop-shadow-lg rounded-lg min-w-1280
     hover:bg-green-200 hover:bg-opacity-30 hover:shadow-md duration-500 ease-in-out"
    >
      <div className="flex flex-row absolute left-0">
        <p className="ml-4 text-lg">{order}</p>
      </div>

      <img src={imageUrl} alt={name} className="mb-4 w-48 ml-10" />
      <div className="flex flex-col ml-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-base">{artists}</p>
        <p className="text-base">{formatDuration(duration)}</p>
      </div>

      <div className="flex flex-grow justify-end">
        {Object.entries(filteredAudioFeatures).length > 0 && (
          <div className="grid grid-cols-9 mt-4">
            <p>{popularity}</p>
            {sortOptions.map(({ key, icon }) => (
              <div
                key={key}
                className="flex flex-col items-center text-center pb-2"
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
      </div>
    </div>
  );
}

export default LikedSongsExpandedTracksCard;
