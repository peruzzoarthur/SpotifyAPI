import { TrackWithAudioFeatures } from "@/types";
import { Artist, Artists, SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useArtistById = ({ sdk }: { sdk: SpotifyApi }) => {
  const { id } = useParams<string>();
  if (!id) {
    throw new Error("No ID provided");
  }

  const { data: artistData } = useQuery<Artist>({
    queryKey: ["artist-by-id", id],
    queryFn: async () => {
      const fetchArtistData = await sdk.artists.get(id);
      return fetchArtistData;
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: relatedArtists } = useQuery<Artists>({
    queryKey: ["related-artists-by-id", id],
    queryFn: async () => {
      const fetchRelatedArtistsData = await sdk.artists.relatedArtists(id);
      return fetchRelatedArtistsData;
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: artistTopTracks } = useQuery<TrackWithAudioFeatures[]>({
    queryKey: ["artist-top-tracks-by-id", id],
    queryFn: async () => {
      const fetchTopTracksData = await sdk.artists.topTracks(id, "BR");
      const ids = fetchTopTracksData.tracks.map((t) => t.id);
      const fetchAudioFeatures = await sdk.tracks.audioFeatures(ids);

      const tracksWithAudioFeatures: TrackWithAudioFeatures[] =
        fetchTopTracksData.tracks.map((t) => {
          const correspondingAudioFeature = fetchAudioFeatures.find(
            (audioFeature) => audioFeature.id === t.id
          );
          return {
            ...(t as Track),
            audio_features: correspondingAudioFeature,
          };
        });

      return tracksWithAudioFeatures;
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { artistData, relatedArtists, artistTopTracks };
};
