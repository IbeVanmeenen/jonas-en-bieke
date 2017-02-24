/* ==========================================================================
   Jonas En Bieke - Code
   ========================================================================== */

jb.code = () => {

    let exports = jb.code;

    let btns;
    let givenCode = '';
    let stone;
    let directions;

    const codes = [
        'JD98PC39',
        'LA09JJ39',
        'BD08IN88'
    ];


    const setMessage = () => {
        let message = '';

        if (givenCode === 'BD08IN88') {
            // Ibe
            message = 'Arrgh, daar waar het pad hoog is, daar waar de ezels balken.';
        } else if (givenCode === 'JD98PC39') {
            // PJ
            message = 'Arrgh, de klokken luiden, gevaar! Ship ahoi stadsratten!';
        } else if (givenCode === 'LA09JJ39') {
            // Espe
            message = 'Arrgh, jonger en wijzer, daar zal het einde zijn.';
        }

        console.log(message);

        directions.innerHTML = message;
    };


    // Check Code
    const checkCode = () => {
        if (codes.indexOf(givenCode) > -1) {
            jb.sound.playSuccess();
            stone.classList.add('stone--success');

            setMessage();
        } else {
            console.log('wrong code');
            givenCode = '';

            jb.sound.playFail();
            stone.classList.add('stone--failed');
            window.setTimeout(() => {
                stone.classList.remove('stone--failed');
            }, 3000);
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

        btn.addEventListener('click', (e) => {
            givenCode += btn.dataset.code;
            checkCodeLenght();
        }, false);
    };


    // Init
    const init = (() => {
        btns = document.getElementsByClassName('js-code-btn');
        stone = document.getElementById('stone');
        directions = document.getElementById('stone-directions');

        for (let btn of btns) {
            setItem(btn);
        }
    })();
};
