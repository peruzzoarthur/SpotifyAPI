import { Track } from "@spotify/web-api-ts-sdk";

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

export type TrackWithAudioFeatures = Track & {
  audio_features: AudioFeatures;
};

export type RecommendationsResponse = {
  seeds: RecommendationSeed[];
  tracks: TrackWithAudioFeatures[];
};

export type AudioFeatures = {
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  type: string;
  id: string;
  uri: string;
  track_href: string;
  analysis_url: string;
  duration_ms: number;
  time_signature: number;
};
export interface RecommendationSeed {
  id: string;
  href: string;
  type: string;
  initialPoolSize: number;
  afterFilteringSize: number;
  afterRelinkingSize: number;
}
