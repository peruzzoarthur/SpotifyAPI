import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { catchErrors } from "../utils";
import { getPlaylistById } from "../spotify";
import { TrackList, SectionWrapper } from "../components";
import { GlobalStyle, StyledHeader } from "../styles";

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<any>(null);
  const [tracksData, setTracksData] = useState<any>(null);
  const [tracks, setTracks] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylistById(id);

      setPlaylist(data);
      setTracksData(data.tracks.items);
    };

    catchErrors(fetchData());
  }, [id]);

  // When tracksData updates, compile arrays of tracks and audioFeatures
  // ...

  useEffect(() => {
    if (!tracksData) {
      return;
    }

    // When tracksData updates, check if there are more tracks to fetch
    // then update the state variable
    const fetchMoreData = async () => {
      if (tracksData.next) {
        const { data } = await axios.get(tracksData.next);
        setTracksData(data);
      }
    };

    // Extract and concatenate the 'track' objects
    const extractedTracks = tracksData.map((item: any) => item.track);

    setTracks((prevTracks: any) => [
      ...(prevTracks ? prevTracks : []),
      ...extractedTracks,
    ]);

    catchErrors(fetchMoreData());
  }, [tracksData]);

  // ...

  return (
    <>
      {playlist && (
        <>
          <GlobalStyle />
          <StyledHeader>
            <div className="header__inner">
              {playlist.images.length && playlist.images[0].url && (
                <img
                  className="header__img"
                  src={playlist.images[0].url}
                  alt="Playlist Artwork"
                />
              )}
              <div>
                <div className="header__overline">Playlist</div>
                <h1 className="header__name">{playlist.name}</h1>
                <p className="header__meta">
                  {playlist.followers.total ? (
                    <span>
                      {playlist.followers.total}{" "}
                      {`follower${playlist.followers.total !== 1 ? "s" : ""}`}
                    </span>
                  ) : null}
                  <span>
                    {playlist.tracks.total}{" "}
                    {`song${playlist.tracks.total !== 1 ? "s" : ""}`}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>

          <main>
            <SectionWrapper title="Playlist" breadcrumb={true}>
              {tracks && <TrackList tracks={tracks} />}
            </SectionWrapper>
          </main>
        </>
      )}
    </>
  );
};

export default Playlist;
