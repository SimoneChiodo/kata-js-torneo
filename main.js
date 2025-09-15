const $one = document.querySelector.bind(document);
const $all = document.querySelectorAll.bind(document);

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

const textStep =  $one("#textStep");
const descriptionStep =  $one("#descriptionStep");
const textNextStep =  $one("#textNextStep");
let step = 0;

// Mostro i combattenti a schermo
const fightersRow =  $one("#fightersRow");
printFighters(fighters);

// Funzione per far partire il torneo
function startTournament(){
  updateStep(++step); // Aggiorno il testo sul pulsante

  // FASE 1: SCELTA DELL'ARMA ---------------
  // Mostro i combattanti disarmati
  if(step === 1) {
    console.log("%c🗡 FASE 1: SCELTA DELL'ARMA ---------------", "color: orange; font-size: 1rem;");
    console.log("ELENCO COMBATTENTI (" + getNotLooserLength(fighters) + "): ");
    console.table(fighters);
  
    // Ogni combattente prende un'arma random (questa non sarà più disponibile per gli altri)
    fighters.map(fighter => {
      let randomIndex = randomNumber(0, weapons.length-1); // Prendo l'indice di un'arma casuale (il massimo non è incluso)
      fighter.weapon = weapons.splice(randomIndex, 1)[0]; // Il combattente prende l'arma dall'elenco (NOTA: [0] rimuove l'oggetto dall'array)
    });

    // AGGIORNO LA GRAFICA
    printFighters(fighters);
    // Mostro i combattanti armati
    console.log("ELENCO COMBATTENTI ARMATI (" + getNotLooserLength(fighters) + "): ");
    console.table(fighters);
    // Controllo che le armi siano vuote
    // console.log(weapons);
  }

  // FASE 2: ALLENAMENTO ---------------
  // Ogni combattente può moltiplicare la sua potenza per un numero tra 1 e 100
  if(step === 2) {
    console.log("%c💪🏻 FASE 2: ALLENAMENTO ---------------", "color: orange; font-size: 1rem;");
    fighters.map(fighter => {
      if(randomNumber(1, 2) == 1) { // 1/2 possibilità di potenziarsi
        fighter.power *= randomNumber(1, 100); // la potenza si moltiplica per un valore tra 1 e 100
        console.log("%cALLENAMENTO RIUSCITO: ", "color: lightblue; font-size: .9rem;");
        console.log(convertJSON(fighter));
      } else
        console.log("%cALLENAMENTO FALLITO: ", "color: lightblue; font-size: .9rem;");
        console.log(convertJSON(fighter));
    });
    // AGGIORNO LA GRAFICA 
    printFighters(fighters);
  }

  // FASE 3: QUALIFICAZIONE ---------------
  // Mantengo solo i combattenti che hanno una potenza sopra i 2000
  if(step === 3) {
    console.log("%c🎯 FASE 3: QUALIFICAZIONE ---------------", "color: orange; font-size: 1rem;");
    console.log("ELENCO COMBATTENTI (" + getNotLooserLength(fighters) + "): ");
    console.table(fighters);
    
    // Informo chi ha perso
    fighters.map(fighter => { fighter.looser = fighter.power < 2000; });

    // AGGIORNO LA GRAFICA 
    printFighters(fighters);

    console.log("ELENCO COMBATTENTI CHE HANNO PASSATO LE QUALIFICAZIONI (" + getNotLooserLength(fighters) + "): ");
    console.table(getNotLooser(fighters));
  }

  // FASE 4: COMBATTIMENTO ---------------
  // Ogni combattente combatte con il successivo in lista 
  // Ogni combattente deve combattere solo una volta, nel caso siano dispari si aggiunge un robot combattente
  // In caso di parita vince chi viene prima nella lista
  if(step === 4) {
    console.log("%c⚔ FASE 4: COMBATTIMENTO ---------------", "color: orange; font-size: 1rem;");
    if(getNotLooserLength(fighters) % 2 !== 0) { // Se i combattenti sono dispari
      // Aggiungo un combattente robot
      fighters.push({ name: 'Robot', power: 4000, weapon: { name: "Mani nude", power: 0 }, looser: false}); 
      // AGGIORNO LA GRAFICA
      printFighters(fighters);
      console.log("È STATO AGGIUNTO UN COMBATTENTE ROBOT");
    }

    console.log("ELENCO COMBATTENTI PRONTI AL COMBATTIMENTO (" + getNotLooserLength(fighters) + "): ");
    console.table(getNotLooser(fighters));
    
    // Ciclo tutti i combattenti (i combattenti sono ordinati: prima i vincitori, dopo i perdenti)
    for(let i = 0; i < fighters.length && fighters[i].looser !== true; i++) { 
      console.log("%cNUOVO ROUND", "color: lightblue; font-size: .9rem;");
      const index1 = i; // Salvo l'indice (lo uso durante l'eliminazione del perdente)
      const power1 = fighters[i].power + fighters[i].weapon.power;
      console.log("COMBATTENTE 1: " + convertJSON(fighters[i].name) + " + " + power1);
      i++;
      const index2 = i; // Salvo l'indice (lo uso durante l'eliminazione del perdente)
      const power2 = fighters[i].power + fighters[i].weapon.power;
      console.log("COMBATTENTE 2: " + convertJSON(fighters[i].name) + " + " + power2);

      if(power1 < power2) { // Vince il secondo combattente
        fighters[index1].looser = true; // Segnalo i perdenti
        console.log("VINCITORE: " + convertJSON(fighters[index2].name));
      } else { // Vince il primo combattente o pareggiano
        fighters[index2].looser = true; // Segnalo i perdenti
        console.log("VINCITORE: " + convertJSON(fighters[index1].name));
      }
    }
    
    console.log("ELENCO VINCITORI (" + getNotLooserLength(fighters) + "): ");
    console.table(getNotLooser(fighters));
    // AGGIORNO LA GRAFICA
    printFighters(fighters);
  }

  // FASE 4: PREMIAZIONE ---------------
  // Mostro il podio composto da i primi 3 combattenti con la potenza maggiore, in ordine decrescente
  if(step === 5) {
    console.log("%c🏆 FASE 4: PREMIAZIONE ---------------", "color: orange; font-size: 1rem;");
    console.log("ELENCO DEI COMBATTENTI RIMASTI (" + getNotLooserLength(fighters) + "): ");
    console.table(getNotLooser(fighters));
    // Dico che tutti i combattenti non vanno sul podio (lo sovrascrivo dopo solo per i primi 3)
    fighters.map(fighter => fighter.notPodium = true);

    // Prendo i vincitori e sovrascrivo notPodium a false
    const winners = [...fighters].filter(fighter => fighter.looser !== true). // Prendo i vincitori
      sort((a, b) => ((b.power + b.weapon.power) - (a.power + a.weapon.power))). // Ordino in base alla loro potenza totale
      slice(0, 3). // Prendo i primi 3 (i vincitori)
      map(fighter => { 
        fighter.notPodium = false; // Dico che questo combattente va sul podio
        return fighter; // Salvo il vincitore
      });

    console.log("SUL PODIO CI SONO:");
    winners.map((winner, index) => console.log(index+1 + ", " + convertJSON(winner)));
    
    // AGGIORNO LA GRAFICA
    printFighters(fighters);
  }
}

// Metodo per prendere i combattenti che non hanno perso
function getNotLooser(fighters){
  return fighters.filter(fighter => fighter.looser != true);
}
// Metodo per prendere il numero di combattenti che non hanno perso
function getNotLooserLength(fighters){
  return fighters.filter(fighter => fighter.looser != true).length;
}

// Metodo per aggiorare il testo dei vari step
function updateStep(step){
  switch(step){
    case(1):
      textStep.innerText = "2 - Scelta dell'arma";
      textNextStep.innerText = "3 - Allenamento";
      descriptionStep.innerText = "Ogni combattente sceglierà casualmente un'arma. Una volta scelta, un'arma non sarà più disponibile per i successivi combattenti.";
      break;
    case(2):
      textStep.innerText = "3 - Allenamento";
      textNextStep.innerText = "4 - Qualificazione";
      descriptionStep.innerText = "Ogni combattente si sottoporrà ad un allenamento che incrementerà (o forse no) la sua potenza, moltiplicandola per un numero casuale tra 1 e 100.";
      break;
    case(3):
      textStep.innerText = "4 - Qualificazione";
      textNextStep.innerText = "5 - Combattimento";
      descriptionStep.innerText = "Escludiamo dal torneo chi, dopo l'allenamento, non è riuscito a raggiungere una potenza di almeno 2000.";
      break;
    case(4):
      textStep.innerText = "5 - Combattimento";
      textNextStep.innerText = "6 - Premiazione";
      descriptionStep.innerText = `I combattimenti si svolgeranno tra un partecipante e il successivo dell'elenco, assicurandosi che ognuno combatta una sola volta.
      In ogni scontro vincerà il combattente con la potenza più alta. In caso di parità vincerà chi "gioca in casa", ossia chi viene prima nell'elenco.`;
      break;
    case(5):
      textStep.innerText = "6 - Premiazione";
      descriptionStep.innerText = "I vincitori del Torneo Boolkaichi salgono sul podio!";
      $one("#nextStepContainer").classList.add("d-none");
      $one("#buttonStartTournament").classList.add("disabled");
      break;
    
    default:
      $one("#buttonStartTournament").classList.add("disabled");
  }
}

// Metodo per mostrare in pagina i combattenti nelle loro card
function printFighters(fighters) {
  // Ordino i combattenti
  let fightersSorted;
  fightersSorted = fighters.sort((a, b) => a.looser - b.looser); // (NOTA: ASC -> "a.power - b.power")
  // Se devo ordinare anche il podio
  if(step === 5)
    fightersSorted = [...fighters].sort((a, b) => {
      // Chi non è sul podio va sotto
      if (a.notPodium !== b.notPodium) return a.notPodium - b.notPodium;
      if(a.notPodium === b.notPodium) return 0;

      // Chi ha perso va sotto
      if (a.looser !== b.looser) return a.looser - b.looser;
      if(a.looser === b.looser) return 0;

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
// Metodo per stampare in console stringhe JSON
function convertJSON(param){
  return JSON.stringify(param);
}