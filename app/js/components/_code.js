/* ==========================================================================
   Jonas En Bieke - Code
   ========================================================================== */

jb.code = () => {

    let exports = jb.code;

    let btns;
    let givenCode = '';

    const codes = [
        'JD98PC39',
        'LA09JJ39',
        'BD08IN88'
    ];


    // Check Code
    const checkCode = () => {
        if (codes.indexOf(givenCode) > -1) {
            console.log('correct code');
            givenCode = '';

            jb.sound.playSuccess();
        } else {
            console.log('wrong code');
            givenCode = '';

            jb.sound.playFail();
        }
    };


    // Check Code
    const checkCodeLenght = () => {
        console.log(givenCode);

        if (givenCode.length === 8) {
            checkCode();
        }
    };


    // Set Item
    const setItem = (btn) => {
        btn.addEventListener('mousedown', (e) => {
            jb.sound.playClick();
        }, false);

        btn.addEventListener('touchstart', (e) => {
            jb.sound.playClick();
        }, false);

        btn.addEventListener('click', (e) => {
            givenCode += btn.dataset.code;
            checkCodeLenght();
        }, false);
    };


    // Init
    const init = (() => {
        btns = document.getElementsByClassName('js-code-btn');

        for (let btn of btns) {
            setItem(btn);
        }
    })();
};
