import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { AlbumById } from "../AlbumById";
import "@testing-library/jest-dom";

describe("Album by Id", () => {
  test("should be able the initial text on the screen", async () => {
    const { debug } = render(<AlbumById />);
    debug();
    expect(screen.getByText("Album")).toBeInTheDocument();
  });
});

test("should have black background with 10% opacity", async () => {
  const { container } = render(<AlbumById />);
  expect(container.firstChild).toHaveClass("bg-black bg-opacity-10");
});
