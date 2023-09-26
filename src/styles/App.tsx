import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import TopTracks from "../components/TopTracks";
import Playlists from "../components/Playlists";
import TopArtists from "../components/TopArtists";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/top-tracks" element={<TopTracks />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/top-artists" element={<TopArtists />} />
    </Routes>
  );
}

export default App;
