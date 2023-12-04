import { client_id, redirect_url, scopes } from "@/spotify";
import { useSpotify } from "./useSpotify";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export const useSdk = () => {
  return useSpotify(client_id, redirect_url, scopes) as SpotifyApi;
};
