import { useContext } from "react";
import { CartContext, CartItem } from "./Recommendation";
import { Album, Artist, Track } from "@spotify/web-api-ts-sdk";
import RecommendationTracksCard from "./RecommendationTracksCard";

function RecommendationSection() {
  const { cart, removeFromCart } = useContext(CartContext);

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
  };

  return (
    <>
      <div className="bg-slate-400">
        <h2>Your Recommended Items:</h2>

        {cart.map((item, index) => (
          <div key={index}>
            {isTrack(item) && (
              <RecommendationTracksCard
                imageUrl={item.album.images[0].url}
                name={item.name}
                duration={item.duration_ms}
                order={index + 1}
                artists={item.artists.map((artist) => artist.name).join(", ")}
                handleRemoveFromCart={() => handleRemoveFromCart(item.id)}
              />
            )}

            {isAlbum(item) && <p>Album: {item.name}</p>}
            {isArtist(item) && <p>Artist: {item.name}</p>}
          </div>
        ))}
      </div>
    </>
  );
}

// Type guards
function isTrack(item: CartItem): item is Track {
  return (item as Track).type === "track";
}

function isAlbum(item: CartItem): item is Album {
  return (item as Album).type === "album";
}

function isArtist(item: CartItem): item is Artist {
  return (item as Artist).type === "artist";
}

export default RecommendationSection;
