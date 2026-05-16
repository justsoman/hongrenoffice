import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * GitHub Pages:
 * - Project site: https://<user>.github.io/<repo>/
 * - User/org site: repo named "<user>.github.io" → served at site root
<<<<<<< HEAD
 * - Custom domain on a project site is usually at `/` (not `/repo/`). Set env
 *   `PAGES_BASE` to `/` in CI (e.g. repo Actions variable `PAGES_BASE`) so assets match.
=======
 * - Custom domain on a project site is usually at `/` (not `/repo/`). Set repo
 *   variable `GITHUB_PAGES_BASE` to `/` (or pass env in CI) so assets match.
>>>>>>> 948f0c34771956b1eb4795ab9618a44432d8c745
 */
function normalizeViteBase(raw: string): string {
  const t = raw.trim();
  if (t === "" || t === "/") return "/";
  return t.endsWith("/") ? t : `${t}/`;
}

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserOrOrgSite = Boolean(repoName?.endsWith(".github.io"));
<<<<<<< HEAD
const pagesBaseOverride = process.env.PAGES_BASE?.trim();
=======
const pagesBaseOverride = process.env.GITHUB_PAGES_BASE?.trim();
>>>>>>> 948f0c34771956b1eb4795ab9618a44432d8c745
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
