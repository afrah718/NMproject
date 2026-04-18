// Function to Save Plant
function addPlant(event) {
    event.preventDefault();
    const name = document.getElementById('pName').value;
    const species = document.getElementById('pSpecies').value;

    const plant = {
        id: Date.now(),
        name,
        species,
        mood: "Happy 😊",
        health: "100%"
    };

    let garden = JSON.parse(localStorage.getItem('myGarden')) || [];
    garden.push(plant);
    localStorage.setItem('myGarden', JSON.stringify(garden));

    window.location.href = "jungle.html";
}

// Function to Render Plants in Jungle
function loadJungle() {
    const container = document.getElementById('jungle-container');
    let garden = JSON.parse(localStorage.getItem('myGarden')) || [];

    if (garden.length === 0) {
        container.innerHTML = "<p style='color:#888;'>No plants in your jungle yet. 🪴</p>";
        return;
    }

    container.innerHTML = garden.map(p => `
        <div class="plant-item">
            <div style="text-align: left;">
                <h4 style="margin:0;">${p.name}</h4>
                <small style="color:#777;">${p.species}</small>
            </div>
            <div class="health-badge">${p.mood}</div>
        </div>
    `).join('');
}