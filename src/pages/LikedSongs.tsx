import { SavedTrack, Page } from "@spotify/web-api-ts-sdk";
import { LikedSongsHeader } from "@/components/liked-songs/LikedSongsHeader";
import { AnalogBackground } from "@/components/background/analogBackground";
import { useSpotify } from "@/hooks/useSpotify";
import { client_id, redirect_url, scopes } from "@/spotify";
import {
  AudioFeatures,
  TrackWithAudioFeatures,
} from "@/components/recommendation/types";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CustomError } from "@/CustomError";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { SelectAudioFeature } from "@/components/SelectAudioFeature";
import { sortOptions } from "@/components/SortOptions";
import { LikedSongsTracksSection } from "@/components/liked-songs/LikedSongsTracksSection";
import { Container } from "@/components/Container";

export type AudioFeaturesWithListOrder = AudioFeatures & {
  default_list_order?: string;
};

type LikedSongsQueryFnProps = {
  pageParam: string | null | unknown;
};

export const LikedSongs = () => {
  const sdk = useSpotify(client_id, redirect_url, scopes);
  const [sortValue, setSortValue] =
    useState<keyof AudioFeaturesWithListOrder>("default_list_order");
  const [likedSongsData, setLikedSongsData] = useState<
    TrackWithAudioFeatures[] | undefined
  >();

  const updateTracks = (newTracks: TrackWithAudioFeatures[]) => {
    setLikedSongsData((oldTracks) => {
      if (oldTracks) {
        return [...oldTracks, ...newTracks];
      } else {
        return [...newTracks];
      }
    });
  };

  const { fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery<
    Page<SavedTrack>
  >({
    queryKey: ["likedSongs"],
    queryFn: async ({ pageParam = "0" }: LikedSongsQueryFnProps) => {
      if (!sdk) {
        throw new CustomError("auth problem. please refresh login.", 500);
      }

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

  return (
    <>
      <AnalogBackground>
        <LikedSongsHeader />
        <Container className="bg-black bg-opacity-20">
          <SelectAudioFeature
            sortOptions={sortOptions}
            setSortValue={setSortValue}
          />
          {likedSongsData && <LikedSongsTracksSection tracks={sortedTracks} />}
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
