// scripts/fetch-gallery.mjs
import fs from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";

// ── Config ──────────────────────────────────────────────────────────────
const ALBUM_URL =
  "https://photos.google.com/share/AF1QipMpu0Q5BgbNJqomSM5xEKKS9X1wQmYUZ5F-W4zXkizwSEqi546n_JLfN5fXireT0w?key=Nm1nS2M3QVRHVmJmR2RPZlQ3UTd0SndhRmdGT3BR";

// Change this prefix to get a different naming scheme.
// Result: gammat-2026-001.jpg, gammat-2026-002.jpg, ...
const NAME_PREFIX = "gammat-2026";

// Download width (Google CDN accepts =w1920 style params).
const WIDTH = 1920;
// ────────────────────────────────────────────────────────────────────────

const root = process.cwd();
const tmpDir = path.join(root, "tmp");
const scriptsDir = path.join(root, "scripts");
const outDir = path.join(root, "public", "gallery");
const albumJson = path.join(scriptsDir, "album.json");
const manifestPath = path.join(scriptsDir, "gallery-manifest.json");

async function ensureDirs() {
  // This is what was missing on Windows last time.
  await fs.mkdir(tmpDir, { recursive: true });
  await fs.mkdir(scriptsDir, { recursive: true });
  await fs.mkdir(outDir, { recursive: true });
}

async function main() {
  await ensureDirs();
  console.log(`→ Project root: ${root}`);
  console.log(`→ Ensured folders: tmp/, scripts/, public/gallery/`);

  // 1. Extract album URLs + metadata
  console.log("→ Extracting album URLs...");
  execSync(`npx gphotos-scraper extract "${ALBUM_URL}" "${albumJson}"`, {
    stdio: "inherit",
    cwd: root,
  });

  const album = JSON.parse(await fs.readFile(albumJson, "utf8"));
  const photos = album.photos ?? [];
  console.log(`→ Album: "${album.title ?? "untitled"}"`);
  console.log(`→ Found ${photos.length} photos`);

  // 2. Download each photo with the custom name
  const manifest = [];

  for (const [i, photo] of photos.entries()) {
    const seq = String(i + 1).padStart(3, "0"); // 001, 002, ...
    const ext = (photo.filename?.split(".").pop() || "jpg").toLowerCase();
    const filename = `${NAME_PREFIX}-${seq}.${ext}`;
    const dest = path.join(outDir, filename);

    // Strip any existing size param, then add ours.
    const base = photo.url.split("=")[0];
    const url = `${base}=w${WIDTH}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await fs.writeFile(dest, buf);
      console.log(`✓ ${filename}  (${(buf.length / 1024).toFixed(0)} KB)`);

      manifest.push({
        src: `/gallery/${filename}`,
        alt: photo.description || `${NAME_PREFIX} photo ${seq}`,
        category: "Summit", // edit later per image
        caption: photo.description || "", // edit later per image
      });
    } catch (err) {
      console.warn(`✗ ${filename}: ${err.message}`);
    }
  }

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${manifest.length} files saved to public/gallery/`);
  console.log(`Manifest: ${manifestPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
