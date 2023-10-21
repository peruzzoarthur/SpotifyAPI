import { Routes, Route } from "react-router-dom";

import {
  Home,
  Playlists,
  TopArtists,
  TopTracks,
  LikedSongs,
  // PlaylistById,
  TrackById,
  RecommendationList,
} from "./pages";
import { CartProvider } from "./components/recommendation/Recommendation";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/liked-songs" element={<LikedSongs />} />
        {/* <Route path="/playlists/:id" element={<PlaylistById />} /> */}
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/top-artists" element={<TopArtists />} />
        <Route path="/top-tracks" element={<TopTracks />} />
        <Route path="/track/:id" element={<TrackById />} />
        <Route path="/recommendation" element={<RecommendationList />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
