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
// Optional: If you want to allow dragging to resize the areas
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

//FILE NAME
document.getElementById('name').addEventListener('input', updateFileName);
document.getElementById('directory').addEventListener('input', updateFileName);
document.getElementById('language').addEventListener('change', updateFileName);
function fileNameFunction() {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const name = document.getElementById('name').value;
    const directory = document.getElementById('directory').value;
    const language = document.getElementById('language').value;
    const result = generateFileName(directory, name, language);

    document.getElementById('result').textContent = 'Generated File Name: ' + result;
    copyToClipboard(result, 'submit');
};

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
        name=name+"-(revisit)";
    }
    switch (language) {
        case "Python":
            name += ".py";
            break;
        case "C++":
            name += ".cpp";
            break;
        case "JavaScript":
            name += ".js";
            break;
        case "SQL":
            name += ".sql";
            break;
        case "Java":
            name += ".java";
            break;
        default:
            name += ".c";
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
        if (id=='copy'){
            submitButton.textContent = 'Copied!';
        }
        else{
            document.getElementById('copy_image').src="https://www.freeiconspng.com/thumbs/check-tick-icon/tick-icon-44.png";
            document.getElementById('copy_image').style.filter="invert(0)";
        }
        
        submitButton.classList.add('success');
    }, function (err) {
        alert('Could not copy text: ', err);
    });
}


var ans=""
function runAlgorithm() {
    var inputCode = document.getElementById('input_code').value;
    var lines = inputCode.split('\n');
    var definition = null;
    var outputCode = "";

    // Track the minimum number of leading spaces or tabs found
    var minIndent = Infinity;
    var flag = false;
    // Process each line of input code
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        // Skip lines enclosed in triple double quotes
        if (line.includes('"""') || flag == true) {
            flag = true;
            continue;
        }

        if (flag = true && line.includes('"""')) {
            flag = false;
        }
        if (line.trim().startsWith('#')){
            continue;
        }

        // Find function definition
        if (line.trim().startsWith('def ')) {
            definition = line.trim().substring(4, line.trim().length - 1).replace("self, ", "");
        }

        // Count leading spaces or tabs
        var indent = 0;
        while (indent < line.length && (line[indent] === ' ' || line[indent] === '\t')) {
            indent++;
        }

        // Track the minimum indent level
        if (indent < minIndent && line.trim() !== "") {
            minIndent = indent;
        }

        // Append trimmed line to output code
        outputCode += line.trimRight() + "\n";
    }
    // Append 5 indented blank lines for user's code
    for (var j = 0; j < 3; j++) {
        outputCode += "    ".repeat(indent / 2) + "\n";
    }

    // Append test case and object creation without colon
    if (definition) {
        outputCode += "\t".repeat(minIndent) + "#paste testCase here\n\n";
        outputCode += "\t".repeat(minIndent) + "obj = Solution()\n";
        outputCode += "\t".repeat(minIndent) + "print(obj." + definition + ")\n";
    }

    // Update output textarea with generated output code
    ans= document.getElementById('output_code').value = outputCode.trim();
    document.getElementById("copy").style.animationPlayState="running";
}
function copyCode() {
    copyToClipboard(ans, 'copy');
}

function light() {
    document.getElementById("body").style.filter = "invert(1)";
    document.getElementById("logo").style.filter = "invert(1)";
    document.getElementById("submit").style.filter = "invert(1)";
    document.getElementById("checkmark").style.filter = "invert(1)";
    document.getElementById("body").style.backgroundColor = "rgba(0,0,0,0.1)";
    const button = document.getElementById('theme');
    button.onclick = dark;
}

function dark() {
    document.getElementById("body").style.filter = "invert(0)";
    document.getElementById("logo").style.filter = "invert(0)";
    document.getElementById("submit").style.filter = "invert(0)";
    document.getElementById("checkmark").style.filter = "invert(0)";
    document.getElementById("body").style.backgroundColor = "rgba(0, 0, 0, 0.888)";
    const button = document.getElementById('theme');
    button.onclick = light;
}
function copylink() {
    navigator.clipboard.writeText("https://coedittool.netlify.app/");
    document.getElementById("link").innerHTML = "✓";
}