import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { AnalogBackground } from "@/components/background/analogBackground";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTopArtistsSection } from "@/components/profile/ProfileTopArtistsSection";
import { ProfileTopTracksSection } from "@/components/profile/ProfileTopTracksSection";
import { ProfilePlaylistsSection } from "@/components/profile/ProfilePlaylistsSection";
import { useSdk } from "@/hooks/useSdk";
import { useGetProfileData } from "@/hooks/useGetProfileData";
import { ProfileSavedAlbumsSection } from "@/components/profile/ProfileSavedAlbumsSection";

export const Profile = () => {
  const sdk: SpotifyApi = useSdk();

  const { data, state, error } = useGetProfileData({ sdk });

  if (error instanceof Error) {
    return (
      <>
        <div> {error.profileError?.message}</div>
        <div> {error.playlistsError?.message}</div>
        <div> {error.topItemsError?.message}</div>
      </>
    );
  }

  if (
    state.profileFetching ||
    state.playlistsFetching ||
    state.topItemsFetching
  ) {
    return <div>Loading...</div>;
  }

  return (
    <AnalogBackground>
      {data.profileData && data.userPlaylists && data.userTopItems && (
        <>
          <ProfileHeader
            followers={data.profileData.followers.total}
            image={data.profileData.images[1].url}
            name={data.profileData.display_name}
          />
          {data.userTopItems?.topArtists && (
            <ProfileTopArtistsSection
              topArtists={data.userTopItems.topArtists}
            />
          )}

          {data.userTopItems?.topTracks && (
            <ProfileTopTracksSection topTracks={data.userTopItems.topTracks} />
          )}

          {data.userPlaylists && (
            <ProfilePlaylistsSection playlists={data.userPlaylists} />
          )}

          {data.savedAlbums && (
            <ProfileSavedAlbumsSection savedAlbum={data.savedAlbums} />
          )}
        </>
      )}
    </AnalogBackground>
  );
};
