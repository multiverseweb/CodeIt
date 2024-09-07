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
        result = `O(n^${nestedLoopDepth}) due to deeply nested loops`;
        complexityType = `O(n^${nestedLoopDepth})`;
    } else {
        result = "O(1) - No significant loops, recursion, or complex operations detected";
    }

    document.getElementById("result").innerText = `Estimated Time Complexity: ${result}`;
    displayComplexityChart(complexityType);
}


function displayComplexityChart(complexityType) {
    const ctx = document.getElementById('complexityChart').getContext('2d');

    const n = Array.from({ length: 100 }, (_, i) => i + 1); // X-axis values (n)
    const complexities = {
        "O(1)": n.map(() => 1),
        "O(log n)": n.map(x => Math.log2(x)),
        "O(n)": n,
        "O(n log n)": n.map(x => x * Math.log2(x)),
        "O(n^2)": n.map(x => x * x),
        "O(2^n)": n.map(x => Math.pow(2, x))
    };

    const datasets = Object.keys(complexities).map((key) => ({
        label: key,
        data: complexities[key],
        borderColor: key === complexityType ? 'rgba(255, 170, 0, 0.756)' : 'white', // Line colors set to white
        borderWidth: key === complexityType ? 2 : 1,
        fill: false
    }));

    // Check if a chart already exists and destroy it
    if (window.complexityChart instanceof Chart) {
        window.complexityChart.destroy();
    }

    // Create a new chart
    window.complexityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: n,
            datasets: datasets
        },
        options: {
            responsive: false, // Disable automatic resizing
            maintainAspectRatio: false, // Disable maintaining aspect ratio
            scales: {
                y: {
                    type: 'linear',
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)' // Grid line color set to white
                    },
                    ticks: {
                        color: 'white' // Y-axis tick labels set to white
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'n',
                        color: 'white' // X-axis title set to white
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)' // Grid line color set to white
                    },
                    ticks: {
                        color: 'white' // X-axis tick labels set to white
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Time Complexities',
                    color: 'white' // Title color set to white
                },
                legend: {
                    labels: {
                        color: 'white' // Legend labels color set to white
                    }
                }
            }
        }
    });
}
