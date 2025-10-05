import { useState } from "react";
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

interface Simple3DViewerProps {
  modelUrl: string;
  title: string;
  description: string;
  is3D?: boolean;
  onClose?: () => void;
}

const Simple3DViewer = ({ modelUrl, title, description, is3D = false, onClose }: Simple3DViewerProps) => {
  const { language } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleError = () => {
    setIsLoading(false);
    setError("Erreur de chargement du modèle 3D");
  };

  const resetView = () => {
    // Simulation de reset de vue
    console.log("Reset view");
  };

  const zoomIn = () => {
    console.log("Zoom in");
  };

  const zoomOut = () => {
    console.log("Zoom out");
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 ${isFullscreen ? 'p-0' : ''}`}>
      <Card className={`w-full max-w-4xl bg-background ${isFullscreen ? 'h-full max-w-none' : 'max-h-[90vh]'}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            {is3D && <Badge variant="secondary">3D</Badge>}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={resetView}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
            {onClose && (
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="relative bg-muted rounded-lg aspect-video flex items-center justify-center">
            {isLoading && (
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-sm text-muted-foreground">Chargement du modèle 3D...</p>
              </div>
            )}
            
            {error && (
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                  <X className="h-8 w-8 text-destructive" />
                </div>
                <p className="text-destructive font-medium">Erreur de chargement</p>
                <p className="text-sm text-muted-foreground">{error}</p>
                <Button variant="outline" size="sm" onClick={() => {
                  setIsLoading(true);
                  setError(null);
                }}>
                  Réessayer
                </Button>
              </div>
            )}
            
            {!isLoading && !error && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Eye className="h-12 w-12 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Visualisation 3D</h3>
                    <p className="text-sm text-muted-foreground">
                      {is3D ? "Modèle 3D interactif" : "Visualisation standard"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      URL: {modelUrl}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {description && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Description</span>
              </div>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Simple3DViewer;
