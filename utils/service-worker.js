workbox.core.setCacheNameDetails({ prefix: 'next-ss' })

workbox.skipWaiting()
workbox.clientsClaim()

workbox.precaching.suppressWarnings()
/**
 * Ignore the non-important files added as a result of
 * webpack's publicPath thingy, for now...
 */
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

/**
 * You can read about Cache Strategies here
 * (https://developers.google.com/web/tools/workbox/modules/workbox-strategies)
 */

workbox.precaching.precacheAndRoute(
  self.__precacheManifest.filter(
    m =>
      !m.url.startsWith('bundles/') &&
      !m.url.startsWith('static/commons') &&
      m.url !== 'build-manifest.json'
  ),
  {}
)

workbox.routing.registerRoute(
  /[.](png|jpg|css|ico)/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'assets-cache',
    cacheableResponse: {
      statuses: [0, 200]
    }
  }),
  'GET'
)

workbox.routing.registerRoute(
  /[.](woff|woff2)/,
  workbox.strategies.cacheFirst({
    cacheName: 'fonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  }),
  'GET'
)

// Fetch the root route as fast as possible
workbox.routing.registerRoute(
  '/',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'root'
  }),
  'GET'
)

workbox.routing.registerRoute(
  /^http.*/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'http-cache'
  }),
  'GET'
)
