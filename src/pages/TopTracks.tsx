import { AnalogBackground } from "@/components/background/analogBackground";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { Container } from "@/components/Container";
import { TopTracksHeader } from "@/components/topTracks/TopTracksHeader";
import { TopTracksSection } from "@/components/topTracks/TopTracksSection";
import { useTopTracks, TimeRange } from "../hooks/useTopTracks";
import TopTracksOptions from "@/components/topTracks/TopTracksOptions";
import { useState } from "react";

export const TopTracks = () => {
  const [activeRange, setActiveRange] =
    useState<TimeRange["value"]>("short_term");

  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    topTracks,
    setTopTracks,
  } = useTopTracks(activeRange);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <AnalogBackground>
        <TopTracksHeader />
        <Container>
          <TopTracksOptions
            setActiveRange={setActiveRange}
            activeRange={activeRange}
            setTopTracks={setTopTracks}
          />
          {data && topTracks && <TopTracksSection topTracks={topTracks} />}
          <LoadMoreButton
            isFetching={isFetching}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </Container>
      </AnalogBackground>
    </>
  );
};
