import { useSpotify } from "../hooks/useSpotify";
import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import { client_id, redirect_url, scopes } from "../spotify";
import { Profile } from "./Profile";
import { Login } from "./Login";
import { useQuery } from "@tanstack/react-query";
import { SpotifyError } from "@/CustomError";

export const Home = () => {
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

  if (error) {
    return (
      <div>
        {error.message} {error.status}
      </div>
    );
  }

  return (
    <div>
      <div className="App">
        <header className="App-header">
          {!data ? (
            <Login />
          ) : (
            <>{isFetching ? <div>Loading...</div> : <Profile />}</>
          )}
        </header>
      </div>
    </div>
  );
};
