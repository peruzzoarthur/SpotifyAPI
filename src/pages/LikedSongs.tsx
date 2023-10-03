import { SavedTrack, Page, Track, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { catchErrors } from "../utils";
import { TrackList, SectionWrapper, Loader } from "../components";
import { GlobalStyle, StyledHeader, StyledDropdown } from "../styles";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes, spotify_url } from "../spotify";

const LikedSongs = () => {
  const [likedSongsPage, setLikedSongsPage] = useState<Page<SavedTrack>>();
  const [tracksData, setTracksData] = useState<Track[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);

  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  useEffect(() => {
    if (!sdk) {
      return;
    }
    const fetchData = async () => {
      const data = await sdk.currentUser.tracks.savedTracks();
      setLikedSongsPage(data);
      setTracksData(data.items.map(({ track }) => track));
    };
    catchErrors(fetchData());
  }),
    [sdk];

  useEffect(() => {
    if (!likedSongsPage) {
      return;
    }

    const fetchMoreData = async () => {
      if (likedSongsPage.next) {
        const urlParts = likedSongsPage.next.split(
          "https://api.spotify.com/v1/"
        );
        if (urlParts.length === 2) {
          const apiUrl = urlParts[1];
          const data: Page<SavedTrack> = await sdk.makeRequest("GET", apiUrl);
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
  }),
    [tracksData];

  return (
    <>
      {likedSongsPage && (
        <>
          <GlobalStyle />
          <main>
            <h1>Testing Page</h1>
          </main>
        </>
      )}
    </>
  );
};

export default LikedSongs;
