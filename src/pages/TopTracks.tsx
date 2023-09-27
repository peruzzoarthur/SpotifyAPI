import { useState, useEffect } from "react";
import { getTopTracks } from "../spotify";
import { catchErrors } from "../utils";
import { SectionWrapper, TrackList, TimeRangeButtons } from "../components";
import { GlobalStyle } from "../styles";

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState<any>(null);
  const [activeRange, setActiveRange] = useState<string>("short");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopTracks(`${activeRange}_term`);
      setTopTracks(data);
    };

    catchErrors(fetchData());
  }, [activeRange]);
  console.log(topTracks);
  return (
    <main>
      <GlobalStyle />
      <SectionWrapper title="Top Tracks" breadcrumb={true}>
        <TimeRangeButtons
          activeRange={activeRange}
          setActiveRange={setActiveRange}
        />

        {topTracks && topTracks.items && <TrackList tracks={topTracks.items} />}
      </SectionWrapper>
    </main>
  );
};

export default TopTracks;
