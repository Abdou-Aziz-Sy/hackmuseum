import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Box, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Maximize,
  RotateCcw,
  Info,
  X,
  Headphones
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SimpleVRExperienceProps {
  artworkId: string;
  artworkTitle: string;
  onClose?: () => void;
}

const SimpleVRExperience = ({ artworkId, artworkTitle, onClose }: SimpleVRExperienceProps) => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const resetView = () => {
    console.log("Reset VR view");
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 ${isFullscreen ? 'p-0' : ''}`}>
      <Card className={`w-full max-w-5xl bg-background ${isFullscreen ? 'h-full max-w-none' : 'max-h-[90vh]'}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-bold">Expérience VR - {artworkTitle}</CardTitle>
            <Badge variant="secondary">VR</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={resetView}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={toggleFullscreen}>
              <Maximize className="h-4 w-4" />
            </Button>
            {onClose && (
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="relative bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg aspect-video flex items-center justify-center overflow-hidden">
            {isLoading && (
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                <p className="text-sm text-white/80">Chargement de l'expérience VR...</p>
              </div>
            )}
            
            {!isLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4 text-white">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                    <Box className="h-16 w-16 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">Expérience VR Immersive</h3>
                    <p className="text-sm text-white/80">
                      Explorez l'œuvre dans un environnement virtuel
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <Button 
                      onClick={togglePlay}
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {isPlaying ? 'Pause' : 'Démarrer'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Audio Guide</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Écoutez la description audio de l'œuvre pendant l'expérience VR
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Contrôles</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Utilisez la souris pour regarder autour et les touches pour vous déplacer
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleVRExperience;
