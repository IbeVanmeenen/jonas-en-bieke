/* ==========================================================================
    Bieke En Jonas - Service Worker
   ========================================================================== */

/* ==========================================================================
    Worker - Config
   ========================================================================== */
const config = {
    'version': '1.3.0',
    'required_assets': [
        './assets/css/style.min.css',
        'https://fonts.googleapis.com/css?family=Amatic+SC|Lobster+Two:700',
        'https://fonts.gstatic.com/s/amaticsc/v9/DPPfSFKxRTXvae2bKDzp5JBw1xU1rKptJj_0jans920.woff2',
        'https://fonts.gstatic.com/s/lobstertwo/v9/bmdxOflBqMqjEC0-kGsIiP79_ZuUxCigM2DespTnFaw.woff2',

        './assets/img/header/waves-1.png',
        './assets/img/header/waves-2.png',
        './assets/img/header/ship.png',
        './assets/img/header/waves-3.png',
        './assets/img/capitein/hunk.png',
        './assets/img/icons/pc.png',
        './assets/img/icons/find.png',
        './assets/img/icons/map.png',
        './assets/img/stone/stone--no-head.jpg',
        './assets/img/stone/head.png',
        './assets/img/stone/eyes--correct.png',
        './assets/img/stone/eyes--wrong.png',
        './assets/img/icons/anchor.svg',
        './assets/img/stone/btn.png',
        './assets/sound/click.mp3',
        './assets/sound/fail.mp3',
        './assets/sound/success.mp3',

        './assets/js/app.min.js'
    ],
    'required_templates': [
        './index.html'
    ],
    'required_urls': [
        './'
    ]
};

const allRequiredFiles = [].concat(config.required_assets, config.required_templates, config.required_urls);



/* ==========================================================================
    Worker - Install

    This runs when the worker is first installed.
    It installs all required files
   ========================================================================== */
self.addEventListener('install', (e) => {
    e.waitUntil(caches.open('bj--' + config.version).then((cache) => {
        return cache.addAll(allRequiredFiles);
    }).catch((err) => {
        console.warn.call(console, `install: ${err}`);
    }).then(
        self.skipWaiting()
    ));
});



/* ==========================================================================
    Worker - Activate

    This runs after the worker is installed.
    It handles the deletion of expired caches.
   ========================================================================== */
self.addEventListener('activate', (e) => {
    const cacheWhitelist = ['bj--' + config.version];

    e.waitUntil(caches.keys().then((keys) => {
        const deletions = keys.map((key) => {
            if (cacheWhitelist.indexOf(key) === -1) {
                return caches.delete(key);
            }
        });

        return Promise.all(deletions);
    }).catch((err) => {
        console.warn.call(console, `activate: ${err}`);
    }).then(
        self.clients.claim()
    ));
});



/* ==========================================================================
    Worker - Fetch

    This runs upon every request.
   ========================================================================== */
self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then((response) => {
        return response || fetch(e.request);
    }).catch((err) => {
        console.warn.call(console, `fetch: ${err}`);
    }));
});
