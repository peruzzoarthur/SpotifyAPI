import { useContext } from "react";
import { CartContext } from "../recommendation/Recommendation";
import { TopArtistsCard } from ".";
import { Artist } from "@spotify/web-api-ts-sdk";

interface TopArtistsSectionProps {
  artists: Artist[];
}

function TopArtistsSection({ artists }: TopArtistsSectionProps) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (artist: Artist) => {
    addToCart(artist);
  };

  return (
    <>
      <div className="bg-black bg-opacity-50 ">
        <section className="bg-white bg-opacity-20 w-full h-auto pb-2">
          <div className="flex flex-col justify-center items-center pl-4 pr-4 pt-4 pb-2"></div>
          <section className="w-full h-auto pb-2">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3
         xl:grid-cols-5 2xl:grid-cols-5 grid-flow-row-dense ml-5 mr-5 mt-5  "
            >
              {artists?.map((artist, index) => (
                <TopArtistsCard
                  key={index}
                  id={artist.id}
                  image={artist.images}
                  name={artist.name}
                  genres={artist.genres.join(", ")}
                  handleAddToCart={() => handleAddToCart(artist)}
                  index={index}
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
