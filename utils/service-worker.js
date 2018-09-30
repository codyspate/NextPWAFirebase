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

const bgSyncPlugin = new workbox.backgroundSync.Plugin('myQueueName', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
})

workbox.routing.registerRoute(/.*(?:firebasestorage\.googleapis)\.com.*$/, workbox.strategies.staleWhileRevalidate({
  cacheName: 'post-images'
}));

workbox.routing.registerRoute(
  new RegExp('^https://us-central1-pwagram-7decd.cloudfunctions.net'),
  workbox.strategies.networkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
)

self.addEventListener('push', function (event) {
  console.log('Push Notification received', event);

  const img = 'static/icons/app-icon-96x96.png'

  let data = { title: 'New!', content: 'Something new happened!', openUrl: '/' };

  if (event.data) {
    data = JSON.parse(event.data.text());
  }

  var options = {
    body: data.content,
    icon: img,
    badge: img,
    data: {
      url: data.openUrl
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  var notification = event.notification;
  var action = event.action;

  console.log(notification);

  if (action === 'confirm') {
    console.log('Confirm was chosen');
    notification.close();
  } else {
    console.log(action);
    event.waitUntil(
      clients.matchAll()
        .then(function (clis) {
          var client = clis.find(function (c) {
            return c.visibilityState === 'visible';
          });

          if (client !== undefined) {
            client.navigate(notification.data.url);
            client.focus();
          } else {
            clients.openWindow(notification.data.url);
          }
          notification.close();
        })
    );
  }
});
