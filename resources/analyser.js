// Initialize the chart with all lines displayed and markers hidden
function initializeComplexityChart() {
    const ctx = document.getElementById('complexityChart').getContext('2d');

    const n = Array.from({ length: 100 }, (_, i) => i + 1); // X-axis values (n)
    const complexities = {
        "O(1)": n.map(() => 1),
        "O(log n)": n.map(x => Math.log2(x)),
        "O(n)": n,
        "O(n log n)": n.map(x => x * Math.log2(x)),
        "O(n^2)": n.map(x => x * x),
        "O(2^n)": n.map(x => Math.pow(2, x)),
        "O(n^x)": n.map(() => null) // Symbolic complexity, no actual values
    };

    const datasets = Object.keys(complexities).map((key) => ({
        label: key,
        data: complexities[key],
        borderColor: 'white', // All lines set to white initially
        borderWidth: 1,
        fill: false,
        pointRadius: 0 // Hide the markers
    }));

    window.complexityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: n,
            datasets: datasets
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'linear',
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'n',
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'white'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Time Complexities',
                    color: 'white'
                },
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    });
}

// Function to highlight the selected line and display the result
function highlightComplexityLine(complexityType) {
    const datasets = window.complexityChart.data.datasets;
    datasets.forEach((dataset) => {
        dataset.borderColor = 'white'; // Reset all lines to white
        dataset.borderWidth = 1; // Reset all lines to normal width
        dataset.pointRadius = 0; // Hide markers

        if (dataset.label === complexityType) {
            dataset.borderColor = 'rgba(255, 170, 0, 0.756)'; // Highlight selected line
            dataset.borderWidth = 2; // Make the highlighted line thicker
        }
    });

    window.complexityChart.update(); // Update the chart to apply changes
}

// Function to analyze time complexity and display symbolic O(n^x)
function analyzeTimeComplexity() {
    const code = document.getElementById("time_code").value;
    const codeLines = code.split('\n');

    const loopPattern = /\b(for|while)\b/;
    const recursivePattern = /\bfunction\s+(\w+)\s*\(.*\)\s*{[^}]*\1\s*\(/;
    const sortingPattern = /\bsort\(|sorted\(/;
    const logarithmicPattern = /\bbinary_search\(|Math\.log\b/;

    let loopCount = 0;
    let recursiveCount = 0;
    let sortingCount = 0;
    let logarithmicCount = 0;
    let nestedLoopDepth = 0;

    let currentDepth = 0;

    for (let line of codeLines) {
        line = line.trim();

        if (recursivePattern.test(code)) {
            recursiveCount++;
        }

        if (sortingPattern.test(line)) {
            sortingCount++;
        }

        if (logarithmicPattern.test(line)) {
            logarithmicCount++;
        }

        if (loopPattern.test(line)) {
            loopCount++;
            currentDepth++;
            nestedLoopDepth = Math.max(nestedLoopDepth, currentDepth);
        } else if (line === '') {
            currentDepth = 0;
        }
    }

    let result;
    let complexityType = "O(1)"; // Default complexity type

    if (recursiveCount > 0) {
        result = "O(2^n) or O(n!) due to recursion";
        complexityType = "O(2^n)";
    } else if (sortingCount > 0 && loopCount === 1) {
        result = "O(n log n) due to sorting";
        complexityType = "O(n log n)";
    } else if (logarithmicCount > 0) {
        result = "O(log n) due to logarithmic operations";
        complexityType = "O(log n)";
    } else if (nestedLoopDepth === 1) {
        result = "O(n) due to a single loop";
        complexityType = "O(n)";
    } else if (nestedLoopDepth === 2) {
        result = "O(n^2) due to nested loops";
        complexityType = "O(n^2)";
    } else if (nestedLoopDepth > 2) {
        result = `O(n^x) where x = ${nestedLoopDepth} due to deeply nested loops`;
        complexityType = "O(n^x)"; // Symbolic representation
    } else {
        result = "O(1) - No significant loops, recursion, or complex operations detected";
    }

    document.getElementById("result").innerText = `Estimated Time Complexity: ${result}`;
    highlightComplexityLine(complexityType); // Highlight the selected line
}

// Initialize the chart on page load
window.onload = initializeComplexityChart;
