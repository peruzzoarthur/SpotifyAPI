import {
  PlaylistedTrack,
  SpotifyApi,
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
import Logo from "../components/Logo";

interface AudioFeaturesWithListOrder extends AudioFeatures {
  default_list_order?: string;
}

function PlaylistById() {
  const { id } = useParams();
  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;
  const [tracks, setTracks] = useState<TrackWithAudioFeatures[]>([]);
  const [audioFeatures, setAudioFeatures] = useState<AudioFeatures[]>([]);
  const [sortValue, setSortValue] =
    useState<keyof AudioFeaturesWithListOrder>("default_list_order");
  const [playlistName, setPlaylistName] = useState<string>("");

  const updateTracks = (newTracks: Track[]) => {
    setTracks((oldTracks) => [...oldTracks, ...newTracks]);
  };

  const {
    data,
    error,
    fetchNextPage,
    isFetching,
    status,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<Page<PlaylistedTrack> | undefined>({
    queryKey: ["playlistTracks", { id }],

    queryFn: async ({ pageParam = 0 }) => {
      const playlistName = (await sdk.playlists.getPlaylist(id as string)).name;
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

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return status === "pending" ? (
    <p>Loading...</p>
  ) : (
    <>
      <Logo />
      <PlaylistByIdHeader playlistName={playlistName} />
      <SelectAudioFeature
        setSortValue={setSortValue}
        sortOptions={sortOptions}
      />
      <div>
        {data && !isFetchingNextPage && (
          <PlaylistByIdTracksSection tracks={sortedTracks} />
        )}
        <button onClick={async () => await fetchNextPage()}>
          {isFetchingNextPage
            ? "Loading More..."
            : hasNextPage
            ? "Load More"
            : "Nothing to Load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}

export default PlaylistById;
