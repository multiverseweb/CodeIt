// Function to get the count from localStorage or initialize it
function getVisitorCount() {
    return parseInt(localStorage.getItem('visitorCount')) || 0; // Ensure it's an integer
}

// Function to increment and save the count
function incrementVisitorCount() {
    let count = getVisitorCount() + 1; // Increment the count
    localStorage.setItem('visitorCount', count); // Save it to localStorage
    return count; // Return the updated count
}

// Function to display the count
function displayVisitorCount() {
    const usageCountElement = document.getElementById('count'); // Element for usage count

    const count = incrementVisitorCount(); // Increment and get the count
    usageCountElement.textContent = count; // Update the displayed count
}

// Call the display function when the page loads
document.addEventListener('DOMContentLoaded', displayVisitorCount);
