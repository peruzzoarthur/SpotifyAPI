import { useState } from "react";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { Page, SimplifiedPlaylist, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { PlaylistsHeader } from "../components/playlists";
import Logo from "../components/Logo";
import { useInfiniteQuery } from "@tanstack/react-query";
import PlaylistsSection from "@/components/playlists/PlaylistsSection";

const Playlists = () => {
  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>([]);

  const updatePlaylists = async (newPlaylists: SimplifiedPlaylist[]) => {
    setPlaylists((oldPlaylists) =>
      [...oldPlaylists, ...newPlaylists].slice(0, data?.pages[0].total)
    );
  };

  const {
    data,
    isFetching,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery<Page<SimplifiedPlaylist>>({
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

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error: {error.message}</div>;
  }

  return status === "pending" ? (
    <p> Loading...</p>
  ) : (
    <main>
      <Logo />
      <PlaylistsHeader />

      <PlaylistsSection playlists={playlists} />
      <button
        className="flex justify-center w-64 h-10 text-justify text-white rounded-lg bg-slate-950"
        onClick={async () => await fetchNextPage()}
      >
        {isFetchingNextPage
          ? "Loading More..."
          : hasNextPage
          ? "Load More"
          : "Nothing to Load"}
      </button>

      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </main>
  );
};

export default Playlists;
