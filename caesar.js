document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("controls");
    const inputText = document.getElementById("input-text");
    const outputText = document.getElementById("output-text");
    const secretKey = document.getElementById("secret-key");
    const actionBtn = document.getElementById("action-btn");
    const modeRadios = document.querySelectorAll('input[name="mode"]');

    // Function to update button text
    function updateButtonText() {
        const selectedMode = document.querySelector('input[name="mode"]:checked').value;
        actionBtn.textContent = selectedMode === "encrypt" ? "Encrypt" : "Decrypt";
    }

    // Add change listener to both radio buttons
   modeRadios.forEach(radio => {
    radio.addEventListener("change", function () {

        updateButtonText();

        // Clear both boxes when mode changes
        inputText.value = "";
        outputText.value = "";

    });
});

    // Make sure correct text is set on page load
    updateButtonText();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const text = inputText.value.trim();
        const key = secretKey.value.trim();
        const mode = document.querySelector('input[name="mode"]:checked').value;

        if (!text || !key) {
            alert("Please enter both text and secret key!");
            return;
        }

        try {
            if (mode === "encrypt") {
                const encrypted = CryptoJS.AES.encrypt(text, key).toString();
                outputText.value = encrypted;
            } else {
                const decrypted = CryptoJS.AES.decrypt(text, key)
                    .toString(CryptoJS.enc.Utf8);

                if (!decrypted) {
                    alert("Wrong key or invalid ciphertext!");
                    return;
                }

                outputText.value = decrypted;
            }
        } catch (error) {
            alert("Error during encryption/decryption!");
        }
    });

});