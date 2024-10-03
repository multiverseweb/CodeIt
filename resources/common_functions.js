console.log("Tejas' Codes :D");

const highlight = document.querySelector(".highlight");
const navItems = document.querySelectorAll(".nav-item");

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

function light() {
  document.getElementById("themeLogo").src = "../images/sun.png";
  document.getElementById("themeLogo").style.filter = "invert(0)";
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
  document.getElementById("link").style.filter = "invert(1)";
  document.getElementById("link2").style.filter = "invert(0)";
  document.getElementById("body").style.backgroundColor = "rgb(220, 220, 220)";
  const button = document.getElementById("theme");
  saveTheme('light')
  button.onclick = dark;
  updateChartColors(false);
}

function dark() {
  document.getElementById("themeLogo").src = "../images/moon.png";
  document.getElementById("themeLogo").style.filter = "invert(1)";
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
      "linear-gradient(115deg, #00000000,rgba(30,30,30, 0.888),rgba(30,30,30, 0.888),#00000000)";
  }
  document.getElementById("link").style.filter = "invert(0)";
  document.getElementById("link2").style.filter = "invert(1)";
  document.getElementById("body").style.backgroundColor =
    "rgba(0, 0, 0, 0.888)";
  saveTheme('dark')
  const button = document.getElementById("theme");
  button.onclick = light;
  updateChartColors(true);
}

function saveTheme(theme){
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme)
}

function applyTheme(){
  const savedTheme = localStorage.getItem('theme');
  console.log(savedTheme)
  if(savedTheme){
    document.documentElement.setAttribute('data-theme', savedTheme);
    if(savedTheme === 'dark'){
      dark();
    }else{
      light();
    }
  }
}

function updateChartColors(isDark) {
  if (typeof Chart !== 'undefined' && Chart.instances[0]) {
    const chart = Chart.instances[0];
    const textColor = isDark ? 'white' : 'black';
    
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
