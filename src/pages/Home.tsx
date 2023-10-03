import { useState, useEffect } from "react";
import { GlobalStyle } from "../styles";
import { Login, Profile } from ".";
import { useSpotify } from "../hooks/useSpotify";
import { UserProfile } from "@spotify/web-api-ts-sdk";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { catchErrors } from "../utils";
import { client_id, redirect_url, scopes } from "../spotify";

const Home = () => {
  const [profile, setProfile] = useState<UserProfile>();

  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  useEffect(() => {
    const fetchProfileData = async () => {
      if (sdk) {
        const data = await sdk.currentUser.profile();
        setProfile(data);
      }
    };
    catchErrors(fetchProfileData());
  }, [sdk]);

  return (
    <div>
      <div className="App">
        <GlobalStyle />
        <header className="App-header">
          {!profile ? (
            <Login />
          ) : (
            <>
              <Profile />
            </>
          )}
        </header>
      </div>
    </div>
  );
};

export default Home;
