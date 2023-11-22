import { http, HttpResponse } from "msw";
import { pagedAlbumMock } from "./mockedResponses";

export const handlers = [
  http.get("https://api.spotify.com/v1/albums/:id/tracks", () => {
    console.log("i am working");
    return HttpResponse.json(pagedAlbumMock);
  }),
];
