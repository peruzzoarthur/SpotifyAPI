/* eslint-disable @typescript-eslint/no-unused-vars */
import { renderWithClient } from "@/mocks/utils";
import { AlbumById } from "../AlbumById";
import { waitFor } from "@testing-library/react";
import { vi } from "vitest";
import {
  Market,
  MaxInt,
  Page,
  SimplifiedTrack,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";
import { pagedAlbumMock } from "@/mocks/mockedResponses";

const buildSpotifySdkMock = () =>
  ({
    albums: {
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
  it("should render the component with the correct text color", async () => {
    vi.mock("react-router-dom", () => ({
      useParams: () => ({
        id: "666",
      }),
    }));

    const result = renderWithClient(<AlbumById />);
    await waitFor(async () => {
      expect(result.getAllByRole("heading")).toMatchInlineSnapshot(`
          [
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
