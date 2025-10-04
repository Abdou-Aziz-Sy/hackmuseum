import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  loading = "lazy",
  onLoad,
  onError 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div className={cn("bg-muted flex items-center justify-center", className)}>
        <div className="text-center text-muted-foreground">
          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-muted-foreground/20 flex items-center justify-center">
            <span className="text-xs">📷</span>
          </div>
          <p className="text-xs">Image non disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-muted-foreground/20 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
};

export default OptimizedImage;
