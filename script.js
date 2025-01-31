const studySpots = [
    {
        id: '1',
        name: 'Central Square Library',
        type: 'Library',
        openHours: '9 AM - 9 PM',
        foodOffered: 'No',
        drinksOffered: 'No',
        wifiAvailable: 'Yes',
        noiseLevel: 'Quiet',
        seatingQuality: 'Good',
        location: [42.3656, -71.1062],
    },
    {
        id: '2',
        name: 'Tatte Bakery & Cafe',
        type: 'Cafe',
        openHours: '7 AM - 9 PM',
        foodOffered: 'Yes',
        drinksOffered: 'Yes',
        wifiAvailable: 'Yes',
        noiseLevel: 'Moderate',
        seatingQuality: 'Comfortable',
        location: [42.3601, -71.0942],
    },
    {
        id: '3',
        name: 'Algiers Coffee House',
        type: 'Cafe',
        openHours: '7 AM - 11 PM',
        foodOffered: 'Yes',
        drinksOffered: 'Yes',
        wifiAvailable: 'Yes',
        noiseLevel: 'Loud',
        seatingQuality: 'Basic',
        location: [42.3758, -71.1275],
    },
];

const map = L.map('map').setView([42.373611, -71.109733], 13); // Center map around the area

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Adding markers for study spots on the map
studySpots.forEach(spot => {
    L.marker(spot.location)
        .addTo(map)
        .bindPopup(`<b>${spot.name}</b><br>${spot.type}<br>${spot.openHours}`);
});

// Function to switch between tabs
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    const tablinks = document.getElementsByClassName("tablinks");

    // Hide all tab content
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the 'active' class from all tab links
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab content
    document.getElementById(tabName).style.display = "block";

    // Add the 'active' class to the button that opened the tab
    evt.currentTarget.className += " active";

    // Initialize DataTable when List tab is opened
    if (tabName === 'List') {
        populateTable();
    }
}

// Function to populate the DataTable
function populateTable() {
    const tableBody = document.getElementById('spotList');
    tableBody.innerHTML = ''; // Clear previous contents

    // Populate the table
    studySpots.forEach(spot => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${spot.name}</td>
            <td>${spot.type}</td>
            <td>${spot.openHours}</td>
            <td>${spot.foodOffered}</td>
            <td>${spot.drinksOffered}</td>
            <td>${spot.wifiAvailable}</td>
            <td>${spot.noiseLevel}</td>
            <td>${spot.seatingQuality}</td>
        `;
        tableBody.appendChild(tr);
    });

    // Initialize DataTable
    $(document).ready(function () {
        $('#spotTable').DataTable();
    });
}

// Set default tab
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".tablinks").click(); // Open Map by default
});