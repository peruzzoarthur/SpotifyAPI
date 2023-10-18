import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes, spotify_url } from "../spotify";
import { Page, SimplifiedPlaylist, SpotifyApi } from "@spotify/web-api-ts-sdk";

const Playlists = () => {
  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;
  const [playlistsData, setPlaylistsData] =
    useState<Page<SimplifiedPlaylist>>();
  const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>([]);

  useEffect(() => {
    if (!sdk) {
      return;
    }
    const fetchData = async () => {
      const data = await sdk.currentUser.playlists.playlists();
      setPlaylistsData(data);
    };

    catchErrors(fetchData());
  }, [sdk]);

  useEffect(() => {
    if (!playlistsData) {
      return;
    }

    const fetchMoreData = async () => {
      if (playlistsData.next) {
        const urlParts = playlistsData.next.split(spotify_url);
        if (urlParts.length === 2) {
          const apiUrl = urlParts[1];
          const data: Page<SimplifiedPlaylist> = await sdk.makeRequest(
            "GET",
            apiUrl
          );
          setPlaylistsData(data);
        }
      }
    };

    setPlaylists((playlists) => [
      ...(playlists ? playlists : []),
      ...playlistsData.items,
    ]);

    catchErrors(fetchMoreData());
  }, [playlistsData]);

  return <main></main>;
};

export default Playlists;
