# Birthday Love Site — Download and Run Instructions

## What is included

This folder contains the pure HTML, CSS, and JavaScript website source, generated visual assets referenced by the project, and the interactive birthday sequence. The active entrypoint is `client/index.html`, which loads `client/src/vanilla.css` and `client/src/vanilla.js`; React is no longer required at runtime. The letter surprise now appears when she clicks **“let’s dive more”**; it no longer waits 20 seconds.

## Requirements

For the simplest pure frontend setup, use any local web server. Node.js 18 or newer with `pnpm` is still supported for the included Vite preview, but the website itself uses only browser HTML, CSS, and JavaScript at runtime.

## Run locally

Open a terminal in this folder and run:

```bash
pnpm install
pnpm dev
```

Alternatively, serve the `client` folder with any static web server. Do not double-click the HTML file if your browser blocks module loading from `file://`; use a local server instead.

Open the local address shown in the terminal, usually `http://localhost:3000`.

## Add or replace the MP3

Your uploaded `happybirthdayAndy.mp3` is included locally at `client/assets/happybirthdayAndy.mp3` and is already connected in the JavaScript:

```js
const MUSIC = './assets/happybirthdayAndy.mp3';
```

To replace it later, put another MP3 inside `client/assets/` and update the `MUSIC` constant in `client/src/vanilla.js` to its relative filename.

The music begins after she clicks the first **“open this little page”** button. A pause/resume control appears after the first card opens.

## Replace the photos

The personal photos are included locally in `client/assets/`. To replace them, add your images there and update the relative filenames in `client/src/vanilla.js`.

## Pure frontend files

The main files are:

| File | Purpose |
|---|---|
| `client/index.html` | Page shell and metadata |
| `client/src/vanilla.css` | All visual styling and animations |
| `client/src/vanilla.js` | Card flow, music playback, balloons, buttons, and wish reveal |

## Build a production version

```bash
pnpm check
pnpm build
```

The production files are generated in the `dist` folder. For a local production preview, run:

```bash
pnpm preview
```

## Important

If you open the HTML file directly by double-clicking it, the React app may not work correctly because it expects a local web server. Use `pnpm dev` or `pnpm preview` instead.
