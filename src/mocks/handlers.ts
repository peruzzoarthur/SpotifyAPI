import { http, HttpResponse } from "msw";
import { albumMock, pagedAlbumMock } from "./mockedResponses";

export const handlers = [
  http.get("https://api.spotify.com/v1/albums/:id/tracks", () => {
    console.log("i am working");
    return HttpResponse.json(pagedAlbumMock);
  }),

  http.get("https://api.spotify.com/v1/albums/:id", () => {
    console.log("i am working");
    return HttpResponse.json(albumMock);
  }),
];
