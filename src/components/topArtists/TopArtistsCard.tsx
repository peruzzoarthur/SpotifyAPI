import { Image } from "@spotify/web-api-ts-sdk";

export interface TopArtistsCardProps {
  image: Image[];
  name: string;
  id: string;
  genres: string;
  handleAddToCart?: () => void;
}

function TopArtistsCard({
  image,
  name,
  genres,
  handleAddToCart,
}: TopArtistsCardProps) {
  return (
    <>
      <div
        className="flex flex-col pt-4  m-4 items-center w-64
     text-slate-200 bg-slate-400 bg-opacity-30 drop-shadow-lg rounded-lg 
     hover:bg-purple-200 hover:bg-opacity-30 hover:shadow-md duration-500 ease-in-out"
      >
        <img className="h-48 w-48 rounded-full" src={image[0].url} alt={name} />
        <div className="flex flex-col ml-4">
          <p className="mt-1">{name}</p>
          <p className="mt-0.5 text-sm text-slate-300">
            {genres ? `[${genres}]` : `No genre informed for this artist.`}
          </p>
        </div>
        <div className="flex-grow"></div>
        <button
          className="ml-2 mt-2 mb-2 bg-emerald-300 bg-opacity-30 rounded-lg h-6 w-24"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </>
  );
}
export default TopArtistsCard;
