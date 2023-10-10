import { AudioFeatures } from "@spotify/web-api-ts-sdk";
import DancingSVG from "../../styles/svg/DancingSVG";
import LoudSVG from "../../styles/svg/LoudSVG";
import { MainWithBackground } from "../";

interface TrackInfoCardProps {
  imageUrl: string;
  audioFeatures: AudioFeatures | undefined;
  trackName: string | undefined;
  artists: string | undefined;
  album: string | undefined;
}

function TrackInfoCard({
  imageUrl,
  audioFeatures,
  trackName,
  artists,
  album,
}: TrackInfoCardProps) {
  const sortOptions = [
    { key: "danceability", icon: <DancingSVG /> },
    { key: "energy", icon: <DancingSVG /> },
    { key: "loudness", icon: <LoudSVG /> },
    { key: "speechiness", icon: <DancingSVG /> },
    { key: "acousticness", icon: <DancingSVG /> },
    { key: "instrumentalness", icon: <DancingSVG /> },
    { key: "liveness", icon: <DancingSVG /> },
    { key: "valence", icon: <DancingSVG /> },
  ];

  const filteredAudioFeatures = audioFeatures
    ? Object.fromEntries(
        Object.entries(audioFeatures).filter(([key]) =>
          sortOptions.map((option) => option.key).includes(key)
        )
      )
    : {};

  return (
    <MainWithBackground>
      <div className="flex flex-col items-center  text-slate-100 bg-white bg-opacity-20  drop-shadow-lg rounded-lg p-4">
        <img src={imageUrl} alt={trackName} className="mb-4 w-96 " />

        <h2 className="text-2xl font-bold">{trackName}</h2>
        <p className="">{artists}</p>
        <p className="text-gray-500 mb-2">Album: {album}</p>

        {Object.entries(filteredAudioFeatures).length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {sortOptions.map(({ key, icon }) => (
              <div key={key} className="text-left flex items-center">
                {icon}
                <div>
                  <p className="font-bold">{key}</p>
                  <p>{filteredAudioFeatures[key]}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainWithBackground>
  );
}

export default TrackInfoCard;
