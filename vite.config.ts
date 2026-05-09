import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * GitHub Pages:
 * - Project site: https://<user>.github.io/<repo>/
 * - User/org site: repo named "<user>.github.io" → served at site root
 */
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserOrOrgSite = Boolean(repoName?.endsWith(".github.io"));
const base =
  process.env.GITHUB_ACTIONS === "true" && repoName && !isUserOrOrgSite
    ? `/${repoName}/`
    : "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
