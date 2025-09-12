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

const textStep = document.getElementById("textStep");
const textNextStep = document.getElementById("textNextStep");
let step = 0;

// Mostro i combattenti a schermo
const fightersRow = document.getElementById("fightersRow");
printFighters(fighters);

// Funzione per far partire il torneo
function startTournament(){
  updateStep(++step); // Aggiorno il testo sul pulsante

  // FASE 1: SCELTA DELL'ARMA ---------------
  // Mostro i combattanti disarmati
  if(step === 1) {
    console.log("SCELTA DELL'ARMA ---------------");
    console.log("COMBATTENTI DISARMATI: ");
    console.log(convertJSON(fighters));
  
    // Ogni combattente prende un'arma random (questa non sarà più disponibile per gli altri)
    fighters.map(fighter => {
      let randomIndex = randomNumber(0, weapons.length-1); // Prendo l'indice di un'arma casuale (il massimo non è incluso)
      fighter.weapon = weapons.splice(randomIndex, 1)[0]; // Il combattente prende l'arma dall'elenco (NOTA: [0] rimuove l'oggetto dall'array)
    });

    // AGGIORNO LA GRAFICA
    printFighters(fighters);
    // Mostro i combattanti armati
    console.log("COMBATTENTI ARMATI: ");
    console.log(convertJSON(fighters));
    // Controllo che le armi siano vuote
    console.log(weapons);
  }

  // FASE 2: ALLENAMENTO ---------------
  // Ogni combattente può moltiplicare la sua potenza per un numero tra 1 e 100
  if(step === 2) {
    console.log("ALLENAMENTO ---------------");
    fighters.map(fighter => {
      if(randomNumber(1, 2) == 1) { // 1/2 possibilità di potenziarsi
        fighter.power *= randomNumber(1, 100); // la potenza si moltiplica per un valore tra 1 e 100
        console.log("POTENTE: " + convertJSON(fighter));
      } else
        console.log("NORMALE: " + convertJSON(fighter));
    });
    // AGGIORNO LA GRAFICA 
    printFighters(fighters);
  }

  // FASE 3: QUALIFICAZIONE ---------------
  // Mantengo solo i combattenti che hanno una potenza sopra i 2000
  if(step === 3) {
    console.log("QUALIFICAZIONE ---------------");
    console.log("ECCO TUTTI I COMBATTENTI: " + convertJSON(fighters));
    fighters.map(fighter => {
      // Informo chi ha perso
      !(fighter.power >= 2000) ? fighter.looser = true : fighter.looser = false;
    });

    // AGGIORNO LA GRAFICA 
    printFighters(fighters);

    console.log("ECCO I COMBATTENTI CHE HANNO PASSATO LE QUALIFICAZIONI: " + convertJSON(getNotLooser(fighters)));
  }

  // FASE 4: COMBATTIMENTO ---------------
  // Ogni combattente combatte con il successivo in lista 
  // Ogni combattente deve combattere solo una volta, nel caso siano dispari si aggiunge un robot combattente
  // In caso di parita vince chi viene prima nella lista
  if(step === 4) {
    console.log("COMBATTIMENTO ---------------");
    if(getNotLooserLength(fighters) % 2 !== 0) { // Se i combattenti sono dispari
      // Aggiungo un combattente robot
      fighters.push({ name: 'Robot', power: 4000, weapon: { name: "Mani nude", power: 0 }, looser: false}); 
      // AGGIORNO LA GRAFICA
      printFighters(fighters);
    }

    console.log("COMBATTENTI PRONTI (" + getNotLooserLength(fighters) + "): " + convertJSON(getNotLooser(fighters)));
    for(let i = 0; i < getNotLooserLength(fighters); i++) {
      while(fighters[i].looser === true) i++; // Non uso combattenti che hanno perso

      console.log("NUOVO ROUND");
      const index1 = i; // Salvo l'indice (lo uso durante l'eliminazione del perdente)
      const power1 = fighters[i].power + fighters[i].weapon.power;
      console.log("COMBATTENTE 1: " + convertJSON(fighters[i].name) + " + " + power1);
      i++;
      while(fighters[i].looser === true) i++; // Non uso combattenti che hanno perso
      const index2 = i; // Salvo l'indice (lo uso durante l'eliminazione del perdente)
      const power2 = fighters[i].power + fighters[i].weapon.power;
      console.log("COMBATTENTE 2: " + convertJSON(fighters[i].name) + " + " + power2);

      if(power1 < power2) {// Vince il secondo combattente
        fighters[index1].looser = true; // Segnalo i perdenti
      } else { // Vince il primo combattente o pareggiano
        fighters[index2].looser = true; // Segnalo i perdenti
      } 
    }
    
    console.log("VINCITORI (" + getNotLooserLength(fighters) + "): " + convertJSON(getNotLooser(fighters)));
    // AGGIORNO LA GRAFICA
    printFighters(fighters);
  }

  // FASE 4: PREMIAZIONE ---------------
  // Mostro il podio composto da i primi 3 combattenti con la potenza maggiore, in ordine decrescente
  if(step === 5) {
    console.log("PREMIAZIONE ---------------");
    // Informo chi non è sul podio (ho usato lo spread-operator per non mutare l'array originale)
    [...fighters].sort((a, b) => b.power - a.power).map((fighter, index) => {
      index < 3 ? fighter.notPodium = false : fighter.notPodium = true;
    }); 

    // Prendo i combattenti sul podio
    let winners = [...fighters].sort((a, b) => b.power - a.power).slice(0, 3); 
    
    console.log("SUL PODIO CI SONO:");
    winners.map((winner, index) => console.log(index+1 + ", " + convertJSON(winner)));
    
    // AGGIORNO LA GRAFICA
    printFighters(fighters);
    console.log("FINALE: " + convertJSON(getNotLooser(fighters)));
  }
}

function getNotLooser(fighters){
  return fighters.filter(fighter => fighter.looser != true);
}
function getNotLooserLength(fighters){
  return fighters.filter(fighter => fighter.looser != true).length;
}

function updateStep(step){
  switch(step){
    case(1):
      textStep.innerText = "Equipaggiamento arma";
      textNextStep.innerText = "Potenziamento";
      break;
    case(2):
      textStep.innerText = "Potenziamento";
      textNextStep.innerText = "Qualifica";
      break;
    case(3):
      textStep.innerText = "Qualifica";
      textNextStep.innerText = "Combattimento";
      break;
    case(4):
      textStep.innerText = "Combattimento";
      textNextStep.innerText = "Premiazione";
      break;
    case(5):
      textStep.innerText = "Premiazione";
      document.getElementById("nextStepContainer").classList.add("d-none");
      document.getElementById("buttonStartTournament").classList.add("disabled");
      break;
    
    default:
      document.getElementById("buttonStartTournament").classList.add("disabled");
  }
}

function printFighters(fighters) {
  // Ordino i combattenti
  let fightersSorted;
  fightersSorted = [...fighters].sort((a, b) => a.looser - b.looser); // (NOTA: ASC -> "a.power - b.power")
  // Se devo ordinare anche il podio
  if(step === 5)
    fightersSorted = [...fighters].sort((a, b) => {
      // Chi non è sul podio va sotto
      if (a.notPodium !== b.notPodium) return a.notPodium - b.notPodium;

      // Chi ha perso va sotto
      if (a.looser !== b.looser) return a.looser - b.looser;

      // I vincitori vengono ordinati per potenza 
      return b.power - a.power;
    });

  fightersRow.innerHTML = ""; // Reset at start
  fightersSorted.map((fighter, index) => {
    fightersRow.innerHTML += `<div class="col"> 
      <div id="card${fighter.name}" class="card h-100 ${fighter.looser ? "disabled" : ""} ${fighter.notPodium ? "fst-italic" : ""}">
        <div class="card-body">
          <h5 class="card-title">
            ${(step === 5 && index < 3) ? (index+1)+") " : ""} 
            ${fighter.name}
          </h5>
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