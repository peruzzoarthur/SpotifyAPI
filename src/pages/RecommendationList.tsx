import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Config,
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { CartContext } from "../components/recommendation/Recommendation";
import RecommendationHeader from "../components/recommendation/RecommendationHeader";
import RecommendationResponseTrackCard from "../components/recommendation/RecommendationResponseTrackCard";
import RecommendationSection from "../components/recommendation/RecommendationSection";
import { RecommendationsResponse } from "../components/recommendation/types";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";

const customConfig: Config = {
  dictionaries: [colors, adjectives, animals],
  separator: " ",
  length: 3,
};

function RecommendationList() {
  const { requestForRec } = useContext(CartContext);
  const [recResponse, setRecResponse] = useState<RecommendationsResponse>();
  const [getResponse, setGetResponse] = useState<boolean>(true);
  const [addAsPlaylist, setAddAsPlaylist] = useState<string[]>([]);

  const sdk = useSpotify(client_id, redirect_url, scopes);

  const handleRequest = () => {
    if (!recResponse) {
      setGetResponse(true);
    } else {
      setGetResponse(false);
      setGetResponse(true);
    }
  };

  const exportAsPlaylist = async () => {
    if (!sdk) {
      throw new Error("Authentication error. Please refresh your login.");
    }
    if (!addAsPlaylist) {
      throw new Error("No uris added for playlist export...");
    }

    const newPlaylistName = uniqueNamesGenerator(customConfig);
    const createPlaylist = await sdk.playlists.createPlaylist("sp3ruzzo", {
      name: `Cold ${newPlaylistName}`,
      description: "Created with Coldzapp Spotify API",
      public: true,
    });

    const addRecommendationsToPlaylist = await sdk.playlists.addItemsToPlaylist(
      createPlaylist.id,
      addAsPlaylist
    );

    window.alert(
      `Success creating playlist with name "Cold ${newPlaylistName}"`
    );
    return addRecommendationsToPlaylist;
  };

  const { error, isFetching } = useQuery<RecommendationsResponse | undefined>({
    queryKey: ["recommendation-response"],
    queryFn: async () => {
      if (!sdk) {
        throw new Error("Authentication error. Please refresh your login.");
      }

      if (
        requestForRec.seed_artists.length === 0 &&
        requestForRec.seed_genres.length === 0 &&
        requestForRec.seed_tracks.length === 0
      ) {
        throw new Error(
          "Please select at least one artist, genre, or track for recommendations."
        );
      }

      const fetch = await sdk.recommendations.get(requestForRec);
      setRecResponse(fetch);
      setAddAsPlaylist(fetch.tracks.map((t) => t.uri));
      return fetch;
    },
    enabled: !!sdk,
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <>
        <main>
          <div className="flex flex-col justify-between w-full h-full">
            <div className="flex text-white bg-red-900">
              Error: {error.message}
            </div>
            <Link to={"/"}>
              <div className="bg-black w-16 h-6 text-white text-center rounded-md ml-0.5 mt-0.5">
                Back
              </div>
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <RecommendationHeader />
      <div className="flex justify-center pt-4 pb-4 bg-slate-900">
        <button
          className="w-32 h-32 text-white bg-purple-400 rounded-full bg-opacity-20 "
          onClick={handleRequest}
        >
          Request Recommendations
        </button>
        <button
          className="w-32 h-32 text-xs text-white bg-green-400 rounded-full bg-opacity-20 "
          onClick={exportAsPlaylist}
        >
          Export this tracks as a Playlist
        </button>
      </div>
      <RecommendationSection />
      {recResponse && getResponse && (
        <div className="bg-slate-800 ">
          <div className="grid grid-cols-1 pt-2 ml-6 mr-6 bg-slate-300 bg-opacity-20 ">
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
