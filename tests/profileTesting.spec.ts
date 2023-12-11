import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.waitForTimeout(3000);

  await page.getByTestId("login-username").click();
  await page.getByTestId("login-username").fill("sp3rzo@gmail.com");
  await page.getByTestId("login-password").fill("thisIsATestAcc");
  await page.waitForTimeout(3000);

  await page.getByTestId("login-password").press("Enter");
  await page.waitForTimeout(3000);

  await page.getByTestId("auth-accept").click();
  await page.waitForTimeout(3000);

  await expect(page.getByRole("img", { name: "MoCK3d" })).toBeVisible();
  await expect(page.locator("h1")).toContainText("MoCK3d");
  await expect(page.getByRole("main")).toContainText("Top Artists");
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Top ArtistsShow all$/ })
      .getByRole("button")
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "King Gizzard & The Lizard" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Mick Jenkins" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Blvck Svm" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Jazzbois" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "The Comet Is Coming" })
  ).toBeVisible();
  await expect(page.getByRole("main")).toContainText(
    "King Gizzard & The Lizard Wizard"
  );
  await expect(page.getByRole("main")).toContainText("Mick Jenkins");
  await expect(page.getByRole("main")).toContainText("Blvck Svm");
  await expect(page.getByRole("main")).toContainText("Jazzbois");
  await expect(page.getByRole("main")).toContainText(
    "australian psych • double drumming • micr0tonal • neo-psychedelic"
  );
  await expect(page.getByRole("main")).toContainText(
    "alternative hip hop • alternative r&b • chicago rap • conscious hip hop • drill • hip hop • underground hip hop"
  );
  await expect(page.getByRole("main")).toContainText("indie hip hop");
  await expect(page.getByRole("main")).toContainText(
    "modern jazz trio • uk contemporary jazz"
  );
  await expect(page.getByRole("main")).toContainText(
    "british jazz • chamber psych"
  );
  await expect(page.getByRole("main")).toContainText("Top Tracks");
  await expect(
    page.getByRole("img", { name: "Champagne Shots" })
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Track A- Solo Dancer" })
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "Gone Freestyle" })).toBeVisible();
  await expect(
    page.getByRole("img", { name: "SANGRE / AGUA (feat. Mick" })
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "Mood" })).toBeVisible();
  await expect(page.getByRole("main")).toContainText("Champagne Shots");
  await expect(page.getByRole("main")).toContainText("Track A- Solo Dancer");
  await expect(page.getByRole("main")).toContainText("Gone Freestyle");
  await expect(page.getByRole("main")).toContainText(
    "SANGRE / AGUA (feat. Mick Jenkins & AMARAH)"
  );
  await expect(page.getByRole("main")).toContainText("Mood");
  await expect(page.getByRole("main")).toContainText("Saintéé");
  await expect(page.getByRole("main")).toContainText("Charles Mingus");
  await expect(page.getByRole("main")).toContainText("Jelani Blackman");
  await expect(page.getByRole("main")).toContainText(
    "CJ Fly, Stoic, Mick Jenkins, AMARAH"
  );
  await expect(page.getByRole("main")).toContainText("SiR, Zacari");
  await expect(page.getByRole("main")).toContainText("Playlists");
  await expect(
    page.getByRole("link", { name: "Cold plum hug3 salmon" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Cold crimson actual krill" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Cold amaranth defeated" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Cold azure interesting prawn" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Cold yellow comfortable worm" })
  ).toBeVisible();
  await expect(page.getByRole("main")).toContainText("Cold plum hug3 salmon");
  await expect(page.getByRole("main")).toContainText("20 tracks");
  await expect(page.getByRole("main")).toContainText(
    "Cold crimson actual krill"
  );
  await expect(page.getByRole("main")).toContainText("20 tracks");
  await expect(page.getByRole("main")).toContainText(
    "Cold amaranth defeated mongoose"
  );
  await expect(page.getByRole("main")).toContainText("20 tracks");
  await expect(page.getByRole("main")).toContainText(
    "Cold azure interesting prawn"
  );
  await expect(page.getByRole("main")).toContainText("20 tracks");
  await expect(page.getByRole("main")).toContainText(
    "Cold yellow comfortable worm"
  );
  await expect(page.getByRole("main")).toContainText("20 tracks");
  await expect(page.getByRole("main")).toContainText("Saved Albums");
  await expect(page.getByRole("link", { name: "Swimming" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "The Rabbit That Hunts Tigers" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Clube Da Esquina" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "The Black Saint And The" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "DAMN." })).toBeVisible();
  await expect(page.getByRole("main")).toContainText("Swimming");
  await expect(page.getByRole("main")).toContainText("M@c Miller");
  await expect(page.getByRole("main")).toContainText(
    "The Rabbit That Hunts Tigers"
  );
  await expect(page.getByRole("main")).toContainText("Yin Yin");
  await expect(page.getByRole("main")).toContainText("Clube Da Esquina");
  await expect(page.getByRole("main")).toContainText(
    "Milton Nascimento, Lô Borges"
  );
  await expect(page.getByRole("main")).toContainText(
    "The Black Saint And The Sinner Lady"
  );
  await expect(page.getByRole("main")).toContainText("Charles Mingus");
  await expect(page.getByRole("main")).toContainText("DAMN.");
  await expect(page.getByRole("main")).toContainText("Kendrick Lamar");
});
