//list of cities
var cities = [
  "Pune",
  "Moradabad",
  "Dehradun",
  "Ujjain",
  "Vijaywada",
  "Rampur",
  "Sydney",
  "Aligarh",
  "Delhi",
  "Coimbatore",
  "Dibrugarh",
  "Varanasi",
  "New Delhi",
  "Chennai",
  "Riyadh",
  "Kolkata",
  "Mumbai",
  "Bauria",
  "Kochi",
  "Nagpur",
  "Ranchi",
  "Rohtak"
];


var map = L.map('map', {
  center: [22.7937, 77.9629],
  zoom: 4,
  zoomControl: false
});

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var redIcon = L.icon({
  iconUrl: 'https://img1.picmix.com/output/stamp/normal/2/5/4/3/873452_376bb.png',
  iconSize: [20, 20],
  iconAnchor: [12, 12],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Your OpenCage API Key here
const OPENCAGE_API_KEY = '3f55c6e93c2c4b19ae45f1fd5db12cfc';

// Function to get coordinates for a city and add a marker using OpenCage API
async function addMarker(city) {
  var url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${OPENCAGE_API_KEY}`;

  try {
      const response = await fetch(url);
      
      if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
      
      const data = await response.json();
      
      if (data.results.length > 0) {
          const lat = data.results[0].geometry.lat;
          const lon = data.results[0].geometry.lng;
          L.marker([lat, lon], { icon: redIcon }).addTo(map)
            .bindPopup(city);
      } else {
          console.log("No results found for " + city);
      }
  } catch (error) {
      console.error("Error fetching coordinates for " + city + ": " + error);
  }
}

// Function to add markers with a delay to respect API limits
async function addMarkersWithDelay(cities) {
  for (let i = 0; i < cities.length; i++) {
      await addMarker(cities[i]);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay between requests
  }
}

// Call the function to add markers
addMarkersWithDelay(cities);

// Scroll to the top of the page
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Change CSS based on scroll position
function changeCss() {
  var top = document.getElementById("top");
  var scroll_icon = document.getElementById("scroll_icon");
  this.scrollY > 30 ? (top.style.opacity = 1) : (top.style.opacity = 0);
  this.scrollY > 0
    ? (scroll_icon.style.opacity = 0)
    : (scroll_icon.style.opacity = 1);
}

let lastScroll = 0;
function progress() {
  var scroll = this.scrollY;
  var scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var percent = Math.round((scroll / scrollHeight) * 100);
  document.getElementById("progress_bar").style.width = percent + "vw";
}

window.addEventListener("scroll", progress);

// Attach scroll event listener
window.addEventListener("scroll", changeCss, false);


// Function to validate feedback form
function feedbackVerify() {
  document.getElementById("feedback").addEventListener("submit", (event) => {
    event.preventDefault();

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    if (name === "") {
      document.getElementById("nameError").textContent = "Name is required";
      isValid = false;
    }
    if (email === "") {
      document.getElementById("emailError").textContent = "Email is required";
      isValid = false;
    }
    if (message === "") {
      document.getElementById("messageError").textContent =
        "Message is required";
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted successfully!");
    }
  });
}

// Call the feedbackVerify function to set up the event listener
feedbackVerify();

function checkFeedbackLength(input) {
  var errorSpan = document.getElementById("feedbackError");
  if (input.value.length < 10) {
    errorSpan.style.opacity = "100%";
    input.setCustomValidity("Feedback must be at least 10 characters long.");
  } else {
    errorSpan.style.opacity = "0%";
    input.setCustomValidity("");
  }
}

function validateFeedback() {
  var feedback = document.forms["CodeIt Reviews"]["Feedback"];
  checkFeedbackLength(feedback);
  return feedback.value.length >= 10;
}

window.embeddedChatbotConfig = {
  chatbotId: "pevr_-Kc8RpvaFvi07iVN",
  domain: "www.chatbase.co",
};

document.getElementById("copyright").textContent = new Date().getFullYear();
