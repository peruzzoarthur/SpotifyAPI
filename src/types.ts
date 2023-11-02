import { Image } from "@spotify/web-api-ts-sdk";

export interface TrackCardProps {
  image: Image[];
  name: string;
  duration: number;
  order?: number;
  artists: string;
  id: string;
  handleAddToCart?: () => void;
  index: number;
}
