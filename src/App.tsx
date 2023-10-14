import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Playlists,
  TopArtists,
  TopTracks,
  LikedSongs,
  PlaylistById,
  TrackById,
} from "./pages";

function App() {
  const [seedArtists, setSeedArtists] = useState<any[]>([]);
  const [seedAlbums, setSeedAlbums] = useState<any[]>([]);
  const [seedTracks, setSeedTracks] = useState<any[]>([]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/liked-songs"
        element={
          <LikedSongs
            setSeedArtists={setSeedArtists}
            setSeedAlbums={setSeedAlbums}
            setSeedTracks={setSeedTracks}
          />
        }
      />
      <Route path="/playlists/:id" element={<PlaylistById />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/top-artists" element={<TopArtists />} />
      <Route path="/top-tracks" element={<TopTracks />} />
      <Route path="/track/:id" element={<TrackById />} />
    </Routes>
  );
}

export default App;
