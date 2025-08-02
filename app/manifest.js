export default function manifest() { // this is the entry point to pwa
  return {
    name: "MyWeather",
    short_name: "MyWeather",
    icons: [
      {
        src: "/pwa-app/public/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/pwa-app/public/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#00ff63",
    background_color: "#ffffff",
    display: "standalone",
  };
}
