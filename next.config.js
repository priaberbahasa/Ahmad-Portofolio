// PWA disabled — its service worker was intercepting admin API requests.
// Also force-disable all edge caching for /api/admin so Vercel never
// serves a prerendered 405 in place of our dynamic handlers.
module.exports = {
  async headers() {
    return [
      {
        source: "/api/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, max-age=0" },
          { key: "CDN-Cache-Control", value: "no-store" },
          { key: "Vercel-CDN-Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
};
