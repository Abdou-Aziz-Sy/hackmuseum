// Service d'optimisation des performances
class PerformanceService {
  private imageCache = new Map<string, HTMLImageElement>();
  private preloadedImages = new Set<string>();
  private intersectionObserver?: IntersectionObserver;
  private imageQuality = 75;

  // Initialiser l'Intersection Observer pour le lazy loading
  initializeLazyLoading() {
    if (typeof window === 'undefined') return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const dataSrc = img.getAttribute('data-src');
            
            if (dataSrc && !img.src) {
              this.loadImage(dataSrc).then((loadedImg) => {
                img.src = loadedImg.src;
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-loaded');
                this.intersectionObserver?.unobserve(img);
              }).catch(() => {
                img.classList.add('lazy-error');
                this.intersectionObserver?.unobserve(img);
              });
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );
  }

  // Précharger les images critiques
  async preloadCriticalImages(urls: string[]): Promise<void> {
    const preloadPromises = urls
      .filter(url => !this.preloadedImages.has(url))
      .slice(0, 3) // Limiter à 3 images pour ne pas surcharger
      .map(async (url) => {
        try {
          await this.loadImage(url);
          this.preloadedImages.add(url);
        } catch (error) {
          console.warn(`Échec du préchargement de l'image: ${url}`);
        }
      });

    await Promise.all(preloadPromises);
  }

  // Charger une image avec mise en cache
  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      // Vérifier le cache en premier
      if (this.imageCache.has(src)) {
        resolve(this.imageCache.get(src)!);
        return;
      }

      const img = new Image();
      
      img.onload = () => {
        this.imageCache.set(src, img);
        resolve(img);
      };
      
      img.onerror = () => {
        reject(new Error(`Impossible de charger l'image: ${src}`));
      };

      // Optimiser la qualité de l'image si possible
      img.src = this.optimizeImageUrl(src);
    });
  }

  // Optimiser l'URL de l'image selon le contexte
  private optimizeImageUrl(src: string): string {
    // Si c'est une image locale ou data URL, retourner telle quelle
    if (src.startsWith('data:') || src.startsWith('blob:') || src.startsWith('/')) {
      return src;
    }

    // Pour les CDN ou services externes, on pourrait ajouter des paramètres d'optimisation
    // Exemple: Cloudinary, Imgix, etc.
    if (src.includes('cloudinary.com')) {
      return `${src}?q_auto,f_auto,w_800`;
    }

    return src;
  }

  // Compresser une image côté client
  async compressImage(file: File, maxWidth = 800, quality = 0.8): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculer les nouvelles dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // Optimiser le contexte pour de meilleures performances
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Dessiner l'image redimensionnée
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convertir en blob avec compression
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, 'image/jpeg', quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  // Générer une image placeholder en base64
  generatePlaceholder(width: number, height: number, color = '#E5E7EB'): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    
    // Ajouter un motif subtil
    ctx.fillStyle = '#D1D5DB';
    const patternSize = 20;
    for (let x = 0; x < width; x += patternSize * 2) {
      for (let y = 0; y < height; y += patternSize * 2) {
        ctx.fillRect(x, y, patternSize, patternSize);
        ctx.fillRect(x + patternSize, y + patternSize, patternSize, patternSize);
      }
    }
    
    return canvas.toDataURL('image/png');
  }

  // Observer une image pour le lazy loading
  observeImage(img: HTMLImageElement) {
    if (this.intersectionObserver) {
      img.classList.add('lazy-loading');
      this.intersectionObserver.observe(img);
    }
  }

  // Nettoyer le cache (à appeler lors du démontage)
  clearCache() {
    this.imageCache.clear();
    this.preloadedImages.clear();
    
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  // Optimiser les performances de scrolling
  optimizeScrolling() {
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        requestAnimationFrame(() => {
          // Code d'optimisation du scroll ici
          isScrolling = false;
        });
        isScrolling = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }

  // Mesurer les performances des images
  measureImagePerformance() {
    if (typeof window === 'undefined') return;

    // Mesurer le temps de chargement des images
    const imageObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name.match(/\.(jpg|jpeg|png|webp|svg)$/i)) {
          console.log(`Image ${entry.name} chargée en ${entry.duration.toFixed(2)}ms`);
        }
      });
    });

    try {
      imageObserver.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.warn('PerformanceObserver not supported');
    }

    return imageObserver;
  }

  // Précharger les images de la prochaine page/section
  async preloadNextPageImages(urls: string[]) {
    // Attendre que les images critiques actuelles soient chargées
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Précharger en arrière-plan avec une priorité faible
    urls.slice(0, 5).forEach((url, index) => {
      setTimeout(() => {
        this.loadImage(url).catch(() => {
          // Ignorer les erreurs de préchargement
        });
      }, index * 200); // Étaler le chargement
    });
  }

  // Configuration de la qualité d'image basée sur la connexion
  adaptToNetworkConditions() {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      if (connection) {
        switch (connection.effectiveType) {
          case 'slow-2g':
          case '2g':
            this.imageQuality = 30;
            break;
          case '3g':
            this.imageQuality = 50;
            break;
          case '4g':
          default:
            this.imageQuality = 75;
            break;
        }
      }
    }
  }

  // Obtenir les statistiques de performance
  getPerformanceStats() {
    return {
      cachedImages: this.imageCache.size,
      preloadedImages: this.preloadedImages.size,
      imageQuality: this.imageQuality,
    };
  }
}

export const performanceService = new PerformanceService();
export default performanceService;