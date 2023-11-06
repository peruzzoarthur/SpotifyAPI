// import { useState } from "react";
import { useSpotify } from "../hooks/useSpotify";
import {
  Artist,
  Track,
  SimplifiedPlaylist,
  SimplifiedArtist,
} from "@spotify/web-api-ts-sdk";

import { client_id, redirect_url, scopes } from "../spotify";
import { useQuery } from "@tanstack/react-query";
import { CustomError } from "@/CustomError";
import { AnalogBackground } from "@/components/background/analogBackground";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTopArtistsSection } from "@/components/profile/ProfileTopArtistsSection";
import { ProfileTopTracksSection } from "@/components/profile/ProfileTopTracksSection";
import { ProfilePlaylistsSection } from "@/components/profile/ProfilePlaylistsSection";

type ProfileData = {
  userData: {
    picture: string;
    name: string;
    followers: number;
  };
  topArtists: Artist[];
  topTracks: Track[];
  topTracksArtists: Artist[];
  playlists: SimplifiedPlaylist[];
};

export const Profile = () => {
  const sdk = useSpotify(client_id, redirect_url, scopes);

  const { data, error, isFetching } = useQuery<ProfileData, CustomError>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!sdk) {
        throw new CustomError(
          "Authentication error. Please refresh your login.",
          500
        );
      }

      try {
        const fetchUserData = await sdk.currentUser.profile();

        const fetchTopArtists: Artist[] = (
          await sdk.currentUser.topItems("artists", undefined, 5)
        ).items;

        const fetchTopTracks: Track[] = (
          await sdk.currentUser.topItems("tracks", undefined, 5)
        ).items;

        const topTracksSimpleArtists: SimplifiedArtist[] =
          fetchTopTracks.flatMap((t) => t.artists);
        const topTracksArtists = await sdk.artists.get(
          topTracksSimpleArtists.map((a) => a.id)
        );

        const fetchUserPlaylists: SimplifiedPlaylist[] = (
          await sdk.currentUser.playlists.playlists(5)
        ).items;

        return {
          userData: {
            picture: fetchUserData?.images[1]?.url || "",
            name: fetchUserData?.display_name || "",
            followers: fetchUserData?.followers?.total || 0,
          },
          topArtists: fetchTopArtists,
          topTracks: fetchTopTracks,
          topTracksArtists: topTracksArtists,
          playlists: fetchUserPlaylists,
        };
      } catch (error) {
        //TODO adjust errors
        throw new CustomError("im a satanic sample error", 666);
      }
    },
    enabled: !!sdk,
  });

  if (error) {
    return <div> {error.message};</div>;
  }

  if (isFetching) {
    return <div>Loading...</div>;
  }
  return (
    <AnalogBackground>
      {data && (
        <>
          <ProfileHeader
            followers={data.userData.followers}
            image={data.userData.picture}
            name={data.userData.name}
          />
          <ProfileTopArtistsSection topArtists={data.topArtists} />
          <ProfileTopTracksSection topTracks={data.topTracks} />
          <ProfilePlaylistsSection playlists={data.playlists} />
        </>
      )}
    </AnalogBackground>
  );
};
