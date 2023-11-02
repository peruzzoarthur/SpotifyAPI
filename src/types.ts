import { Image } from "@spotify/web-api-ts-sdk";

export interface TrackProps {
  image: Image[];
  name: string;
  duration: number;
  order?: number;
  artists: string;
  id?: string;
  handleAddToCart?: () => void;
  handleRemoveFromCart?: () => void;
  handleClick?: () => void;
  index?: number;
  uri?: string;
}
