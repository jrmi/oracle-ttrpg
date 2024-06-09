export function weightedRandom(options) {
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
}