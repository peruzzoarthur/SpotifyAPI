import { formatDuration } from "../../utils";

interface RecomendationTracksCardProps {
  imageUrl: string;
  // audioFeatures: AudioFeatures | undefined;
  name: string | undefined;
  artists: string | undefined;
  duration: number;
  order: number;
  // popularity: number;
  // id: string;
  handleRemoveFromCart: () => void;
}

function RecommendationTracksCard({
  imageUrl,
  name,
  artists,
  duration,
  order,
  handleRemoveFromCart,
}: // popularity,
// id,
RecomendationTracksCardProps) {
  return (
    <div
      className="flex flex-col pt-4  m-4 items-center w-64 h-128
     text-slate-200 bg-slate-400 bg-opacity-30 drop-shadow-lg rounded-lg 
     hover:bg-green-200 hover:bg-opacity-30 hover:shadow-md duration-500 ease-in-out"
    >
      <img src={imageUrl} alt={name} className="mb-4 w-48 " />

      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-base">{artists}</p>
      <p className="text-base">{formatDuration(duration)}</p>

      {/* <div className="flex flex-grow justify-end">
        (
          <div className="grid grid-cols-2 mt-4">
          <p>{popularity}</p>
          </div>
          )
        </div> */}
      <button
        className="bg-red-800 bg-opacity-60 rounded-md w-20  mt-1 mb-1 "
        onClick={handleRemoveFromCart}
      >
        Remove
      </button>
    </div>
  );
}

export default RecommendationTracksCard;
