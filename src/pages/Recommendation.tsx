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
import { ContainerDark } from "@/components/Container";
import { RecommendationOptions } from "@/components/recommendation/RecommendationOptions";

const randomStringConfig: Config = {
  dictionaries: [colors, adjectives, animals],
  separator: " ",
  length: 3,
};

export const Recommendation = () => {
  const { requestSeeds } = useContext(CartContext);
  // const [recResponse, setRecResponse] = useState<RecommendationsResponse>();
  const [addAsPlaylist, setAddAsPlaylist] = useState<string[]>([]);
  // Audio features states
  const [danceability, setDanceability] = useState<number[]>([]);
  const [energy, setEnergy] = useState<number[]>([]);
  const [loudness, setLoudness] = useState<number[]>([]);
  const [speechiness, setSpeechiness] = useState<number[]>([]);
  const [acousticness, setAcousticness] = useState<number[]>([]);
  const [instrumentalness, setInstrumentalness] = useState<number[]>([]);
  const [liveness, setLiveness] = useState<number[]>([]);
  const [valence, setValence] = useState<number[]>([]);

  // Options states
  const [isFilters, setIsFilters] = useState<boolean>(false);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState<boolean>(false);
  const [tryAgain, setTryAgain] = useState<boolean>(false);

  const { toast } = useToast();

  const sdk = useSpotify(client_id, redirect_url, scopes);

  const exportAsPlaylist = async () => {
    if (!sdk) {
      throw new CustomError(
        "Authentication error. Please refresh your login.",
        401
      );
    }
    if (!addAsPlaylist) {
      throw new CustomError("No uris added for playlist export...", 405);
    }

    const username = (await sdk.currentUser.profile()).display_name;
    const randomCoolPlaylistName = uniqueNamesGenerator(randomStringConfig);
    const createPlaylist = await sdk.playlists.createPlaylist(username, {
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

  const { data, error, isFetching } = useQuery<
    RecommendationsResponse | undefined,
    CustomError
  >({
    queryKey: ["recommendation-response", tryAgain],
    queryFn: async () => {
      if (!sdk) {
        throw new CustomError(
          "Authentication error. Please refresh your login.",
          401
        );
      }

      if (
        requestSeeds.seed_artists.length === 0 &&
        requestSeeds.seed_genres.length === 0 &&
        requestSeeds.seed_tracks.length === 0
      ) {
        throw new CustomError(
          "Please select at least one artist, genre, or track for recommendations.",
          400 //todo
        );
      }

      try {
        const fetchRecommendations = await sdk.recommendations.get({
          ...requestSeeds,
          limit: 20,
          target_acousticness: acousticness[0],
          target_danceability: danceability[0],
          target_energy: energy[0],
          target_instrumentalness: instrumentalness[0],
          target_liveness: liveness[0],
          target_loudness: loudness[0],
          target_speechiness: speechiness[0],
          target_valence: valence[0],
        });
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

        // setRecResponse(recommendationWithAudioFeatures);

        setTryAgain(false);

        return recommendationWithAudioFeatures;
      } catch (error) {
        throw new CustomError(`Please consider re-adjusting seeds.`, 400);
        //TODO -> the error im receiving here is a {message, status}, how can I catch this error type? and based on the status receive, treat the error differently. (400, 429)
      }
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });

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
          {!isFetching && error.status === 409 && (
            <RecommendationAlert
              error={error}
              description={returnBehavior.description}
              onClick={returnBehavior.onClick}
            />
          )}
          {!isFetching && error.status !== 409 && (
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
        <RecommendationOptions
          isFilters={isFilters}
          isFiltersExpanded={isFiltersExpanded}
          setIsFilters={setIsFilters}
          setIsFiltersExpanded={setIsFiltersExpanded}
          setValence={setValence}
          valence={valence}
          setTryAgain={setTryAgain}
          danceability={danceability}
          setDanceability={setDanceability}
          acousticness={acousticness}
          setAcousticness={setAcousticness}
          energy={energy}
          setEnergy={setEnergy}
          loudness={loudness}
          setLoudness={setLoudness}
          liveness={liveness}
          setLiveness={setLiveness}
          instrumentalness={instrumentalness}
          setInstrumentalness={setInstrumentalness}
          speechiness={speechiness}
          setSpeechiness={setSpeechiness}
        />
        {data && data.tracks.length !== 0 ? (
          <ContainerDark>
            <h1 className="mt-6 mb-6 text-2xl">Recommended Tracks</h1>
            {!isFetching ? (
              <>
                <Table>
                  <TrackTableHeader />
                  <TableBody>
                    {data.tracks.map((track, index) => (
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
                    Export as Cool Playlist
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-white"> Loading... </div>
            )}
          </ContainerDark>
        ) : (
          !isFetching && (
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
          )
        )}
      </AnalogBackground>
    </>
  );
};
