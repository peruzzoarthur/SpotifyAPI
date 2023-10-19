import { useState, useEffect } from "react";
import { catchErrors } from "../utils";

import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { TopTracksHeader, TopTracksSection } from "../components/topTracks";
import TopTracksOptions from "../components/topTracks/TopTracksOptions";
import Logo from "../components/Logo";
import { MaxInt } from "@spotify/web-api-ts-sdk";

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState<any>(null);
  const [activeRange, setActiveRange] = useState<
    "short_term" | "medium_term" | "long_term"
  >("short_term");
  const [pageSize, setPageSize] = useState<MaxInt<50>>(10);

  const sdk = useSpotify(client_id, redirect_url, scopes);

  useEffect(() => {
    const fetchData = async () => {
      if (!sdk) {
        return;
      }
      const data = await sdk.currentUser.topItems(
        "tracks",
        activeRange,
        pageSize
      );
      setTopTracks(data.items);
    };

    catchErrors(fetchData());
  }, [sdk, activeRange, pageSize]);

  return (
    <main>
      <Logo />
      <TopTracksHeader />
      <TopTracksOptions
        setActiveRange={setActiveRange}
        setPageSize={setPageSize}
      />
      <TopTracksSection topTracks={topTracks} />
    </main>
  );
};

export default TopTracks;
