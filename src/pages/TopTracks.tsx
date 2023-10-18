import { useState, useEffect } from "react";
import { catchErrors } from "../utils";

import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState<any>(null);
  const [activeRange, setActiveRange] = useState<
    "short_term" | "medium_term" | "long_term"
  >("short_term");

  const sdk = useSpotify(client_id, redirect_url, scopes);

  useEffect(() => {
    if (!sdk) {
      return;
    }
    const fetchData = async () => {
      const data = await sdk.currentUser.topItems("tracks", activeRange);
      setTopTracks(data);
    };

    catchErrors(fetchData());
  }, [sdk, activeRange]);

  return <main></main>;
};

export default TopTracks;
