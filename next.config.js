const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // Keep the service worker out of admin/API so saves never get
  // intercepted or served from stale cache.
  publicExcludes: ["!admin/**", "!api/**"],
  buildExcludes: [/^admin\//, /^api\//],
  workboxOptions: {
    navigateFallbackDenylist: [/^\/admin/, /^\/api/],
  },
});
module.exports = withPWA({});
