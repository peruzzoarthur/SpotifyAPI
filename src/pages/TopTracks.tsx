import { useState } from "react";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import TopTracksOptions from "../components/topTracks/TopTracksOptions";
import { Page, Track } from "@spotify/web-api-ts-sdk";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AnalogBackground } from "@/components/background/analogBackground";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { Container } from "@/components/Container";
import { CustomError } from "@/CustomError";
import { TopTracksHeader } from "@/components/topTracks/TopTracksHeader";
import { TopTracksSection } from "@/components/topTracks/TopTracksSection";

export type TimeRange = {
  value: "short_term" | "medium_term" | "long_term";
};

export const TopTracks = () => {
  const [activeRange, setActiveRange] =
    useState<TimeRange["value"]>("short_term");
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  const sdk = useSpotify(client_id, redirect_url, scopes);

  const updateTopTracks = (newTopTracks: Track[]) => {
    setTopTracks((oldTopTracks) => [...newTopTracks, ...oldTopTracks]);
  };

  const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery<Page<Track>>({
      queryKey: ["top-tracks", activeRange],
      queryFn: async ({ pageParam = 0 }) => {
        if (!sdk) {
          throw new CustomError("Auth error, please refresh login", 401);
        }

        const fetchTopTracks = await sdk.currentUser.topItems(
          "tracks",
          activeRange,
          10,
          Number(pageParam)
        );

        setTopTracks(fetchTopTracks.items);

        if (topTracks.length !== 0 && topTracks.length < fetchTopTracks.total) {
          updateTopTracks(topTracks);
        }

        return fetchTopTracks;
      },
      enabled: !!sdk,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage?.next) {
          const url = new URL(lastPage.next);
          const pageParam = url.searchParams.get("offset");
          return pageParam;
        }
        return;
      },
    });

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
            setTopTracks={setTopTracks}
            activeRange={activeRange}
          />
          {data && topTracks && <TopTracksSection topTracks={topTracks} />}
          <LoadMoreButton
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </Container>
      </AnalogBackground>
    </>
  );
};
