import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import {
  Config,
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { CartContext } from "../components/recommendation/RecommendationContext";
import { RecommendationHeader } from "../components/recommendation/RecommendationHeader";
import { RecommendationSection } from "../components/recommendation/RecommendationSection";
import { RecommendationsResponse } from "../components/recommendation/types";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import logo from "../styles/img/spotify_logologo.jpg";
import { Table, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TrackTableRow } from "@/components/TrackTableRow";
import { TrackTableHeader } from "@/components/TrackTableHeader";
import { useToast } from "@/components/ui/use-toast";
import { CustomError } from "@/CustomError";
import { AnalogBackground } from "@/components/background/analogBackground";
import { RecommendationAlert } from "@/components/recommendation/RecommendationAlert";

const randomStringConfig: Config = {
  dictionaries: [colors, adjectives, animals],
  separator: " ",
  length: 3,
};

export const Recommendation = () => {
  const { requestForRec } = useContext(CartContext);
  const [recResponse, setRecResponse] = useState<RecommendationsResponse>();
  const [addAsPlaylist, setAddAsPlaylist] = useState<string[]>([]);
  const { toast } = useToast();

  const sdk = useSpotify(client_id, redirect_url, scopes);

  const exportAsPlaylist = async () => {
    if (!sdk) {
      throw new CustomError(
        "Authentication error. Please refresh your login.",
        500
      );
    }
    if (!addAsPlaylist) {
      throw new CustomError("No uris added for playlist export...", 405);
    }

    const randomCoolPlaylistName = uniqueNamesGenerator(randomStringConfig);
    const createPlaylist = await sdk.playlists.createPlaylist("sp3ruzzo", {
      name: `Cold ${randomCoolPlaylistName}`,
      description: "Created with Coldzapp Spotify API",
      public: true,
    });

    const addRecommendationsToPlaylist = await sdk.playlists.addItemsToPlaylist(
      createPlaylist.id,
      addAsPlaylist
    );

    const toasted = async () => {
      toast({
        title: "Success! 🙌",
        description: `Created playlist with name "Cold ${randomCoolPlaylistName}"`,
        className: "bg-black bg-opacity-60 text-white",
      });
    };
    await toasted();
    return addRecommendationsToPlaylist;
  };

  const { error, isFetching } = useQuery<
    RecommendationsResponse | undefined,
    CustomError
  >({
    queryKey: ["recommendation-response"],
    queryFn: async () => {
      if (!sdk) {
        throw new CustomError(
          "Authentication error. Please refresh your login.",
          500
        );
      }

      if (
        requestForRec.seed_artists.length === 0 &&
        requestForRec.seed_genres.length === 0 &&
        requestForRec.seed_tracks.length === 0
      ) {
        throw new CustomError(
          "Please select at least one artist, genre, or track for recommendations.",
          409
        );
      }
      try {
        const fetchRecommendations = await sdk.recommendations.get(
          requestForRec
        );
        setAddAsPlaylist(fetchRecommendations.tracks.map((t) => t.uri));
        const fetchAudioFeatures = await sdk.tracks.audioFeatures(
          fetchRecommendations.tracks.map((t) => t.id)
        );

        const recommendationWithAudioFeatures: RecommendationsResponse = {
          seeds: fetchRecommendations.seeds,
          tracks: fetchRecommendations.tracks.map((track, index) => ({
            ...track,
            audio_features: fetchAudioFeatures[index],
          })),
        };

        setRecResponse(recommendationWithAudioFeatures);
        return recommendationWithAudioFeatures;
      } catch (error) {
        if (error instanceof CustomError) {
          if (error.response.status === 400) {
            throw new CustomError("Please consider re-adjusting seeds.", 400);
          } else if (error.response.status === 429) {
            throw new CustomError(
              "API request limit reached, please try later...",
              429
            );
          } else {
            throw new CustomError(
              "Something strange happened, consider trying again...",
              500
            );
          }
        }
      }
    },
    enabled: !!sdk,
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    const defaultBehavior = {
      onClick: () => window.location.reload(),
      description: "Click to try again",
    };

    const returnBehavior = {
      onClick: () => (window.location.href = "/"),
      description: "Go back home",
    };

    return (
      <>
        <AnalogBackground>
          {error.response.status === 409 ? (
            <RecommendationAlert
              error={error}
              description={returnBehavior.description}
              onClick={returnBehavior.onClick}
            />
          ) : (
            <RecommendationAlert
              error={error}
              description={defaultBehavior.description}
              onClick={defaultBehavior.onClick}
            />
          )}

          <RecommendationHeader />

          <RecommendationSection />
        </AnalogBackground>
      </>
    );
  }

  return (
    <>
      <AnalogBackground>
        <RecommendationHeader />
        <RecommendationSection />
        {recResponse && recResponse.tracks.length !== 0 ? (
          <div className="flex flex-col items-center justify-center text-white bg-black rounded-md bg-opacity-80">
            <h1 className="mt-6 mb-6 text-2xl">Recommended Tracks</h1>
            <Table>
              <TrackTableHeader />
              <TableBody>
                {recResponse.tracks.map((track, index) => (
                  <TrackTableRow
                    key={index}
                    artists={track.artists.map((a) => a.name).join(", ")}
                    duration={track.duration_ms}
                    id={track.id}
                    image={track.album.images}
                    index={index}
                    name={track.name}
                    order={index + 1}
                    uri={track.uri}
                    popularity={track.popularity}
                    audio_features={track.audio_features}
                  />
                ))}
              </TableBody>
            </Table>
            <div className="flex">
              <Button
                onClick={async () => await exportAsPlaylist()}
                className="flex items-center mt-2 text-white transition-all duration-500 bg-white w-300 bg-opacity-30 hover:scale-110"
              >
                Export as Cool Playlist.
              </Button>
            </div>
          </div>
        ) : (
          <Alert
            variant="destructive"
            onClick={() => window.location.reload()}
            className="text-white bg-red-800 cursor-pointer"
          >
            <img className="w-4 h-4" src={logo} />
            <AlertTitle>Seed issue 😩</AlertTitle>
            <AlertDescription>
              Please re-adjust your seeds and clickOnMe...
            </AlertDescription>
          </Alert>
        )}
      </AnalogBackground>
    </>
  );
};
