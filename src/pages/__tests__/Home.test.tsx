// Import useSpotify from the appropriate file
import * as useSpotify from "../../hooks/useSpotify"; // Replace './useSpotify' with the correct path

// Your test code
import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Home } from "../Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("Home", () => {
  it("should render Login component when there is no user profile data", async () => {
    // Arrange
    const queryClient = new QueryClient();
    const useSpotifyMock = vi
      .spyOn(useSpotify, "useSpotify")
      .mockReturnValue(null);

    // Act
    render(
      <>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </>
    );

    // Assert
    await screen.findByRole("button", { name: "Login" });
    expect(useSpotifyMock).toHaveBeenCalled();
  });
});
