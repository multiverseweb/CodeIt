var isResizing = false;
var startX;
var startWidth;

console.log("Tejas' Codes :D");
let width = screen.width;
function adjustTextAreas() {
    var inputCode = document.getElementById("normal_code");
    var outputCode = document.getElementById("obfuscated_code");

    var totalWidth = window.innerWidth;
    var inputWidth = inputCode.offsetWidth;

    outputCode.style.width = (totalWidth - inputWidth) + 'px';
}
if (width > 480) {
    document.addEventListener("DOMContentLoaded", function () {
        adjustTextAreas();

        window.addEventListener('resize', adjustTextAreas);
    });
}
document.getElementById("normal_code").addEventListener('mousedown', function (e) {
    isResizing = true;
    startX = e.clientX;
    startWidth = document.getElementById("normal_code").offsetWidth;
});

document.addEventListener('mousemove', function (e) {
    if (isResizing) {
        var newWidth = startWidth + (e.clientX - startX);
        document.getElementById("normal_code").style.width = newWidth + 'px';
        adjustTextAreas();
    }
});

document.addEventListener('mouseup', function () {
    isResizing = false;
});


//=====================OBFUSCATION==============================

document.getElementById("copyNormal").addEventListener("click", function() {
    const outputCode = document.getElementById("normal_code");
    outputCode.select();
    document.execCommand("copy");
    copied("copyNormal");
});

document.getElementById("copyObfuscated").addEventListener("click", function() {
    const outputCode = document.getElementById("obfuscated_code");
    outputCode.select();
    document.execCommand("copy");
    copied("copyObfuscated");
});


function clearText(){
    document.getElementById("normal_code").value = "";
    document.getElementById("obfuscated_code").value = "";
}


document.getElementById("obfuscateButton").addEventListener("click", function () {
    const input = document.getElementById("normal_code").value;
    const obfuscated = obfuscate(input);
    document.getElementById("obfuscated_code").value = obfuscated;
});

document.getElementById("deobfuscateButton").addEventListener("click", function () {
    const input = document.getElementById("obfuscated_code").value;
    const deobfuscated = userDeobfuscate(input); // Use the new function
    document.getElementById("normal_code").value = deobfuscated;
});

function obfuscate(text) {
    let reversedText = text.split("").reverse().join(""); // Reverse the text
    let base64Text = btoa(unescape(encodeURIComponent(reversedText))); // Convert to Base64
    let scrambledText = base64Text.split("").map(char => String.fromCharCode(char.charCodeAt(0) + 3)).join(""); // Scramble characters

    const safeScrambledText = JSON.stringify(scrambledText); // Safely escape the obfuscated code

    // Embed the deobfuscation logic within the obfuscated code
    const selfDeobfuscatingCode = `
        (function() {
            const code = ${safeScrambledText}; // Obfuscated code

            function deobfuscate(text) {
                let unscrambledText = text.split("").map(char => 
                    String.fromCharCode(char.charCodeAt(0) - 3)).join("");
                let base64Decoded;
                try {
                    base64Decoded = decodeURIComponent(escape(atob(unscrambledText)));
                } catch (error) {
                    console.error('Error in deobfuscation: Invalid input for Base64 decoding');
                    return '';
                }
                let originalText = base64Decoded.split("").reverse().join("");
                return originalText;
            }

            const originalCode = deobfuscate(code); // Deobfuscate the code
            eval(originalCode); // Execute the deobfuscated code
        })();
    `;

    return selfDeobfuscatingCode;
}

function userDeobfuscate(input) {
    // Extract the obfuscated code from the input using a regular expression
    const codeMatch = input.match(/const code = (.+);/);

    if (!codeMatch) {
        alert("Invalid input: No obfuscated code found.");
        return '';
    }

    // Extracted obfuscated code from the input
    const obfuscatedCode = JSON.parse(codeMatch[1]);

    // Step 1: Unscramble characters by shifting ASCII values back
    let unscrambledText = obfuscatedCode.split("").map(char => String.fromCharCode(char.charCodeAt(0) - 3)).join("");

    // Step 2: Convert from Base64
    let base64Decoded;
    try {
        base64Decoded = decodeURIComponent(escape(atob(unscrambledText)));
    } catch (error) {
        alert('Error in deobfuscation: Invalid input for Base64 decoding');
        return '';
    }

    // Step 3: Reverse the text back to original
    let originalText = base64Decoded.split("").reverse().join("");

    return originalText;
}
