import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { playlistHandlers } from "./handlers/playlistHandlers";
import { albumHandlers } from "./handlers/albumHandlers";
import { searchHandlers } from "./handlers/searchHandlers";
import { tokenHandler } from "./handlers/tokenHandler";

export const worker = setupWorker(
  ...handlers,
  ...playlistHandlers,
  ...tokenHandler,
  ...albumHandlers,
  ...searchHandlers
);
