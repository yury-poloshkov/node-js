const charSets = {
    simple: "abcdefghijklmnopqrstuvwxyz",
    strong: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    normal: "1234567890",
    hard: '~!@#$%^&*()_+<>?{}[]-='
}
const defaultPasswordLength = {
    "simple": 8,
    "normal": 16,
    "hard": 32
}

function generate(mode = "simple", passLength = 8, strong = true, preventDefaultLengthCheck = false) {
    let charSet = charSets.simple;
    if (strong) charSet += charSets.strong;
    switch (mode.toLowerCase()) {
        case "hard": {
            charSet += charSets.hard;
        }
        case "normal": {
            charSet += charSets.normal;
        }
    }

    let passwordLength = passLength;
    if (!preventDefaultLengthCheck) {
        switch (mode.toLowerCase()) {
            case "simple": {
                passwordLength = Math.max(passLength, defaultPasswordLength.simple);
                break;
            }
            case "normal": {
                passwordLength = Math.max(passLength, defaultPasswordLength.normal);
                break;
            }
            case "hard": {
                passwordLength = Math.max(passLength, defaultPasswordLength.hard);
                break;
            }
        }
    }


    let password = charSets.simple.charAt(Math.random() * 26);
    for (let i = 1; i < passwordLength; i++) {
        password += charSet.charAt(Math.random() * charSet.length);
    }
    return password;
}

module.exports = { generate }