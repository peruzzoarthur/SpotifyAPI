import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes, spotify_url } from "../spotify";
import {
  MaxInt,
  Page,
  SimplifiedPlaylist,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";
import {
  PlaylistsHeader,
  PlaylistsOptions,
  PlaylistsSection,
} from "../components/playlists";
import Logo from "../components/Logo";

const Playlists = () => {
  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;
  const [playlistsData, setPlaylistsData] =
    useState<Page<SimplifiedPlaylist>>();
  const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>([]);
  const [pageSize, setPageSize] = useState<MaxInt<50>>(10);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!sdk) {
      return;
    }
    const fetchData = async () => {
      const data = await sdk.currentUser.playlists.playlists(10);
      setPlaylistsData(data);
      setNextUrl(data.next);
      setPlaylists(data.items);
    };

    catchErrors(fetchData());
  }, [sdk, pageSize]);

  useEffect(() => {
    if (!playlistsData || playlists.length - 1 >= pageSize) {
      return;
    }

    const fetchMoreData = async () => {
      if (nextUrl) {
        const urlParts = nextUrl.split(spotify_url);
        if (urlParts.length === 2) {
          const apiUrl = urlParts[1];
          const data: Page<SimplifiedPlaylist> = await sdk.makeRequest(
            "GET",
            apiUrl
          );

          setNextUrl(data.next);
          setPlaylistsData((prevData) => ({
            ...prevData!,
            items: [...prevData?.items!, ...data.items],
          }));
          setPlaylists((prevPlaylists) => [...prevPlaylists, ...data.items]);
        }
      }
    };

    catchErrors(fetchMoreData());
  }, [playlistsData, pageSize]);

  return (
    <main>
      <Logo />
      <PlaylistsHeader />
      <PlaylistsOptions setPageSize={setPageSize} />
      <PlaylistsSection playlists={playlists} />
    </main>
  );
};

export default Playlists;
