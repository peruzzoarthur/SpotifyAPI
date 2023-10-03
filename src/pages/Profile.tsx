import { useState, useEffect } from "react";
import { catchErrors } from "../utils/error";
import { useSpotify } from "../hooks/useSpotify";
import {
  Artist,
  SpotifyApi,
  Track,
  UserProfile,
  SimplifiedPlaylist,
  Page,
} from "@spotify/web-api-ts-sdk";
import { GlobalStyle, StyledHeader } from "../styles";
import {
  SectionWrapper,
  ArtistsGrid,
  TrackList,
  PlaylistsGrid,
  Loader,
} from "../components";
import { client_id, redirect_url, scopes } from "../spotify";

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>();
  const [pagePlaylist, setPagePlaylist] = useState<Page<SimplifiedPlaylist>>();
  const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  useEffect(() => {
    const fetchData = async () => {
      if (sdk) {
        const userProfile = await sdk.currentUser.profile();
        setProfile(userProfile);

        const userPlaylistsPage = await sdk.currentUser.playlists.playlists();
        setPagePlaylist(userPlaylistsPage);

        const userPlaylists = (await sdk.currentUser.playlists.playlists(50))
          .items;
        setPlaylists(userPlaylists);

        const userTopArtists = (await sdk.currentUser.topItems("artists"))
          .items;
        setTopArtists(userTopArtists);

        const userTopTracks = (await sdk.currentUser.topItems("tracks")).items;
        setTopTracks(userTopTracks);
      }
    };

    catchErrors(fetchData());
  }, [sdk]);

  useEffect(() => {
    if (!pagePlaylist) {
      return;
    }
    const fetchMoreData = async () => {
      if (pagePlaylist.next) {
        const urlParts = pagePlaylist.next.split("https://api.spotify.com/v1/");
        if (urlParts.length === 2) {
          const apiUrl = urlParts[1];
          const data: Page<SimplifiedPlaylist> = await sdk.makeRequest(
            "GET",
            apiUrl
          );
          setPlaylists(data.items);
        }
      }
    };
    catchErrors(fetchMoreData());
  }, [topTracks]);

  return (
    <>
      <GlobalStyle />
      {profile && (
        <>
          <StyledHeader type="user">
            <div className="header__inner">
              {profile.images.length && profile.images[1].url && (
                <img
                  className="header__img"
                  src={profile.images[1].url}
                  alt="Avatar"
                />
              )}
              <div>
                <div className="header__overline">Profile</div>
                <h1 className="header__name">{profile.display_name}</h1>
                <p className="header__meta">
                  {playlists && (
                    <span>
                      {playlists.length} Playlist
                      {playlists.length !== 1 ? "s" : " "}
                    </span>
                  )}

                  <span>
                    {profile.followers.total} Follower
                    {profile.followers.total !== 1 ? "s" : ""}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>

          <main>
            {topArtists && topTracks && playlists ? (
              <>
                <SectionWrapper
                  title="Top artists this month"
                  seeAllLink="/top-artists"
                >
                  <ArtistsGrid artists={topArtists.slice(0, 10)} />
                </SectionWrapper>

                <SectionWrapper
                  title="Top tracks this month"
                  seeAllLink="/top-tracks"
                >
                  <TrackList tracks={topTracks.slice(0, 10)} />
                </SectionWrapper>

                <SectionWrapper
                  title="Public Playlists"
                  seeAllLink="/playlists"
                >
                  <PlaylistsGrid playlists={playlists.slice(0, 10)} />
                </SectionWrapper>
              </>
            ) : (
              <Loader />
            )}
          </main>
        </>
      )}
    </>
  );
};

export default Profile;
