import { useState, useEffect } from "react";
import { catchErrors } from "../utils";

import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { Artist, MaxInt, SpotifyApi } from "@spotify/web-api-ts-sdk";
import {
  TopArtistsHeader,
  TopArtistsSection,
  TopArtistsOptions,
} from "../components/topArtists";
import Logo from "../components/Logo";

export interface TimeRange {
  value: "short_term" | "medium_term" | "long_term";
}

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [activeRange, setActiveRange] =
    useState<TimeRange["value"]>("short_term");
  const [pageSize, setPageSize] = useState<MaxInt<50>>(10);

  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  useEffect(() => {
    const fetchData = async () => {
      if (!sdk) {
        return;
      }
      const data = await sdk.currentUser.topItems(
        "artists",
        activeRange,
        pageSize
      );
      setTopArtists(data.items);
    };

    catchErrors(fetchData());
  }, [sdk, activeRange, pageSize]);

  return (
    <main>
      <Logo />
      <TopArtistsHeader />
      <TopArtistsOptions
        setActiveRange={setActiveRange}
        setPageSize={setPageSize}
      />
      <TopArtistsSection artists={topArtists} />
    </main>
  );
};

export default TopArtists;
