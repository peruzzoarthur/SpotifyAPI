import { HttpResponse, http } from "msw";
import { profileMock, userSaveAlbumsMock } from "../mockedResponses";
import {
  longTermTopArtistsFirstRequest,
  longTermTopArtistsSecondRequest,
  mediumTermTopArtistsFirstRequest,
  mediumTermTopArtistsSecondRequest,
  profileFetchFiveArtists,
  shortTermTopArtistsFirstRequest,
  shortTermTopArtistsSecondRequest,
} from "../mockedResponses/topArtist";
import {
  longTermTopTracksFirstRequest,
  longTermTopTracksSecondRequest,
  mediumTermTopTracksFirstRequest,
  mediumTermTopTracksSecondRequest,
  profileFetchFiveTracks,
  shortTermTopTracksFirstRequest,
  shortTermTopTracksSecondRequest,
} from "../mockedResponses/topTracks";
import {
  playlistsFirstFetch,
  playlistsFourthFetch,
  playlistsSecondFetch,
  playlistsThirdFetch,
  profileFetchFivePlaylists,
} from "../mockedResponses/playlists";

export const meHandlers = [
  http.get("https://api.spotify.com/v1/me", () => {
    return HttpResponse.json(profileMock);
  }),
  http.get("https://api.spotify.com/v1/me/top/artists", ({ request }) => {
    const url = new URL(request.url);
    const search = url.search;

    if (search === "?limit=5") {
      console.log("Profile top artists :)");
      return HttpResponse.json(profileFetchFiveArtists);
    } else if (search === "?time_range=short_term&limit=10&offset=0") {
      console.log("Short term -> first fetch - artists");
      return HttpResponse.json(shortTermTopArtistsFirstRequest);
    } else if (search === "?time_range=short_term&limit=10&offset=10") {
      console.log("Short term -> second fetch - artists");
      return HttpResponse.json(shortTermTopArtistsSecondRequest);
    } else if (search === "?time_range=medium_term&limit=10&offset=0") {
      console.log("Medium term -> first fetch - artists");
      return HttpResponse.json(mediumTermTopArtistsFirstRequest);
    } else if (search === "?time_range=medium_term&limit=10&offset=10") {
      console.log("Medium term -> second fetch - artists");
      return HttpResponse.json(mediumTermTopArtistsSecondRequest);
    } else if (search === "?time_range=long_term&limit=10&offset=0") {
      console.log("Long term -> first fetch - artists");
      return HttpResponse.json(longTermTopArtistsFirstRequest);
    } else if (search === "?time_range=long_term&limit=10&offset=10") {
      console.log("Long term -> second fetch - artists");
      return HttpResponse.json(longTermTopArtistsSecondRequest);
    }
  }),

  http.get("https://api.spotify.com/v1/me/top/tracks", ({ request }) => {
    const url = new URL(request.url);
    const search = url.search;
    if (search === "?limit=5") {
      console.log("Profile top tracks :)");
      return HttpResponse.json(profileFetchFiveTracks);
    } else if (search === "?time_range=short_term&limit=10&offset=0") {
      console.log("Short term -> first fetch - tracks");
      return HttpResponse.json(shortTermTopTracksFirstRequest);
    } else if (search === "?time_range=short_term&limit=10&offset=10") {
      console.log("Short term -> second fetch - tracks");
      return HttpResponse.json(shortTermTopTracksSecondRequest);
    } else if (search === "?time_range=medium_term&limit=10&offset=0") {
      console.log("Medium term -> first fetch - tracks");
      return HttpResponse.json(mediumTermTopTracksFirstRequest);
    } else if (search === "?time_range=medium_term&limit=10&offset=10") {
      console.log("Medium term -> second fetch - tracks");
      return HttpResponse.json(mediumTermTopTracksSecondRequest);
    } else if (search === "?time_range=long_term&limit=10&offset=0") {
      console.log("Long term -> first fetch - tracks");
      return HttpResponse.json(longTermTopTracksFirstRequest);
    } else if (search === "?time_range=long_term&limit=10&offset=10") {
      console.log("Long term -> second fetch - tracks");
      return HttpResponse.json(longTermTopTracksSecondRequest);
    }
  }),

  http.get("https://api.spotify.com/v1/me/playlists", ({ request }) => {
    const url = new URL(request.url);
    const search = url.search;
    console.log(search);
    if (search === "?limit=5") {
      return HttpResponse.json(profileFetchFivePlaylists);
    } else if (search === "?limit=25&offset=0") {
      return HttpResponse.json(playlistsFirstFetch);
    } else if (search === "?limit=25&offset=25") {
      return HttpResponse.json(playlistsSecondFetch);
    } else if (search === "?limit=25&offset=50") {
      return HttpResponse.json(playlistsThirdFetch);
    } else if (search === "?limit=25&offset=75") {
      return HttpResponse.json(playlistsFourthFetch);
    }
  }),

  http.get("https://api.spotify.com/v1/me/albums", () => {
    return HttpResponse.json(userSaveAlbumsMock);
  }),

  http.get("https://api.spotify.com/v1/users/sp3ruzzo", () => {
    console.log("Got your profile...");
    return HttpResponse.json({
      display_name: "sp3ruzzo_",
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
