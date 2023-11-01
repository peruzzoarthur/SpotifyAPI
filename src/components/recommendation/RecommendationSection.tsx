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
      <div className="pt-2 bg-slate-800 ">
        <h2 className="ml-4 text-3xl text-white">
          Input Data for Recommendations
        </h2>
        <div className="grid grid-flow-row-dense grid-cols-1 mt-5 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
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
