/* ==========================================================================
   Jonas En Bieke - Sound
   ========================================================================== */

jb.sound = () => {
    const exports = jb.sound;

    let clickSound, failSound, successSound;

    const resetSound = (soundEl) => {
        soundEl.pause();
        soundEl.currentTime = 0;
    };


    // Click
    exports.playClick = () => {
        if (clickSound) {
            resetSound(clickSound);
            clickSound.play();
        }
    };

    exports.playFail = () => {
        if (failSound) {
            resetSound(failSound);
            failSound.play();
        }
    };

    exports.playSuccess = () => {
        if (successSound) {
            resetSound(successSound);
            successSound.play();
        }
    };


    // Init
    const init = (() => {
        clickSound = document.getElementById('sound--click');
        failSound = document.getElementById('sound--fail');
        successSound = document.getElementById('sound--success');
    })();
};
