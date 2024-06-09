import { weightedRandom } from './utils.js';

const commonNeg = [
  {
    item: 'tu perds du temps',
    weight: 30,
    help: 'Explique ce qui te fait perdre du temps.',
  },
  { item: 'tu le paies de ta personne', weight: 30 },
  { item: 'tu consommes une ressource', weight: 20 },
  { item: 'tu te mets en danger', weight: 30 },
];

const yesIf = [
  { item: 'tu sacrifies quelque chose', weight: 5 },
  { item: "tu sacrifies quelqu'un", weight: 5 },
  { item: 'tu te fais aider', weight: 10 },
  { item: 'tu impliques un objet', weight: 20 },
  {
    item: 'tu modifies tes plans',
    weight: 30,
    help: "Ce que tu voulais faire n'est pas possible mais une autre solution existe. Trouve là.",
  },
  {
    item: 'tu fais avancer une menace',
    weight: 10,
    help: "Coche une case d'une menace et explique pourquoi elle avance.",
  },

  ...commonNeg,
];

const noAnd = [
  {
    item: 'tu subis une trahison',
    weight: 5,
    help: "quelqu'un ou quelque chose te trahie.",
  },
  { item: "l'opposition se renforce", weight: 5 },
  {
    item: "l'intrigue se complique",
    weight: 5,
    help: "Ajoute une case à l'intrigue et explique pourquoi.",
  },
  {
    item: 'une menace progresse',
    weight: 5,
    help: 'Ajoute une case à une menace et explique ce qui se passe.',
  },
  { item: 'ça se retourne contre toi', weight: 10 },
  {
    item: 'tu annonces un problème à venir',
    weight: 10,
    help: "ce que tu fais va provoquer un problème plus tard. C'est quoi ?",
  },
  // { item: 'tu annonces un problème hors cadre', weight: 10,  },

  ...commonNeg,
];

const yesBut = [
  { item: 'de manière partielle', weight: 30 },
  { item: "c'est temporaire", weight: 30 },
  { item: 'le résultat est inattendu', weight: 20, help: "Ça marche mais le résultat n'est pas celui attendu." },
  { item: 'ça coûte plus cher que prévu', weight: 25 },

  ...commonNeg,
];

const yesAnd = [
  { item: 'tu gagnes quelque chose en plus', weight: 40 },
  { item: "c'est durable", weight: 40 },
  { item: 'tu profites de ton élan', weight: 40 },
  { item: 'tu annonces une aubaine à venir', weight: 30 },
  { item: 'tu annonces une aubaine hors cadre', weight: 30 },
  { item: 'tu obtiens une aide inattendue', weight: 20 },
  { item: 'tu te fais aider', weight: 20 },
  { item: "c'est héroïque", weight: 20 },
  { item: "ça fait avancer l'intrigue", weight: 20 },
  { item: 'tu gagnes un allié', weight: 10 },
  { item: 'quelque chose d’exceptionnel arrive', weight: 10 },
  { item: 'un lien se fait avec une autre intrigue', weight: 10 },
  { item: 'une menace recule', weight: 10 },
];

const mainAction = [
  { item: 'Pose une autre question', weight: 2 },
  { item: 'Oui, et...', weight: 10, addition: yesAnd },
  { item: 'Oui', weight: 5 },
  { item: 'Oui, mais...', weight: 5, addition: yesBut },
  { item: 'Oui, si...', weight: 20, addition: yesIf },
  { item: 'Non', weight: 15 },
  { item: 'Non, et...', weight: 10, addition: noAnd },
];

const mainQuestion = [
  { item: 'Pose une autre question', weight: 5 },
  { item: 'Oui, et...', weight: 10 },
  { item: 'Oui', weight: 20 },
  { item: 'Oui, mais...', weight: 20 },
  { item: 'Non, mais...', weight: 20 },
  { item: 'Non', weight: 20 },
  { item: 'Non, et...', weight: 10 },
];

export const oracle = (type) => {
  const response = weightedRandom(
  type === 'action' ? mainAction : mainQuestion
);

  let addition = null;

  if (response.addition) {
    addition = weightedRandom(response.addition);
  }

  return { response, addition };
};
