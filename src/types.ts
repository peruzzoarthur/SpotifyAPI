import { Image } from "@spotify/web-api-ts-sdk";
import { AudioFeatures } from "./components/recommendation/types";

//  Props

export type TrackProps = {
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
  audio_features?: AudioFeatures;
  popularity: number;
};

export type ArtistProps = {
  image: Image[];
  name: string;
  order?: number;
  artists?: string;
  id?: string;
  handleAddToCart?: () => void;
  handleRemoveFromCart?: () => void;
  handleClick?: () => void;
  index?: number;
  uri?: string;
  genres: string;
};

export type PlaylistProps = {
  image: Image[];
  name: string;
  totalTracks: number | undefined;
};

export interface CustomError extends Error {
  response?: {
    status: number;
  };
}