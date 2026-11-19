import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The port wravel-web serves on in every environment: the dev server, `vite
// preview`, and whatever fronts the built `dist/` on a server. Fixed and strict
// so nothing silently moves to another port.
export const PORT = 4630;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: PORT, strictPort: true },
  preview: { port: PORT, strictPort: true },
});
