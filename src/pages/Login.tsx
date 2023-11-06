import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { client_id, redirect_url } from "../spotify";

export const Login = () => {
  return (
    <button
      onClick={async () => {
        await SpotifyApi.performUserAuthorization(
          client_id,
          redirect_url,
          [
            "user-library-read playlist-read-private user-read-private user-read-email user-top-read playlist-modify-public playlist-modify-private",
          ],
          "http://localhost:5173/callback"
        );
      }}
    >
      Login
    </button>
  );
};
