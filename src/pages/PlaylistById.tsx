import { PlaylistedTrack, SpotifyApi, Page } from "@spotify/web-api-ts-sdk";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { useParams } from "react-router-dom";
import React from "react";

function PlaylistById() {
  const { id } = useParams();
  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;
  // const [tracks, setTracks] = useState<PlaylistedTrack[]>([]);
  const {
    data,
    error,
    fetchNextPage,
    isFetching,
    status,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<Page<PlaylistedTrack> | undefined>({
    queryKey: ["playlistTracks", id],

    queryFn: async ({ pageParam = 0 }) => {
      const playlist = await sdk.playlists.getPlaylistItems(
        id as string,
        undefined,
        undefined,
        undefined,
        Number(pageParam)
      );
      return playlist;
    },

    enabled: !!sdk,

    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.next) {
        const url = new URL(lastPage.next);
        const pageParam = url.searchParams.get("offset");
        return Number(pageParam);
      }
      return undefined;
    },
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return status === "pending" ? (
    <p>Loading...</p>
  ) : (
    <>
      <div>
        {data &&
          !isFetchingNextPage &&
          data.pages.map((playlist, index) => (
            <>
              <React.Fragment key={index}>
                {playlist?.items.map((t, i) => (
                  <div key={i}>
                    <p>{i + 1}</p>
                    <p>{t.track.name}</p>
                  </div>
                ))}
              </React.Fragment>
            </>
          ))}
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage
            ? "Loading More..."
            : hasNextPage
            ? "Load More"
            : "Nothing to Load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}

export default PlaylistById;

// import { useState, useEffect, useMemo } from "react";
// import { SpotifyApi } from "@spotify/web-api-ts-sdk";
// import { useSpotify } from "../hooks/useSpotify";
// import {
//   AudioFeatures,
//   Page,
//   Playlist,
//   PlaylistedTrack,
//   Track,
// } from "@spotify/web-api-ts-sdk";
// import { catchErrors } from "../utils";
// import { client_id, redirect_url, scopes } from "../spotify";

// interface AudioFeaturesWithListOrder extends AudioFeatures {
//   default_list_order?: string;
// }
// interface TrackWithAudioFeatures extends Track {
//   audio_features?: AudioFeaturesWithListOrder;
// }

// const PlaylistById = () => {
//   const [playlistPage, setPlaylistPage] = useState<Playlist>();
//   const [playlistTracks, setPlaylistTracks] = useState<Page<PlaylistedTrack>>();
//   const [tracks, setTracks] = useState<TrackWithAudioFeatures[]>([]);
//   const [audioFeatures, setAudioFeatures] = useState<AudioFeatures[]>([]);
//   // const [sortValue] =
//   //   useState<keyof AudioFeaturesWithListOrder>("default_list_order");
//   // // const sortOptions = [
//   //   "danceability",
//   //   "energy",
//   //   "key",
//   //   "loudness",
//   //   "mode",
//   //   "speechiness",
//   //   "acousticness",
//   //   "instrumentalness",
//   //   "liveness",
//   //   "valence",
//   //   "tempo",
//   //   "time_signature",
//   // ];

//   const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

//   useEffect(() => {
//     if (!sdk) {
//       return;
//     }
//     const fetchData = async () => {
//       if (sdk) {
//         const data = (await sdk.playlists.getPlaylist(
//           id as string
//         )) as Playlist;
//         setPlaylistPage(data);
//         setPlaylistTracks(data.tracks);
//       }
//     };

//     catchErrors(fetchData());
//   }, [sdk]);

//   useEffect(() => {
//     if (!playlistTracks) {
//       return;
//     }

//

//     const newTracks: Track[] = playlistTracks.items
//       .map(({ track }: PlaylistedTrack) => track)
//       .filter((track): track is Track => {
//         return track.type === "track";
//       });

//     setTracks((prevTracks): Track[] => {
//       const trackIds = prevTracks.map((track) => track.id);

//       const uniqueNewTracks = newTracks.filter(
//         (track) => !trackIds.includes(track.id)
//       );

//       return [...prevTracks, ...uniqueNewTracks];
//     });

//     catchErrors(fetchMoreData());

//     const fetchAudioFeatures = async () => {
//       const ids = playlistTracks.items.map(
//         ({ track }: PlaylistedTrack) => track.id
//       );

//       const data = await sdk.tracks.audioFeatures(ids);

//       setAudioFeatures((audioFeatures) => [
//         ...(audioFeatures ? audioFeatures : []),
//         ...data,
//       ]);
//     };

//     catchErrors(fetchAudioFeatures());
//   }, [playlistTracks]);

//   // const tracksWithAudioFeatures = useMemo(() => {
//   //   if (!tracks || !audioFeatures) {
//   //     return null;
//   //   }

//   //   return tracks.map((track) => {
//   //     const trackToAdd = track as TrackWithAudioFeatures;

//   //     if (!track.audio_features) {
//   //       const audioFeaturesObject = audioFeatures.find((item) => {
//   //         if (!item || !track) {
//   //           return null;
//   //         }
//   //         return item.id === track.id;
//   //       });
//   //       trackToAdd["audio_features"] = audioFeaturesObject;
//   //     }

//   //     return trackToAdd;
//   //   });
//   // }, [tracks, audioFeatures]);

//   // const sortedTracks = useMemo(() => {
//   //   if (!tracksWithAudioFeatures) {
//   //     return null;
//   //   }

//   //   return [...tracksWithAudioFeatures].sort(
//   //     (a: TrackWithAudioFeatures, b: TrackWithAudioFeatures) => {
//   //       const aFeatures = a["audio_features"] as AudioFeaturesWithListOrder;
//   //       const bFeatures = b["audio_features"] as AudioFeaturesWithListOrder;

//   //       if (!aFeatures || !bFeatures) {
//   //         return 0;
//   //       }

//   //       return Number(bFeatures[sortValue]) - Number(aFeatures[sortValue]);
//   //     }
//   //   );
//   // }, [sortValue, tracksWithAudioFeatures]);

//   return (
//     <>
//       {playlistPage && (
//         <>
//           <div className="header__inner">
//             {playlistPage.images.length && playlistPage.images[0].url && (
//               <img
//                 className="header__img"
//                 src={playlistPage.images[0].url}
//                 alt="Playlist Artwork"
//               />
//             )}
//             <div>
//               <div className="header__overline">Playlist</div>
//               <h1 className="header__name">{playlistPage.name}</h1>
//               <p className="header__meta">
//                 {playlistPage.followers.total ? (
//                   <span>
//                     {playlistPage.followers.total}{" "}
//                     {`follower${playlistPage.followers.total !== 1 ? "s" : ""}`}
//                   </span>
//                 ) : null}
//                 <span>
//                   {playlistPage.tracks.total}{" "}
//                   {`song${playlistPage.tracks.total !== 1 ? "s" : ""}`}
//                 </span>
//               </p>
//             </div>
//           </div>

//           <main></main>
//         </>
//       )}
//     </>
//   );
// };

// export default PlaylistById;
