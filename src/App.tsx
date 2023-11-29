import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/recommendation/RecommendationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./components/ui/toaster";
import { Recommendation } from "./pages/Recommendation";
import { TopArtists } from "./pages/TopArtists";
import { Home } from "./pages/Home";
import { LikedSongs } from "./pages/LikedSongs";
import { PlaylistById } from "./pages/PlaylistById";
import { TopTracks } from "./pages/TopTracks";
import { Playlists } from "./pages/Playlists";
import { AlbumById } from "./pages/AlbumById";
import { Search } from "./pages/Search";
// import { TrackById } from "./pages/TrackById";

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
            <Route path="/album/:id" element={<AlbumById />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </CartProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
