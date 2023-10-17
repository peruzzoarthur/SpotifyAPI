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
      <button
        className="bg-green-400 bg-opacity-10 rounded-full"
        onClick={handleRemoveFromCart}
      >
        Remove from Cart
      </button>

      {/* <div className="flex flex-grow justify-end">
        (
        <div className="grid grid-cols-2 mt-4">
          <p>{popularity}</p>
        </div>
        )
      </div> */}
    </div>
  );
}

export default RecommendationTracksCard;
