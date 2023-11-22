import { AnalogBackground } from "@/components/background/analogBackground";
import { TopArtistsHeader } from "@/components/topArtists/TopArtistsHeader";
import { TopArtistsOptions } from "@/components/topArtists/TopArtistsOptions";
import { TopArtistsSection } from "@/components/topArtists/TopArtistsSection";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { Container } from "@/components/Container";
import { useTopArtists } from "../hooks/useTopArtists";
import { useState } from "react";

export type TimeRange = {
  value: "short_term" | "medium_term" | "long_term";
};

export const TopArtists = () => {
  const [activeRange, setActiveRange] =
    useState<TimeRange["value"]>("short_term");

  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    topArtists,
    setTopArtists,
  } = useTopArtists(activeRange);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <AnalogBackground>
        <TopArtistsHeader />
        <Container>
          <TopArtistsOptions
            setActiveRange={setActiveRange}
            activeRange={activeRange}
            setTopArtists={setTopArtists}
          />
          {data && topArtists && <TopArtistsSection artists={topArtists} />}
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
