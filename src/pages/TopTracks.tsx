import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import {
  SectionWrapper,
  TrackList,
  TimeRangeButtons,
  Loader,
} from "../components";

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

  return (
    <main>
      <SectionWrapper title="Top Tracks" breadcrumb={true}>
        <TimeRangeButtons
          activeRange={activeRange}
          setActiveRange={setActiveRange}
        />

        {topTracks && topTracks.items ? (
          <TrackList tracks={topTracks.items} />
        ) : (
          <Loader />
        )}
      </SectionWrapper>
    </main>
  );
};

export default TopTracks;
