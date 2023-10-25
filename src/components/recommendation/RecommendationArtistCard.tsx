import { Image } from "@spotify/web-api-ts-sdk";

export interface RecomendationArtistCardProps {
  image: Image[];
  name: string;
  id: string;
  genres: string;
  handleRemoveFromCart: () => void;
  index: number;
}

function RecommendationArtistCard({
  image,
  name,
  genres,
  index,
  handleRemoveFromCart,
}: RecomendationArtistCardProps) {
  return (
    <div
      key={index}
      className="flex flex-col pt-4 m-4 items-center w-300 h-400
     text-slate-200 bg-slate-400 bg-opacity-30 drop-shadow-lg rounded-lg 
     hover:bg-purple-200 hover:bg-opacity-30 hover:shadow-md duration-500 ease-in-out"
    >
      <div className="flex flex-col items-center hover:pt-2">
        <img
          src={image[0].url}
          alt={name}
          className="mt-6 mb-4 w-48 h-48 rounded-full"
        />
        <h2 className="text-xl font-bold items-center text-center">{name}</h2>
        <p className="mt-0.5 text-xs text-center text-slate-300">
          {genres ? `[${genres}]` : `No genre informed for this artist.`}
        </p>
      </div>

      <button
        className="bg-red-800 bg-opacity-60 rounded-md w-20  mt-5 mb-1 "
        onClick={handleRemoveFromCart}
      >
        Remove
      </button>
    </div>
  );
}

export default RecommendationArtistCard;