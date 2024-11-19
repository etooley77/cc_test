// Initialize clicks and load saved session data if available
var clicksPerClick = 1;
var clicks = 0;

var autoClicksPerSecond = 0;

var upgradeMultiplier = 0;

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

	// Load autoClicksPerSecond
	const savedAutoClicksPerSecond = localStorage.getItem('autoClicksPerSecond');
	autoClicksPerSecond = savedAutoClicksPerSecond ? parseInt(savedAutoClicksPerSecond, 10) : 0;
	document.getElementById('stat-acps').innerText = `Auto Clicks per Second: ${autoClicksPerSecond}`;

	// Load Upgrades
	// Cat Upgrades
	const savedCatUpgradeLevel = localStorage.getItem('catUpgradeLevel');
	catUpgradeLevel = savedCatUpgradeLevel ? parseInt(savedCatUpgradeLevel, 10) : 0;

	const savedCatUpgradeCost = localStorage.getItem('catUpgradeCost');
	catUpgradeCost = savedCatUpgradeCost ? parseInt(savedCatUpgradeCost, 10) : 100;
	document.getElementById('cat-upgrade').innerHTML = `<span>Cost: ${catUpgradeCost}<br>Purchase</span>`

	// Cat Friend Upgrades
	const savedMeatballMolesterUpgradeLevel = localStorage.getItem('MeatballMolesterUpgradeLevel');
	MeatballMolesterUpgradeLevel = savedMeatballMolesterUpgradeLevel ? parseInt(savedMeatballMolesterUpgradeLevel, 10) : 0;

	const savedMeatballMolesterUpgradeCost = localStorage.getItem('MeatballMolesterUpgradeCost');
	MeatballMolesterUpgradeCost = savedMeatballMolesterUpgradeCost ? parseInt(savedMeatballMolesterUpgradeCost, 10) : 500;
	document.getElementById('cat-friend-upgrade').innerHTML = `<span>Cost: ${MeatballMolesterUpgradeCost}<br>Purchase</span`
}

function saveSessionData() {
	// Save current clicks to localStorage
	localStorage.setItem('clicks', clicks);
	localStorage.setItem('clicksPerClick', clicksPerClick);

	localStorage.setItem('autoClicksPerSecond', autoClicksPerSecond)

	// Save upgrades
	localStorage.setItem('catUpgradeLevel', catUpgradeLevel);
	localStorage.setItem('catUpgradeCost', catUpgradeCost);

	localStorage.setItem('MeatballMolesterUpgradeLevel', MeatballMolesterUpgradeLevel);
	localStorage.setItem('MeatballMolesterUpgradeCost', MeatballMolesterUpgradeCost);
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

function autoClicks() {
	increaseBy = autoClicksPerSecond;
	clicks += increaseBy;
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
	catUpgradeCost = Math.round(catUpgradeCost * 1.11);
	catUpgrade.innerHTML = `<span>Cost: ${catUpgradeCost}<br>Purchase</span>`;
	document.getElementById('stat-clicks').innerText = `Clicks: ${clicks}`;

	// Add to autoClicksPerSecond
	autoClicksPerSecond += 5;
	document.getElementById('stat-acps').innerText = `Auto Clicks per Second: ${autoClicksPerSecond}`

	saveSessionData();
	checkCatUpgradeAvailability();  // Recheck availability after upgrade
}

// Function to check if upgrade can be purchased
function checkCatUpgradeAvailability() {
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
setInterval(checkCatUpgradeAvailability, 100);

// Meatball Molester Upgrade

const MeatballMolesterUpgrade = document.getElementById('cat-friend-upgrade');
let MeatballMolesterUpgradeLevel = 0;
let MeatballMolesterUpgradeCost = 500;

function updateMeatballMolesterUpgrade() {
	clicks -= MeatballMolesterUpgradeCost;
	MeatballMolesterUpgradeLevel += 1;
	MeatballMolesterUpgradeCost = Math.round(MeatballMolesterUpgradeCost * 1.11);
	MeatballMolesterUpgrade.innerHTML = `<span>Cost: ${MeatballMolesterUpgradeCost}<br>Purchase</span>`;
	document.getElementById('stat-clicks').innerText = `Clicks: ${clicks}`;

	// Add to autoClicksPerSecond
	autoClicksPerSecond += 15;
	document.getElementById('stat-acps').innerText = `Auto Clicks per Second: ${autoClicksPerSecond}`;

	saveSessionData();
	checkMeatballMolesterUpgradeAvailability();
};

function checkMeatballMolesterUpgradeAvailability() {
	if (MeatballMolesterUpgradeLevel < 10) {
		if (clicks >= MeatballMolesterUpgradeCost) {
			MeatballMolesterUpgrade.classList.remove('disabled');
			MeatballMolesterUpgrade.addEventListener('click', updateMeatballMolesterUpgrade);
		} else {
			MeatballMolesterUpgrade.classList.add('disabled');
			MeatballMolesterUpgrade.removeEventListener('click', updateMeatballMolesterUpgrade);
		};
	} else {
		MeatballMolesterUpgrade.classList.add('disabled');
		MeatballMolesterUpgrade.removeEventListener('click', updateMeatballMolesterUpgrade);
	};
};

// Check availibility
setInterval(checkMeatballMolesterUpgradeAvailability, 100);

// Dev Utility Functions

// resetUpgrades() resets the game for development purposes
function resetUpgrades() {
	// Resets click count and click bonuses to 0 and 1 respectively
	localStorage.setItem('clicks', 0);
	localStorage.setItem('clicksPerClick', 1);

	// Resets all upgrade effects
	localStorage.setItem('autoClicksPerSecond', 0);

	// Resets all upgrades to original level and cost
	localStorage.setItem('catUpgradeLevel', 0);
	localStorage.setItem('catUpgradeCost', 100);

	localStorage.setItem('MeatballMolesterUpgradeLevel', 0);
	localStorage.setItem('MeatballMolesterUpgradeCost', 500);
}

// Set Interval

function callAllNecessary() {
	// resetUpgrades();

	// decreaseClicks();
	autoClicks();

	saveSessionData();
}

setInterval(callAllNecessary, 1000)