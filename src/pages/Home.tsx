import { useSpotify } from "../hooks/useSpotify";
import { UserProfile } from "@spotify/web-api-ts-sdk";
import { client_id, redirect_url, scopes } from "../spotify";
import { Profile } from "./Profile";
import { Login } from "./Login";
import { useQuery } from "@tanstack/react-query";
import { CustomError, SpotifyError } from "@/CustomError";

export const Home = () => {
  const sdk = useSpotify(client_id, redirect_url, scopes);

  const { data, error, isFetching } = useQuery<UserProfile, SpotifyError>({
    queryKey: ["profile-first-login"],
    queryFn: async () => {
      if (!sdk) {
        throw new CustomError("Authentication Problem", 401);
      }
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
