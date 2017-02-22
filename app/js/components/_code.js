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
        } else {
            console.log('wrong code');
            givenCode = '';
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
        btn.addEventListener('click', () => {
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
