import { useState } from "react";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { Artist, Page } from "@spotify/web-api-ts-sdk";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CustomError } from "@/CustomError";
import { AnalogBackground } from "@/components/background/analogBackground";
import { TopArtistsHeader } from "@/components/topArtists/TopArtistsHeader";
import { TopArtistsOptions } from "@/components/topArtists/TopArtistsOptions";
import { TopArtistsSection } from "@/components/topArtists/TopArtistsSection";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { Container } from "@/components/Container";

export type TimeRange = {
  value: "short_term" | "medium_term" | "long_term";
};

export const TopArtists = () => {
  const [activeRange, setActiveRange] =
    useState<TimeRange["value"]>("short_term");
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  const sdk = useSpotify(client_id, redirect_url, scopes);

  const updateTopArtists = (newTopArtists: Artist[]) => {
    setTopArtists((oldTopArtists) => [...newTopArtists, ...oldTopArtists]);
  };

  const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery<Page<Artist>>({
      queryKey: ["top-artists", activeRange],
      queryFn: async ({ pageParam = 0 }) => {
        if (!sdk) {
          throw new CustomError("Auth error, please refresh login", 500);
        }

        const fetchTopArtists = await sdk.currentUser.topItems(
          "artists",
          activeRange,
          10,
          Number(pageParam)
        );

        setTopArtists(fetchTopArtists.items);

        if (
          topArtists.length !== 0 &&
          topArtists.length < fetchTopArtists.total
        ) {
          updateTopArtists(topArtists);
        }

        return fetchTopArtists;
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
        <TopArtistsHeader />
        <Container>
          <TopArtistsOptions
            setActiveRange={setActiveRange}
            setTopArtists={setTopArtists}
            activeRange={activeRange}
          />
          {data && topArtists && <TopArtistsSection artists={topArtists} />}
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
