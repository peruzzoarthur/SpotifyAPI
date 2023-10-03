import { Routes, Route } from "react-router-dom";
import {
  Home,
  Playlists,
  TopArtists,
  TopTracks,
  LikedSongs,
  PlaylistById,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/liked-songs" element={<LikedSongs />} />
      <Route path="/playlists/:id" element={<PlaylistById />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/top-artists" element={<TopArtists />} />
      <Route path="/top-tracks" element={<TopTracks />} />
    </Routes>
  );
}

export default App;
