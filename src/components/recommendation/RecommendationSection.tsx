import { useContext } from "react";
import { CartContext, CartItem } from "./Recommendation";
import { Artist, Track } from "@spotify/web-api-ts-sdk";
import RecommendationTracksCard from "./RecommendationTracksCard";

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
        <div className="grid grid-cols-5 grid-flow-row-dense ml-6 mr-6">
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

              {isArtist(item) && <p>Artist: {item.name}</p>}
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
