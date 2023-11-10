import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { client_id, redirect_url, scopes, callback } from "../spotify";

export const Login = () => {
  const handleLogin = async () => {
    await SpotifyApi.performUserAuthorization(
      client_id,
      redirect_url,
      [scopes],
      callback
    );
  };

  return <button onClick={handleLogin}>Login</button>;
};
