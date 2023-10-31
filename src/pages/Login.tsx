import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { client_id, redirect_url } from "../spotify";

const Login = () => {
  return (
    <button
      onClick={async () => {
        await SpotifyApi.performUserAuthorization(
          client_id,
          redirect_url,
          [
            "user-library-read playlist-read-private user-read-private user-read-email user-top-read",
          ],
          "http://localhost:5173/callback"
        );
      }}
    >
      Login
    </button>
  );
};

export default Login;
