import { HttpResponse, http } from "msw";
import {
  searchBobMarleyMock,
  searchQueryBobMarleyMock,
  searchQueryTheDoorsMock,
  searchTheDoorsMock,
} from "../mockedResponses/search";
// import { excludeItemFromArray } from "@/utils/excludeItemFromArray";

export const searchHandlers = [
  http.get("https://api.spotify.com/v1/search", ({ request }) => {
    const url = new URL(request.url);
    const searchInput = url.search.toLocaleLowerCase();
    console.log(searchInput);
    console.log("Searching...");
    if (searchInput === "?q=the+doors&type=artist%2calbum%2ctrack&limit=5") {
      console.log("the doors");
      return HttpResponse.json(searchQueryTheDoorsMock);
    } else if (
      searchInput === "?q=bob+marley&type=artist%2calbum%2ctrack&limit=5"
    ) {
      console.log("bob");
      return HttpResponse.json(searchQueryBobMarleyMock);
    } else {
      return;
    }
  }),

  http.get(
    "https://api.spotify.com/v1/artists",

    ({ request }) => {
      const url = new URL(request.url);
      const searchInput = url.search.toLocaleLowerCase();
      console.log("Searching Artists...");
      console.log(searchInput);
      if (
        searchInput ===
        "?ids=22wz7m8sxp5thdruny3gxt%2c36qjpde2go2kgarlehcdtp%2c4ngfozcl9ml67xzm0xzivc%2c4y2caf3w4wz81gixwjbxrf%2c4k808gbkuvgztpnenhtje2"
      ) {
        return HttpResponse.json({ artists: searchTheDoorsMock.artists });
      } else if (
        searchInput ===
        "?ids=2112wz7m8sxp5thdruny3gxt%2c4ngfozcl9ml67xzm0xzivc%2c36qjpde2go2kgarlehcdtp%2c3ft0q1e2a8wz3mboompmi9%2c4y2caf3w4wz81gixwjbxrf"
      ) {
        return HttpResponse.json({ artists: searchBobMarleyMock.artists });
      } else {
        console.log("Searching with Spotify API");
        return;
      }
    }
  ),

  http.get("https://api.spotify.com/v1/albums", ({ request }) => {
    const url = new URL(request.url);
    const searchInput = url.search.toLocaleLowerCase();
    if (
      searchInput ===
      "?ids=1yzir5finfolzpgksvpliy%2c1jwmehn3ggal6isoylfwbn%2c7ikutic9uwuvngygptqnhs%2c6v5ivmmy1ivwtbfnqoifsf%2c6aflokpjjff652jevcsozx"
    ) {
      console.log("Artists Mocked response...");
      return HttpResponse.json({
        albums: searchTheDoorsMock.albums,
      });
    } else if (
      searchInput ===
      "?ids=1jwmehn3ggal6isoylfwbn%2c1yzir5finfolzpgksvpliy%2c7ikutic9uwuvngygptqnhs%2c6v5ivmmy1ivwtbfnqoifsf%2c6aflokpjjff652jevcsozx"
    ) {
      console.log("Albums Mocked response...");
      return HttpResponse.json({
        albums: searchBobMarleyMock.albums,
      });
    } else {
      console.log(searchInput);
      console.log("Searching with Spotify API");
      return;
    }
  }),
];
