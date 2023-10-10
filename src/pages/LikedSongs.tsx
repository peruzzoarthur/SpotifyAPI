import {
  SavedTrack,
  Page,
  Track,
  SpotifyApi,
  AudioFeatures,
} from "@spotify/web-api-ts-sdk";
import { useState, useEffect, useMemo } from "react";
import { catchErrors } from "../utils";
import { TrackList, SectionWrapper, Loader } from "../components";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes, spotify_url } from "../spotify";

interface AudioFeaturesWithListOrder extends AudioFeatures {
  default_list_order?: string;
}

interface TrackWithAudioFeatures extends Track {
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

  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  useEffect(() => {
    if (!sdk) {
      return;
    }
    const fetchData = async () => {
      const data = await sdk.currentUser.tracks.savedTracks(50);
      setLikedSongsPage(data);
      setNextUrl(data.next);
      setTracksData(data.items.map(({ track }) => track));
    };
    catchErrors(fetchData());
  }, [sdk]);

  useEffect(() => {
    if (!likedSongsPage) {
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
  }, [tracksData]);

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
          <div className="header__inner">
            <h1>Liked Songs</h1>
            <div>
              <div className="header__overline">Your liked songs</div>
            </div>
          </div>

          <main>
            <SectionWrapper title="LikedSongs" breadcrumb={true}>
              <label className="sr-only" htmlFor="order-select">
                Sort tracks
              </label>
              <select
                name="track-order"
                id="order-select"
                onChange={(e) =>
                  setSortValue(
                    e.target.value as keyof AudioFeaturesWithListOrder
                  )
                }
              >
                <option value="">Sort tracks</option>
                {sortOptions.map((option, i) => (
                  <option value={option} key={i}>
                    {`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
                  </option>
                ))}
              </select>

              {sortedTracks ? (
                <TrackList tracks={sortedTracks} sortValue={sortValue} />
              ) : (
                <Loader />
              )}
            </SectionWrapper>
          </main>
        </>
      )}
    </>
  );
};

export default LikedSongs;
