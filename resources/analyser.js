// Initialize the chart with all lines displayed and markers hidden
function initializeComplexityChart() {
  const ctx = document.getElementById("complexityChart").getContext("2d");

  const n = Array.from({ length: 100 }, (_, i) => i + 1); // X-axis values (n)
  const complexities = {
    "O(1)": n.map(() => 1),
    "O(log n)": n.map((x) => Math.log2(x)),
    "O(n)": n,
    "O(n log n)": n.map((x) => x * Math.log2(x)),
    "O(n^2)": n.map((x) => x * x),
    "O(2^n)": n.map((x) => Math.pow(2, x)),
    "O(n^x)": n.map(() => null), // Symbolic complexity, no actual values
  };

  const datasets = Object.keys(complexities).map((key) => ({
    label: key,
    data: complexities[key],
    borderColor: "white", // All lines set to white initially
    borderWidth: 1,
    fill: false,
    pointRadius: 0, // Hide the markers
    hidden: false, // Show all lines initially
  }));

  // Create the chart instance
  window.complexityChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: n,
      datasets: datasets,
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        y: {
          type: "linear",
          beginAtZero: true,
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "white",
          },
        },
        x: {
          title: {
            display: true,
            text: "n",
            color: "white",
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "white",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Time Complexities",
          color: "white",
        },
        legend: {
          labels: {
            color: "white",
          },
        },
      },
    },
  });
}

// Function to analyze time complexity and display only the corresponding graph
function analyzeTimeComplexity() {
  const code = document.getElementById("time_code").value;
  const codeLines = code.split("\n");

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
    } else if (line === "") {
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
    complexityType = "O(n^x)";
  } else {
    result = "O(1) - No significant loops, recursion, or complex operations detected";
  }

  // Update the chart to only display the selected time complexity
  const datasets = window.complexityChart.data.datasets;
  datasets.forEach((dataset) => {
    dataset.hidden = dataset.label !== complexityType;
  });

  window.complexityChart.update(); // Update the chart to reflect changes

  // Display the result in the 'result' paragraph element
  document.getElementById("result").innerText = `Estimated Time Complexity: ${result}`;

  // Create a custom alert message
  const alertBox = document.createElement("div");
  alertBox.classList.add("alert-box");
  alertBox.innerHTML = `
    <div class="alert-content">
      <h2>Time Complexity Analysis</h2>
      <p>Result: ${result}</p>
    </div>
  `;
  document.body.appendChild(alertBox);

  // Add a timeout to remove the alert message after 3 seconds
  setTimeout(() => {
    alertBox.remove();
  }, 3300);
}

// Initialize the chart on page load
document.addEventListener("DOMContentLoaded", function () {
  initializeComplexityChart();
});
