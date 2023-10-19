import { useContext } from "react";
import { CartContext, CartItem } from "./Recommendation";
import { Artist, Track } from "@spotify/web-api-ts-sdk";
import RecommendationTracksCard from "./RecommendationTracksCard";
import RecommendationArtistCard from "./RecommendationArtistCard";

function RecommendationSection() {
  const { cart, removeFromCart } = useContext(CartContext);

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
  };

  return (
    <>
      <div className="bg-slate-800 pt-2 ">
        <h2 className="text-white text-3xl ml-4">
          Input Data for Recommendations
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3
         xl:grid-cols-5 2xl:grid-cols-5 grid-flow-row-dense ml-5 mr-5 mt-5  "
        >
          {cart.map((item, index) => (
            <div key={index}>
              {isTrack(item) && (
                <RecommendationTracksCard
                  index={index}
                  imageUrl={item.album.images[0].url}
                  name={item.name}
                  artists={item.artists.map((artist) => artist.name).join(", ")}
                  handleRemoveFromCart={() => handleRemoveFromCart(item.id)}
                />
              )}

              {isArtist(item) && (
                <RecommendationArtistCard
                  genres={item.genres.join(", ")}
                  id={item.id}
                  image={item.images}
                  handleRemoveFromCart={() => handleRemoveFromCart(item.id)}
                  index={index}
                  name={item.name}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Type guards
function isTrack(item: CartItem): item is Track {
  return (item as Track).type === "track";
}

function isArtist(item: CartItem): item is Artist {
  return (item as Artist).type === "artist";
}

export default RecommendationSection;
