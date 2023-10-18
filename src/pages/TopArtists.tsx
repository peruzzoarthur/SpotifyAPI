import { useState, useEffect } from "react";
import { catchErrors } from "../utils";

import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { Artist, MaxInt, Page, SpotifyApi } from "@spotify/web-api-ts-sdk";
import {
  SelectPageSize,
  TopArtistsHeader,
  TopArtistsSection,
} from "../components/topArtists";
import Logo from "../components/Logo";

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [activeRange, setActiveRange] = useState<
    "short_term" | "medium_term" | "long_term"
  >("short_term");
  const [pageSize, setPageSize] = useState<MaxInt<50>>(10);

  const handlePageSizeChange = (size: MaxInt<50>) => {
    setPageSize(size);
  };

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
      <SelectPageSize
        handlePageSizeChange={handlePageSizeChange}
        artists={topArtists}
      />
      <TopArtistsSection artists={topArtists} />
    </main>
  );
};

export default TopArtists;
