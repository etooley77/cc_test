// Initialize clicks and load saved session data if available
var clicksPerClick = 1;
var clicks = 0;

// Extra clicks

const extraClickButton = document.getElementById('extra-clicks');
if (extraClickButton.classList.contains('visible-link')) {
	pass;
} else {
	extraClickButton.addEventListener(
		'click',
		function () {
			extraClickButton.classList.remove('hidden-link');
			extraClickButton.classList.add('visible-link');
			clicksPerClick = 5;
			document.getElementById('stat-cpc').innerText = `Clicks per Click: ${clicksPerClick}`
		}
	);
};

//

function loadSessionData() {
	// Load clicks from localStorage, if it exists, otherwise start at 0
	const savedClicks = localStorage.getItem('clicks');
	clicks = savedClicks ? parseInt(savedClicks, 10) : 0;
	document.getElementById('stat-clicks').innerText = `Clicks: ${clicks}`;
	// Load clicksPerClick
	const savedClicksPerClick = localStorage.getItem('clicksPerClick');
	clicksPerClick = savedClicksPerClick ? parseInt(savedClicksPerClick, 10) : 1;
	document.getElementById('stat-cpc').innerText = `Clicks per Click: ${clicksPerClick}`
}

function saveSessionData() {
	// Save current clicks to localStorage
	localStorage.setItem('clicks', clicks);
	localStorage.setItem('clicksPerClick', clicksPerClick);
}

// Function to update click text and save to session data
function updateClicks() {
	const clickText = document.getElementById('stat-clicks');
	clicks += clicksPerClick;
	clickText.innerText = `Clicks: ${clicks}`;
	saveSessionData();
}

// Ensure the page is loaded before accessing elements
document.addEventListener("DOMContentLoaded", function () {
	loadSessionData();
	const button = document.getElementById('button');
	button.addEventListener('click', updateClicks);
});

// Upgrade Event Listeners

const upgrade1 = document.getElementById('upgrade1');


// Live game functions

function decreaseClicks() {
	decreaseBy = 2;
	clicks -= decreaseBy;
	document.getElementById('stat-clicks').innerText = `Clicks: ${clicks}`;
	localStorage.setItem('clicks', clicks);
}

setInterval(decreaseClicks, 1000)