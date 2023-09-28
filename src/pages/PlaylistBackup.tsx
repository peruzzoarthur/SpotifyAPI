// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { catchErrors } from "../utils";
// import { getPlaylistById, getAudioFeaturesForTracks } from "../spotify";
// import { TrackList, SectionWrapper } from "../components";
// import { GlobalStyle, StyledHeader } from "../styles";

// const Playlist = () => {
//   const { id } = useParams();
//   const [playlist, setPlaylist] = useState<any>(null);
//   const [tracksData, setTracksData] = useState<any>(null);
//   const [tracks, setTracks] = useState<any[]>([]);
//   const [audioFeatures, setAudioFeatures] = useState<any>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data } = await getPlaylistById(id);

//       setPlaylist(data);
//       setTracksData(data.tracks.items);
//     };

//     catchErrors(fetchData());
//   }, [id]);

//   useEffect(() => {
//     if (!tracksData) {
//       return;
//     }

//     const fetchMoreData = async () => {
//       if (tracksData.next) {
//         const { data } = await axios.get(tracksData.next);
//         setTracksData(data);
//       }
//     };

//     const extractedTracks = tracksData.map((item: any) => item.track);

//     // Create a Set to keep track of unique track IDs
//     const uniqueTrackIds = new Set(tracks.map((track: any) => track.id)) as any;

//     // Filter out tracks that are already in the state
//     const newTracks = extractedTracks.filter(
//       (track: any) => !uniqueTrackIds.has(track.id)
//     );

//     setTracks((prevTracks: any) => [...prevTracks, ...newTracks]);

//     catchErrors(fetchMoreData());

//     // Also update the audioFeatures state variable using the track IDs
//     const fetchAudioFeatures = async () => {
//       const ids = tracksData.map(({ track }) => track.id).join(",");

//       const { data } = await getAudioFeaturesForTracks(ids);
//       setAudioFeatures((audioFeatures: any) => [
//         ...(audioFeatures ? audioFeatures : []),
//         ...data["audio_features"],
//       ]);
//     };
//     catchErrors(fetchAudioFeatures());
//   }, [tracksData]);

//   return (
//     <>
//       {playlist && (
//         <>
//           <GlobalStyle />
//           <StyledHeader>
//             <div className="header__inner">
//               {playlist.images.length && playlist.images[0].url && (
//                 <img
//                   className="header__img"
//                   src={playlist.images[0].url}
//                   alt="Playlist Artwork"
//                 />
//               )}
//               <div>
//                 <div className="header__overline">Playlist</div>
//                 <h1 className="header__name">{playlist.name}</h1>
//                 <p className="header__meta">
//                   {playlist.followers.total ? (
//                     <span>
//                       {playlist.followers.total}{" "}
//                       {`follower${playlist.followers.total !== 1 ? "s" : ""}`}
//                     </span>
//                   ) : null}
//                   <span>
//                     {playlist.tracks.total}{" "}
//                     {`song${playlist.tracks.total !== 1 ? "s" : ""}`}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </StyledHeader>

//           <main>
//             <SectionWrapper title="Playlist" breadcrumb={true}>
//               {tracks && <TrackList tracks={tracks} />}
//             </SectionWrapper>
//           </main>
//         </>
//       )}
//     </>
//   );
// };

// export default Playlist;
