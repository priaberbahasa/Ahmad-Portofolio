// PWA is disabled for now — its service worker was intercepting admin
// API requests (returning 405 / empty body). We don't need PWA features
// for a portfolio. Can re-enable later if offline install is desired.
module.exports = {};
