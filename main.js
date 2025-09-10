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

const buttonStart = document.getElementById("buttonStartTorunament");
let step = 0;
let fightersFiltered = [];

// Mostro i combattenti a schermo
const fightersRow = document.getElementById("fightersRow");
printFighters(fighters);

// Funzione per far partire il torneo
function startTournament(){
  updateStep(++step); // Aggiorno il testo sul pulsante

  // FASE 1: SCELTA DELL'ARMA ---------------
  // Mostro i combattanti disarmati
  if(step == 1) {
    console.log("SCELTA DELL'ARMA ---------------");
    console.log("COMBATTENTI DISARMATI: ");
    console.log(convertJSON(fighters));
  
    // Ogni combattente prende un'arma random (questa non sarà più disponibile per gli altri)
    fighters.map(fighter => {
      let randomIndex = randomNumber(0, weapons.length-1); // Prendo l'indice di un'arma casuale (il massimo non è incluso)
      fighter.weapon = weapons.splice(randomIndex, 1)[0]; // Il combattente prende l'arma dall'elenco (NOTA: [0] rimuove l'oggetto dall'array)
      // AGGIORNO LA GRAFICA
      document.getElementById(`cardWeapon${fighter.name}`).innerHTML = `<b>weapon:</b>  ${fighter.weapon.name}`;
      document.getElementById(`cardWeaponPower${fighter.name}`).innerHTML = `<b>weapon power:</b>  ${fighter.weapon.power}`;
    });
    // Mostro i combattanti armati
    console.log("COMBATTENTI ARMATI: ");
    console.log(convertJSON(fighters));
    // Controllo che le armi siano vuote
    console.log(weapons);
  }

  // FASE 2: ALLENAMENTO ---------------
  // Ogni combattente può moltiplicare la sua potenza per un numero tra 1 e 100
  if(step == 2) {
    console.log("ALLENAMENTO ---------------");
    fighters.map(fighter => {
      if(randomNumber(1, 2) == 1) { // 1/2 possibilità di potenziarsi
        fighter.power *= randomNumber(1, 100); // la potenza si moltiplica per un valore tra 1 e 100
        console.log("POTENTE: " + convertJSON(fighter));
        // AGGIORNO LA GRAFICA
        document.getElementById(`cardPower${fighter.name}`).innerHTML = `<b>power:</b>  ${fighter.power}`;
      } else {
        console.log("NORMALE: " + convertJSON(fighter));
      }
    });
  }

  // FASE 3: QUALIFICAZIONE ---------------
  // Mantengo solo i combattenti che hanno una potenza sopra i 2000
  if(step == 3) {
    console.log("QUALIFICAZIONE ---------------");
    console.log("ECCO TUTTI I COMBATTENTI: " + convertJSON(fighters));
    fighters.map(fighter => {
      const keep = fighter.power >= 2000;
      if(!keep) { 
        fighter.looser = true; // Informo chi ha perso
        document.getElementById(`card${fighter.name}`).classList.add("disabled"); // AGGIORNO LA GRAFICA
      }
      else // Salvo i combattenti rimasti
        fightersFiltered.push(fighter);
    });
    console.log("ECCO I COMBATTENTI CHE HANNO PASSATO LE QUALIFICAZIONI: " + convertJSON(fighters));
  }

  // FASE 4: COMBATTIMENTO ---------------
  // Ogni combattente combatte con il successivo in lista 
  // Ogni combattente deve combattere solo una volta, nel caso siano dispari si aggiunge un robot combattente
  // In caso di parita vince chi viene prima nella lista
  if(step == 4) {
    console.log("COMBATTIMENTO ---------------");
    if(fightersFiltered.length % 2 !== 0) { // Se i combattenti sono dispari
      const robot = { name: 'Robot', power: 4000, weapon: { name: "Mani nude", power: 0 }};
      fighters.push(robot); // Aggiungo un combattente robot
      fightersFiltered.push(robot); // Aggiungo un combattente robot
      // AGGIORNO LA GRAFICA
      printFighters(fighters);
    }

    console.log("COMBATTENTI PRONTI (" + fightersFiltered.length + "): " + convertJSON(fightersFiltered));
    for(let i = 0; i < fightersFiltered.length; i++) {
      console.log("NUOVO ROUND");
      
      const power1 = fightersFiltered[i].power + fightersFiltered[i].weapon.power;
      console.log("COMBATTENTE 1: " + convertJSON(fightersFiltered[i].name) + " + " + power1);
      i++;
      const power2 = fightersFiltered[i].power + fightersFiltered[i].weapon.power;
      console.log("COMBATTENTE 2: " + convertJSON(fightersFiltered[i].name) + " + " + power2);

      if(power1 < power2) {// Vince il secondo combattente
        fightersFiltered[i-1].looser = true; // Segnalo i perdenti, per poi rimuoverli dopo
      } else { // Vince il primo combattente o pareggiano
        fightersFiltered[i].looser = true; // Segnalo i perdenti, per poi rimuoverli dopo
      } 
    }
    fightersFiltered = fightersFiltered.filter(fighter => fighter.looser != true); // Rimuovo i perdenti
    console.log("VINCITORI (" + fightersFiltered.length + "): " + convertJSON(fightersFiltered));
    // AGGIORNO LA GRAFICA
    fighters = fighters.map(fighter => {
      let newFighter = fightersFiltered.find(fighterFiltered => fighterFiltered.name === fighter.name); // Cerco una versione aggiornata nell'altro array
      return newFighter ?? fighter; // Se non trova una versione aggiornata, restituisce l'originale
    });
    printFighters(fighters);
  }

  // FASE 4: PREMIAZIONE ---------------
  // Mostro il podio composto da i primi 3 combattenti con la potenza maggiore, in ordine decrescente
  if(step == 5) {
    console.log("PREMIAZIONE ---------------");
    let winners = fightersFiltered.sort((a, b) => b.power - a.power).slice(0, 3); // Creo una nuova variabile per il podio (NOTA: ASC -> "a.power - b.power")
    console.log("SUL PODIO CI SONO:");
    winners.map((winner, index) => {
      console.log(index+1 + ", " + convertJSON(winner))
      // AGGIORNO LA GRAFICA
      const podiumRow = document.getElementById("podium");
      podiumRow.innerHTML += `<div class="col"> 
        <div id="card${winner.name}" class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${index+1}° ${winner.name}</h5>
            <p id="cardPower${winner.name}" class="card-text"><b>power:</b> ${winner.power}</p>
            <p id="cardWeapon${winner.name}" class="card-text"><b>weapon:</b>  ${winner.weapon ? winner.weapon.name : "<i>empty</i>"}</p>
            <p id="cardWeaponPower${winner.name}" class="card-text"><b>weapon power:</b>  ${winner.weapon ? winner.weapon.power : "<i>empty</i>"}</p>
          </div>
        </div>
      </div>`;
    });

    fightersFiltered = fightersFiltered.sort((a, b) => b.power - a.power);
    fightersFiltered.slice(3).map(fighter => {
      fighter.notPodium = true;
      return fighter;
    });
    // AGGIORNO LA GRAFICA
    printFighters(fighters);
    console.log("FINALE: " + convertJSON(fightersFiltered));
  }
}

function updateStep(step){
  switch(step){
    case(1):
      buttonStart.innerText = "Potenzia";
      break;
    case(2):
      buttonStart.innerText = "Qualifica";
      break;
    case(3):
      buttonStart.innerText = "Combattimento";
      break;
    case(4):
      buttonStart.innerText = "Premiazione";
      break;

    default:
      buttonStart.classList.add("disabled");
  }
}

function printFighters(fighters) {
  fightersRow.innerHTML = ""; // Reset at start
  fighters.map(fighter => {
    fightersRow.innerHTML += `<div class="col"> 
      <div id="card${fighter.name}" class="card h-100 ${fighter.looser ? "disabled" : ""} ${fighter.notPodium ? "fst-italic" : ""}">
        <div class="card-body">
          <h5 class="card-title">${fighter.name}</h5>
          <p id="cardPower${fighter.name}" class="card-text"><b>power:</b> ${fighter.power}</p>
          <p id="cardWeapon${fighter.name}" class="card-text"><b>weapon:</b>  ${fighter.weapon ? fighter.weapon.name : "<i>empty</i>"}</p>
          <p id="cardWeaponPower${fighter.name}" class="card-text"><b>weapon power:</b>  ${fighter.weapon ? fighter.weapon.power : "<i>empty</i>"}</p>
        </div>
      </div>
    </div>`;
  });
}


// Metodi HELPER
/**
 * Function to generare a random number between a min and a max (included).
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