# Add Your Birthday Music

The generated music has been removed from the active website. To add your own MP3, upload the file through the project’s web storage workflow and copy its returned storage URL.

Open `client/src/pages/Home.tsx` and replace the empty constant near the top:

```ts
const MUSIC = "";
```

with your uploaded MP3 URL, for example:

```ts
const MUSIC = "/manus-storage/your-song-name.mp3";
```

The song will then start when she clicks **“open this little page”** and the pause/resume control will appear after opening. Keep the audio file in MP3 format for broad browser compatibility.
