import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: "#ffac38",
    background_color: "#ffbd2e",
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "icon512_maskable.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "icon512_rounded.png",
        type: "image/png",
      },
    ],
    orientation: "any",
    display: "standalone",
    dir: "auto",
    lang: "en-US",
    name: "Farote",
    short_name: "Farote",
    start_url: "https://farote.vercel.app/",
    scope: "https://farote.vercel.app/",
    description:
      "Farote is a note taking app that allows you to create, edit, and manage your notes efficiently.",
  };
}
