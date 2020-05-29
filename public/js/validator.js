const VALIDATOR = (()=> {
    const userNameRegChecker = new RegExp('/[a-z|A-z|0-9|_|\.]/g'),
        passwordRegChecker = new RegExp('/[a-z|A-z|0-9]/g');

    function validateTypeIsString(username, stringName) {
        if (typeof username !== 'string') {
            throw `Invalid ${stringName} type`;
        }
    }

    function validateStringLength(string, min, max, stringName) {
        if (string.length < min && string.length > max) {
            throw `Invalid ${stringName} length.`;
        }
    }

    function validateWhatStringCanContain(username, regex) {
        if (regex.test(username)) {
            throw 'Invalid username symbols!';
        }
    }

    return {
        username: {
            type: validateTypeIsString,
            length: validateStringLength,
            containsValidSymbols: validateWhatStringCanContain,
            symbolsReg: userNameRegChecker
        },
        password: {
            type: validateTypeIsString,
            length: validateStringLength,
            containsValidSymbols: validateWhatStringCanContain,
            symbolsReg: passwordRegChecker
        }
    }
})();

export {VALIDATOR};