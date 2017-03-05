/* ==========================================================================
    Bieke En Jonas - Service Worker
   ========================================================================== */

/* ==========================================================================
    Worker - Config
   ========================================================================== */
const config = {
    'version': '1.2.0',
    'required_assets': [
        './assets/css/style.min.css?v2',
        'https://fonts.googleapis.com/css?family=Amatic+SC|Lobster+Two:700',
        'https://fonts.gstatic.com/s/amaticsc/v9/DPPfSFKxRTXvae2bKDzp5JBw1xU1rKptJj_0jans920.woff2',
        'https://fonts.gstatic.com/s/lobstertwo/v9/bmdxOflBqMqjEC0-kGsIiP79_ZuUxCigM2DespTnFaw.woff2',

        './assets/img/header/waves-1.png?v2',
        './assets/img/header/waves-2.png?v2',
        './assets/img/header/ship.png?v2',
        './assets/img/header/waves-3.png?v2',
        './assets/img/capitein/hunk.png?v2',
        './assets/img/icons/pc.png?v2',
        './assets/img/icons/find.png?v2',
        './assets/img/icons/map.png?v2',
        './assets/img/stone/stone--no-head.jpg?v2',
        './assets/img/stone/head.png?v2',
        './assets/img/stone/eyes--correct.png?v2',
        './assets/img/stone/eyes--wrong.png?v2',
        './assets/img/icons/anchor.svg?v2',
        './assets/img/stone/btn.png?v2',
        './assets/sound/click.mp3?v2',
        './assets/sound/fail.mp3?v2',
        './assets/sound/success.mp3?v2',

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
