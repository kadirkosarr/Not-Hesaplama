const CACHE_NAME = 'ktun-not-v1';
const ASSETS = [
    './',
    './index.html',
    './logo.png',
    './manifest.json'
];

// Kurulum (Install) Olayı - Dosyaları önbelleğe al
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

// Etkinleştirme (Activate) Olayı - Eski cache'leri temizle
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Getirme (Fetch) Olayı - İnternet yoksa cache'den servis et
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
