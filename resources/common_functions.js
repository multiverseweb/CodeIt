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
    const tableRect = item.closest("table").getBoundingClientRect();

    highlight.style.width = `${itemRect.width}px`;
    highlight.style.left = `${itemRect.left}px`;
    highlight.style.top = `${itemRect.top - tableRect.top}px`;
    highlight.style.backgroundColor="white";
  });
});

document.querySelector(".navbar").addEventListener("mouseleave", () => {
  highlight.style.width = "0";
});

function applyThemeToSidebar(sidebarId, theme) {
  const sidebar = document.getElementById(sidebarId);
  if (!sidebar) return;

  sidebar.classList.remove("dark", "light");
  sidebar.classList.add(theme);

  const closeButton = sidebar.querySelector(".close-btn");
  if (closeButton) {
    closeButton.style.color = theme === "dark" ? "#ffffff" : "#000000";
  }
}

function enableLightTheme() {
  console.log("in light");
  saveTheme("light");
  document.querySelector(".top-elements").style.filter="invert(1)";
  document.querySelector(".logo").style.filter="invert(1)";

  const input_code = document.getElementById("input_code");
  if (input_code) {
    input_code.style.color = "#0b6100";
    document.getElementById("output_code").style.color = "#002d8f";
    document.getElementById("submit").style.filter = "invert(1)";
  } else {
    const normal_code = document.getElementById("normal_code");
    if (normal_code) {
      normal_code.style.color = "#0b6100";
      document.getElementById("obfuscated_code").style.color = "#002d8f";
    }
  }
  const time_code = document.getElementById("time_code");
  if (time_code) {
    time_code.style.color = "#0b6100";
  }
  const heading = document.getElementById("heading");
  if (heading) {
    document.getElementById("body").style.color = "rgba(0,0,0, 0.866)";
    document.getElementById("shadow").style.backgroundImage =
      "linear-gradient(115deg, #00000000,rgb(220, 220, 220),#00000000)";
  }
  document.getElementById("body").style.backgroundColor = "rgb(220, 220, 220)";

  // Apply light theme to both sidebars
  applyThemeToSidebar("sidebar", "light");
  applyThemeToSidebar("sidebar2", "light");

  toggleThemeBtn("light");
  updateChartColors(false);
}

function enableDarkTheme() {
  console.log("inDark");
  saveTheme("dark");
  document.querySelector(".top-elements").style.filter="invert(0)";
  document.querySelector(".logo").style.filter="invert(0)";

  const input_code = document.getElementById("input_code");
  if (input_code) {
    input_code.style.color = "rgba(255, 170, 0, 0.756)";
    document.getElementById("output_code").style.color = "rgba(0,0,0,1)";
    document.getElementById("submit").style.filter = "invert(0)";
  } else {
    const normal_code = document.getElementById("normal_code");
    if (normal_code) {
      normal_code.style.color = "rgba(255, 170, 0, 0.756)";
      document.getElementById("obfuscated_code").style.color =
        "rgba(0, 255, 204, 0.619)";
    }
  }
  const time_code = document.getElementById("time_code");
  if (time_code) {
    time_code.style.color = "rgba(255, 170, 0, 0.756)";
  }
  const heading = document.getElementById("heading");
  if (heading) {
    document.getElementById("body").style.color = "rgba(255, 255, 255, 0.866)";
    document.getElementById("shadow").style.backgroundImage =
      "linear-gradient(115deg, #00000000,#191919,#00000000)";
  }
  document.getElementById("body").style.backgroundColor =
    "rgba(0, 0, 0, 0.888)";
  document.getElementById("body").style.backgroundColor ="rgba(0, 0, 0, 0.90)";

  // Apply dark theme to both sidebars
  applyThemeToSidebar("sidebar", "dark");
  applyThemeToSidebar("sidebar2", "dark");

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

      linkElement.innerHTML = "✓&nbsp;&nbsp;";

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
let sidebarOpen2 = false;


function toggleSidebar(sidebarId) {
  const sidebar = document.getElementById(sidebarId);
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");

  if (!sidebar) {
      console.error("Sidebar element not found.");
      return;
  }

  // Toggle each sidebar independently
  if (sidebarId === 'sidebar') {
      if (sidebarOpen) {
          // Close sidebar1
          sidebar.style.width = "0";
          sidebarOpen = false;
          navbar.style.display = "block";
          hamburger.style.display = "block";
      } else {
          // Open sidebar1
          sidebar.style.width = "250px";
          sidebarOpen = true;
          navbar.style.display = "none";
          hamburger.style.display = "none";
          if (sidebarOpen2) {
              // Close sidebar2 if it's open
              document.getElementById('sidebar2').style.width = "0";
              sidebarOpen2 = false;
          }
      }
  } else if (sidebarId === 'sidebar2') {
      if (sidebarOpen2) {
          // Close sidebar2
          sidebar.style.width = "0";
          sidebarOpen2 = false;
          navbar.style.display = "block";
          hamburger.style.display = "block";
      } else {
          // Open sidebar2
          sidebar.style.width = "250px";
          sidebarOpen2 = true;
          navbar.style.display = "none";
          hamburger.style.display = "none";
          if (sidebarOpen) {
              // Close sidebar1 if it's open
              document.getElementById('sidebar').style.width = "0";
              sidebarOpen = false;
          }
      }
  }
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
  if (window.innerWidth > 400) {
    // Close any open sidebar on larger screens
    document.getElementById('sidebar1').style.width = "0";
    document.getElementById('sidebar2').style.width = "0";
    sidebarOpen = false;
    sidebarOpen2 = false;
    document.querySelector(".navbar").style.display = "block";
    document.querySelector(".hamburger").style.display = "none";
  } else {
    // Show the hamburger icon on smaller screens
    document.querySelector(".hamburger").style.display = "block";
  }
}

window.addEventListener("resize", checkScreenSize);
window.addEventListener("load", checkScreenSize);

checkScreenSize();
