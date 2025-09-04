// Dichiaro le liste "fighters" (combattenti) e "weapons" (armi)
const fighters = [
  {
      name: 'Freezer',
      power: 8000
  },
  {
      name: 'Vegeta',
      power: 8500
  },
  {
      name: 'Crilin',
      power: 500
  },
  {
      name: 'Mr Satan',
      power: 50
  },
  {
      name: 'Junior',
      power: 6000
  },
  {
      name: 'Goku',
      power: 9001
  },
  {
      name: 'Tensing',
      power: 450
  },
  {
      name: 'Videl',
      power: 300
  },
  {
      name: 'Bulma',
      power: 20
  },
  {
      name: 'C-18',
      power: 7800
  },
  {
      name: 'Gohan',
      power: 8900
  },
  {
      name: 'Trunks',
      power: 1250
  }
];
const weapons = [
  { 
      name: "Ventaglio della Musa", 
      power: 15 
  },
  { 
      name: "Scouter", 
      power: 30 
  },
  { 
      name: "Bastone Roshi", 
      power: 60 
  },
  { 
      name: "Fagioli Magici", 
      power: 70 
  },
  { 
      name: "Katana di Yajirobei", 
      power: 85 
  },
  { 
      name: "Spada del Dragone Azzurro", 
      power: 115 
  },
  { 
      name: "Armatura Saiyan", 
      power: 145 
  },
  { 
      name: "Cannone da braccio", 
      power: 170 
  },
  { 
      name: "Nuvola d'oro", 
      power: 200 
  },
  { 
      name: "Bastone Nyoi", 
      power: 220
  },
  { 
      name: "Spada Z", 
      power: 235 
  },
  { 
      name: "Orecchini Potara", 
      power: 250 
  }
];

// FASE 1: SCELTA DELL'ARMA ---------------
// Mostro i combattanti disarmati
console.log("COMBATTENTI DISARMATI: ");
console.log(convertJSON(fighters));

// Ogni combattente prende un'arma random (questa non sarà più disponibile per gli altri)
for(fighter of fighters) {
  let randomIndex = Math.floor(Math.random() * weapons.length); // Prendo l'indice di un'arma casuale
  fighter.weapon = weapons.splice(randomIndex, 1); // Il combattente prende l'arma dall'elenco
}
// Mostro i combattanti armati
console.log("COMBATTENTI ARMATI: ");
console.log(convertJSON(fighters));
// Controllo che le armi siano vuote
console.log(weapons);

// FASE 2: ALLENAMENTO ---------------
// Ogni combattente può moltiplicare la sua potenza per un numero tra 1 e 100
for(fighter of fighters) {
  if(Math.floor(Math.random() * 2 + 1) == 1) { // 1/2 possibilità di potenziarsi
    fighter.power *= Math.floor(Math.random() * 100 + 1); // la potenza si moltiplica per un valore tra 1 e 100
    console.log("POTENTE: " + convertJSON(fighter));
  } else {
    console.log("NORMALE: " + convertJSON(fighter));
  }
}


// Metodi HELPER
/**
 * Function to generare a random number between a min and a max.
 * @param {number} min - Min number to generate
 * @param {number} max - Max number to generate
 * @returns {number} - Random number
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function convertJSON(param){
  return JSON.stringify(param);
}