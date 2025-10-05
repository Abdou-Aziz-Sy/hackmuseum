import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Minimize, 
  X,
  Eye,
  EyeOff,
  Info
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Model3DProps {
  modelUrl: string;
  title: string;
  description: string;
  is3D?: boolean;
  onClose?: () => void;
}

const Model3DViewer = ({ modelUrl, title, description, is3D = false, onClose }: Model3DProps) => {
  const { language } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulation d'un modèle 3D (en réalité, vous intégreriez Three.js ou Babylon.js)
  useEffect(() => {
    if (!is3D) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simulation d'un rendu 3D simple
    const draw3DModel = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Gradient de fond pour simuler la profondeur
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1a1a1a');
      gradient.addColorStop(1, '#2d2d2d');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Simulation d'une sculpture 3D
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.ellipse(canvas.width / 2, canvas.height / 2, 80, 120, 0, 0, 2 * Math.PI);
      ctx.fill();

      // Détails de la sculpture
      ctx.fillStyle = '#A0522D';
      ctx.beginPath();
      ctx.ellipse(canvas.width / 2, canvas.height / 2 - 20, 60, 100, 0, 0, 2 * Math.PI);
      ctx.fill();

      // Ombres pour l'effet 3D
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(canvas.width / 2 + 5, canvas.height / 2 + 5, 80, 120, 0, 0, 2 * Math.PI);
      ctx.fill();
    };

    draw3DModel();
    setIsLoading(false);
  }, [is3D]);

  const handleZoomIn = () => {
    // Logique de zoom
  };

  const handleZoomOut = () => {
    // Logique de zoom
  };

  const handleReset = () => {
    // Logique de reset
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      canvasRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!is3D) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Visualisation 2D
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            <img 
              src={modelUrl} 
              alt={title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'w-full'}`}>
      <Card className={`${isFullscreen ? 'h-full' : 'w-full'}`}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Visualisation 3D - {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
            {onClose && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Contrôles 3D */}
          <div className="flex items-center justify-center gap-2 p-2 bg-muted rounded-lg">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Canvas 3D */}
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Chargement du modèle 3D...</p>
                </div>
              </div>
            )}
            
            {error && (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <EyeOff className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Erreur de chargement du modèle 3D</p>
                </div>
              </div>
            )}

            <canvas
              ref={canvasRef}
              width={isFullscreen ? window.innerWidth - 100 : 400}
              height={isFullscreen ? window.innerHeight - 200 : 400}
              className="w-full h-auto border rounded-lg cursor-grab active:cursor-grabbing"
              style={{ display: isLoading || error ? 'none' : 'block' }}
            />
          </div>

          {/* Informations sur le modèle */}
          {showInfo && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Informations sur le modèle 3D</h4>
              <p className="text-sm text-muted-foreground mb-2">{description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">3D Model</Badge>
                <Badge variant="secondary">Interactive</Badge>
                <Badge variant="secondary">360° View</Badge>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Utilisez la souris pour faire tourner le modèle • Molette pour zoomer</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Model3DViewer;
