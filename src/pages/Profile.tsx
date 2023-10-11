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
// import { MainWithBackground } from "../components";
import ProfilePlaylistsSection from "../components/profile/ProfilePlaylistsSection";
import { client_id, redirect_url, scopes } from "../spotify";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTopTracksSection from "../components/profile/ProfileTopTracksSection";
import ProfileTopArtistsSection from "../components/profile/ProfileTopArtistsSection";

// ... (previous code)

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userCreatedPlaylists, setUserCreatedPlaylists] = useState<
    SimplifiedPlaylist[]
  >([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [pagePlaylist, setPagePlaylist] = useState<Page<SimplifiedPlaylist>>();

  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  useEffect(() => {
    const fetchData = async () => {
      if (sdk) {
        try {
          const userProfile = await sdk.currentUser.profile();
          setProfile(userProfile);

          const initialPlaylistsPage =
            await sdk.currentUser.playlists.playlists(50);
          setPagePlaylist(initialPlaylistsPage);

          const userPlaylists = initialPlaylistsPage.items;
          setUserCreatedPlaylists(
            userPlaylists.filter(
              (playlist) => playlist.owner.id === userProfile.id
            )
          );

          const userTopArtists = (await sdk.currentUser.topItems("artists"))
            .items;
          setTopArtists(userTopArtists);

          const userTopTracks = (await sdk.currentUser.topItems("tracks"))
            .items;
          setTopTracks(userTopTracks);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
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
        try {
          const urlParts = pagePlaylist.next.split(
            "https://api.spotify.com/v1/"
          );
          if (urlParts.length === 2) {
            const apiUrl = urlParts[1];
            const data: Page<SimplifiedPlaylist> = await sdk.makeRequest(
              "GET",
              apiUrl
            );
            setPagePlaylist(data);

            const newPlaylists = data.items.filter(
              (playlist) => playlist.owner.id === profile?.id
            );
            setUserCreatedPlaylists((prevPlaylists) => [
              ...prevPlaylists,
              ...newPlaylists,
            ]);
          }
        } catch (error) {
          console.error("Error fetching more playlists:", error);
        }
      }
    };
    catchErrors(fetchMoreData());
  }, [pagePlaylist, profile]);

  return (
    <main className="bg-black">
      {profile && (
        <div className="flex-col w-full">
          <ProfileHeader profile={profile} playlists={userCreatedPlaylists} />
          <ProfileTopArtistsSection topArtists={topArtists} />
          <ProfileTopTracksSection topTracks={topTracks} />
          <ProfilePlaylistsSection playlists={userCreatedPlaylists} />
        </div>
      )}
    </main>
  );
};

export default Profile;
