// Initialize clicks and load saved session data if available
var clicks = 0;

function loadSessionData() {
	// Load clicks from localStorage, if it exists, otherwise start at 0
	const savedClicks = localStorage.getItem('clicks');
	clicks = savedClicks ? parseInt(savedClicks, 10) : 0;
	document.getElementById('stat-clicks').innerText = `Clicks: ${clicks}`;
}

function saveSessionData() {
	// Save current clicks to localStorage
	localStorage.setItem('clicks', clicks);
}

// Function to update click text and save to session data
function updateClicks() {
	const clickText = document.getElementById('stat-clicks');
	clicks += 1;
	clickText.innerText = `Clicks: ${clicks}`;
	saveSessionData();
}

// Ensure the page is loaded before accessing elements
document.addEventListener("DOMContentLoaded", function () {
	loadSessionData();
	const button = document.getElementById('button');
	button.addEventListener('click', updateClicks);
});