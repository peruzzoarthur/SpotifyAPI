import { test, expect, describe, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { client_id, scopes, secret } from "@/spotify";
import { createWrapper, renderWithClient } from "@/mocks/utils";
import { useAlbumById } from "@/hooks/useAlbumById";
import { AlbumById } from "../AlbumById";

vi.mock("@/hooks/useSpotify", async () => ({
  useSpotify: vi.fn(() => {
    return SpotifyApi.withClientCredentials(client_id, secret, [scopes]);
  }),
}));

describe("Album by Id", async () => {
  test("should initialize sdk for testing and make an album call using the hook", async () => {
    const wrapper = createWrapper();
    const sdk = SpotifyApi.withClientCredentials(client_id, secret, [scopes]);
    const { result } = renderHook(() => useAlbumById({ sdk }), {
      wrapper: wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    console.log(result.current.data?.pages[0].items);
  });

  test("should initialize sdk for testing and render <AlbumById>", async () => {
    const result = renderWithClient(<AlbumById />);

    expect(
      await result.findByText(
        "Track A- Solo Dancer, Track B- Duete Solo Dancers, Track C-Group Dancers, Medley: Mode D-Trio and Group Dancers/Mode E- Single solos and Group Dance/ModeF-Group and Solo Dance"
      )
    ).toBeInTheDocument();
  });

  // test("should be able the initial text on the screen", async () => {
  //   const wrapper = createWrapper();
  //   const id = "asd212d1d";
  //   waitFor (() => {})
  //   const { debug } = renderWithClient(<AlbumById />);
  //   const { result } = renderHook(() => useAlbumById({ sdk }), {
  //     wrapper: wrapper,
  //   });
  //   console.log(id);
  //   console.log(sdk);
  //   debug();
  //   await waitFor(() => {
  //     expect(result.current.data).not.toBe(undefined);
  //   });
  // });
});
