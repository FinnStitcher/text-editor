const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// takes an array of what urls should be cached
// self.__WB_MANIFEST is a placeholder
precacheAndRoute(self.__WB_MANIFEST);

// declaring the cache
const pageCache = new CacheFirst({
	cacheName: 'page-cache',
	plugins: [
		new CacheableResponsePlugin({
			statuses: [0, 200]
		}),
		new ExpirationPlugin({
			maxAgeSeconds: 30 * 24 * 60 * 60
		})
	]
});

const imageCache = new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
        new CacehableResponsePlugin({
            statuses: [0, 200]
        }),
        new ExpirationPlugin({
            maxAgeSeconds: 30 * 24 * 60 * 60
        })
    ]
});

warmStrategyCache({
	urls: ['/index.html', '/'],
	strategy: pageCache
});

// use pageCache when requests involving page navigation come in
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// use imageCache when images need to be loaded
registerRoute(({ request }) => request.destination === 'image', imageCache);
