import { useContext, useEffect, useState } from "react";
import Logo from "../components/Logo";
import RecommendationHeader from "../components/recommendation/RecommendationHeader";
import RecommendationSection from "../components/recommendation/RecommendationSection";
import { CartContext } from "../components/recommendation/Recommendation";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes, spotify_url } from "../spotify";
import { SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { catchErrors } from "../utils";
import LikedSongsTracksCard from "../components/liked-songs/LikedSongsTracksCard";
import { Link } from "react-router-dom";

export interface RecommendationsRequestRequiredArguments {
  seed_artists?: string[];
  seed_genres?: string[];
  seed_tracks?: string[];
}
export interface RecommendationsRequest
  extends RecommendationsRequestRequiredArguments {
  limit?: number;
  market?: string;
  min_acousticness?: number;
  max_acousticness?: number;
  target_acousticness?: number;
  min_danceability?: number;
  max_danceability?: number;
  target_danceability?: number;
  min_duration_ms?: number;
  max_duration_ms?: number;
  target_duration_ms?: number;
  min_energy?: number;
  max_energy?: number;
  target_energy?: number;
  min_instrumentalness?: number;
  max_instrumentalness?: number;
  target_instrumentalness?: number;
  min_key?: number;
  max_key?: number;
  target_key?: number;
  min_liveness?: number;
  max_liveness?: number;
  target_liveness?: number;
  min_loudness?: number;
  max_loudness?: number;
  target_loudness?: number;
  min_mode?: number;
  max_mode?: number;
  target_mode?: number;
  min_popularity?: number;
  max_popularity?: number;
  target_popularity?: number;
  min_speechiness?: number;
  max_speechiness?: number;
  target_speechiness?: number;
  min_tempo?: number;
  max_tempo?: number;
  target_tempo?: number;
  min_time_signature?: number;
  max_time_signature?: number;
  target_time_signature?: number;
  min_valence?: number;
  max_valence?: number;
  target_valence?: number;
}
export interface RecommendationsResponse {
  seeds: RecommendationSeed[];
  tracks: Track[];
}
export interface RecommendationSeed {
  id: string;
  href: string;
  type: string;
  initialPoolSize: number;
  afterFilteringSize: number;
  afterRelinkingSize: number;
}

function RecommendationList() {
  const { cart } = useContext(CartContext);
  const ids = { seed_tracks: cart.map((item) => item.id) };
  const [recRequest, setRecRequest] = useState<RecommendationsRequest>(ids);
  const [recResponse, setRecResponse] = useState<RecommendationsResponse>();
  const [getResponse, setGetResponse] = useState<boolean>(false);

  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  useEffect(() => {
    if (!sdk) {
      return;
    }
    const ids = { seed_tracks: cart.map((item) => item.id) };
    setRecRequest(ids);
    const fetchData = async () => {
      const data = await sdk.recommendations.get(recRequest);
      setRecResponse(data);
    };
    catchErrors(fetchData());
  }, [getResponse]);

  return (
    <>
      <Logo />
      <RecommendationHeader />
      <RecommendationSection />
      {recResponse && (
        <div className="bg-slate-900 grid grid-cols-1 ml-5">
          {recResponse.tracks.map((track) => (
            <Link to={`/track/${track.id}`}>
              <LikedSongsTracksCard
                id={track.id}
                image={track.album.images}
                name={track.name}
                duration={track.duration_ms}
                artists={track.artists.map((artist) => artist.name).join(", ")}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default RecommendationList;
