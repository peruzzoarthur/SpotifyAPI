import { Routes, Route } from "react-router-dom";

import {
  Home,
  Playlists,
  TopArtists,
  TopTracks,
  LikedSongs,
  PlaylistById,
  TrackById,
  Recommendation,
} from "./pages";
import { CartProvider } from "./components/recommendation/RecommendationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/liked-songs" element={<LikedSongs />} />
            <Route path="/playlists/:id" element={<PlaylistById />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/top-artists" element={<TopArtists />} />
            <Route path="/top-tracks" element={<TopTracks />} />
            <Route path="/track/:id" element={<TrackById />} />
            <Route path="/recommendation" element={<Recommendation />} />
          </Routes>
        </CartProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
