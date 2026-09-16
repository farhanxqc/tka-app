import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Farhan Agent",
    short_name: "Farhan Agent",
    description:
      "Try out TKA dan manajemen belajar mandiri berbasis AI: generator soal, rangkuman PDF, dan tutor chat.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f0f",
    theme_color: "#0f0f0f",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}