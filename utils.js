/*export function weightedRandom(options) {
  // options est un array d'objets avec { item: 'valeur', weight: pourcentage }
  let totalWeight = 0;
  
  for (let option of options) {
      totalWeight += option.weight;
  }

  let random = Math.random() * totalWeight;
  let cumulativeWeight = 0;

  for (let option of options) {
      cumulativeWeight += option.weight;
      if (random < cumulativeWeight) {
          return option;
      }
  }
}*/


const previousOptions = {};

export function weightedRandom(options, key) {
  // Vérifie si la clé a déjà une option précédente stockée
  if (!previousOptions[key]) {
      previousOptions[key] = null;
  }

  // options est un array d'objets avec { item: 'valeur', weight: pourcentage, noRepeat: booléen }
  let totalWeight = 0;

  for (let option of options) {
      totalWeight += option.weight;
  }

  let random;
  let selectedOption;

  do {
      random = Math.random() * totalWeight;
      let cumulativeWeight = 0;

      for (let option of options) {
          cumulativeWeight += option.weight;
          if (random < cumulativeWeight) {
              selectedOption = option;
              break;
          }
      }
  } while (previousOptions[key] && selectedOption.noRepeat && selectedOption.item === previousOptions[key].item);

  previousOptions[key] = selectedOption;

  if (selectedOption.addition){
     return [selectedOption, ...weightedRandom(selectedOption.addition, `${key}__${selectedOption.item}`)]
  }
  return [selectedOption];
}