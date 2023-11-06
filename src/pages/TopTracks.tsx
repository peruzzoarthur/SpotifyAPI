import { useState } from "react";

import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { TopTracksHeader, TopTracksSection } from "../components/topTracks";
import TopTracksOptions from "../components/topTracks/TopTracksOptions";
import Logo from "../components/Logo";
import { MaxInt, SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { useQuery } from "@tanstack/react-query";

export const TopTracks = () => {
  const [activeRange, setActiveRange] = useState<
    "short_term" | "medium_term" | "long_term"
  >("short_term");
  const [pageSize, setPageSize] = useState<MaxInt<50>>(10);

  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  const { data, error, isFetching } = useQuery<Track[]>({
    queryKey: ["top-artists", activeRange, pageSize],
    queryFn: async () => {
      const fetch = await sdk.currentUser.topItems(
        "tracks",
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
    <main>
      <Logo />
      <TopTracksHeader />
      <TopTracksOptions
        setActiveRange={setActiveRange}
        setPageSize={setPageSize}
      />
      <TopTracksSection topTracks={data} />
    </main>
  );
};
