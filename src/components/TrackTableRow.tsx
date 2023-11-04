import { TrackProps } from "@/types";
import { formatDuration } from "@/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { Link } from "react-router-dom";
import { getAudioFeatureFontSize } from "@/utils/VisualAudioFeatureRepresentation";

export const TrackTableRow: React.FC<TrackProps> = ({
  artists,
  duration,
  image,
  order,
  name,
  uri,
  audio_features,
  popularity,
}) => {
  return (
    <>
      <TableRow className="bg-black bg-opacity-10 hover:bg-green-200 hover:bg-opacity-10">
        <TableCell className="font-medium">{order}</TableCell>
        <TableCell>
          <Link to={`${uri}`}>
            <img className="max-h-36 max-w-36" src={image[0].url} alt={name} />
          </Link>
        </TableCell>
        <TableCell className="font-medium">{name}</TableCell>

        <TableCell title={popularity.toString()} className="hover:cursor-wait">
          <span
            style={{
              fontSize: getAudioFeatureFontSize(popularity, "0/100"),
            }}
          >
            🔥
          </span>
        </TableCell>

        <TableCell className="pr-10 font-bold">{artists}</TableCell>
        {audio_features && (
          <>
            <TableCell
              title={audio_features.danceability.toString()}
              className="hover:cursor-wait"
            >
              <span
                style={{
                  fontSize: getAudioFeatureFontSize(
                    audio_features.danceability,
                    "default"
                  ),
                }}
              >
                💃
              </span>
            </TableCell>

            <TableCell
              title={audio_features.energy.toString()}
              className="hover:cursor-wait"
            >
              <span
                style={{
                  fontSize: getAudioFeatureFontSize(
                    audio_features.energy,
                    "default"
                  ),
                }}
              >
                ⚡
              </span>
            </TableCell>

            <TableCell
              title={audio_features.loudness.toString()}
              className="hover:cursor-wait"
            >
              <span
                style={{
                  fontSize: getAudioFeatureFontSize(
                    audio_features.loudness,
                    "loudness"
                  ),
                }}
              >
                🔊
              </span>
            </TableCell>

            <TableCell
              title={audio_features.speechiness.toString()}
              className="hover:cursor-wait"
            >
              <span
                style={{
                  fontSize: getAudioFeatureFontSize(
                    audio_features.speechiness,
                    "default"
                  ),
                }}
              >
                🗣️
              </span>
            </TableCell>

            <TableCell
              title={audio_features.acousticness.toString()}
              className="hover:cursor-wait"
            >
              <span
                style={{
                  fontSize: getAudioFeatureFontSize(
                    audio_features.acousticness,
                    "default"
                  ),
                }}
              >
                🎻
              </span>
            </TableCell>

            <TableCell
              title={audio_features.instrumentalness.toString()}
              className="hover:cursor-wait"
            >
              <span
                style={{
                  fontSize: getAudioFeatureFontSize(
                    audio_features.instrumentalness,
                    "default"
                  ),
                }}
              >
                🎷
              </span>
            </TableCell>

            <TableCell
              title={audio_features.liveness.toString()}
              className="hover:cursor-wait"
            >
              <span
                style={{
                  fontSize: getAudioFeatureFontSize(
                    audio_features.liveness,
                    "default"
                  ),
                }}
              >
                🎤
              </span>
            </TableCell>

            <TableCell
              title={audio_features.valence.toString()}
              className="hover:cursor-wait"
            >
              <span
                style={{
                  fontSize: getAudioFeatureFontSize(
                    audio_features.valence,
                    "default"
                  ),
                }}
              >
                😊
              </span>
            </TableCell>
          </>
        )}

        <TableCell className="text-right">{formatDuration(duration)}</TableCell>
      </TableRow>
    </>
  );
};