self.addEventListener('install', e => {
	e.waitUntil(
		caches.open('concentration_game').then(cache => {
			return cache.addAll([
				'/',
				'/ConcetrationGame/index.html',
				'/ConcetrationGame/main.css',
				'/ConcetrationGame/main.js'
			]);
		})
	);
});

self.addEventListener('fetch', function(event) {
	console.log(event.request.url);

	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});
