import { Routes, Route } from "react-router-dom";
import { Home, Playlist, Playlists, TopArtists, TopTracks } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/playlists/:id" element={<Playlist />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/top-artists" element={<TopArtists />} />
      <Route path="/top-tracks" element={<TopTracks />} />
    </Routes>
  );
}

export default App;
