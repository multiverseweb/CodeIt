console.log("Tejas' Codes :D");
const highlight = document.querySelector(".highlight");
const navItems = document.querySelectorAll(".nav-item");

document
  .getElementById("darkThemeBtn")
  .addEventListener("click", enableDarkTheme);
document
  .getElementById("lightThemeBtn")
  .addEventListener("click", enableLightTheme);

navItems.forEach((item) => {
  item.addEventListener("mouseover", function () {
    const itemRect = item.getBoundingClientRect();
    const tableRect = item.closest("table").getBoundingClientRect(); // Get the table's bounding box

    // Adjust the highlight position and width based on the table's position
    highlight.style.width = `${itemRect.width}px`;
    highlight.style.left = `${itemRect.left}px`;
    highlight.style.top = `${itemRect.top - tableRect.top}px`;
  });
});

document.querySelector(".navbar").addEventListener("mouseleave", () => {
  highlight.style.width = "0";
});
function enableLightTheme() {
  console.log("in light");
  saveTheme("light");

  const sidebar = document.getElementById("sidebar");
  const sidebar2 = document.getElementById("sidebar2");
  const mainBody = document.body;  // Main body reference

  // Update icons for light theme
  document
    .querySelectorAll(".material-symbols-outlined")
    .forEach((icon) => icon.classList.add("light-theme"));

  // Update sidebar
  if (sidebar) {
    sidebar.classList.remove("dark");
    sidebar.classList.add("light");
    const closeButton = sidebar.querySelector(".close-btn");
    if (closeButton) {
      closeButton.style.color = "#000000";
    }
  }

  // Update second sidebar
  if (sidebar2) {
    sidebar2.classList.remove("dark");
    sidebar2.classList.add("light");
    const closeButton2 = sidebar2.querySelector(".close-btn");
    if (closeButton2) {
      closeButton2.style.color = "#000000";
    }
  }

  // Update the main body background and text colors
  if (mainBody) {
    mainBody.style.backgroundColor = "#ffffff";  // Light background
    mainBody.style.color = "#000000";            // Dark text
  }

  toggleThemeBtn("light");
  updateChartColors(false);
}

function enableDarkTheme() {
  console.log("inDark");
  saveTheme("dark");

  const sidebar = document.getElementById("sidebar");
  const sidebar2 = document.getElementById("sidebar2");
  const mainBody = document.body;  // Main body reference

  // Update icons for dark theme
  document
    .querySelectorAll(".material-symbols-outlined")
    .forEach((icon) => icon.classList.remove("light-theme"));

  // Update sidebar
  if (sidebar) {
    sidebar.classList.remove("light");
    sidebar.classList.add("dark");
    const closeButton = sidebar.querySelector(".close-btn");
    if (closeButton) {
      closeButton.style.color = "#ffffff";
    }
  }

  // Update second sidebar
  if (sidebar2) {
    sidebar2.classList.remove("light");
    sidebar2.classList.add("dark");
    const closeButton2 = sidebar2.querySelector(".close-btn");
    if (closeButton2) {
      closeButton2.style.color = "#ffffff";
    }
  }

  // Update the main body background and text colors
  if (mainBody) {
    mainBody.style.backgroundColor = "#000000";  // Dark background
    mainBody.style.color = "#ffffff";            // Light text
  }

  toggleThemeBtn("dark");
  updateChartColors(true);
}

function toggleThemeBtn(currentTheme) {
  const darkThemeBtn = document.getElementById("darkThemeBtn");
  const lightThemeBtn = document.getElementById("lightThemeBtn");

  if (currentTheme === "dark") {
    darkThemeBtn.style.display = "none";
    lightThemeBtn.style.display = "block";
  } else {
    darkThemeBtn.style.display = "block";
    lightThemeBtn.style.display = "none";
  }
}

function saveTheme(theme) {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}

function applyTheme() {
  const savedTheme = localStorage.getItem("theme");
  console.log(savedTheme);
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (savedTheme === "dark") {
      enableDarkTheme();
    } else {
      enableLightTheme();
    }
  }
}

window.onload = applyTheme;

function updateChartColors(isDark) {
  if (typeof Chart !== "undefined" && Chart.instances[0]) {
    const chart = Chart.instances[0];
    const textColor = isDark ? "white" : "black";

    chart.options.scales.x.ticks.color = textColor;
    chart.options.scales.y.ticks.color = textColor;
    chart.options.plugins.legend.labels.color = textColor;
    chart.update();
  }
}

window.onload = applyTheme;

function copylink() {
  navigator.clipboard
    .writeText("https://codeittool.netlify.app/")
    .then(() => {
      const linkElement = document.getElementById("link");

      // Temporarily change the content to the checkmark ✓
      linkElement.innerHTML = "✓&nbsp;&nbsp;";

      // After 2 seconds, change it back to the original image
      setTimeout(() => {
        linkElement.innerHTML = `<img src="https://icons.veryicon.com/png/o/miscellaneous/foundation-icon-5/link-86.png" alt="">`;
      }, 2000);
    })
    .catch((err) => alert("Copy failed: ", err));
}

function copied(elementId) {
  const element = document.getElementById(elementId);
  const originalText = element.innerHTML;
  const originalWidth = element.offsetWidth;
  element.innerHTML = "Copied!";
  element.style.width = `${originalWidth}px`;
  setTimeout(() => {
    element.innerHTML = originalText;
    element.style.width = "";
  }, 1500);
}

function clearText() {
  const input_code = document.getElementById("input_code");
  if (input_code) {
    input_code.value = "";
    output_code.value = "";
  }
  const normal_code = document.getElementById("normal_code");
  if (normal_code) {
    normal_code.value = "";
    obfuscated_code.value = "";
  }
  const time_code = document.getElementById("time_code");
  if (time_code) {
    time_code.value = "";
  }
}



let sidebarOpen = false;
let currentSidebar = null;

function toggleSidebar(sidebarId) {
  const sidebar = document.getElementById(sidebarId);
  const navbar = document.querySelector(".navbar");

  if (!sidebar) {
    console.error("Sidebar element not found.");
    return;
  }

  if (!navbar) {
    console.error("Navbar element not found.");
    return;
  }

  // Close any currently open sidebar
  if (currentSidebar && currentSidebar !== sidebar) {
    currentSidebar.style.width = "0";
    currentSidebar.classList.remove("show");
  }

  sidebarOpen = !sidebarOpen;
  if (sidebarOpen) {
    sidebar.classList.add("show");
    sidebar.style.width = "250px";
    navbar.style.display = "none";
    document.querySelector(".hamburger").style.display = "none";
    document.querySelector(".hamburger2").style.display = "none";
  } else {
    sidebar.style.width = "0";
    navbar.style.display = "block";
    document.querySelector(".hamburger").style.display = "block";
    document.querySelector(".hamburger2").style.display = "block";
    sidebar.classList.remove("show");
  }

  // Store the currently active sidebar
  currentSidebar = sidebar;
}


const sidebarLinks = document.querySelectorAll("#sidebar a");
sidebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebarOpen = false;
    document.getElementById("sidebar").style.width = "0";
    document.querySelector(".hamburger").style.display = "block";
  });
});
function checkScreenSize() {
  const sidebar = document.getElementById("sidebar");
  if (window.innerWidth > 400) {
    sidebar.style.width = "0";
    sidebarOpen = false;
    document.querySelector(".navbar").style.display = "block";
    document.querySelector(".hamburger").style.display = "none";
  } else {
    document.querySelector(".hamburger").style.display = "block";
  }
}

window.addEventListener("resize", checkScreenSize);
window.addEventListener("load", checkScreenSize);

checkScreenSize();
