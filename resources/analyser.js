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
  }));

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

// Function to send code for complexity analysis and handle the result
function analyzeTimeComplexity() {
  const code = document.getElementById("time_code").value;

  fetch('http://localhost:5000/analyze', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: code }),  // Send code to the server
  })
  .then(response => response.json())
  .then(data => {
      // Display the result from the backend
      document.getElementById("result").innerText = `Estimated Time Complexity: ${data.complexity}`;
      highlightComplexityLine(data.complexity); // Highlight the line in the chart
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

// Highlight the correct complexity line on the chart
function highlightComplexityLine(complexityType) {
  const datasets = window.complexityChart.data.datasets;
  datasets.forEach((dataset) => {
    dataset.borderColor = "white"; // Reset all lines to white
    dataset.borderWidth = 1; // Reset all lines to normal width
    dataset.pointRadius = 0; // Hide markers

    if (dataset.label === complexityType) {
      dataset.borderColor = "rgba(255, 170, 0, 0.756)"; // Highlight selected line
      dataset.borderWidth = 2; // Make the highlighted line thicker
    }
  });

  window.complexityChart.update(); // Update the chart to apply changes
}

// Initialize the chart on page load
document.addEventListener("DOMContentLoaded", function () {
  initializeComplexityChart();
});
