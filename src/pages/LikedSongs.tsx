import {
  SavedTrack,
  Page,
  Track,
  SpotifyApi,
  AudioFeatures,
} from "@spotify/web-api-ts-sdk";
import { useState, useEffect, useMemo } from "react";
import { catchErrors } from "../utils";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes, spotify_url } from "../spotify";
import LikedSongsTracksSection from "../components/liked-songs/LikedSongsTracksSection";
import SelectAudioFeature from "../components/SelectAudioFeature";
import SelectListSize from "../components/liked-songs/SelectListSize";
import LikedSongsHeader from "../components/liked-songs/LikedSongsHeader";
import Logo from "../components/Logo";

export interface AudioFeaturesWithListOrder extends AudioFeatures {
  default_list_order?: string;
}

export interface TrackWithAudioFeatures extends Track {
  audio_features?: AudioFeaturesWithListOrder;
}

const LikedSongs = () => {
  const [likedSongsPage, setLikedSongsPage] = useState<Page<SavedTrack>>();
  const [tracksData, setTracksData] = useState<Track[]>([]);
  const [tracks, setTracks] = useState<TrackWithAudioFeatures[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [audioFeatures, setAudioFeatures] = useState<AudioFeatures[]>([]);
  const [sortValue, setSortValue] =
    useState<keyof AudioFeaturesWithListOrder>("default_list_order");
  const sortOptions = [
    "danceability",
    "energy",
    "key",
    "loudness",
    "mode",
    "speechiness",
    "acousticness",
    "instrumentalness",
    "liveness",
    "valence",
    "tempo",
    "time_signature",
  ];
  const [pageSize, setPageSize] = useState<number>(10);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  useEffect(() => {
    if (!sdk) {
      return;
    }
    const fetchData = async () => {
      const data = await sdk.currentUser.tracks.savedTracks(10);
      setLikedSongsPage(data);
      setNextUrl(data.next);
      setTracksData(data.items.map(({ track }) => track));
    };
    catchErrors(fetchData());
  }, [sdk, pageSize]);

  useEffect(() => {
    if (!likedSongsPage || tracks.length >= pageSize) {
      return;
    }

    const fetchMoreData = async () => {
      if (nextUrl) {
        const urlParts = nextUrl.split(spotify_url);
        if (urlParts.length === 2) {
          const apiUrl = urlParts[1];
          const data: Page<SavedTrack> = await sdk.makeRequest("GET", apiUrl);

          setNextUrl(data.next);
          setTracksData(data.items.map(({ track }) => track));
        }
      }
    };

    const newTracks: Track[] = tracksData.filter((track): track is Track => {
      return track.type === "track";
    });

    setTracks((prevTracks): Track[] => {
      const trackIds = prevTracks.map((track) => track.id);
      const uniqueNewTracks = newTracks.filter(
        (track) => !trackIds.includes(track.id)
      );
      return [...prevTracks, ...uniqueNewTracks];
    });
    catchErrors(fetchMoreData());

    const fetchAudioFeatures = async () => {
      const ids = tracksData.map(({ id }) => id);
      const data = await sdk.tracks.audioFeatures(ids);

      setAudioFeatures((audioFeatures) => [
        ...(audioFeatures ? audioFeatures : []),
        ...data,
      ]);
    };
    catchErrors(fetchAudioFeatures());
  }, [tracksData, pageSize, likedSongsPage, tracks.length, nextUrl, sdk]);

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

  return (
    <>
      {likedSongsPage && (
        <>
          <Logo />
          <LikedSongsHeader />
          <div className="bg-slate-700 bg-opacity-20 pt-10 pb-10 flex flex-col items-center">
            <SelectAudioFeature
              sortOptions={sortOptions}
              setSortValue={setSortValue}
            />
            <SelectListSize
              handlePageSizeChange={handlePageSizeChange}
              tracks={tracks}
            />
          </div>
          <LikedSongsTracksSection tracks={sortedTracks} />
        </>
      )}
    </>
  );
};

export default LikedSongs;
