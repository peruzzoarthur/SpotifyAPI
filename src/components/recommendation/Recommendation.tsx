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

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const storedCart = localStorage.getItem("cart");
  const [cart, setCart] = useState<CartItem[]>(
    storedCart ? JSON.parse(storedCart) : []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const message = `Item with ID ${item.id} already exists in the cart.`;
      window.alert(message);
    } else {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
