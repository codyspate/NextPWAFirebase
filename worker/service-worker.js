importScripts('/workbox-sw.js');
importScripts('/workbox-background-sync.js');
importScripts('/workbox-strategies.js');
importScripts('/workbox-routing.js');
importScripts('/idb.js');
importScripts('/utility.js');

const bgSyncPlugin = new workbox.backgroundSync.Plugin('myQueueName', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
});

workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
    ],
  }),
);

workbox.routing.registerRoute(/.*(?:firebasestorage\.googleapis)\.com.*$/, workbox.strategies.staleWhileRevalidate({
  cacheName: 'post-images'
}));

workbox.routing.registerRoute(
  /\.(?:js|css|ico)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-resources',
  }),
);

workbox.routing.registerRoute(
  new RegExp('^https://us-central1-pwagram-7decd.cloudfunctions.net'),
  workbox.strategies.networkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
)

const PRECACHE_ROUTES = [
  {
    "url": "/",
    "revision": "b30611fae824ce157912d7f356879eaa"
  },
  {
    "url": "/new",
    "revision": "b30611fae824ce157912d7f35asf879e"
  },
  {
    "url": "/workbox-background-sync.js",
    "revision": "b70611fae824ce157912d7f35asf879e"
  },
  {
    "url": "/workbox-strategies.js",
    "revision": "b40611fae824ce157912d7f35asf879e"
  },
  {
    "url": "/workbox-sw.js",
    "revision": "b50611fae824ce157912d7f35asf879e"
  },
  {
    "url": "/workbox-routing.js",
    "revision": "b60611fae824ce157912d7f35asf879e"
  },
]

workbox.precaching.precacheAndRoute(PRECACHE_ROUTES);