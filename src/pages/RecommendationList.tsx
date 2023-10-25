import { useContext, useEffect, useState } from "react";
import Logo from "../components/Logo";
import RecommendationHeader from "../components/recommendation/RecommendationHeader";
import RecommendationSection from "../components/recommendation/RecommendationSection";
import { CartContext } from "../components/recommendation/Recommendation";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { catchErrors } from "../utils";
import RecommendationResponseTrackCard from "../components/recommendation/RecommendationResponseTrackCard";
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
  const { requestForRec } = useContext(CartContext);
  const [recResponse, setRecResponse] = useState<RecommendationsResponse>();
  const [getResponse, setGetResponse] = useState<boolean>(false);

  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  const handleRequest = () => {
    if (!recResponse) {
      setGetResponse(true);
    } else {
      setGetResponse(false);
      setGetResponse(true);
    }
  };

  useEffect(() => {
    if (!sdk) {
      return;
    }

    const fetchData = async () => {
      const data = await sdk.recommendations.get(requestForRec);
      setRecResponse(data);
    };
    catchErrors(fetchData());
  }, [requestForRec, sdk, getResponse]);

  return (
    <>
      <Logo />
      <RecommendationHeader />
      <div className="flex bg-slate-900 justify-center pt-4 pb-4">
        <button
          className="bg-purple-400 text-white bg-opacity-20 rounded-full w-32 h-32 text-xs "
          onClick={handleRequest}
        >
          Request Recommendations
        </button>
      </div>
      <RecommendationSection />
      {recResponse && getResponse && (
        <div className="bg-slate-800 ">
          <div className="bg-slate-300 bg-opacity-20 grid grid-cols-1 ml-6 mr-6 pt-2 ">
            {recResponse.tracks.map((track, index) => (
              <Link
                key={index}
                to={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <RecommendationResponseTrackCard
                  index={index}
                  id={track.id}
                  image={track.album.images}
                  name={track.name}
                  duration={track.duration_ms}
                  artists={track.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default RecommendationList;
