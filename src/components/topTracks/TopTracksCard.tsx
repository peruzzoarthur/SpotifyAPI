interface TopTracksCardProps {
  image: string;
  name: string | undefined;
  artists: string | undefined;
  index: number;
  id: string;

  handleAddToCart: () => void;
}

function TopTracksCard({
  image,
  name,
  artists,
  index,
  handleAddToCart,
  id,
}: TopTracksCardProps) {
  return (
    <div
      key={index}
      className="flex flex-col pt-4 m-4 items-center w-300 h-400
     text-slate-200 bg-slate-400 bg-opacity-30 drop-shadow-lg rounded-lg 
     hover:bg-purple-200 hover:bg-opacity-30 hover:shadow-md duration-500 ease-in-out"
    >
      <div className="flex flex-col items-center hover:pt-2">
        <img src={image} alt={name} className="mt-6 mb-4 w-48 " />
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm">{artists}</p>
      </div>

      <button
        className="bg-emerald-800 bg-opacity-60 rounded-md w-24 mt-6 mb-1 "
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default TopTracksCard;
