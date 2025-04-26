import { useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

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
  } while (
    previousOptions[key] &&
    selectedOption.noRepeat &&
    selectedOption.item === previousOptions[key].item
  );

  previousOptions[key] = selectedOption;

  if (selectedOption.addition) {
    return [
      selectedOption,
      ...weightedRandom(
        selectedOption.addition,
        `${key}__${selectedOption.item}`
      ),
    ];
  }
  return [selectedOption];
}

export function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

// Utility function to detect swipe direction
export const useSwipe = (ref, onSwipe, { tolerance = 50 } = {}) => {
  useEffect(() => {
    const element = ref.current;
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchEndX = e.changedTouches[0].screenX;
    };

    const handleTouchMove = (e) => {
      touchEndX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = () => {
      if (touchStartX - touchEndX > tolerance) {
        onSwipe('left');
      }
      if (touchEndX - touchStartX > tolerance) {
        onSwipe('right');
      }
    };

    if (element) {
      element.addEventListener('touchstart', handleTouchStart);
      element.addEventListener('touchmove', handleTouchMove);
      element.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (element) {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [ref, onSwipe]);
};
