import { http, HttpResponse } from "msw";
import { albumMock, pagedAlbumMock } from "./mockedResponses";

export const handlers = [
  http.get(
    "https://api.spotify.com/v1/albums/6Sts4Yh7KsDFwq2yTWrGGV/tracks",
    () => {
      console.log("i am working");
      return HttpResponse.json(pagedAlbumMock);
    }
  ),

  http.get("https://api.spotify.com/v1/albums/6Sts4Yh7KsDFwq2yTWrGGV", () => {
    console.log("i am working");
    return HttpResponse.json(albumMock);
  }),
];
