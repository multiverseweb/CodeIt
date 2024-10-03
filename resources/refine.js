console.log("Tejas' Codes :D");

let width = screen.width;
function adjustTextAreas() {
    var inputCode = document.getElementById("input_code");
    var outputCode = document.getElementById("output_code");

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

var isResizing = false;
var startX;
var startWidth;

document.getElementById("input_code").addEventListener('mousedown', function (e) {
    isResizing = true;
    startX = e.clientX;
    startWidth = document.getElementById("input_code").offsetWidth;
});

document.addEventListener('mousemove', function (e) {
    if (isResizing) {
        var newWidth = startWidth + (e.clientX - startX);
        document.getElementById("input_code").style.width = newWidth + 'px';
        adjustTextAreas();
    }
});

document.addEventListener('mouseup', function () {
    isResizing = false;
});

document.getElementById('name').addEventListener('input', updateFileName);
document.getElementById('directory').addEventListener('input', updateFileName);
document.getElementById('language').addEventListener('change', updateFileName);

function updateFileName() {
    const directory = document.getElementById('directory').value;
    const name = document.getElementById('name').value;
    const language = document.getElementById('language').value;
    const result = generateFileName(directory, name, language);

    document.getElementById('result').textContent = 'Generated File Name: ' + result;
}

function generateFileName(directory, name, language) {
    var checkbox = document.getElementById("revisit");
    name = name.split(' ');
    for (let i = 0; i < name.length; i++) {
        for (let j = 0; j < name[i].length; j++) {
            if (!isalnum(name[i][j])) {
                name[i] = name[i].replace(name[i][j], "");
            }
        }
    }
    name = name.join('-');

    if (checkbox.checked) {
        name = name + "-(revisit)";
    }
    switch (language) {
        case "Python":
            name += ".py";
            break;
        case "C++":
            name += ".cpp";
            break;
        case "C":
            name += ".c";
            break;
        case "JavaScript":
            name += ".js";
            break;
        case "SQL":
            name += ".sql";
            break;
        case "Java":
            name+= ".java.txt";
            break;
        default:
            name += ".txt"; // Default if language is not specified
    }
    if (directory != '') {
        name = directory + '/' + name;
    }
    return name;
}

function isalnum(char) {
    return /^[a-z0-9]+$/i.test(char);
}

function copyToClipboard(text, id) {
    navigator.clipboard.writeText(text).then(function () {
        const submitButton = document.getElementById(id);
        if (id == 'copy') {
            copied('copy');
        } else {
            document.getElementById('copy_image').src = "https://www.freeiconspng.com/thumbs/check-tick-icon/tick-icon-44.png";
            document.getElementById('copy_image').style.filter = "invert(0)";
        }

        submitButton.classList.add('success');
    }, function (err) {
        alert('Could not copy text: ', err);
    });
}

var ans = "";
function runAlgorithm() {
    var inputCode = document.getElementById('input_code').value;
    var language = document.getElementById('language').value;
    var lines = inputCode.split('\n');
    var outputCode = "";

    var minIndent = Infinity;
    var flag = false;
    var isSQL = language === "SQL";

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];

        if (isSQL) {
            if (line.trim().startsWith("--")) continue;
        } else {
            if (line.trim().startsWith('//') || line.trim().startsWith('/*')) continue;
        }

        var indent = 0;
        while (indent < line.length && (line[indent] === ' ' || line[indent] === '\t')) {
            indent++;
        }

        if (indent < minIndent && line.trim() !== "") {
            minIndent = indent;
        }

        outputCode += line.trimRight() + "\n";
    }

    for (var j = 0; j < 3; j++) {
        outputCode += "    ".repeat(indent / 2) + "\n";
    }

    if (language === "C" || language === "C++") {
        outputCode += "int main() {\n    // Add your code here\n    return 0;\n}\n";
    } else if (language === "JavaScript") {
        outputCode += ` // Add your code here\n console.log("Hello world")`;
    } else if (language === "SQL") {
        outputCode += "-- Write your SQL query here\nSELECT * FROM table_name;\n";
    }else if(language==="Java"){
        outputCode += ` // Add your code here\n public static void main(){}`;
    }


    ans = document.getElementById('output_code').value = outputCode.trim();
    document.getElementById("copy").style.animationPlayState = "running";
}

function copyCode() {
    copyToClipboard(ans, 'copy');
}

function clearText() {
    document.getElementById("input_code").value = "";
    document.getElementById("output_code").value = "";
}