import GalleryClient, {
  GalleryPhoto,
} from "@/components/gallery/GalleryClient";
import type { Metadata } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";

export const metadata: Metadata = {
  title: "Gallery — GAMMAT 2026",
  description:
    "Photographs from the Global Aviation, Maritime & Mobility Access & Tech Summit 2026 — keynotes, exhibition floor, networking, and dignitaries.",
  openGraph: {
    title: "Gallery — GAMMAT 2026",
    description:
      "Keynotes, exhibition floor, networking, and dignitaries from GAMMAT 2026 in Lagos.",
    images: ["/gallery/gammat-2026-001.jpg"],
  },
};

export default function GalleryPage() {
  const dir = join(process.cwd(), "public", "gallery");

  // Only pick up the newest set. Older gammat-XX.jpg files are ignored.
  const files = readdirSync(dir)
    .filter((f) => /^gammat-2026-\d{3}\.(jpe?g|png|webp)$/i.test(f))
    .sort(); // lexicographic order matches numeric because of zero-padding

  const photos: GalleryPhoto[] = files.map((filename, i) => ({
    src: `/gallery/${filename}`,
    alt: `GAMMAT 2026 — photo ${String(i + 1).padStart(3, "0")}`,
  }));

  return <GalleryClient photos={photos} />;
}
