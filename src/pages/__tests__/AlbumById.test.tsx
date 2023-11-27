/* eslint-disable @typescript-eslint/no-unused-vars */
import { renderWithClient } from "@/mocks/utils";
import { AlbumById } from "../AlbumById";
import { waitFor } from "@testing-library/react";
import { vi } from "vitest";
import {
  Album,
  Market,
  MaxInt,
  Page,
  SimplifiedTrack,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";
import { albumMock, pagedAlbumMock } from "@/mocks/mockedResponses";
import { AlbumByIdHeader } from "@/components/albumById/AlbumByIdHeader";

const buildSpotifySdkMock = () =>
  ({
    albums: {
      get: async (_id: string, _market?: Market): Promise<Album> => {
        return albumMock as unknown as Album;
      },
      tracks: async (
        _albumId: string,
        _market?: Market,
        _limit?: MaxInt<50>,
        _offset?: number
      ): Promise<Page<SimplifiedTrack>> => {
        return pagedAlbumMock as Page<SimplifiedTrack>;
      },
    },
  } as SpotifyApi);

const mockedSdk = buildSpotifySdkMock();

vi.mock("@/hooks/useSpotify", () => ({
  useSpotify: () => {
    return mockedSdk;
  },
}));

describe("AlbumById Component Tests", async () => {
  vi.mock("react-router-dom", () => ({
    useParams: () => ({
      id: "666",
    }),
    Link: () => <a href="/">A Mocked Link</a>,
  }));

  it("renders the header with the correct design", async () => {
    const result = renderWithClient(<AlbumByIdHeader sdk={mockedSdk} />);
    waitFor(() =>
      expect(result.container).toMatchInlineSnapshot(`
    <div>
      <div
        class="flex flex-col bg-black bg-opacity-30 h-320"
      >
        <div
          class="flex justify-end mt-1 mr-2"
        >
          <button
            aria-expanded="false"
            aria-haspopup="menu"
            data-state="closed"
            id="radix-:r0:"
            type="button"
          >
             
            <img
              alt="Spotify Logo"
              class="w-24 h-24 rounded-full"
              src="/src/styles/img/spotify_logologo.jpg"
            />
          </button>
        </div>
        <h1 />
      </div>
    </div>
  `)
    );
  });

  it("renders the component with the correct design", async () => {
    const result = renderWithClient(<AlbumById />);
    await waitFor(async () => {
      expect(result.getAllByRole("heading")).toMatchInlineSnapshot(`
    [
      <h1 />,
      <h1
        class="text-black"
      >
        Track A- Solo Dancer
      </h1>,
      <h1
        class="text-black"
      >
        Track B- Duete Solo Dancers
      </h1>,
      <h1
        class="text-black"
      >
        Track C-Group Dancers
      </h1>,
      <h1
        class="text-black"
      >
        Medley: Mode D-Trio and Group Dancers/Mode E- Single solos and Group Dance/ModeF-Group and Solo Dance
      </h1>,
    ]
  `);
    });
  });
});
