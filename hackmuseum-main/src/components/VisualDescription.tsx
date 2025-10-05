import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Volume2, 
  Play, 
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Info,
  Palette,
  Ruler,
  Calendar,
  MapPin
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VisualDescriptionProps {
  artwork: {
    id: string;
    title: { fr: string; en: string; wo: string };
    artist: string;
    period: string;
    origin: string;
    image: string;
    description: { fr: string; en: string; wo: string };
    dimensions?: string;
    materials?: string[];
    techniques?: string[];
  };
}

const VisualDescription = ({ artwork }: VisualDescriptionProps) => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(100);
  const [showDetails, setShowDetails] = useState(false);
  const [activeLayer, setActiveLayer] = useState<'overview' | 'details' | 'technique'>('overview');

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleZoomIn = () => {
    setCurrentZoom(prev => Math.min(prev + 25, 300));
  };

  const handleZoomOut = () => {
    setCurrentZoom(prev => Math.max(prev - 25, 50));
  };

  const handleReset = () => {
    setCurrentZoom(100);
    setActiveLayer('overview');
  };

  const layers = [
    {
      id: 'overview',
      name: 'Vue d\'ensemble',
      description: 'Description générale de l\'œuvre',
      icon: Eye
    },
    {
      id: 'details',
      name: 'Détails',
      description: 'Éléments spécifiques et motifs',
      icon: ZoomIn
    },
    {
      id: 'technique',
      name: 'Technique',
      description: 'Méthodes et matériaux utilisés',
      icon: Palette
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Description Visuelle
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Contrôles de navigation */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {layers.map((layer) => (
              <Button
                key={layer.id}
                variant={activeLayer === layer.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveLayer(layer.id as any)}
                className="flex items-center gap-2"
              >
                <layer.icon className="h-4 w-4" />
                {layer.name}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[3rem] text-center">
              {currentZoom}%
            </span>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Zone de visualisation */}
        <div className="relative border rounded-lg overflow-hidden bg-muted/30">
          <div 
            className="relative transition-transform duration-300"
            style={{ transform: `scale(${currentZoom / 100})` }}
          >
            <img
              src={artwork.image}
              alt={artwork.title[language]}
              className="w-full h-auto"
            />
            
            {/* Overlay de description selon la couche active */}
            {activeLayer === 'overview' && (
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 max-w-xs">
                <h4 className="font-semibold text-sm">{artwork.title[language]}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {artwork.description[language].substring(0, 100)}...
                </p>
              </div>
            )}
            
            {activeLayer === 'details' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Annotations de détails simulées */}
                <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-red-500 rounded-full flex items-center justify-center">
                  <span className="text-red-500 font-bold text-sm">1</span>
                </div>
                <div className="absolute top-1/3 right-1/4 w-12 h-12 border-2 border-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-blue-500 font-bold text-sm">2</span>
                </div>
                <div className="absolute bottom-1/3 left-1/3 w-14 h-14 border-2 border-green-500 rounded-full flex items-center justify-center">
                  <span className="text-green-500 font-bold text-sm">3</span>
                </div>
              </div>
            )}
            
            {activeLayer === 'technique' && (
              <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 max-w-xs">
                <h4 className="font-semibold text-sm mb-2">Techniques</h4>
                <div className="space-y-1">
                  {artwork.materials?.map((material, index) => (
                    <Badge key={index} variant="secondary" className="text-xs mr-1">
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Légende des annotations (pour la couche détails) */}
        {activeLayer === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
              <div className="w-4 h-4 border-2 border-red-500 rounded-full flex items-center justify-center">
                <span className="text-red-500 font-bold text-xs">1</span>
              </div>
              <div>
                <p className="text-sm font-medium">Motif principal</p>
                <p className="text-xs text-muted-foreground">Élément central de l'œuvre</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
              <div className="w-4 h-4 border-2 border-blue-500 rounded-full flex items-center justify-center">
                <span className="text-blue-500 font-bold text-xs">2</span>
              </div>
              <div>
                <p className="text-sm font-medium">Détails décoratifs</p>
                <p className="text-xs text-muted-foreground">Ornements secondaires</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
              <div className="w-4 h-4 border-2 border-green-500 rounded-full flex items-center justify-center">
                <span className="text-green-500 font-bold text-xs">3</span>
              </div>
              <div>
                <p className="text-sm font-medium">Signature</p>
                <p className="text-xs text-muted-foreground">Marque de l'artiste</p>
              </div>
            </div>
          </div>
        )}

        {/* Informations techniques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Info className="h-4 w-4" />
              Informations
            </h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Dimensions :</span>
                <span>{artwork.dimensions || "Non spécifiées"}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Période :</span>
                <span>{artwork.period}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Origine :</span>
                <span>{artwork.origin}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Matériaux & Techniques
            </h4>
            
            <div className="space-y-2">
              {artwork.materials && (
                <div>
                  <p className="text-sm font-medium mb-1">Matériaux :</p>
                  <div className="flex flex-wrap gap-1">
                    {artwork.materials.map((material, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {artwork.techniques && (
                <div>
                  <p className="text-sm font-medium mb-1">Techniques :</p>
                  <div className="flex flex-wrap gap-1">
                    {artwork.techniques.map((technique, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {technique}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contrôles audio */}
        <div className="flex items-center justify-center gap-4 p-4 bg-muted/50 rounded-lg">
          <Button
            variant={isPlaying ? "default" : "outline"}
            onClick={handlePlay}
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? "Pause" : "Écouter"}
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Volume2 className="h-4 w-4" />
            Description audio disponible
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualDescription;
