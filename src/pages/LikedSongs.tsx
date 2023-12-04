import { SavedTrack, Page, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { LikedSongsHeader } from "@/components/liked-songs/LikedSongsHeader";
import { AnalogBackground } from "@/components/background/analogBackground";

import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { SelectAudioFeature } from "@/components/SelectAudioFeature";
import { sortOptions } from "@/components/SortOptions";
import { LikedSongsTracksSection } from "@/components/liked-songs/LikedSongsTracksSection";
import { Container } from "@/components/Container";
import { AudioFeaturesWithListOrder, TrackWithAudioFeatures } from "@/types";
import { useSdk } from "@/hooks/useSdk";
import { useGetCurrentUserProfile } from "@/hooks/useGetCurrentUserProfilePicture";
import { CreateProgress } from "@/components/Progress";
import { useCreateProgress } from "@/hooks/useCreateProgress";

type LikedSongsQueryFnProps = {
  pageParam: string | null | unknown;
};

export const LikedSongs = () => {
  const progress = useCreateProgress({
    initialProgress: 13,
    finalProgress: 66,
    delay: 800,
  });

  const sdk: SpotifyApi = useSdk();
  const [sortValue, setSortValue] =
    useState<keyof AudioFeaturesWithListOrder>("default_list_order");
  const [likedSongsData, setLikedSongsData] = useState<
    TrackWithAudioFeatures[] | undefined
  >();

  // update function for keeping all fetched data in the same array

  const updateTracks = (newTracks: TrackWithAudioFeatures[]) => {
    setLikedSongsData((oldTracks) => {
      if (oldTracks) {
        return [...oldTracks, ...newTracks];
      } else {
        return [...newTracks];
      }
    });
  };

  // fetching

  const {
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    data,
    error,
    isFetching,
  } = useInfiniteQuery<Page<SavedTrack>>({
    queryKey: ["liked-songs"],
    queryFn: async ({ pageParam = "0" }: LikedSongsQueryFnProps) => {
      const fetchLikedSongs = await sdk.currentUser.tracks.savedTracks(
        50,
        Number(pageParam)
      );

      const ids = fetchLikedSongs.items.map((t) => t.track.id);

      const fetchAudioFeatures = await sdk.tracks.audioFeatures(ids);

      const tracksWithAudioFeatures: TrackWithAudioFeatures[] =
        fetchLikedSongs.items.map((item) => {
          const correspondingAudioFeature = fetchAudioFeatures.find(
            (audioFeature) => audioFeature.id === item.track.id
          );
          return {
            ...item.track,
            audio_features: correspondingAudioFeature,
          };
        });

      updateTracks(tracksWithAudioFeatures);

      return fetchLikedSongs;
    },

    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,

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

  // sorting liked songs

  const sortedTracks = useMemo<TrackWithAudioFeatures[]>(() => {
    if (!likedSongsData) {
      return [];
    }

    return [...likedSongsData].sort(
      (a: TrackWithAudioFeatures, b: TrackWithAudioFeatures) => {
        const aFeatures = a["audio_features"] as AudioFeaturesWithListOrder;
        const bFeatures = b["audio_features"] as AudioFeaturesWithListOrder;

        if (!aFeatures || !bFeatures) {
          return 0;
        }

        return Number(bFeatures[sortValue]) - Number(aFeatures[sortValue]);
      }
    );
  }, [sortValue, likedSongsData]);

  const currentUserProfile = useGetCurrentUserProfile({ sdk });

  if (error) {
    // TODO
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <AnalogBackground>
        {currentUserProfile && (
          <LikedSongsHeader profile={currentUserProfile} />
        )}

        {isFetching && currentUserProfile && !data && (
          <>
            <Container className="flex items-center justify-center bg-white bg-opacity-0 h-200">
              {CreateProgress({ progress })}
            </Container>
          </>
        )}

        <Container className="bg-black bg-opacity-20">
          {likedSongsData && data && (
            <>
              <SelectAudioFeature
                sortOptions={sortOptions}
                setSortValue={setSortValue}
              />
              <LikedSongsTracksSection tracks={sortedTracks} />
              <LoadMoreButton
                isFetching={isFetching}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            </>
          )}
        </Container>
      </AnalogBackground>
    </>
  );
};
