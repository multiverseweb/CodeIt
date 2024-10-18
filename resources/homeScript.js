//list of cities
var cities = ["Pune", "Moradabad", "Dehradun","Ujjain","Vijaywada","Rampur","Sydney","Aligarh","Delhi","Coimbatore","Dibrugarh","Varanasi","New Delhi","Chennai"];

// Scroll to the top of the page
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Change CSS based on scroll position
function changeCss() {
    var top = document.getElementById("top");
    var scroll_icon = document.getElementById("scroll_icon");
    (this.scrollY > 30 && this.scrollY < 2450) ? top.style.opacity = 1 : top.style.opacity = 0;
    (this.scrollY > 0) ? scroll_icon.style.opacity = 0 : scroll_icon.style.opacity = 1;
}

// Attach scroll event listener
window.addEventListener("scroll", changeCss, false);

// Initialize the map
var map = L.map('map', {
    center: [23.7937, 80.9629],
    zoom: 5,
    zoomControl: false
});

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Red marker icon
var redIcon = L.icon({
    iconUrl: 'https://img1.picmix.com/output/stamp/normal/2/5/4/3/873452_376bb.png',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Function to get coordinates for a city and add a marker
async function addMarker(city) {
    var url = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'YourAppName/1.0' // Replace with your app name
            }
        });

        // Check if the response is OK (status code 200)
        if (!response.ok) {
            console.error(`Error fetching coordinates for ${city}: ${response.statusText}`);
            return;
        }

        const data = await response.json();

        if (data.length > 0) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            L.marker([lat, lon], { icon: redIcon }).addTo(map)
              .bindPopup(city);
        } else {
            console.log("No results found for " + city);
        }
    } catch (error) {
        console.error("Error fetching coordinates for " + city + ": " + error);
    }
}

// Add markers for each city with a delay
(async function addMarkers() {
    for (const city of cities) {
        await addMarker(city);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before the next request
    }
})();

// Function to validate feedback form
function feedbackVerify() {
    document.getElementById('feedback').addEventListener('submit', (event) => {
        event.preventDefault();

        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('messageError').textContent = '';

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        if (name === '') {
            document.getElementById('nameError').textContent = "Name is required";
            isValid = false;
        }
        if (email === '') {
            document.getElementById('emailError').textContent = "Email is required";
            isValid = false;
        }
        if (message === '') {
            document.getElementById('messageError').textContent = "Message is required";
            isValid = false;
        }

        if (isValid) {
            alert('Form submitted successfully!');
        }
    });
}

// Call the feedbackVerify function to set up the event listener
feedbackVerify();
