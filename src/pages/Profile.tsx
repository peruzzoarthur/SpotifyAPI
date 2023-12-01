import { SpotifyApi } from "@spotify/web-api-ts-sdk";

import { AnalogBackground } from "@/components/background/analogBackground";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTopArtistsSection } from "@/components/profile/ProfileTopArtistsSection";
import { ProfileTopTracksSection } from "@/components/profile/ProfileTopTracksSection";
import { ProfilePlaylistsSection } from "@/components/profile/ProfilePlaylistsSection";
import { useSdk } from "@/hooks/useSdk";
import { useGetProfileData } from "@/hooks/useGetProfileData";

export const Profile = () => {
  const sdk: SpotifyApi = useSdk();

  const { profile, playlists, topItems } = useGetProfileData({ sdk });

  // if (profile.profileError || playlists.playlistsError || topItems.topItemsError) {
  //   return <div> {profile.profileError?.message};</div>;
  // }

  if (
    profile.profileFetching ||
    playlists.playlistsFetching ||
    topItems.topItemsFetching
  ) {
    return <div>Loading...</div>;
  }

  return (
    <AnalogBackground>
      {profile.profileData &&
        playlists.userPlaylists &&
        topItems.userTopItems && (
          <>
            <ProfileHeader
              followers={profile.profileData.followers.total}
              image={profile.profileData.images[1].url}
              name={profile.profileData.display_name}
            />
            {topItems.userTopItems?.topArtists && (
              <ProfileTopArtistsSection
                topArtists={topItems.userTopItems.topArtists}
              />
            )}

            {topItems.userTopItems?.topTracks && (
              <ProfileTopTracksSection
                topTracks={topItems.userTopItems.topTracks}
              />
            )}

            {playlists.userPlaylists && (
              <ProfilePlaylistsSection playlists={playlists.userPlaylists} />
            )}
          </>
        )}
    </AnalogBackground>
  );
};
