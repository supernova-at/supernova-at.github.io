const my_cache = {
  NAME: 'my-first-pwa-1',
  URLS: []
};


/*
 *  The install event handler.
 */
const handleInstall = event => {
  // Perform install steps:
  // 1. Open a cache
  // 2. Cache some files
  // 3. Confirm whether all the required assets are cached or not

  event.waitUntil(
    // Open our cache.
    caches.open(my_cache.NAME)
      .then(cache => {
        console.log('Opened the cache');
        // Cache some files.
        return cache.addAll(my_cache.URLS);
      })
  );
};

/*
 * The fetch event handler.
 */
const handleFetch = event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Not a cache hit, get the resource from the server.
        return fetch(event.request);
      }
    )
  );
};

/*
 * Go!
 */
self.addEventListener('install', handleInstall);
self.addEventListener('fetch', handleFetch);