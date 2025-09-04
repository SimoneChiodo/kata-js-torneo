// Dichiaro le liste "fighters" (combattenti) e "weapons" (armi)
let fighters = [
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
console.log("SCELTA DELL'ARMA ---------------");
console.log("COMBATTENTI DISARMATI: ");
console.log(convertJSON(fighters));

// Ogni combattente prende un'arma random (questa non sarà più disponibile per gli altri)
fighters.map(fighter => {
  let randomIndex = Math.floor(Math.random() * weapons.length); // Prendo l'indice di un'arma casuale
  fighter.weapon = weapons.splice(randomIndex, 1)[0]; // Il combattente prende l'arma dall'elenco (NOTA: [0] rimuove l'oggetto dall'array)
});
// Mostro i combattanti armati
console.log("COMBATTENTI ARMATI: ");
console.log(convertJSON(fighters));
// Controllo che le armi siano vuote
console.log(weapons);

// FASE 2: ALLENAMENTO ---------------
// Ogni combattente può moltiplicare la sua potenza per un numero tra 1 e 100
console.log("ALLENAMENTO ---------------");
fighters.map(fighter => {
  if(Math.floor(Math.random() * 2 + 1) == 1) { // 1/2 possibilità di potenziarsi
    fighter.power *= Math.floor(Math.random() * 100 + 1); // la potenza si moltiplica per un valore tra 1 e 100
    console.log("POTENTE: " + convertJSON(fighter));
  } else {
    console.log("NORMALE: " + convertJSON(fighter));
  }
});

// FASE 3: QUALIFICAZIONE ---------------
// Mantengo solo i combattenti che hanno una potenza sopra i 2000
console.log("QUALIFICAZIONE ---------------");
console.log("ECCO TUTTI I COMBATTENTI: " + convertJSON(fighters));
fighters = fighters.filter(fighter => fighter.power >= 2000);
console.log("ECCO I COMBATTENTI CHE HANNO PASSATO LE QUALIFICAZIONI: " + convertJSON(fighters));

// FASE 4: COMBATTIMENTO ---------------
// Ogni combattente combatte con il successivo in lista 
// Ogni combattente deve combattere solo una volta, nel caso siano dispari si aggiunge un robot combattente
// In caso di parita vince chi viene prima nella lista
console.log("COMBATTIMENTO ---------------");
if(fighters.length % 2 !== 0) // Se i combattenti sono dispari
  fighters.push({ name: 'Robot', power: 4000, weapon: { name: "Mani nude", power: 0 }}); // Aggiungo un combattente robot

console.log("COMBATTENTI PRONTI (" + fighters.length + "): " + convertJSON(fighters));
for(let i = 0; i < fighters.length; i++) {
  console.log("NUOV ROUND");
  
  const power1 = fighters[i].power + fighters[i].weapon.power;
  console.log("COMBATTENTE 1: " + convertJSON(fighters[i].name) + " + " + power1);
  i++;
  const power2 = fighters[i].power + fighters[i].weapon.power;
  console.log("COMBATTENTE 2: " + convertJSON(fighters[i].name) + " + " + power2);

  if(power1 < power2) // Vince il secondo combattente
    fighters[i-1].looser = true; // Segnalo i perdenti, per poi rimuoverli dopo
  else if(power1 >= power2) // Vince il primo combattente o pareggiano
    fighters[i].looser = true; // Segnalo i perdenti, per poi rimuoverli dopo
}
fighters = fighters.filter(fighter => fighter.looser != true); // Rimuovo i perdenti
console.log("VINCITORI (" + fighters.length + "): " + convertJSON(fighters));


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