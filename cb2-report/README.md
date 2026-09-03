# CB² Report

A personal, newspaper-styled portfolio site for intelligence analysis briefs and write-ups.
Plain HTML/CSS/JS — no build step, no framework, free to host on GitHub Pages.

## Adding a new brief

Open **`js/data.js`** and add an object to the `BRIEFS` array. That file has a copy-paste
example and full field descriptions in its comments. You do not need to touch any other file.

Example:

```js
const BRIEFS = [
  {
    title: "Your Brief Title Here",
    date: "2026-09-01",
    category: "OSINT",
    summary: "One to three sentences summarizing the brief.",
    link: "https://github.com/colby318/your-repo"
  },
];
```

Briefs are automatically sorted newest-first, and the most recent one is shown as the
lead story. Leave `link` as `""` if the full write-up isn't published yet — the card will
show "Full write-up coming soon" instead of a dead link.

## Editing the "About" text

Open `index.html` and search for `<!-- EDIT: update this bio -->` — the paragraph right
below it is your bio. Edit the text directly.

## Deploying to GitHub Pages (colby318.github.io)

1. Go to [github.com/new](https://github.com/new) and create a **new repository** named
   exactly:

   ```
   colby318.github.io
   ```

   (This exact name makes GitHub serve it automatically at `https://colby318.github.io`.)
   Leave it public, and don't initialize it with a README (you already have one).

2. Upload these files to the repo, keeping the folder structure:
   ```
   index.html
   README.md
   css/style.css
   js/data.js
   js/app.js
   ```
   Easiest way: on the new repo's page, click **"uploading an existing file"**, then drag
   the whole `cb2-report` folder's contents in (GitHub preserves subfolders when you drag
   folders in from Finder/Explorer). Commit the upload.

   (Alternatively, if you're comfortable with git:
   ```
   cd cb2-report
   git init
   git add .
   git commit -m "Initial CB² Report site"
   git branch -M main
   git remote add origin https://github.com/colby318/colby318.github.io.git
   git push -u origin main
   ```
   )

3. In the repo, go to **Settings → Pages**. Under "Build and deployment", set
   **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)**. Save.

4. Wait a minute or two, then visit **https://colby318.github.io** — your site is live.

Any time you edit `js/data.js` (or anything else) and push/upload the change, the live
site updates automatically within a minute or so — no separate deploy step.
