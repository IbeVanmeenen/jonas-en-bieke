/* ==========================================================================
   Jonas & Bieke
   ========================================================================== */

jb.app = () => {

    let exports = jb.app;


    // Scroll
    const appScroll = () => {
        // Put functions in the '_update' function :-)
        let latestKnownScrollY = 0,
            ticking = false;

        const _onScroll = () => {
            latestKnownScrollY = window.pageYOffset;
            _requestTick();
        };

        const _requestTick = () => {
            if (!ticking) {
                window.requestAnimationFrame(_update);
            }
            ticking = true;
        };

        const _update = () => {
            ticking = false;
            const currentScrollY = latestKnownScrollY;

            // jb.component.updateScroll(currentScrollY);
        };

        // scroll mousewheel wheel
        window.onscroll = (e) => {
            _onScroll();
        };
    };


    // On load
    exports.onload = () => {

    };


    // Init
    const init = (() => {
        jb.code();
        jb.sound();

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('worker.min.js').then(() => {
                console.log('Service Worker Registered');
            });
        }
    })();
};


const ready = (fn) => {
    // Sanity check
    if (typeof(fn) !== 'function') return;

    // If document is already loaded, run method
    if (document.readyState === 'complete') {
        return fn();
    }

    // Otherwise, wait until document is loaded
    document.addEventListener('DOMContentLoaded', fn, false);
};

ready(() => {
    jb.app();
});

window.onload = () => {
    jb.app.onload();
};
