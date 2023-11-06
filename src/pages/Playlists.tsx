import { useState } from "react";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { Page, SimplifiedPlaylist, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PlaylistsHeader } from "@/components/playlists/PlaylistsHeader";
import { PlaylistsSection } from "@/components/playlists/PlaylistsSection";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { AnalogBackground } from "@/components/background/analogBackground";
import { Container } from "@/components/Container";

export const Playlists = () => {
  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>([]);

  const updatePlaylists = async (newPlaylists: SimplifiedPlaylist[]) => {
    setPlaylists((oldPlaylists) =>
      [...oldPlaylists, ...newPlaylists].slice(0, data?.pages[0].total)
    );
  };

  const { data, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<Page<SimplifiedPlaylist>>({
      queryKey: ["playlists"],

      queryFn: async ({ pageParam }) => {
        const fetch = await sdk.currentUser.playlists.playlists(
          25,
          Number(pageParam)
        );

        await updatePlaylists(fetch.items);

        return fetch;
      },

      enabled: !!sdk,

      initialPageParam: 0,

      getNextPageParam: (lastPage) => {
        if (lastPage.next) {
          const url = new URL(lastPage.next);
          const pageParam = url.searchParams.get("offset");
          return pageParam;
        }
      },
    });

  if (error) {
    return <div>error: {error.message}</div>;
  }

  return (
    <AnalogBackground>
      <PlaylistsHeader />
      <Container>
        <PlaylistsSection playlists={playlists} />
        <LoadMoreButton
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Container>
    </AnalogBackground>
  );
};
