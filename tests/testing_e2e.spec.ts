import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
  // await page.waitForTimeout(3000);

  await page.addInitScript({
    path: "./tests/preload.ts",
  });
});

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button", { name: "Spotify Logo" }).click();
  await page.getByRole("link", { name: "Search" }).click();
  await page.getByPlaceholder("Search here for albums,").click();
  await page.getByPlaceholder("Search here for albums,").fill("the doors");
  await page.getByPlaceholder("Search here for albums,").press("Enter");
  await page.locator("div:nth-child(2) > .inline-flex").first().click();
  await page
    .locator("div")
    .filter({ hasText: /^People Are StrangeThe DoorsAdd$/ })
    .getByRole("button")
    .click();

  await page.getByRole("button", { name: "Spotify Logo" }).click();
  await page.getByRole("link", { name: "Liked Songs" }).click();
  await page.getByRole("button", { name: "Spotify Logo" }).click();
  await page.locator("html").click();
  await page
    .getByRole("row", { name: "1 Slightest Right Slightest" })
    .getByRole("button")
    .click();
  await page
    .getByRole("row", { name: "1 Slightest Right Slightest" })
    .getByRole("button")
    .click();
  await page.getByText("Click to close message.").click();
  await page.getByRole("button", { name: "Spotify Logo" }).click();
  await page.getByRole("link", { name: "Playlists" }).click();
  await page.getByRole("link", { name: "Cold amaranth defeated" }).click();
  await page
    .getByRole("row", { name: "15 I Know You Know I Know You" })
    .getByRole("button")
    .click();
  await page.getByRole("button", { name: "danceability" }).click();
  await expect(page.locator("tbody")).toContainText("Identité");
  await expect(page.locator("tbody")).toContainText("1");

  await page.getByRole("button", { name: "Spotify Logo" }).click();
  await page.getByRole("link", { name: "Tracks" }).click();
  await page.getByRole("button", { name: "Add" }).first().click();
  await page.getByRole("button", { name: "Add" }).nth(3).click();
  await page.getByText("Click to close message.").click();
  await page.getByRole("button", { name: "Spotify Logo" }).click();
  await page.getByRole("link", { name: "Recommendations Liszt" }).click();
  await expect(page.getByRole("link", { name: "The Doors" })).toBeVisible();
  await expect(
    page.getByRole("img", { name: "People Are Strange" })
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Slightest Right" })
  ).toBeVisible();
  await page.getByRole("img", { name: "Champagne Shots" }).click();
  await page.getByRole("img", { name: "I Know You Know" }).click();
});
