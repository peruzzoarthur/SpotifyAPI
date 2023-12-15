import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { client_id, scopes, callback } from "../spotify";

export const Login = () => {
  const handleLogin = async () => {
    await SpotifyApi.performUserAuthorization(
      client_id,
      "https://spotifyapi.up.railway.app/",
      [scopes],
      callback
    );
  };

  return <button onClick={handleLogin}>Login</button>;
};
