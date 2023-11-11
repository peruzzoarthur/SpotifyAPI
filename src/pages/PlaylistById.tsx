import {
  PlaylistedTrack,
  Page,
  Playlist,
  Track,
} from "@spotify/web-api-ts-sdk";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { sortOptions } from "../components/SortOptions";
import { CustomError } from "@/CustomError";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { AnalogBackground } from "@/components/background/analogBackground";
import { Container } from "@/components/Container";
import { PlaylistByIdHeader } from "@/components/playlistById/PlaylistByIdHeader";
import { PlaylistByIdTracksSection } from "@/components/playlistById/PlaylistByIdTracksSection";
import { SelectAudioFeature } from "@/components/SelectAudioFeature";
import { AudioFeaturesWithListOrder, TrackWithAudioFeatures } from "@/types";

type PlaylistByIdQueryFnProps = {
  pageParam: string | null | unknown;
};

export const PlaylistById = () => {
  const { id } = useParams<string>();

  const [sortValue, setSortValue] =
    useState<keyof AudioFeaturesWithListOrder>("default_list_order");
  const [playlistTracksData, setPlaylistTracksData] = useState<
    TrackWithAudioFeatures[] | undefined
  >();
  const [playlistData, setPlaylistData] = useState<Playlist>();

  const sdk = useSpotify(client_id, redirect_url, scopes);

  const updateTracks = (newTracks: TrackWithAudioFeatures[]) => {
    setPlaylistTracksData((oldTracks) => {
      if (oldTracks) {
        return [...oldTracks, ...newTracks];
      } else {
        return [...newTracks];
      }
    });
  };

  const { error, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<Page<PlaylistedTrack>>({
      queryKey: ["playlistTracks", { id }],

      queryFn: async ({ pageParam = "0" }: PlaylistByIdQueryFnProps) => {
        if (!sdk) {
          throw new CustomError("auth problem. please refresh login.", 402);
        } // todo: adjust error with a pattern for all components

        if (!id) {
          throw new CustomError("ID is null.", 400);
        } // todo: adjust error with a pattern for all components

        // fetch data about the playlist, in order to be displayed as info [header]
        const fetchPlaylistData = await sdk.playlists.getPlaylist(id);
        setPlaylistData(fetchPlaylistData);

        // fetch the playlisted tracks
        const playlist = await sdk.playlists.getPlaylistItems(
          id as string,
          undefined,
          undefined,
          undefined,
          Number(pageParam)
        );

        // map ids for further fetching of tracks audio features
        const ids = playlist.items.map((t) => t.track.id);
        const fetchAudioFeatures = await sdk.tracks.audioFeatures(ids);

        // returning new object with proper structure, tracks + audio_features
        const tracksWithAudioFeatures: TrackWithAudioFeatures[] =
          playlist.items.map((item) => {
            const correspondingAudioFeature = fetchAudioFeatures.find(
              (audioFeature) => audioFeature.id === item.track.id
            );
            return {
              ...(item.track as Track),
              audio_features: correspondingAudioFeature,
            };
          });

        updateTracks(tracksWithAudioFeatures);

        return playlist;
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

  // sorting tracks by audio feature
  const sortedTracks = useMemo<TrackWithAudioFeatures[]>(() => {
    if (!playlistTracksData) {
      return [];
    }

    return [...playlistTracksData].sort(
      (a: TrackWithAudioFeatures, b: TrackWithAudioFeatures) => {
        const aFeatures = a["audio_features"] as AudioFeaturesWithListOrder;
        const bFeatures = b["audio_features"] as AudioFeaturesWithListOrder;

        if (!aFeatures || !bFeatures) {
          return 0;
        }

        return Number(bFeatures[sortValue]) - Number(aFeatures[sortValue]);
      }
    );
  }, [sortValue, playlistTracksData]);

  if (error) {
    // TODO
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <AnalogBackground>
        {playlistData && <PlaylistByIdHeader playlistData={playlistData} />}
        <Container className="bg-black bg-opacity-20">
          <SelectAudioFeature
            setSortValue={setSortValue}
            sortOptions={sortOptions}
          />

          {playlistTracksData && (
            <PlaylistByIdTracksSection tracks={sortedTracks} />
          )}

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
