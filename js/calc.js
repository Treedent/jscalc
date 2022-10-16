// Espace de nom global
var CALC = CALC || {};

let d = document;
let operators = ['/', '*', '-', '+', '%'];

// Variables gérées dans l'application
CALC.vars = {
  result: d.querySelector('#result'),
  chiffres: d.querySelectorAll('.chiffre'),
  actions: d.querySelectorAll('.action'),
  sigles: d.querySelectorAll('.sigle'),
  operateurs: d.querySelectorAll('.operateur'),
  last: null
};

// On factorise les fonctions de callback d'évènement avec un switch case
CALC.events = {
  ajouterEvent: (el, fonction) => {
    el.addEventListener('click', (e) => {
      switch (fonction) {

        case 'affiche':
          // On évite la dupilcation des opérateurs
          if (operators.includes(e.target.dataset.value) && operators.includes(CALC.vars.last)) {
            break;
          } else {
            // On mémorise la dernière saisie
            CALC.vars.last = e.target.dataset.value;
          }
          //On enlève le 0 de départ
          if (CALC.vars.result.value === '0') { CALC.vars.result.value = '';}
          // On ajoute le chiffre ou l'opérateur à l'afficheur
          CALC.vars.result.value += CALC.vars.last;
          break;

        // Remise à 0
        case 'efface':
          CALC.vars.result.value = '0';
          break;

        // Calucule les opérations
        case 'calcule':
          CALC.vars.result.value = eval(CALC.vars.result.value)
          break;
      }
    });
  }
};

// Gestion des évènements sur les touches d'action
CALC.vars.actions.forEach(actionBtn => {
  CALC.events.ajouterEvent(actionBtn, actionBtn.dataset.value);
});

// Gestion des événements sur les touches numériques
CALC.vars.chiffres.forEach(chiffreBtn => {
  CALC.events.ajouterEvent(chiffreBtn, 'affiche');
});

// Gestion des événements sur les touches d'opérateurs
CALC.vars.operateurs.forEach(operateurBtn => {
  CALC.events.ajouterEvent(operateurBtn, 'affiche');
});

// Gestion des événements sur les touches de sigles
CALC.vars.sigles.forEach(sigleBtn => {
  CALC.events.ajouterEvent(sigleBtn, 'affiche');
});
