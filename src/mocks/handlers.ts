/* eslint-disable @typescript-eslint/no-unused-vars */
import { http, HttpResponse } from "msw";
import {
  profileMock,
  topArtistsMock,
  topTracksMock,
  userPlaylistsMock,
  userSaveAlbumsMock,
} from "./mockedResponses";
import { audioFeaturesMock } from "./mockedResponses/tracksAudioFeatures";
import { allMockedTracks } from "./mockedResponses/tracksRoute";
import { excludeItemFromArray } from "@/utils/excludeItemFromArray";

export const handlers = [
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

  http.get("https://api.spotify.com/v1/audio-features", () => {
    console.log("AudioFeaturesMock");
    return HttpResponse.json(audioFeaturesMock);
  }),

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  http.get("https://api.spotify.com/v1/tracks", ({ request }) => {
    const url = new URL(request.url);
    console.log(url);
    const ids1Line = url.searchParams.getAll("ids");
    const singleLineIds = ids1Line[0];
    const ids = singleLineIds.split(",");
    console.log(ids);
    console.log("Tracks --- tracks Mock");

    const checkMockedTracks = allMockedTracks.tracks.filter((track) =>
      ids.includes(track.id)
    );
    if (checkMockedTracks.length > 0) {
      return HttpResponse.json({
        tracks: checkMockedTracks,
      });
    } else {
      return;
    }
  }),
];
