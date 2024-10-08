console.log("Tejas' Codes :D");

// Adjust text areas based on window size
function adjustTextAreas() {
    const inputCode = document.getElementById("input_code");
    const outputCode = document.getElementById("output_code");

    const totalWidth = window.innerWidth;
    const inputWidth = inputCode.offsetWidth;

    outputCode.style.width = (totalWidth - inputWidth) + 'px';
}

if (screen.width > 480) {
    document.addEventListener("DOMContentLoaded", function () {
        adjustTextAreas();
        window.addEventListener('resize', adjustTextAreas);
    });
}

// Optional: Allow dragging to resize the areas
let isResizing = false;
let startX, startWidth;

document.getElementById("input_code").addEventListener('mousedown', function (e) {
    isResizing = true;
    startX = e.clientX;
    startWidth = document.getElementById("input_code").offsetWidth;
});

document.addEventListener('mousemove', function (e) {
    if (isResizing) {
        const newWidth = startWidth + (e.clientX - startX);
        document.getElementById("input_code").style.width = newWidth + 'px';
        adjustTextAreas();
    }
});

document.addEventListener('mouseup', function () {
    isResizing = false;
});

// FILE NAME GENERATION
document.getElementById('name').addEventListener('input', updateFileName);
document.getElementById('directory').addEventListener('input', updateFileName);
document.getElementById('language').addEventListener('change', updateFileName);

function fileNameFunction(event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const directory = document.getElementById('directory').value;
    const language = document.getElementById('language').value;
    const result = generateFileName(directory, name, language);

    document.getElementById('result').textContent = 'Generated File Name: ' + result;
    copyToClipboard(result, 'submit');
}

function updateFileName() {
    const directory = document.getElementById('directory').value;
    const name = document.getElementById('name').value;
    const language = document.getElementById('language').value;
    const result = generateFileName(directory, name, language);

    document.getElementById('result').textContent = 'Generated File Name: ' + result;
}

function generateFileName(directory, name, language) {
    const checkbox = document.getElementById("revisit");
    let sanitizedName = name.replace(/[^a-z0-9 ]/gi, '').split(' ').join('-');

    if (checkbox.checked) {
        sanitizedName += "-(revisit)";
    }

    const extensions = {
        "Python": ".py",
        "C++": ".cpp",
        "JavaScript": ".js",
        "SQL": ".sql",
        "Java": ".java",
        "C": ".c"
    };

    sanitizedName += extensions[language] || ".txt";

    if (directory) {
        sanitizedName = directory + '/' + sanitizedName;
    }
    return sanitizedName;
}

function copyToClipboard(text, id) {
    navigator.clipboard.writeText(text).then(function () {
        const submitButton = document.getElementById(id);
        if (id !== 'copy') {
            document.getElementById('copy_image').src = "https://www.freeiconspng.com/thumbs/check-tick-icon/tick-icon-44.png";
            document.getElementById('copy_image').style.filter = "invert(0)";
        }
        submitButton.classList.add('success');
    }, function (err) {
        alert('Could not copy text: ', err);
    });
}

// Main Logic for Code Refinement
function runAlgorithm() {
    const inputCode = document.getElementById('input_code').value;
    const language = document.getElementById('language').value;
    const platform = document.getElementById('platform').value;

    let outputCode = "";

    if (language === "Python") {
        outputCode = refinePythonCode(inputCode, platform);
    } else if (language === "C++") {
        outputCode = refineCppCode(inputCode, platform);
    } else if (language === "Java") {
        outputCode = refineJavaCode(inputCode, platform);
    } else if (language === "JavaScript") {
        outputCode = refineJsCode(inputCode, platform);
    } else if (language === "C") {
        outputCode = refineCCode(inputCode, platform);
    } else {
        outputCode = "Unsupported language selected.";
    }

    document.getElementById('output_code').value = outputCode.trim();
}

// Refine Python Code
function refinePythonCode(inputCode, platform) {
    let lines = inputCode.split('\n');
    let outputCode = "";
    let inTripleQuotes = false;
    let functionName = "";

    for (let line of lines) {
        if (line.includes('"""')) {
            inTripleQuotes = !inTripleQuotes;
            continue;
        }
        if (inTripleQuotes || line.trim().startsWith('#')) {
            continue;
        }
        if (line.trim().startsWith('def ')) {
            functionName = line.trim().split('(')[0].replace('def ', '');
        }
        outputCode += line.trimEnd() + "\n";
    }

    outputCode += "\n# Paste test case here\n";
    outputCode += "obj = Solution()\n";
    outputCode += `print(obj.${functionName}())\n`;

    return outputCode;
}

// Refine C++ Code
function refineCppCode(inputCode, platform) {
    let lines = inputCode.split('\n');
    let outputCode = "";
    let inClass = false;
    let functionName = "";
    let functionParams = "";
    let className = "Solution";
    let hasIostream = false;

    for (let line of lines) {
        if (line.trim().startsWith("#include")) {
            if (line.includes("iostream")) {
                hasIostream = true;
            }
            outputCode += line + "\n";
            continue;
        }
        if (line.trim().startsWith("using")) {
            outputCode += line + "\n";
            continue;
        }
        if (line.trim().startsWith("class")) {
            let match = line.trim().match(/class\s+(\w+)/);
            if (match) {
                className = match[1];
            }
            inClass = true;
        }
        if (inClass && line.includes('(') && line.includes(')') && line.includes('{')) {
            let match = line.trim().match(/\w+\s+(\w+)\s*\(([^)]*)\)\s*\{/);
            if (match) {
                functionName = match[1];
                functionParams = match[2]; // parameters as string
            }
        }
        if (line.trim() === '};') {
            inClass = false;
        }
        outputCode += line + "\n";
    }

    // Add #include <iostream> and using namespace std; if not present
    if (!hasIostream) {
        outputCode = '#include <iostream>\nusing namespace std;\n' + outputCode;
    }

    // Generate test code in main function
    let paramNames = [];
    if (functionParams) {
        let paramsArray = functionParams.split(',');
        paramsArray.forEach(param => {
            let paramParts = param.trim().split(' ');
            let paramName = paramParts[paramParts.length - 1];
            paramNames.push(paramName);
        });
    }

    outputCode += `
int main() {
    // Paste test case here
`;

    // Declare variables for parameters
    paramNames.forEach(paramName => {
        outputCode += `    // TODO: Initialize ${paramName}\n`;
    });

    outputCode += `    ${className} obj;\n`;
    outputCode += `    auto result = obj.${functionName}(`;

    outputCode += paramNames.join(', ');

    outputCode += `);\n    // Print result\n    std::cout << result << std::endl;\n    return 0;\n}\n`;

    return outputCode;
}

// Refine Java Code
function refineJavaCode(inputCode, platform) {
    let lines = inputCode.split('\n');
    let outputCode = "";
    let inClass = false;
    let functionName = "";
    let functionParams = "";
    let className = "Solution";
    let imports = "";

    for (let line of lines) {
        if (line.trim().startsWith("import")) {
            imports += line + "\n";
            continue;
        }
        if (line.trim().startsWith("class")) {
            let match = line.trim().match(/class\s+(\w+)/);
            if (match) {
                className = match[1];
            }
            inClass = true;
        }
        if (inClass && line.includes('(') && line.includes(')') && line.includes('{') && line.includes("public")) {
            let match = line.trim().match(/public\s+\w+\s+(\w+)\s*\(([^)]*)\)\s*\{/);
            if (match) {
                functionName = match[1];
                functionParams = match[2];
            }
        }
        if (line.trim() === '}') {
            inClass = false;
        }
        outputCode += line + "\n";
    }

    outputCode = imports + "\n" + outputCode;

    // Generate test code in main method
    let paramNames = [];
    if (functionParams) {
        let paramsArray = functionParams.split(',');
        paramsArray.forEach(param => {
            let paramParts = param.trim().split(' ');
            let paramName = paramParts[paramParts.length - 1];
            paramNames.push(paramName);
        });
    }

    outputCode += `
public class Main {
    public static void main(String[] args) {
        // Paste test case here
`;

    // Declare variables for parameters
    paramNames.forEach(paramName => {
        outputCode += `        // TODO: Initialize ${paramName}\n`;
    });

    outputCode += `        ${className} obj = new ${className}();\n`;
    outputCode += `        var result = obj.${functionName}(`;
    outputCode += paramNames.join(', ');
    outputCode += `);\n        // Print result\n        System.out.println(result);\n    }\n}\n`;

    return outputCode;
}

// Refine JavaScript Code
function refineJsCode(inputCode, platform) {
    let lines = inputCode.split('\n');
    let outputCode = "";
    let functionName = "";
    let functionParams = "";

    for (let line of lines) {
        if (line.trim().startsWith('function')) {
            let match = line.trim().match(/function\s+(\w+)\s*\(([^)]*)\)\s*\{/);
            if (match) {
                functionName = match[1];
                functionParams = match[2];
            }
        }
        outputCode += line + "\n";
    }

    // Generate test code
    let paramNames = [];
    if (functionParams) {
        paramNames = functionParams.split(',').map(param => param.trim());
    }

    outputCode += `
    // Paste test case here
`;

    // Declare variables for parameters
    paramNames.forEach(paramName => {
        outputCode += `// TODO: Initialize ${paramName}\n`;
    });

    outputCode += `const result = ${functionName}(`;
    outputCode += paramNames.join(', ');
    outputCode += `);\n// Print result\nconsole.log(result);\n`;

    return outputCode;
}

// Refine C Code
function refineCCode(inputCode, platform) {
    let lines = inputCode.split('\n');
    let outputCode = "";
    let functionName = "";
    let functionParams = "";
    let hasStdIO = false;

    for (let line of lines) {
        if (line.trim().startsWith("#include")) {
            if (line.includes("stdio.h")) {
                hasStdIO = true;
            }
            outputCode += line + "\n";
            continue;
        }
        if (line.includes('(') && line.includes(')') && line.includes('{') && !line.includes('main')) {
            let match = line.trim().match(/\w+\s+(\w+)\s*\(([^)]*)\)\s*\{/);
            if (match) {
                functionName = match[1];
                functionParams = match[2];
            }
        }
        outputCode += line + "\n";
    }

    // Add #include <stdio.h> if not present
    if (!hasStdIO) {
        outputCode = '#include <stdio.h>\n' + outputCode;
    }

    // Generate test code in main function
    let paramNames = [];
    if (functionParams) {
        let paramsArray = functionParams.split(',');
        paramsArray.forEach(param => {
            let paramParts = param.trim().split(' ');
            let paramName = paramParts[paramParts.length - 1];
            paramNames.push(paramName);
        });
    }

    outputCode += `
int main() {
    // Paste test case here
`;

    // Declare variables for parameters
    paramNames.forEach(paramName => {
        outputCode += `    // TODO: Initialize ${paramName}\n`;
    });

    outputCode += `    auto result = ${functionName}(`;
    outputCode += paramNames.join(', ');
    outputCode += `);\n    // Print result\n    printf("%d\\n", result);\n    return 0;\n}\n`;

    return outputCode;
}

function copyCode() {
    const outputCode = document.getElementById('output_code').value;
    copyToClipboard(outputCode, 'copy');
}

function clearText() {
    document.getElementById("input_code").value = "";
    document.getElementById("output_code").value = "";
}
