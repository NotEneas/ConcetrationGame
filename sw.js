self.addEventListener('install', e => {
	e.waitUntil(
		caches.open('concentration_game').then(cache => {
			return cache.addAll(['/', 'index.html', 'main.css', 'main.js']);
		})
	);
});

self.addEventListener('fetch', function(event) {
	console.log(event.request.url);
	console.log('alo');

	event.respondWith(
		caches.open('concentration_game').then(function(cache) {
			return cache.match(event.request).then(function(response) {
				return (
					response ||
					fetch(event.request).then(function(response) {
						cache.put(event.request, response.clone());
						return response;
					})
				);
			});
		})
	);
});
