import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "farhantka.app",
    short_name: "farhantka",
    description:
      "Try out TKA dan manajemen belajar mandiri berbasis AI: generator soal, rangkuman PDF, dan tutor chat.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f0f",
    theme_color: "#f76703",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon.png",
        sizes: "64x64",
        type: "image/png",
      },
    ],
  };
}