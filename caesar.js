// Get DOM elements
const form = document.getElementById("controls");
const selectEncodeOrDecode = document.getElementsByName("code");
const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");
const shiftKey = document.getElementById("shift-input");
const modulo = document.getElementById("mod-input");
const alphabet = document.getElementById("alphabet-input");
const letterCase = document.getElementById("letter-case");
const foreignChars = document.getElementById("foreign-chars");

// Form submit event
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputTextValue = inputText.value;
    const selectedOption = Array.from(selectEncodeOrDecode).find(option => option.checked).value;
    const shiftValue = parseInt(shiftKey.value) || 0;
    const moduloValue = parseInt(modulo.value) || alphabet.value.length;
    const alphabetValue = alphabet.value;
    const letterCaseValue = letterCase.value;
    const foreignCharsValue = foreignChars.value;

    const cipherOutput = caesarCipher(
        selectedOption,
        inputTextValue,
        shiftValue,
        moduloValue,
        alphabetValue,
        foreignCharsValue
    );

    outputText.value = applyLetterCase(cipherOutput, letterCaseValue);
});

// Caesar Cipher Function
function caesarCipher(mode, text, shift, mod, charset, foreignChars) {

    if (mode === "decode") {
        shift = -shift;
    }

    if (foreignChars == 1) {
        text = removeForeignChars(text);
    }

    charset = charset.toLowerCase();
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        const index = charset.indexOf(char.toLowerCase());

        if (index !== -1) {
            let newIndex = (index + shift) % mod;
            if (newIndex < 0) newIndex += mod;

            char = char === char.toLowerCase()
                ? charset[newIndex]
                : charset[newIndex].toUpperCase();
        }

        result += char;
    }

    return result;
}

// Remove foreign characters
function removeForeignChars(input) {
    return input.replace(/[^a-zA-Z0-9 ]/g, "");
}

// Apply letter case
function applyLetterCase(text, option) {
    if (option == 2) return text.toLowerCase();
    if (option == 3) return text.toUpperCase();
    return text;
}