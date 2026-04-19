const plantDatabase = {
  "Rose": {
    varieties: ["Red Rose", "Yellow Rose", "White Rose", "Pink Rose", "Button Rose","-"],
    quality: "Naturally Fragrant & Charming",
    benefit: "Humans: Creates a calming atmosphere; perfect for stress-free living."
  },
  "Mango": {
    varieties: ["Alphonso", "Bangalora", "Imam Pasand", "Totapuri", "Neelam","-"],
    quality: "Rich Fruit-bearing Treasure",
    benefit: "Humans: A delicious powerhouse of vitamins for natural health and energy."
  },
  "Neem": {
    varieties: ["Common Neem", "Organic Neem","-"],
    quality: "The Divine Medicinal Shield",
    benefit: "Humans: A total immunity booster and natural skin protector."
  },
  "Jackfruit": {
    varieties: ["Honey Jackfruit", "Hard-flesh", "Red Jackfruit","-"],
    quality: "Giant Fruit-bearing Wonder",
    benefit: "Humans: A nutrient-rich superfood that supports a healthy digestive system."
  },
  "Coconut": {
    varieties: ["Tall Variety", "Dwarf Variety", "Hybrid","-"],
    quality: "The Ultimate Multi-purpose Tree",
    benefit: "Humans: Provides life-sustaining water, oil, and delicious food naturally."
  },
  "Hibiscus": {
    varieties: ["Tropical Red", "Pink Chiffon", "Yellow Hibiscus", "White","-"],
    quality: "Exquisite Ornamental Beauty",
    benefit: "Birds/Butterflies: Acts as a colorful magnet for nature’s beautiful pollinators."
  },
  "Snake Plant": {
    varieties: ["Laurentii", "Zeylanica", "Moonshine", "Cylindrica","-"],
    quality: "Powerful Natural Air Purifier",
    benefit: "Humans: Cleans your indoor air while you sleep; promotes fresh breathing."
  },
  "Aloe Vera": {
    varieties: ["Common Aloe", "Aloe Chinensis", "Aloe Ferox","-"],
    quality: "The Magical Medicinal Healer",
    benefit: "Humans: Nature's own remedy for glowing skin and rapid burn recovery."
  },
  "Monstera": {
    varieties: ["Deliciosa", "Adansonii", "Thai Constellation,"-""],
    quality: "Trendy Decorative Statement",
    benefit: "Humans: Brings the lush, tropical vibes right into your living room."
  },
  "Sunflower": {
    varieties: ["Giant", "Dwarf", "Teddy Bear", "Lemon Queen","-"],
    quality: "Radiant Seed Producer",
    benefit: "Birds: A friendly natural snack bar that keeps your garden birds happy!"
  },
  "Cactus": {
    varieties: ["Barrel Cactus", "Prickly Pear", "Easter Cactus", "Golden Barrel", "Christmas Cactus","-"],
    quality: "Low Maintenance",
    benefit: "Humans: Desert Aesthetic & Water Retention"
  },
  "Tulsi": {
    varieties: ["Rama Tulsi", "Krishna Tulsi", "Vana Tulsi","-"],
    quality: "Medicinal",
    benefit: "Humans: Immunity & Air Purification"
  }
};

function updateForm() {
  const species = document.getElementById('pSpecies').value;
  const varietySelect = document.getElementById('pVariety');
  const manualFields = document.getElementById('manualFields');

  if (species === "Manual") {
    manualFields.style.display = "block";
    varietySelect.innerHTML = '<option>Manual Entry</option>';
  } else {
    manualFields.style.display = "none";
    varietySelect.innerHTML = '<option value="">Select Variety</option>';
    
    // Fill varieties
    plantDatabase[species].varieties.forEach(v => {
        varietySelect.innerHTML += `<option value="${v}">${v}</option>`;
    });
    
    // THESE LINES UPDATE THE QUALITY AND BENEFIT INPUTS
    document.getElementById('pQuality').value = plantDatabase[species].quality;
    document.getElementById('pBenefit').value = plantDatabase[species].benefit;
}
}

function addPlant(event) {
  event.preventDefault();
  const species = document.getElementById('pSpecies').value;
  
  const plant = {
    id: Date.now(),
    name: document.getElementById('pName').value,
    species: species === "Manual" ? document.getElementById('mSpecies').value : species,
    variety: species === "Manual" ? document.getElementById('mVariety').value : document.getElementById('pVariety').value,
    quality: document.getElementById('pQuality').value,
    benefit: document.getElementById('pBenefit').value,
    lastWatered: Date.now()
  };
  
  let garden = JSON.parse(localStorage.getItem('myGarden')) || [];
  garden.push(plant);
  localStorage.setItem('myGarden', JSON.stringify(garden));
  window.location.href = "jungle.html";
}

function getStatus(lastWatered) {
  const hours = (Date.now() - lastWatered) / 3600000;
  if (hours < 24) return { text: "Happy 😊", color: "#4caf50" };
  if (hours < 48) return { text: "Thirsty 💧", color: "#ff9800" };
  return { text: "Dry 🥀", color: "#f44336" };
}

function loadJungle() {
  const container = document.getElementById('jungle-container');
  let garden = JSON.parse(localStorage.getItem('myGarden')) || [];
  
  container.innerHTML = garden.map(p => {
    const s = getStatus(p.lastWatered);
    return `
      <div class="plant-card" style="border-left-color: ${s.color}">
        <h4>Nick name:${p.name}</h4>
        <p><strong>Species:</strong> ${p.species}</p>
        <p><strong>Variety:</strong> ${p.variety}</p>
        <p><strong>Quality:</strong> ${p.quality}</p> <p><strong>Benefit:</strong> ${p.benefit}</p>
        <p><strong>Status: </strong>${s.text}</p>
        <button onclick="waterPlant(${p.id})">Water Me</button>
      </div>`;
  }).join('');
}

function waterPlant(id) {
  let garden = JSON.parse(localStorage.getItem('myGarden'));
  garden.find(p => p.id === id).lastWatered = Date.now();
  localStorage.setItem('myGarden', JSON.stringify(garden));
  loadJungle();
} 