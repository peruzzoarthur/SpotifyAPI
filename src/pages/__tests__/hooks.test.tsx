import { it, expect, describe, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { client_id, scopes, secret } from "@/spotify";
import { createWrapper, renderWithClient } from "@/mocks/utils";
import { useAlbumById } from "@/hooks/useAlbumById";
import { AlbumById } from "../AlbumById";

vi.mock("@/hooks/useSpotify", () => ({
  useSpotify: () => {
    return SpotifyApi.withClientCredentials(client_id, secret, [scopes]);
  },
}));

describe("useAlbumById Hook Testing", async () => {
  it("should initialize sdk for testing and make an album call using the hook", async () => {
    const wrapper = createWrapper();
    const sdk = SpotifyApi.withClientCredentials(client_id, secret, [scopes]);
    const { result } = renderHook(() => useAlbumById({ sdk }), {
      wrapper: wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    console.log(result.current.data?.pages[0].items);
  });
});

describe("AlbumById Component Tests", async () => {
  it("should render the component with the correct text color", async () => {
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

// expect(result.getByText("Track A- Solo Dancer")).toHaveClass(
//   "text-black"
// );
// expect(result.getByText("Track B- Duete Solo Dancers")).toHaveClass(
//   "text-black"
// );
// expect(result.getByText("Track C-Group Dancers")).toHaveClass(
//   "text-black"
// );
// expect(
//   result.getByText(
//     "Medley: Mode D-Trio and Group Dancers/Mode E- Single solos and Group Dance/ModeF-Group and Solo Dance"
//   )
// ).toHaveClass("text-black");
