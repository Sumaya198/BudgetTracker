const cacheFiles = 'v2';

const cacheAssets = [
    "/",
    "/indexeddb.js",
    "/index.html",
    "/index.js",
    "/styles.css",
    "/manifest.json",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
]

//Install Event
self.addEventListener('install', e => {
    e.waitUntil(
        caches
        .open(cacheFiles)
        .then(cache => {
            cache.addAll(cacheAssets);
        })
        .then(()=> self.skipWaiting())
    );
})

//Install Event
self.addEventListener('activate', e => {
    //get rid of any unwanted cahes
    e.waitUntil(
        caches.keys().then(cacheFiles => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheFiles){
                       console.log('Service Worker: Clearing Old Cache');
                       return caches.delete(cache);
                    }
                })
            )
        })
    )
})

//Call fetch event

self.addEventListener('fetch', e =>{
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})
