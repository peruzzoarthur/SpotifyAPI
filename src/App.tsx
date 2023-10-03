import { Routes, Route } from "react-router-dom";
import {
  Home,
  Playlists,
  TopArtists,
  TopTracks,
  // LikedSongs,
  PlaylistById,
} from "./pages";

function App() {
  const client_id = import.meta.env.VITE_CLIENT_ID;
  console.log(client_id);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/liked-songs" element={<LikedSongs />} /> */}
      <Route path="/playlists/:id" element={<PlaylistById />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/top-artists" element={<TopArtists />} />
      <Route path="/top-tracks" element={<TopTracks />} />
    </Routes>
  );
}

export default App;
