import { Track, Album, Artist } from "@spotify/web-api-ts-sdk";
import { createContext, useState, FC, ReactNode, useEffect } from "react";
import { TrackWithAudioFeatures } from "../../pages/LikedSongs";
import { LikedSongsTracksCardProps } from "../liked-songs/LikedSongsTracksCard";
import { TrackInfoCardProps } from "../liked-songs/LikedSongsExpandedTracksCard";

export type CartItem =
  | Track
  | Album
  | Artist
  | TrackWithAudioFeatures
  | LikedSongsTracksCardProps
  | TrackInfoCardProps;

interface RequestForRec {
  seed_tracks: string[];
  seed_genres: string[];
  seed_artists: string[];
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  requestForRec: RequestForRec;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  requestForRec: {
    seed_tracks: [],
    seed_genres: [],
    seed_artists: [],
  },
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const storedCart = localStorage.getItem("cart");
  const requestForRecommendations = localStorage.getItem("reqForRec");
  const [cart, setCart] = useState<CartItem[]>(
    storedCart ? JSON.parse(storedCart) : []
  );
  const [requestForRec, setRequestForRec] = useState<RequestForRec>(
    requestForRecommendations
      ? JSON.parse(requestForRecommendations)
      : {
          seed_tracks: [],
          seed_genres: [],
          seed_artists: [],
        }
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("reqForRec", JSON.stringify(requestForRec));
  }, [cart, requestForRec]);

  const addToCart = (item: CartItem) => {
    if (isTrack(item)) {
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        const message = `Track with ID ${item.id} already exists in the Recommendation Input Cart.`;
        window.alert(message);
      } else {
        if (cart.length >= 5) {
          window.alert(
            "Already have 5 items as seed to get your recommendations, consider deleting one of the already listed seeds"
          );
        } else {
          setCart([...cart, item]);
          requestForRec.seed_tracks.push(item.id);
        }
      }
    }
    if (isArtist(item)) {
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        const message = `Artist with ID ${item.id} already exists in the Recommendation Input Cart.`;
        window.alert(message);
      } else {
        if (cart.length >= 5) {
          window.alert(
            "Already have 5 items as seed to get your recommendations, consider deleting one of the already listed seeds"
          );
        } else {
          setCart([...cart, item]);
          requestForRec.seed_artists.push(item.id);
        }
      }
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart) as CartItem[];
      const updatedCart = parsedCart.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    const requestForRecommendations = localStorage.getItem("reqForRec");
    if (requestForRecommendations) {
      const parsedReqForRec = JSON.parse(
        requestForRecommendations
      ) as RequestForRec;
      const updatedReqForRec = {
        seed_tracks: parsedReqForRec.seed_tracks.filter((id) => id !== itemId),
        seed_genres: parsedReqForRec.seed_genres,
        seed_artists: parsedReqForRec.seed_artists.filter(
          (id) => id !== itemId
        ),
      };
      localStorage.setItem("reqForRec", JSON.stringify(updatedReqForRec));
    }

    // todo_add_removal_of_artists_as_well
    setRequestForRec((prevReqForRec: RequestForRec) => ({
      ...prevReqForRec,
      seed_tracks: prevReqForRec.seed_tracks.filter((id) => id !== itemId),
      seed_artists: prevReqForRec.seed_tracks.filter((id) => id !== itemId),
    }));
  };

  function isTrack(item: CartItem): item is Track {
    return (item as Track).type === "track";
  }

  function isArtist(item: CartItem): item is Artist {
    return (item as Artist).type === "artist";
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, requestForRec }}
    >
      {children}
    </CartContext.Provider>
  );
};
