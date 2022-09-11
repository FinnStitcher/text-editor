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
        new CacheableResponsePlugin({
            statuses: [0, 200]
        }),
        new ExpirationPlugin({
            maxAgeSeconds: 30 * 24 * 60 * 60
        })
    ]
})

warmStrategyCache({
	urls: ['/index.html', '/'],
	strategy: pageCache
});

// if a request is made to the server in which the user is trying to navigate to another page, check pageChache
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// cache assets, check the cache first
registerRoute(({ request }) => request.destination === 'image', imageCache);
