import { HttpResponse, http } from "msw";
import {
  searchBobMarleyMock,
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
      return HttpResponse.json({
        albums: {
          href: "https://api.spotify.com/v1/search?query=the+doors&type=album&locale=en-US%2Cen%3Bq%3D0.5&offset=0&limit=5",
          items: [
            {
              album_type: "compilation",
              artists: [
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
                  },
                  href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
                  id: "22WZ7M8sxp5THdruNY3gXt",
                  name: "The Doors",
                  type: "artist",
                  uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
                },
              ],

              external_urls: {
                spotify:
                  "https://open.spotify.com/album/1YZiR5FINFOlZPGKSVplIY",
              },
              href: "https://api.spotify.com/v1/albums/1YZiR5FINFOlZPGKSVplIY",
              id: "1YZiR5FINFOlZPGKSVplIY",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab67616d0000b273bf21ee0ee183384e7ca3f4f4",
                  width: 640,
                },
                {
                  height: 300,
                  url: "https://i.scdn.co/image/ab67616d00001e02bf21ee0ee183384e7ca3f4f4",
                  width: 300,
                },
                {
                  height: 64,
                  url: "https://i.scdn.co/image/ab67616d00004851bf21ee0ee183384e7ca3f4f4",
                  width: 64,
                },
              ],
              name: "The Very Best of the Doors",
              release_date: "2007-09-25",
              release_date_precision: "day",
              total_tracks: 39,
              type: "album",
              uri: "spotify:album:1YZiR5FINFOlZPGKSVplIY",
            },
            {
              album_type: "album",
              artists: [
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
                  },
                  href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
                  id: "22WZ7M8sxp5THdruNY3gXt",
                  name: "The Doors",
                  type: "artist",
                  uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
                },
              ],

              external_urls: {
                spotify:
                  "https://open.spotify.com/album/1jWmEhn3ggaL6isoyLfwBn",
              },
              href: "https://api.spotify.com/v1/albums/1jWmEhn3ggaL6isoyLfwBn",
              id: "1jWmEhn3ggaL6isoyLfwBn",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab67616d0000b2735b96a8c5d61be8878452f8f1",
                  width: 640,
                },
                {
                  height: 300,
                  url: "https://i.scdn.co/image/ab67616d00001e025b96a8c5d61be8878452f8f1",
                  width: 300,
                },
                {
                  height: 64,
                  url: "https://i.scdn.co/image/ab67616d000048515b96a8c5d61be8878452f8f1",
                  width: 64,
                },
              ],
              name: "The Doors",
              release_date: "1967-01-04",
              release_date_precision: "day",
              total_tracks: 11,
              type: "album",
              uri: "spotify:album:1jWmEhn3ggaL6isoyLfwBn",
            },
            {
              album_type: "album",
              artists: [
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
                  },
                  href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
                  id: "22WZ7M8sxp5THdruNY3gXt",
                  name: "The Doors",
                  type: "artist",
                  uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
                },
              ],

              external_urls: {
                spotify:
                  "https://open.spotify.com/album/7IKUTIc9UWuVngyGPtqNHS",
              },
              href: "https://api.spotify.com/v1/albums/7IKUTIc9UWuVngyGPtqNHS",
              id: "7IKUTIc9UWuVngyGPtqNHS",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab67616d0000b27320783882533e669760741df2",
                  width: 640,
                },
                {
                  height: 300,
                  url: "https://i.scdn.co/image/ab67616d00001e0220783882533e669760741df2",
                  width: 300,
                },
                {
                  height: 64,
                  url: "https://i.scdn.co/image/ab67616d0000485120783882533e669760741df2",
                  width: 64,
                },
              ],
              name: "L.A. Woman",
              release_date: "1971-04-19",
              release_date_precision: "day",
              total_tracks: 10,
              type: "album",
              uri: "spotify:album:7IKUTIc9UWuVngyGPtqNHS",
            },
            {
              album_type: "album",
              artists: [
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
                  },
                  href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
                  id: "22WZ7M8sxp5THdruNY3gXt",
                  name: "The Doors",
                  type: "artist",
                  uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
                },
              ],

              external_urls: {
                spotify:
                  "https://open.spotify.com/album/6v5IVMmY1IvWtbfnQoiFSf",
              },
              href: "https://api.spotify.com/v1/albums/6v5IVMmY1IvWtbfnQoiFSf",
              id: "6v5IVMmY1IvWtbfnQoiFSf",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab67616d0000b27386339e6cd71cc2a167451ee5",
                  width: 640,
                },
                {
                  height: 300,
                  url: "https://i.scdn.co/image/ab67616d00001e0286339e6cd71cc2a167451ee5",
                  width: 300,
                },
                {
                  height: 64,
                  url: "https://i.scdn.co/image/ab67616d0000485186339e6cd71cc2a167451ee5",
                  width: 64,
                },
              ],
              name: "Strange Days",
              release_date: "1967-09-25",
              release_date_precision: "day",
              total_tracks: 10,
              type: "album",
              uri: "spotify:album:6v5IVMmY1IvWtbfnQoiFSf",
            },
            {
              album_type: "album",
              artists: [
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
                  },
                  href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
                  id: "22WZ7M8sxp5THdruNY3gXt",
                  name: "The Doors",
                  type: "artist",
                  uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
                },
              ],

              external_urls: {
                spotify:
                  "https://open.spotify.com/album/6AFLOkpJjFF652jevcSOZX",
              },
              href: "https://api.spotify.com/v1/albums/6AFLOkpJjFF652jevcSOZX",
              id: "6AFLOkpJjFF652jevcSOZX",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab67616d0000b273f12a8a7e0b2cbe16d2bef4dc",
                  width: 640,
                },
                {
                  height: 300,
                  url: "https://i.scdn.co/image/ab67616d00001e02f12a8a7e0b2cbe16d2bef4dc",
                  width: 300,
                },
                {
                  height: 64,
                  url: "https://i.scdn.co/image/ab67616d00004851f12a8a7e0b2cbe16d2bef4dc",
                  width: 64,
                },
              ],
              name: "Morrison Hotel",
              release_date: "1970-02-09",
              release_date_precision: "day",
              total_tracks: 11,
              type: "album",
              uri: "spotify:album:6AFLOkpJjFF652jevcSOZX",
            },
          ],
          limit: 5,
          next: "https://api.spotify.com/v1/search?query=the+doors&type=album&locale=en-US%2Cen%3Bq%3D0.5&offset=5&limit=5",
          offset: 0,
          previous: null,
          total: 196,
        },
        artists: {
          href: "https://api.spotify.com/v1/search?query=the+doors&type=artist&locale=en-US%2Cen%3Bq%3D0.5&offset=0&limit=5",
          items: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
              },
              followers: {
                href: null,
                total: 7605267,
              },
              genres: [
                "acid rock",
                "album rock",
                "classic rock",
                "hard rock",
                "psychedelic rock",
                "rock",
              ],
              href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
              id: "22WZ7M8sxp5THdruNY3gXt",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab6761610000e5eb440959e022afc20e819050bd",
                  width: 640,
                },
                {
                  height: 320,
                  url: "https://i.scdn.co/image/ab67616100005174440959e022afc20e819050bd",
                  width: 320,
                },
                {
                  height: 160,
                  url: "https://i.scdn.co/image/ab6761610000f178440959e022afc20e819050bd",
                  width: 160,
                },
              ],
              name: "The Doors",
              popularity: 70,
              type: "artist",
              uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/36QJpDe2go2KgaRleHCDTp",
              },
              followers: {
                href: null,
                total: 13989699,
              },
              genres: ["album rock", "classic rock", "hard rock", "rock"],
              href: "https://api.spotify.com/v1/artists/36QJpDe2go2KgaRleHCDTp",
              id: "36QJpDe2go2KgaRleHCDTp",
              images: [
                {
                  height: 600,
                  url: "https://i.scdn.co/image/207803ce008388d3427a685254f9de6a8f61dc2e",
                  width: 600,
                },
                {
                  height: 200,
                  url: "https://i.scdn.co/image/b0248a44865493e6a03832aa89854ada16ff07a8",
                  width: 200,
                },
                {
                  height: 64,
                  url: "https://i.scdn.co/image/16eb3cdae0d824b520ac17710e943a99d3ef6602",
                  width: 64,
                },
              ],
              name: "Led Zeppelin",
              popularity: 74,
              type: "artist",
              uri: "spotify:artist:36QJpDe2go2KgaRleHCDTp",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/4NgfOZCL9Ml67xzM0xzIvC",
              },
              followers: {
                href: null,
                total: 3244784,
              },
              genres: [
                "album rock",
                "classic rock",
                "hard rock",
                "psychedelic rock",
                "rock",
              ],
              href: "https://api.spotify.com/v1/artists/4NgfOZCL9Ml67xzM0xzIvC",
              id: "4NgfOZCL9Ml67xzM0xzIvC",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab6761610000e5ebbf0ee2c099003f6886e4da0c",
                  width: 640,
                },
                {
                  height: 320,
                  url: "https://i.scdn.co/image/ab67616100005174bf0ee2c099003f6886e4da0c",
                  width: 320,
                },
                {
                  height: 160,
                  url: "https://i.scdn.co/image/ab6761610000f178bf0ee2c099003f6886e4da0c",
                  width: 160,
                },
              ],
              name: "Janis Joplin",
              popularity: 60,
              type: "artist",
              uri: "spotify:artist:4NgfOZCL9Ml67xzM0xzIvC",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/4Y2CAf3w4WZ81gIXWJbxrF",
              },
              followers: {
                href: null,
                total: 405,
              },
              genres: [],
              href: "https://api.spotify.com/v1/artists/4Y2CAf3w4WZ81gIXWJbxrF",
              id: "4Y2CAf3w4WZ81gIXWJbxrF",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab67616d0000b27300b3f9636aec2553a03b6a90",
                  width: 640,
                },
                {
                  height: 300,
                  url: "https://i.scdn.co/image/ab67616d00001e0200b3f9636aec2553a03b6a90",
                  width: 300,
                },
                {
                  height: 64,
                  url: "https://i.scdn.co/image/ab67616d0000485100b3f9636aec2553a03b6a90",
                  width: 64,
                },
              ],
              name: "The Doorstep Carolers",
              popularity: 40,
              type: "artist",
              uri: "spotify:artist:4Y2CAf3w4WZ81gIXWJbxrF",
            },
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/4K808gbkuVgZTpNEnHtje2",
              },
              followers: {
                href: null,
                total: 851,
              },
              genres: [],
              href: "https://api.spotify.com/v1/artists/4K808gbkuVgZTpNEnHtje2",
              id: "4K808gbkuVgZTpNEnHtje2",
              images: [
                {
                  height: 640,
                  url: "https://i.scdn.co/image/ab67616d0000b27310b95c4d9f5f240cf202ec5f",
                  width: 640,
                },
                {
                  height: 300,
                  url: "https://i.scdn.co/image/ab67616d00001e0210b95c4d9f5f240cf202ec5f",
                  width: 300,
                },
                {
                  height: 64,
                  url: "https://i.scdn.co/image/ab67616d0000485110b95c4d9f5f240cf202ec5f",
                  width: 64,
                },
              ],
              name: "Doors",
              popularity: 8,
              type: "artist",
              uri: "spotify:artist:4K808gbkuVgZTpNEnHtje2",
            },
          ],
          limit: 5,
          next: "https://api.spotify.com/v1/search?query=the+doors&type=artist&locale=en-US%2Cen%3Bq%3D0.5&offset=5&limit=5",
          offset: 0,
          previous: null,
          total: 16,
        },
        tracks: {
          href: "https://api.spotify.com/v1/search?query=the+doors&type=track&locale=en-US%2Cen%3Bq%3D0.5&offset=0&limit=5",
          items: [
            {
              album: {
                album_type: "album",
                artists: [
                  {
                    external_urls: {
                      spotify:
                        "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
                    },
                    href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
                    id: "22WZ7M8sxp5THdruNY3gXt",
                    name: "The Doors",
                    type: "artist",
                    uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
                  },
                ],

                external_urls: {
                  spotify:
                    "https://open.spotify.com/album/7IKUTIc9UWuVngyGPtqNHS",
                },
                href: "https://api.spotify.com/v1/albums/7IKUTIc9UWuVngyGPtqNHS",
                id: "7IKUTIc9UWuVngyGPtqNHS",
                images: [
                  {
                    height: 640,
                    url: "https://i.scdn.co/image/ab67616d0000b27320783882533e669760741df2",
                    width: 640,
                  },
                  {
                    height: 300,
                    url: "https://i.scdn.co/image/ab67616d00001e0220783882533e669760741df2",
                    width: 300,
                  },
                  {
                    height: 64,
                    url: "https://i.scdn.co/image/ab67616d0000485120783882533e669760741df2",
                    width: 64,
                  },
                ],
                name: "L.A. Woman",
                release_date: "1971-04-19",
                release_date_precision: "day",
                total_tracks: 10,
                type: "album",
                uri: "spotify:album:7IKUTIc9UWuVngyGPtqNHS",
              },
              artists: [
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
                  },
                  href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
                  id: "22WZ7M8sxp5THdruNY3gXt",
                  name: "The Doors",
                  type: "artist",
                  uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
                },
              ],

              disc_number: 1,
              duration_ms: 434720,
              explicit: false,
              external_ids: {
                isrc: "USEE19900773",
              },
              external_urls: {
                spotify:
                  "https://open.spotify.com/track/14XWXWv5FoCbFzLksawpEe",
              },
              href: "https://api.spotify.com/v1/tracks/14XWXWv5FoCbFzLksawpEe",
              id: "14XWXWv5FoCbFzLksawpEe",
              is_local: false,
              name: "Riders on the Storm",
              popularity: 74,
              preview_url:
                "https://p.scdn.co/mp3-preview/0d7d4d35554f6097fce04d464f7aacd7c6f59727?cid=97933b9989f64dbf99d1edffd9c91f0f",
              track_number: 10,
              type: "track",
              uri: "spotify:track:14XWXWv5FoCbFzLksawpEe",
            },
            {
              album: {
                album_type: "album",
                artists: [
                  {
                    external_urls: {
                      spotify:
                        "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
                    },
                    href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
                    id: "22WZ7M8sxp5THdruNY3gXt",
                    name: "The Doors",
                    type: "artist",
                    uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
                  },
                ],

                external_urls: {
                  spotify:
                    "https://open.spotify.com/album/6AFLOkpJjFF652jevcSOZX",
                },
                href: "https://api.spotify.com/v1/albums/6AFLOkpJjFF652jevcSOZX",
                id: "6AFLOkpJjFF652jevcSOZX",
                images: [
                  {
                    height: 640,
                    url: "https://i.scdn.co/image/ab67616d0000b273f12a8a7e0b2cbe16d2bef4dc",
                    width: 640,
                  },
                  {
                    height: 300,
                    url: "https://i.scdn.co/image/ab67616d00001e02f12a8a7e0b2cbe16d2bef4dc",
                    width: 300,
                  },
                  {
                    height: 64,
                    url: "https://i.scdn.co/image/ab67616d00004851f12a8a7e0b2cbe16d2bef4dc",
                    width: 64,
                  },
                ],
                name: "Morrison Hotel",
                release_date: "1970-02-09",
                release_date_precision: "day",
                total_tracks: 11,
                type: "album",
                uri: "spotify:album:6AFLOkpJjFF652jevcSOZX",
              },
              artists: [
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
                  },
                  href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
                  id: "22WZ7M8sxp5THdruNY3gXt",
                  name: "The Doors",
                  type: "artist",
                  uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
                },
              ],

              disc_number: 1,
              duration_ms: 243826,
              explicit: false,
              external_ids: {
                isrc: "USEE19900375",
              },
              external_urls: {
                spotify:
                  "https://open.spotify.com/track/1Q5kgpp4pmyGqPwNBzkSrw",
              },
              href: "https://api.spotify.com/v1/tracks/1Q5kgpp4pmyGqPwNBzkSrw",
              id: "1Q5kgpp4pmyGqPwNBzkSrw",
              is_local: false,
              name: "Roadhouse Blues",
              popularity: 73,
              preview_url:
                "https://p.scdn.co/mp3-preview/32d2b47751f9641e7d0a0bf1cfefada6be904c3c?cid=97933b9989f64dbf99d1edffd9c91f0f",
              track_number: 1,
              type: "track",
              uri: "spotify:track:1Q5kgpp4pmyGqPwNBzkSrw",
            },
            {
              album: {
                album_type: "album",
                artists: [
                  {
                    external_urls: {
                      spotify:
                        "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
                    },
                    href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
                    id: "22WZ7M8sxp5THdruNY3gXt",
                    name: "The Doors",
                    type: "artist",
                    uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
                  },
                ],

                external_urls: {
                  spotify:
                    "https://open.spotify.com/album/1jWmEhn3ggaL6isoyLfwBn",
                },
                href: "https://api.spotify.com/v1/albums/1jWmEhn3ggaL6isoyLfwBn",
                id: "1jWmEhn3ggaL6isoyLfwBn",
                images: [
                  {
                    height: 640,
                    url: "https://i.scdn.co/image/ab67616d0000b2735b96a8c5d61be8878452f8f1",
                    width: 640,
                  },
                  {
                    height: 300,
                    url: "https://i.scdn.co/image/ab67616d00001e025b96a8c5d61be8878452f8f1",
                    width: 300,
                  },
                  {
                    height: 64,
                    url: "https://i.scdn.co/image/ab67616d000048515b96a8c5d61be8878452f8f1",
                    width: 64,
                  },
                ],
                name: "The Doors",
                release_date: "1967-01-04",
                release_date_precision: "day",
                total_tracks: 11,
                type: "album",
                uri: "spotify:album:1jWmEhn3ggaL6isoyLfwBn",
              },
              artists: [
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
                  },
                  href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
                  id: "22WZ7M8sxp5THdruNY3gXt",
                  name: "The Doors",
                  type: "artist",
                  uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
                },
              ],

              disc_number: 1,
              duration_ms: 429760,
              explicit: false,
              external_ids: {
                isrc: "USEE19900203",
              },
              external_urls: {
                spotify:
                  "https://open.spotify.com/track/5uvosCdMlFdTXhoazkTI5R",
              },
              href: "https://api.spotify.com/v1/tracks/5uvosCdMlFdTXhoazkTI5R",
              id: "5uvosCdMlFdTXhoazkTI5R",
              is_local: false,
              name: "Light My Fire",
              popularity: 72,
              preview_url:
                "https://p.scdn.co/mp3-preview/93ada68507ef1a45fd47f8575cbecc657afd8fff?cid=97933b9989f64dbf99d1edffd9c91f0f",
              track_number: 6,
              type: "track",
              uri: "spotify:track:5uvosCdMlFdTXhoazkTI5R",
            },
            {
              album: {
                album_type: "album",
                artists: [
                  {
                    external_urls: {
                      spotify:
                        "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
                    },
                    href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
                    id: "22WZ7M8sxp5THdruNY3gXt",
                    name: "The Doors",
                    type: "artist",
                    uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
                  },
                ],

                external_urls: {
                  spotify:
                    "https://open.spotify.com/album/6v5IVMmY1IvWtbfnQoiFSf",
                },
                href: "https://api.spotify.com/v1/albums/6v5IVMmY1IvWtbfnQoiFSf",
                id: "6v5IVMmY1IvWtbfnQoiFSf",
                images: [
                  {
                    height: 640,
                    url: "https://i.scdn.co/image/ab67616d0000b27386339e6cd71cc2a167451ee5",
                    width: 640,
                  },
                  {
                    height: 300,
                    url: "https://i.scdn.co/image/ab67616d00001e0286339e6cd71cc2a167451ee5",
                    width: 300,
                  },
                  {
                    height: 64,
                    url: "https://i.scdn.co/image/ab67616d0000485186339e6cd71cc2a167451ee5",
                    width: 64,
                  },
                ],
                name: "Strange Days",
                release_date: "1967-09-25",
                release_date_precision: "day",
                total_tracks: 10,
                type: "album",
                uri: "spotify:album:6v5IVMmY1IvWtbfnQoiFSf",
              },
              artists: [
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
                  },
                  href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
                  id: "22WZ7M8sxp5THdruNY3gXt",
                  name: "The Doors",
                  type: "artist",
                  uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
                },
              ],

              disc_number: 1,
              duration_ms: 130173,
              explicit: false,
              external_ids: {
                isrc: "USEE19900740",
              },
              external_urls: {
                spotify:
                  "https://open.spotify.com/track/1Jmqubf9kGkWeYQXQKImL5",
              },
              href: "https://api.spotify.com/v1/tracks/1Jmqubf9kGkWeYQXQKImL5",
              id: "1Jmqubf9kGkWeYQXQKImL5",
              is_local: false,
              name: "People Are Strange",
              popularity: 78,
              preview_url:
                "https://p.scdn.co/mp3-preview/76f1624dd8ad1c3741cacbc8864746d734f92109?cid=97933b9989f64dbf99d1edffd9c91f0f",
              track_number: 7,
              type: "track",
              uri: "spotify:track:1Jmqubf9kGkWeYQXQKImL5",
            },
            {
              album: {
                album_type: "album",
                artists: [
                  {
                    external_urls: {
                      spotify:
                        "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
                    },
                    href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
                    id: "22WZ7M8sxp5THdruNY3gXt",
                    name: "The Doors",
                    type: "artist",
                    uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
                  },
                ],

                external_urls: {
                  spotify:
                    "https://open.spotify.com/album/1jWmEhn3ggaL6isoyLfwBn",
                },
                href: "https://api.spotify.com/v1/albums/1jWmEhn3ggaL6isoyLfwBn",
                id: "1jWmEhn3ggaL6isoyLfwBn",
                images: [
                  {
                    height: 640,
                    url: "https://i.scdn.co/image/ab67616d0000b2735b96a8c5d61be8878452f8f1",
                    width: 640,
                  },
                  {
                    height: 300,
                    url: "https://i.scdn.co/image/ab67616d00001e025b96a8c5d61be8878452f8f1",
                    width: 300,
                  },
                  {
                    height: 64,
                    url: "https://i.scdn.co/image/ab67616d000048515b96a8c5d61be8878452f8f1",
                    width: 64,
                  },
                ],
                name: "The Doors",
                release_date: "1967-01-04",
                release_date_precision: "day",
                total_tracks: 11,
                type: "album",
                uri: "spotify:album:1jWmEhn3ggaL6isoyLfwBn",
              },
              artists: [
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt",
                  },
                  href: "https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt",
                  id: "22WZ7M8sxp5THdruNY3gXt",
                  name: "The Doors",
                  type: "artist",
                  uri: "spotify:artist:22WZ7M8sxp5THdruNY3gXt",
                },
              ],

              disc_number: 1,
              duration_ms: 145866,
              explicit: false,
              external_ids: {
                isrc: "USEE19900198",
              },
              external_urls: {
                spotify:
                  "https://open.spotify.com/track/6ToM0uwxtPKo9CMpbPGYvM",
              },
              href: "https://api.spotify.com/v1/tracks/6ToM0uwxtPKo9CMpbPGYvM",
              id: "6ToM0uwxtPKo9CMpbPGYvM",
              is_local: false,
              name: "Break on Through (To the Other Side)",
              popularity: 76,
              preview_url:
                "https://p.scdn.co/mp3-preview/af8cb2c28e8a897cec1f7c9831abcfe0fc431b9a?cid=97933b9989f64dbf99d1edffd9c91f0f",
              track_number: 1,
              type: "track",
              uri: "spotify:track:6ToM0uwxtPKo9CMpbPGYvM",
            },
          ],
          limit: 5,
          next: "https://api.spotify.com/v1/search?query=the+doors&type=track&locale=en-US%2Cen%3Bq%3D0.5&offset=5&limit=5",
          offset: 0,
          previous: null,
          total: 814,
        },
      });
    } else return;
  }),

  http.get(
    "https://api.spotify.com/v1/artists",

    ({ request }) => {
      const url = new URL(request.url);
      const searchInput = url.search.toLocaleLowerCase();
      console.log(searchInput);
      console.log("Searched Artists...");
      if (
        searchInput ===
        "?ids=22wz7m8sxp5thdruny3gxt%2c36qjpde2go2kgarlehcdtp%2c4ngfozcl9ml67xzm0xzivc%2c4y2caf3w4wz81gixwjbxrf%2c4k808gbkuvgztpnenhtje2"
      ) {
        return HttpResponse.json({ artists: searchTheDoorsMock.artists });
      } else if (
        searchInput ===
        "?ids=2qsynagsdaqzj3u9hgdzjd%2c6bh2lormtpjy3x9dyrghvj%2c2vawvc8sucfkrxejdok7ee%2c1tsg4aumsmt1tcq2nhpov9%2c45qkirpplvcz1no4oz1ddj"
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
      "?ids=4jkeipwuutjlx9usnydhzn%2c2mbbv0ad6b4ydhmzlzay7s%2c09df7muzbqwbdygve0t30r%2c4efdm5bjlaf1xx3snjutfe%2c321q9p7pelvzcfawxml7vx"
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
