import { useState } from "react";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { Artist, MaxInt, SpotifyApi } from "@spotify/web-api-ts-sdk";
import {
  TopArtistsHeader,
  TopArtistsSection,
  TopArtistsOptions,
} from "../components/topArtists";
import Logo from "../components/Logo";
import { useQuery } from "@tanstack/react-query";

export interface TimeRange {
  value: "short_term" | "medium_term" | "long_term";
}

const TopArtists = () => {
  const [activeRange, setActiveRange] =
    useState<TimeRange["value"]>("short_term");
  const [pageSize, setPageSize] = useState<MaxInt<50>>(10);

  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  const {
    data: topArtists,
    error,
    isFetching,
  } = useQuery<Artist[]>({
    queryKey: ["top-artists", activeRange, pageSize],
    queryFn: async () => {
      const fetch = await sdk.currentUser.topItems(
        "artists",
        activeRange,
        pageSize
      );

      return fetch.items;
    },
    enabled: !!sdk,
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <main>
        <Logo />
        <TopArtistsHeader />
        <TopArtistsOptions
          setActiveRange={setActiveRange}
          setPageSize={setPageSize}
        />
        {topArtists && !isFetching && (
          <TopArtistsSection artists={topArtists} />
        )}
      </main>
    </>
  );
};

export default TopArtists;
