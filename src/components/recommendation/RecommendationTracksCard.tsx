interface RecomendationTracksCardProps {
  imageUrl: string;
  name: string | undefined;
  artists: string | undefined;
  index: number;

  handleRemoveFromCart: () => void;
}

function RecommendationTracksCard({
  imageUrl,
  name,
  artists,
  index,
  handleRemoveFromCart,
}: RecomendationTracksCardProps) {
  return (
    <div
      key={index}
      className="flex flex-col pt-4  m-4 items-center w-64 
     text-slate-200 bg-slate-400 bg-opacity-30 drop-shadow-lg rounded-lg 
     hover:bg-purple-200 hover:bg-opacity-30 hover:shadow-md duration-500 ease-in-out"
    >
      <div className="flex flex-col items-center hover:pt-2">
        <img src={imageUrl} alt={name} className="mb-4 w-48 " />
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-base">{artists}</p>
      </div>

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
