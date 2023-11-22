import { client_id, redirect_url, scopes } from "@/spotify";
import { useSpotify } from "./useSpotify";
import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import { useQuery } from "@tanstack/react-query";
import { SpotifyError } from "@/CustomError";

export const useUserProfile = () => {
  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;
  const { data, error, isFetching } = useQuery<UserProfile, SpotifyError>({
    queryKey: ["home"],
    queryFn: async () => {
      const fetchProfile = await sdk.currentUser.profile();
      return fetchProfile;
    },
    enabled: !!sdk,
    throwOnError: true,
  });

  return { data, error, isFetching };
};
