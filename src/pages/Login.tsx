import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { client_id, redirect_url, scopes } from "../spotify";

const Login = () => {
  return (
    <button
      onClick={() => {
        SpotifyApi.performUserAuthorization(
          client_id,
          redirect_url,
          scopes,
          "http://localhost:3000/callback"
        );
      }}
    >
      Login
    </button>
  );
};

export default Login;
