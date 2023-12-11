/* eslint-disable @typescript-eslint/no-unused-vars */
import { http, HttpResponse } from "msw";
import {
  profileMock,
  topArtistsMock,
  topTracksMock,
  userPlaylistsMock,
  userSaveAlbumsMock,
} from "./mockedResponses";
// import {
//   mockedPlaylistInfo,
//   mockedPlaylistTracks,
// } from "./mockedResponses/mockedPlaylists";
import { audioFeaturesMock } from "./mockedResponses/tracksAudioFeatures";
import { likedSongs } from "./mockedResponses/likedSongs";
import {
  albumsTracks,
  blackSaintWhiteSinnerAlbum,
  blackSaintWhiteSinnerArtist,
  blackSaintWhiteSinnerSimpleTracks,
  clubeDaEsquinaAlbum,
  clubeDaEsquinaArtist,
  clubeDaEsquinaSimplifiedTracks,
} from "./mockedResponses/albums";
import {
  mockedPlaylistInfo,
  mockedPlaylistTracks,
} from "./mockedResponses/mockedPlaylists";

export const handlers = [
  // mocking Profile with my data

  http.get("https://api.spotify.com/v1/me/top/artists", () => {
    return HttpResponse.json(topArtistsMock);
  }),

  http.get("https://api.spotify.com/v1/me/top/tracks", () => {
    return HttpResponse.json(topTracksMock);
  }),

  http.get("https://api.spotify.com/v1/me", () => {
    return HttpResponse.json(profileMock);
  }),

  http.get("https://api.spotify.com/v1/me/playlists", () => {
    return HttpResponse.json(userPlaylistsMock);
  }),

  http.get("https://api.spotify.com/v1/me/albums", () => {
    return HttpResponse.json(userSaveAlbumsMock);
  }),

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  // mocking AlbumById with Charles Mingus Album
  http.get("https://api.spotify.com/v1/albums/6Sts4Yh7KsDFwq2yTWrGGV", () => {
    console.log("AlbumById --- albumMock");
    return HttpResponse.json(blackSaintWhiteSinnerAlbum);
  }),

  http.get("https://api.spotify.com/v1/albums/5risYG7klZCSLMNxB9dZhf", () => {
    console.log("AlbumById --- Clube Album Mock");
    return HttpResponse.json(clubeDaEsquinaAlbum);
  }),

  http.get(
    "https://api.spotify.com/v1/albums/6Sts4Yh7KsDFwq2yTWrGGV/tracks",
    () => {
      console.log("AlbumById --- Mocked Mingus Simplified Tracks");
      return HttpResponse.json(blackSaintWhiteSinnerSimpleTracks);
    }
  ),
  http.get(
    "https://api.spotify.com/v1/albums/5risYG7klZCSLMNxB9dZhf/tracks",
    () => {
      console.log("AlbumById --- Mocked Clube Simplified Tracks");
      return HttpResponse.json(clubeDaEsquinaSimplifiedTracks);
    }
  ),

  // 5risYG7klZCSLMNxB9dZhf

  http.get(
    "https://api.spotify.com/v1/tracks?ids=3XvcgEkQfjasB5NnY8P4QA,7K5NiBQk7QJ0qehZ4e6LmB,5JFk3TqqWnZenBewn7nqCW,6La6a40pMKEoxtpmruuzaP",
    () => {
      console.log("AlbumById --- tracksMock");
      return HttpResponse.json(albumsTracks);
    }
  ),

  http.get("https://api.spotify.com/v1/audio-features", () => {
    console.log("AlbumById --- audioFeaturesMock");
    return HttpResponse.json(audioFeaturesMock);
  }),

  http.get("https://api.spotify.com/v1/artists/1W8TbFzNS15VwsempfY12H", () => {
    console.log("AlbumById --- The Mingus Artists Mock's");
    return HttpResponse.json(blackSaintWhiteSinnerArtist);
  }),
  http.get("https://api.spotify.com/v1/artists/3Bnq7jiU506HcPjRgQ43TM", () => {
    console.log("AlbumById --- The Clube Artists Mock's");
    return HttpResponse.json(clubeDaEsquinaArtist);
  }),

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Playlists

  http.get(
    "https://api.spotify.com/v1/playlists/2vFRh5TUw5mE3aBaf8cUap",
    () => {
      console.log("Mocked playlist");
      HttpResponse.json(mockedPlaylistInfo);
    }
  ),
  http.get(
    "https://api.spotify.com/v1/playlists/2vFRh5TUw5mE3aBaf8cUap/tracks",
    () => {
      console.log("Mocked playlist tracks");
      HttpResponse.json(mockedPlaylistTracks);
    }
  ),

  http.get(
    "https://api.spotify.com/v1/playlists/79yWS04x9R6quKSPpW8Ynm",
    () => {
      console.log("Mocked playlist");
      HttpResponse.json(mockedPlaylistInfo);
    }
  ),
  http.get(
    "https://api.spotify.com/v1/playlists/79yWS04x9R6quKSPpW8Ynm/tracks",
    () => {
      console.log("Mocked playlist tracks");
      HttpResponse.json(mockedPlaylistTracks);
    }
  ),

  http.get(
    "https://api.spotify.com/v1/playlists/6ReZs9su40oyK0NZCLM5V6",
    () => {
      console.log("Mocked playlist");
      HttpResponse.json(mockedPlaylistInfo);
    }
  ),
  http.get(
    "https://api.spotify.com/v1/playlists/6ReZs9su40oyK0NZCLM5V6/tracks",
    () => {
      console.log("Mocked playlist tracks");
      HttpResponse.json(mockedPlaylistTracks);
    }
  ),

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  // http.post("https://accounts.spotify.com/api/token", () => {
  //   console.log("any tokens?");
  //   return HttpResponse.json({
  //     access_token:
  //       "BQBGuxGClOybhE-vG8anNClZE2UlXdHJ0ZEVzBAlGNuz36Gd9dC_XTxyzoHj_4cLzlWDxgyivmoSwduKE2h5kZoUc9LW_ep1iR5EI-1n6ifUxb5oY_rJV9VguMLZVHZvTEZB62mlya0bDyjg5SID0ZEFteikUdmVdCVZ1iex-R4_iFie0YABZi8lvxejPSGBzld12s3WsjlTJ252tG-YfTSr2OFRrKm4ePoIsCTaEyu1vCV6WWCJoWw9inFKUtRxM3IySAIMZmEaXuUgJtSx",
  //     token_type: "Bearer",
  //     expires_in: 3600,
  //     refresh_token:
  //       "AQBLPU0lnQ1ZKMCOo5pEQn2ZGa1dKhIF5dCkBw5gQyfak0hAxV3PNPxdEfdasB-KWBeu4uzL_sQsQ9677wfDdEGgRu2uGfdKWaTg8uZXXYLnBUaS0a48R6xXZWEL4iMYy0M",
  //     scope:
  //       "playlist-read-private user-library-read playlist-modify-private playlist-modify-public user-read-email user-read-private user-top-read",
  //   });
  // }),

  http.get("https://api.spotify.com/v1/me/tracks?offset=0&limit=50", () => {
    return HttpResponse.json(likedSongs.likedSongsFirstFetch);
  }),

  http.get("https://api.spotify.com/v1/users/sp3ruzzo", () => {
    return HttpResponse.json({
      display_name: "sp3ruzzo",
      external_urls: { spotify: "https://open.spotify.com/user/sp3ruzzo" },
      followers: { href: null, total: 8 },
      href: "https://api.spotify.com/v1/users/sp3ruzzo",
      id: "sp3ruzzo",
      images: [
        {
          url: "https://i.scdn.co/image/ab67757000003b82dc3b6eb0f878421bf88a5539",
          height: 64,
          width: 64,
        },
        {
          url: "https://i.scdn.co/image/ab6775700000ee85dc3b6eb0f878421bf88a5539",
          height: 300,
          width: 300,
        },
      ],
      type: "user",
      uri: "spotify:user:sp3ruzzo",
    });
  }),
];
