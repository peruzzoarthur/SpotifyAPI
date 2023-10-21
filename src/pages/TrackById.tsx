//                   localhost:5173/track/2h1ldahFup45Jdz8pAnpOQ
import { useState, useEffect } from "react";
import { TrackInfoCard } from "../components";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { AudioFeatures, SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { useParams } from "react-router-dom";
import { catchErrors } from "../utils";

const TrackById = () => {
  const { id } = useParams();
  const [trackData, setTrackData] = useState<Track | undefined>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [audioFeatures, setAudioFeatures] = useState<
    AudioFeatures | undefined
  >();

  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  useEffect(() => {
    if (!sdk) {
      return;
    }
    const fetchTrackData = async () => {
      const data = await sdk.tracks.get(id as string);
      setTrackData(data);
      setImageUrl(data.album.images[0].url);
    };
    catchErrors(fetchTrackData());
  }, [id, sdk]);

  useEffect(() => {
    if (!trackData) {
      return;
    }
    const fetchAudioFeatures = async () => {
      const data = await sdk.tracks.audioFeatures(id as string);
      setAudioFeatures(data);
    };
    catchErrors(fetchAudioFeatures());
  }, [id, sdk.tracks, trackData]);

  return (
    <>
      <div className="bg-black h-screen pt-2 flex flex-row justify-center">
        <TrackInfoCard
          imageUrl={imageUrl}
          audioFeatures={audioFeatures}
          album={trackData?.album.name}
          trackName={trackData?.name}
          artists={trackData?.artists[0].name}
        />
        <button className="text-white bg-purple-950 bg-opacity-60 h-16 w-32 rounded-full ml-6">
          Suggest Track
        </button>
      </div>
    </>
  );
};

export default TrackById;
