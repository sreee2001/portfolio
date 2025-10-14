## How To — Portfolio (Local development, screenshots, and deployment)

This document explains how to work with this portfolio repository: how to launch locally, upgrade dependencies, add new mock projects and variants, generate screenshots (thumbnails), run without CORS errors, and deploy to GitHub Pages. Save this file in the repository root for quick reference.

---

## 1) Quick start — Launch the project locally

- Prerequisites:

  - Node.js (16+ recommended) and npm
  - Python (for the lightweight HTTP server used here)
  - (Optional) Playwright (used to generate screenshots)

- Install project dependencies and Playwright (one-time):

PowerShell:

```
cd "C:\Users\Srikanth\source\repos\portfolio";
npm run setup
```

- Start a local HTTP server and open the site (serves on http://localhost:8000):

PowerShell:

```
cd "C:\Users\Srikanth\source\repos\portfolio";
npm run serve
# or directly:
python -m http.server 8000
```

Open your browser and visit: http://localhost:8000

Note: Always run the site over HTTP while developing (see CORS section). Do not open `index.html` directly via `file://`.

---

## 2) Generate screenshots (thumbnails)

This repository includes scripts that use Playwright to open mock pages and capture screenshots into `assets/screenshots/`.

- Generate all screenshots (main script + personal bio script):

PowerShell:

```
cd "C:\Users\Srikanth\source\repos\portfolio";
npm run screenshots
```

- Generate only the main screenshots:

```
npm run generate-screenshots
```

- Generate only the personal biography screenshots:

```
npm run generate-personal-screenshots
```

Notes:

- Playwright downloads Chromium on the first run of `npx playwright install chromium`. Use `npm run setup` to install dependencies + browser.
- Screenshot filenames and directory layout must match entries in `js/portfolio-registry.json`. The scripts attempt to map common variants for `personal-biography` and `sentinelbridge` directories.

---

## 3) How and where to add a new Mock to the repo and portfolio

This covers adding the actual mock site files, generating screenshots, and registering the project so it appears in the portfolio.

1. Add mock files

   - Create a new folder under `mocks/` for the project (example slug: `13_New_Project`).
   - For a multi-variant project create subfolders for each variant:
     - `mocks/13_New_Project/variant_1_modern_blue/index.html`
     - `mocks/13_New_Project/variant_2_minimal/index.html`
   - For projects that use single HTML files in the directory (like `sentinelbridge`) place HTML files directly under `mocks/<folder>/name.html`.

2. Add or update screenshot

   - Run the screenshot generator after adding mock HTML files. The generator will create files in `assets/screenshots/<project-folder>/` named after the variant (or the mapped names for special directories).
   - If you prefer to add a screenshot manually, place it in `assets/screenshots/<project-folder>/<screenshot_name>.png`.

3. Register the project metadata
   - Open `js/portfolio-registry.json` and add a new project object in the `projects` array. The minimal fields are:

```
{
  "id": "unique-id-for-project",
  "title": "Short Title",
  "description": "One paragraph description",
  "icon": "fas fa-briefcase",
  "tags": ["Tag1", "Tag2"],
  "category": ["small-business","enterprise"],
  "screenshot": "assets/screenshots/13_New_Project/variant_1_modern_blue.png",
  "designStyle": "Minimal",
  "targetAudience": "Small Business",
  "colorScheme": "Professional Blue",
  "url": "mocks/13_New_Project/variant_1_modern_blue/index.html"
}
```

4. Important metadata details (and why they matter):

   - `id` (string): unique identifier used by filters/links. Use kebab-case.
   - `title`: human-readable project title.
   - `description`: used on the card; keep concise.
   - `icon`: a Font Awesome CSS class used as fallback inside thumbnails.
   - `tags` (array): used by search; include multiple helpful tags (style, industry, feature words).
   - `category` (array): used by the category filter buttons (e.g., `small-business`, `enterprise`, `vc-growth`, `personal`, `cybersecurity`). Choose categories that map to the existing filter buttons.
   - `screenshot`: relative path to your screenshot inside `assets/screenshots/`. Must match actual filename (case-sensitive on deployed servers).
   - `url`: relative URL to the mock HTML to open (used by the card "View Design" link).

5. Sanity checks
   - After editing `js/portfolio-registry.json`, run the local server and open the browser devtools Network tab. Look for 200 responses for `js/portfolio-registry.json` and thumbnail images.
   - Run `npm run generate-screenshots` if you need the generator to create thumbnails automatically.

---

## 4) How to run locally without CORS errors (recommended)

Never open pages directly via `file://` if your app fetches JSON or makes fetch/XHR calls — modern browsers block these requests for security reasons.

Use one of these approaches:

- Lightweight Python server (already used in scripts):

```
cd "C:\Users\Srikanth\source\repos\portfolio";
python -m http.server 8000
```

- Use the npm script (shorthand):

```
npm run serve
```

- VS Code Live Server extension: install and click "Go Live" in the editor.

After starting a server, open: http://localhost:8000

If you still see CORS-like errors in the console:

- Confirm the address is http(s) and not file://
- Check Network tab for 404/500 on `js/portfolio-registry.json` or `assets/screenshots/*`
- If using a remote origin (GitHub Pages), ensure all asset paths are relative or configured for your Pages URL

---

## 5) How to upgrade dependencies

- Update Node dependencies (npm):

```
cd "C:\Users\Srikanth\source\repos\portfolio";
npm update
```

- If Playwright updates or you add new browsers:

```
npx playwright install
```

- Update your `package.json` version and commit the change.

---

## 6) Deploying to GitHub Pages

Options for GitHub Pages:

- Use the `gh-pages` branch or the `docs/` folder. Configure via repository Settings -> Pages.
- After you push, Pages typically rebuilds and becomes live in 1–10 minutes (2–3 minutes common). Check the "Actions" tab for the `pages build and deployment` workflow.

Minimal steps (common pattern using `gh-pages` branch):

1. Commit and push your changes to `main` (or desired branch)
2. Configure GitHub Pages (Settings → Pages) to use `gh-pages` or `main`/`docs/` as appropriate

If you prefer a publish script, you can add a GitHub Action to build and commit a `docs/` folder or push to `gh-pages` automatically.

---

## 7) Troubleshooting & tips

- If portfolio shows "Portfolio Data Not Found": check developer console and confirm `js/portfolio-registry.json` loads with HTTP 200 and valid JSON. Use the Network tab to inspect fetch responses.
- If thumbnails are missing (404): check that files exist under `assets/screenshots/` and that `screenshot` in `portfolio-registry.json` points to the correct filename.
- If screenshots fail to generate:
  - Ensure `npm run setup` was run and Playwright installed Chromium
  - Run screenshots while a local HTTP server is running (the script may start one automatically).
  - Increase page timeouts in the scripts if your pages take longer to render.
- To add a new filter/category button: update the filter controls markup in `index.html` and ensure `category` values in `portfolio-registry.json` match those strings.

---

## 8) Quick checklist when adding a new project

1. Add files under `mocks/<project-slug>/...` with an accessible HTML file.
2. Run `npm run generate-screenshots` to generate thumbnails (or add images manually under `assets/screenshots/<project-slug>/`).
3. Add new project entry to `js/portfolio-registry.json` with correct `screenshot` and `url` paths.
4. Start server and verify in browser: `http://localhost:8000` → check Network and Console.
5. Commit and push changes. If deploying to GitHub Pages, wait a few minutes and check the Pages URL.

---

## 9) Pending Tasks

- Add a GitHub Action workflow to automatically run the screenshot generator and commit `assets/screenshots/` on every `main` push.
- Add a small validation script to assert `js/portfolio-registry.json` entries point to existing screenshots/URLs.

---

Last updated: 2025-10-14
