import { Image } from "@spotify/web-api-ts-sdk";

export interface TopArtistsCardProps {
  image: Image[];
  name: string;
  id: string;
  genres: string;
  handleAddToCart?: () => void;
  index: number;
}

function TopArtistsCard({
  image,
  name,
  genres,
  handleAddToCart,
  index,
}: TopArtistsCardProps) {
  return (
    <>
      <div
        key={index}
        className="flex flex-col pt-4 m-4 items-center w-300 h-400
     text-slate-300 bg-slate-900 bg-opacity-80
     hover:bg-purple-950 hover:bg-opacity-40 drop-shadow-lg rounded-lg 
     hover:shadow-md duration-500 ease-in-out"
      >
        <div className="flex flex-col items-center hover:pt-2">
          <img
            className="mt-10 h-48 w-48 rounded-full"
            src={image[0].url}
            alt={name}
          />
          <h2 className="mt-2 text-xl font-bold items-center text-center">
            {name}
          </h2>
          <p className="mt-0.5 text-xs text-center text-slate-200">
            {genres ? `[${genres}]` : `No genre informed for this artist.`}
          </p>
        </div>
        <div className="flex-grow"></div>
        <button
          className="mb-4 bg-emerald-300 bg-opacity-30 rounded-lg h-6 w-24"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </>
  );
}
export default TopArtistsCard;
