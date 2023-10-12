import { Image } from "@spotify/web-api-ts-sdk";
import { formatDuration } from "../../utils";

interface LikedSongsTracksCardProps {
  image: Image[];
  name: string;
  duration: number;
  order: number;
  artists: string;
}

function LikedSongsTracksCard({
  image,
  name,
  order,
  duration,
  artists,
}: LikedSongsTracksCardProps) {
  return (
    <>
      <div className="group hover:bg-slate-600 hover:shadow-md min-w-640 transition duration-300 ease-in-out profile-top-track-card flex flex-row text-slate-200 bg-slate-800 bg-opacity-30 drop-shadow-lg rounded-lg p-4 w-auto h-20 mt-4 ml-32 mr-32">
        <p className="mt-4 mr-2 text-xs">{order}</p>
        <img className="max-h-14 max-w-14" src={image[0].url} alt={name} />
        <div className="flex flex-col ml-4">
          <p className="mt-1">{name}</p>
          <p className="mt-1 text-xs text-slate-100">{artists}</p>
        </div>
        <div className="flex-grow"></div>
        <p className="text-end mt-3 ml-2">{formatDuration(duration)}</p>
      </div>
    </>
  );
}
export default LikedSongsTracksCard;
