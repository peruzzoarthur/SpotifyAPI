import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useSpotify } from "../hooks/useSpotify";
import {
  AudioFeatures,
  Page,
  Playlist,
  PlaylistedTrack,
  Track,
} from "@spotify/web-api-ts-sdk";
import { catchErrors } from "../utils";
import { GlobalStyle, StyledHeader, StyledDropdown } from "../styles";
import { TrackList, SectionWrapper, Loader } from "../components";
import { client_id, redirect_url, scopes } from "../spotify";

interface AudioFeaturesWithListOrder extends AudioFeatures {
  list_order?: string;
}
interface TrackWithAudioFeatures extends Track {
  audio_features?: AudioFeaturesWithListOrder;
}

const PlaylistById = () => {
  const { id } = useParams();
  const [playlistPage, setPlaylistPage] = useState<Playlist>();
  const [playlistTracks, setPlaylistTracks] = useState<Page<PlaylistedTrack>>();
  const [tracks, setTracks] = useState<TrackWithAudioFeatures[]>([]);
  const [audioFeatures, setAudioFeatures] = useState<AudioFeatures[]>([]);
  const [sortValue, setSortValue] =
    useState<keyof AudioFeaturesWithListOrder>("list_order");
  const sortOptions = ["danceability", "tempo", "energy"];

  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  useEffect(() => {
    const fetchData = async () => {
      if (sdk) {
        const data = (await sdk.playlists.getPlaylist(
          id as string
        )) as Playlist;
        setPlaylistPage(data);
        setPlaylistTracks(data.tracks);
      }
    };

    catchErrors(fetchData());
  }, [sdk]);

  useEffect(() => {
    if (!playlistTracks) {
      return;
    }

    const fetchMoreData = async () => {
      if (playlistTracks.next) {
        const urlParts = playlistTracks.next.split(
          "https://api.spotify.com/v1/"
        );
        if (urlParts.length === 2) {
          const apiUrl = urlParts[1];
          const data: Page<PlaylistedTrack> = await sdk.makeRequest(
            "GET",
            apiUrl
          );
          setPlaylistTracks(data);
        }
      }
    };

    const newTracks: Track[] = playlistTracks.items
      .map(({ track }: PlaylistedTrack) => track)
      .filter((track): track is Track => {
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
      const ids = playlistTracks.items.map(
        ({ track }: PlaylistedTrack) => track.id
      );

      const data = await sdk.tracks.audioFeatures(ids);

      setAudioFeatures((audioFeatures) => [
        ...(audioFeatures ? audioFeatures : []),
        ...data,
      ]);
    };

    catchErrors(fetchAudioFeatures());
  }, [playlistTracks]);

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
      {playlistPage && (
        <>
          <GlobalStyle />
          <StyledHeader>
            <div className="header__inner">
              {playlistPage.images.length && playlistPage.images[0].url && (
                <img
                  className="header__img"
                  src={playlistPage.images[0].url}
                  alt="Playlist Artwork"
                />
              )}
              <div>
                <div className="header__overline">Playlist</div>
                <h1 className="header__name">{playlistPage.name}</h1>
                <p className="header__meta">
                  {playlistPage.followers.total ? (
                    <span>
                      {playlistPage.followers.total}{" "}
                      {`follower${
                        playlistPage.followers.total !== 1 ? "s" : ""
                      }`}
                    </span>
                  ) : null}
                  <span>
                    {playlistPage.tracks.total}{" "}
                    {`song${playlistPage.tracks.total !== 1 ? "s" : ""}`}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>

          <main>
            <GlobalStyle />
            <SectionWrapper title="Playlist" breadcrumb={true}>
              <StyledDropdown active={!!sortValue}>
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
              </StyledDropdown>

              {sortedTracks ? <TrackList tracks={sortedTracks} /> : <Loader />}
            </SectionWrapper>
          </main>
        </>
      )}
    </>
  );
};

export default PlaylistById;
