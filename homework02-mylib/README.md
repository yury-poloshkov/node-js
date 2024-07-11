# Password generator

Generates random passwords of different strength

## Vertion

1.0.0

## Install

$ npm install yp-password-generator

## Usage

generate([mode], [passLength], [strong], [preventDefaultLengthCheck])

### Options

| Option                    | Type    | DefaultValue | Description                                                               |
| ------------------------- | ------- | ------------ | ------------------------------------------------------------------------- |
| mode                      | string  | simple       | Define charSet used to generate password                                  |
| passLength                | number  | 8            | Required password length                                                  |
| strong                    | boolean | TRUE         | add capital letters in charSet                                            |
| preventDefaultLengthCheck | boolean | FALSE        | Prevent generating password shorter than default value for specified mode |

### Values

mode = {
"simple",
"normal",
"hard"
}

defaultPasswordLength = {
"simple": 8,
"normal": 16,
"hard": 32
}

charSets = {
simple: "abcdefghijklmnopqrstuvwxyz",
strong: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
normal: "1234567890",
hard: '~!@#$%^&\*()\_+<>?{}[]-='
}

### Return

Returns a string of specified length and complicity.
