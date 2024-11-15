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
	document.getElementById('stat-cpc').innerText = `Clicks per Click: ${clicksPerClick}`;

	// Load Upgrades
	// Cat Upgrades
	const savedCatUpgradeLevel = localStorage.getItem('catUpgrade');
	catUpgradeLevel = savedCatUpgradeLevel ? parseInt(savedCatUpgradeLevel, 10) : 0;

	const savedCatUpgradeCost = localStorage.getItem('catUpgradeCost');
	catUpgradeCost = savedCatUpgradeCost ? parseInt(savedCatUpgradeCost, 10) : 100;
	document.getElementById('cat-upgrade').innerHTML = `<span>Cost: ${catUpgradeCost}<br>Purchase</span>`

	// Cat Friend Upgrades
	const savedCatFriendUpgradeLevel = localStorage.getItem('catFriendUpgrade');
	catFriendUpgradeLevel = savedCatFriendUpgradeLevel ? parseInt(savedCatFriendUpgradeLevel, 10) : 0;
}

function saveSessionData() {
	// Save current clicks to localStorage
	localStorage.setItem('clicks', clicks);
	localStorage.setItem('clicksPerClick', clicksPerClick);

	// Save upgrades
	localStorage.setItem('catUpgrade', catUpgradeLevel);
	localStorage.setItem('catFriendUpgrade', catFriendUpgradeLevel);
	localStorage.setItem('catUpgradeCost', catUpgradeCost);
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

// Live game functions

function decreaseClicks() {
	decreaseBy = 2;
	clicks -= decreaseBy;
	document.getElementById('stat-clicks').innerText = `Clicks: ${clicks}`;
	localStorage.setItem('clicks', clicks);
}



// Upgrade Event Listeners



// Cat Upgrade

const catUpgrade = document.getElementById('cat-upgrade');
let catUpgradeLevel = 0;
let catUpgradeCost = 100;  // Change to 'let' to allow updating

// Function to update cat upgrade
function updateCatUpgrade() {
	clicks -= catUpgradeCost;
	catUpgradeLevel += 1;
	catUpgradeCost = Math.round(catUpgradeCost * 1.11);  // Round cost to nearest integer
	catUpgrade.innerHTML = `<span>Cost: ${catUpgradeCost}<br>Purchase</span>`;
	document.getElementById('stat-clicks').innerText = `Clicks: ${clicks}`;
	checkUpgradeAvailability();  // Recheck availability after upgrade
}

// Function to check if upgrade can be purchased
function checkUpgradeAvailability() {
	if (catUpgradeLevel < 10) {
		if (clicks >= catUpgradeCost) {
			catUpgrade.classList.remove('disabled');
			catUpgrade.addEventListener('click', updateCatUpgrade);
		} else {
			catUpgrade.classList.add('disabled');
			catUpgrade.removeEventListener('click', updateCatUpgrade);
		}
	} else {
		catUpgrade.classList.add('disabled');
		catUpgrade.removeEventListener('click', updateCatUpgrade);
	}
}

// Periodically check availability every 100ms
setInterval(checkUpgradeAvailability, 100);

// Cat, Cat's Friend Upgrade

const catFriendUpgrade = document.getElementById('cat-friend-upgrade');
var catFriendUpgradeLevel = 0;



//

// Set Interval

function callAllNecessary() {
	// decreaseClicks();
}

setInterval(callAllNecessary, 1000)