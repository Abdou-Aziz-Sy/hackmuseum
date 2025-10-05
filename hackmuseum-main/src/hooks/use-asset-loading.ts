import { useState, useEffect, useRef } from 'react';
import { preloadCriticalImages, lazyLoadImage, isInViewport } from '@/lib/asset-loader';

interface UseAssetLoadingOptions {
  preloadOnMount?: boolean;
  threshold?: number;
}

export function useAssetLoading(
  assetUrl: string,
  options: UseAssetLoadingOptions = {}
) {
  const { preloadOnMount = false, threshold = 0.1 } = options;
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (preloadOnMount) {
      preloadCriticalImages([assetUrl])
        .then(() => setIsLoaded(true))
        .catch((err) => setError(err));
    }
  }, [assetUrl, preloadOnMount]);

  useEffect(() => {
    if (!preloadOnMount && elementRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isLoaded) {
              lazyLoadImage(assetUrl)
                .then(() => setIsLoaded(true))
                .catch((err) => setError(err));
              observer.disconnect();
            }
          });
        },
        { threshold }
      );

      observer.observe(elementRef.current);
      return () => observer.disconnect();
    }
  }, [assetUrl, isLoaded, preloadOnMount, threshold]);

  return { isLoaded, error, elementRef };
}

export function usePreloadAssets(assetUrls: string[]) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let loadedCount = 0;
    const totalCount = assetUrls.length;

    const promises = assetUrls.map((url) => 
      lazyLoadImage(url)
        .then(() => {
          loadedCount++;
          setProgress(Math.floor((loadedCount / totalCount) * 100));
        })
    );

    Promise.all(promises)
      .then(() => setIsLoaded(true))
      .catch((err) => setError(err));
  }, [assetUrls]);

  return { isLoaded, progress, error };
}