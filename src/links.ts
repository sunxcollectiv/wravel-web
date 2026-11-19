/**
 * Outbound links the site points at. Store URLs come from the environment so
 * staging and production can differ; until the apps are listed they fall back
 * to the stores' home pages.
 */
export const APP_STORE_URL: string =
  import.meta.env.VITE_APP_STORE_URL || "https://apps.apple.com/";

export const PLAY_STORE_URL: string =
  import.meta.env.VITE_PLAY_STORE_URL || "https://play.google.com/store";
