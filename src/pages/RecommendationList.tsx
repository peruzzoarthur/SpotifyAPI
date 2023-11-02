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
import RecommendationSection from "../components/recommendation/RecommendationSection";
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

const randomStringConfig: Config = {
  dictionaries: [colors, adjectives, animals],
  separator: " ",
  length: 3,
};

function RecommendationList() {
  const { requestForRec } = useContext(CartContext);
  const [recResponse, setRecResponse] = useState<RecommendationsResponse>();
  // const [getResponse, setGetResponse] = useState<boolean>(true);
  const [addAsPlaylist, setAddAsPlaylist] = useState<string[]>([]);
  const { toast } = useToast();

  const sdk = useSpotify(client_id, redirect_url, scopes);

  // const handleRequest = () => {
  //   if (!recResponse) {
  //     setGetResponse(true);
  //   } else {
  //     setGetResponse(false);
  //     setGetResponse(true);
  //   }
  // };

  const exportAsPlaylist = async () => {
    if (!sdk) {
      throw new Error("Authentication error. Please refresh your login.");
    }
    if (!addAsPlaylist) {
      throw new Error("No uris added for playlist export...");
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
        title: "Success!!!",
        description: `Created playlist with name "Cold ${randomCoolPlaylistName}"`,
        className: "bg-green-300 bg-opacity-60",
      });
    };
    await toasted();
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
        <Link to={"/"}>
          <Alert variant="destructive" className="text-white bg-red-800">
            <img className="w-4 h-4" src={logo} />
            <AlertTitle>{error.message}</AlertTitle>
            <AlertDescription>
              Click to go back to Profile Page.
            </AlertDescription>
          </Alert>
        </Link>
      </>
    );
  }

  return (
    <>
      <RecommendationHeader />

      <div className="bg-slate-950">
        <RecommendationSection>
          <Button
            onClick={async () => await exportAsPlaylist()}
            className="flex justify-center bg-green-300 bg-opacity-60"
          >
            Export as Cool Playlist.
          </Button>
        </RecommendationSection>
        {recResponse && (
          // && getResponse
          <div className="text-white rounded-md bg-slate-500 bg-opacity-60">
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
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
}

export default RecommendationList;
