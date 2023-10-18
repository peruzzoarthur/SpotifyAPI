import { useContext } from "react";
import { CartContext } from "../recommendation/Recommendation";
import { TopArtistsCard } from ".";
import { Artist } from "@spotify/web-api-ts-sdk";

interface LikedSongsTracksSectionProps {
  artists: Artist[] | null;
}

function TopArtistsSection({ artists }: LikedSongsTracksSectionProps) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (artist: Artist) => {
    addToCart(artist);
  };

  return (
    <>
      <div className="bg-slate-950 bg-opacity-80">
        <section className="bg-white bg-opacity-20 w-full h-auto pb-2">
          <div className="flex flex-col justify-center items-center pl-4 pr-4 pt-4 pb-2">
            <h1 className="text-white  text-center text-8xl pt-4 pl-2 mb-2 ml-4">
              Top Artists
            </h1>
          </div>
          <section className="w-full h-auto pb-2">
            <div className="grid grid-cols-3 ml-5">
              {artists?.map((artist, index) => (
                <TopArtistsCard
                  key={index}
                  id={artist.id}
                  image={artist.images}
                  name={artist.name}
                  genres={artist.genres.join(", ")}
                  handleAddToCart={() => handleAddToCart(artist)}
                />
              ))}
            </div>
          </section>
        </section>
      </div>
    </>
  );
}

export default TopArtistsSection;
