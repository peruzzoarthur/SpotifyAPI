// import { SavedTrack, Page, Track } from "@spotify/web-api-ts-sdk";
// import { useState, useEffect, useMemo } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { catchErrors } from "../utils";
// import { TrackList, SectionWrapper, Loader } from "../components";
// import { GlobalStyle, StyledHeader, StyledDropdown } from "../styles";

// const LikedSongs = () => {
//   const [likedSongsPage, setLikedSongsPage] = useState<Page<SavedTrack>>();
//   const [tracksData, setTracksData] = useState<Track[]>([]);
//   const [tracks, setTracks] = useState<Track[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data } = await getLikedSongs();
//       setLikedSongsPage(data);
//       setTracksData(data.items.map(({ track }) => track));
//     };
//     catchErrors(fetchData());
//   }),
//     [];

//   // useEffect(() => {
//   //   if (!likedSongsPage) {
//   //     return;
//   //   }

//   //   const fetchMoreData = async () => {
//   //     if (likedSongsPage.next) {
//   //       const data: Page<SavedTrack> = await axios.get(likedSongsPage.next);
//   //       setTracksData(data.items.map(({ track }) => track));
//   //     }
//   //   };

//   //   const newTracks: Track[] = tracksData.filter((track): track is Track => {
//   //     return track.type === "track";
//   //   });

//   //   setTracks((prevTracks): Track[] => {
//   //     const trackIds = prevTracks.map((track) => track.id);
//   //     const uniqueNewTracks = newTracks.filter(
//   //       (track) => !trackIds.includes(track.id)
//   //     );
//   //     return [...prevTracks, ...uniqueNewTracks];
//   //   });
//   //   catchErrors(fetchMoreData());
//   // }),
//   //   [tracksData];

//   return (
//     <>
//       {likedSongsPage && (
//         <>
//           <GlobalStyle />
//           <main>
//             <h1>Testing Page</h1>
//           </main>
//         </>
//       )}
//     </>
//   );
// };

// export default LikedSongs;
