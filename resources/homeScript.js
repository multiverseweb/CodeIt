//list of cities
var cities = ["Pune", "Moradabad", "Dehradun","Ujjain","Vijaywada","Rampur","Sydney","Aligarh"];

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  function changeCss() {
    var top = document.getElementById("top");
    var scroll_icon = document.getElementById("scroll_icon");
    (this.scrollY > 30 && this.scrollY < 2450) ? top.style.opacity = 1 : top.style.opacity = 0;
    (this.scrollY > 0) ? scroll_icon.style.opacity = 0 : scroll_icon.style.opacity = 1;
  }
  
  window.addEventListener("scroll", changeCss, false);
  
  
var map = L.map('map', {
  center: [23.7937, 80.9629],
  zoom: 5,
  zoomControl: false
});
// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var redIcon = L.icon({
  iconUrl: 'https://img1.picmix.com/output/stamp/normal/2/5/4/3/873452_376bb.png',
  iconSize: [25, 25],
  iconAnchor: [12, 12],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Function to get coordinates for a city and add a marker
function addMarker(city) {
  var url = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        L.marker([lat, lon], { icon: redIcon }).addTo(map)
          .bindPopup(city);
      } else {
        console.log("No results found for " + city);
      }
    })
    .catch(error => console.error("Error fetching coordinates for " + city + ": " + error));
}

// Add markers for each city
cities.forEach(city => addMarker(city));
  
function validateForm() { 
  const name = document.querySelector('input[name="Name"]').value.trim();
  const email = document.querySelector('input[name="Email"]').value.trim();
  const message = document.querySelector('textarea[name="Message"]').value.trim();

  // console.log("Name:", name);
  // console.log("Email:", email);
  // console.log("Message:", message);

  if (!name) {
      alert("Please enter your name.");
      return false;
  }
  if (!email) {
      alert("Please enter your email.");
      return false;
  }
  if (!message) {
      alert("Please enter your message.");
      return false;
  }
  
  return true; 
}