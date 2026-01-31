import { useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

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
