import { Page, SimplifiedTrack, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type AlbumByIdQueryFnProps = {
  pageParam: string | null | unknown;
};

export const useAlbumById = ({ sdk }: { sdk: SpotifyApi }) => {
  const { id } = useParams<string>();
  if (!id) {
    throw new Error("No ID provided");
  }
  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    isSuccess,
  } = useInfiniteQuery<Page<SimplifiedTrack>>({
    queryKey: ["album-by-id", id],
    queryFn: async ({ pageParam = "0" }: AlbumByIdQueryFnProps) => {
      const fetchAlbumTracksData = await sdk.albums.tracks(
        id,
        undefined,
        50,
        Number(pageParam)
      );

      return fetchAlbumTracksData;
    },
    enabled: !!sdk,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.next) {
        const url = new URL(lastPage.next);
        const pageParam = url.searchParams.get("offset");
        return pageParam;
      }
    },
  });
  return {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    isSuccess,
  };
};
