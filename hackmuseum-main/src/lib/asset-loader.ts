/**
 * Utilitaire pour optimiser le chargement des assets
 */

// Préchargement des images importantes
export const preloadCriticalImages = (imagePaths: string[]): Promise<void[]> => {
  const promises = imagePaths.map((path) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to preload image: ${path}`));
      img.src = path;
    });
  });

  return Promise.all(promises);
};

// Chargement différé des images non critiques
export const lazyLoadImage = (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to lazy load image: ${src}`));
    img.src = src;
  });
};

// Optimisation des images en fonction de la taille de l'écran
export const getResponsiveImageUrl = (src: string, width: number): string => {
  // Cette fonction pourrait être adaptée pour utiliser un service d'images responsive
  // comme Cloudinary, Imgix, etc.
  // Pour l'instant, nous retournons simplement l'URL d'origine
  return src;
};

// Vérifier si une image est dans le viewport
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};