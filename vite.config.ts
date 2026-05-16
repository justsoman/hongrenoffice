import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * GitHub Pages:
 * - Project site: https://<user>.github.io/<repo>/
 * - User/org site: repo named "<user>.github.io" → served at site root
 * - Custom domain on a project site is usually at `/` (not `/repo/`). Set `PAGES_BASE=/`
 *   for CI: repository Actions variable, or variable on the `github-pages` environment if
 *   the workflow's build job uses `environment: github-pages` (see deploy-pages.yml).
 */
function normalizeViteBase(raw: string): string {
  const t = raw.trim();
  if (t === "" || t === "/") return "/";
  return t.endsWith("/") ? t : `${t}/`;
}

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserOrOrgSite = Boolean(repoName?.endsWith(".github.io"));
const pagesBaseOverride = process.env.PAGES_BASE?.trim();
const base =
  pagesBaseOverride !== undefined && pagesBaseOverride !== ""
    ? normalizeViteBase(pagesBaseOverride)
    : process.env.GITHUB_ACTIONS === "true" && repoName && !isUserOrOrgSite
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
