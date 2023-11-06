import {
  PlaylistedTrack,
  Page,
  AudioFeatures,
  Track,
} from "@spotify/web-api-ts-sdk";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import SelectAudioFeature from "../components/SelectAudioFeature";
import { sortOptions } from "../components/SortOptions";

import {
  PlaylistByIdHeader,
  PlaylistByIdTracksSection,
} from "../components/playlistById";
import { TrackWithAudioFeatures } from "./LikedSongs";
import { CustomError } from "@/CustomError";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { AnalogBackground } from "@/components/background/analogBackground";
import { Container } from "@/components/Container";

interface AudioFeaturesWithListOrder extends AudioFeatures {
  default_list_order?: string;
}

type PlaylistByIdQueryFnProps = {
  pageParam: string | null | unknown;
};

export const PlaylistById = () => {
  const { id } = useParams();
  const sdk = useSpotify(client_id, redirect_url, scopes);
  const [tracks, setTracks] = useState<TrackWithAudioFeatures[]>([]);
  const [audioFeatures, setAudioFeatures] = useState<AudioFeatures[]>([]);
  const [sortValue, setSortValue] =
    useState<keyof AudioFeaturesWithListOrder>("default_list_order");
  const [playlistName, setPlaylistName] = useState<string>("");

  const updateTracks = (newTracks: Track[]) => {
    setTracks((oldTracks) => [...oldTracks, ...newTracks]);
  };

  const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery<Page<PlaylistedTrack> | undefined>({
      queryKey: ["playlistTracks", { id }],

      queryFn: async ({ pageParam = "0" }: PlaylistByIdQueryFnProps) => {
        if (!sdk) {
          throw new CustomError("auth problem. please refresh login.", 500);
        }
        const playlistName = (await sdk.playlists.getPlaylist(id as string))
          .name;
        setPlaylistName(playlistName);
        const playlist = await sdk.playlists.getPlaylistItems(
          id as string,
          undefined,
          undefined,
          undefined,
          Number(pageParam)
        );

        const ids = playlist.items.map((t) => t.track.id);

        const fetchAudioFeatures = async () => {
          return await sdk.tracks.audioFeatures(ids);
        };

        const audioFeatures = await fetchAudioFeatures();
        setAudioFeatures(audioFeatures);

        if (tracks.length < playlist.total) {
          updateTracks(
            playlist.items.map((t) => t.track as Track).slice(0, playlist.total)
          );
        }

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

  const tracksWithAudioFeatures = useMemo(() => {
    if (!tracks || !audioFeatures) {
      return null;
    }

    return tracks.map((track) => {
      const trackToAdd = track as TrackWithAudioFeatures;

      if (!track.audio_features) {
        const audioFeaturesObject = audioFeatures.find((item) => {
          if (!item || !track) {
            return null;
          }
          return item.id === track.id;
        });
        trackToAdd["audio_features"] = audioFeaturesObject;
      }

      return trackToAdd;
    });
  }, [tracks, audioFeatures]);

  const sortedTracks = useMemo(() => {
    if (!tracksWithAudioFeatures) {
      return null;
    }

    return [...tracksWithAudioFeatures].sort(
      (a: TrackWithAudioFeatures, b: TrackWithAudioFeatures) => {
        const aFeatures = a["audio_features"] as AudioFeaturesWithListOrder;
        const bFeatures = b["audio_features"] as AudioFeaturesWithListOrder;

        if (!aFeatures || !bFeatures) {
          return 0;
        }

        return Number(bFeatures[sortValue]) - Number(aFeatures[sortValue]);
      }
    );
  }, [sortValue, tracksWithAudioFeatures]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <AnalogBackground>
        <PlaylistByIdHeader playlistName={playlistName} />
        <Container>
          <SelectAudioFeature
            setSortValue={setSortValue}
            sortOptions={sortOptions}
          />

          {data && !isFetchingNextPage && (
            <PlaylistByIdTracksSection tracks={sortedTracks} />
          )}
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
