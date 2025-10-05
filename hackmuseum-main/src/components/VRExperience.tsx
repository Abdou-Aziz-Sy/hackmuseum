import { useState, useRef, useEffect } from "react";
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

interface VRExperienceProps {
  artworkId: string;
  artworkTitle: string;
  contextDescription: string;
  onClose?: () => void;
}

const VRExperience = ({ artworkId, artworkTitle, contextDescription, onClose }: VRExperienceProps) => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scenes = [
    {
      id: 0,
      title: "Contexte Historique",
      description: "Découvrez l'époque et le lieu de création de cette œuvre",
      duration: 30
    },
    {
      id: 1,
      title: "Techniques Artistiques",
      description: "Explorez les méthodes utilisées par l'artiste",
      duration: 25
    },
    {
      id: 2,
      title: "Signification Culturelle",
      description: "Comprenez la portée symbolique de l'œuvre",
      duration: 35
    }
  ];

  // Simulation d'une expérience VR
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawVRScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fond panoramique
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.5, '#16213e');
      gradient.addColorStop(1, '#0f3460');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Simulation d'un environnement 3D
      const time = Date.now() * 0.001;
      
      // Étoiles
      for (let i = 0; i < 100; i++) {
        const x = (Math.sin(time + i) * canvas.width / 2) + canvas.width / 2;
        const y = (Math.cos(time + i * 0.5) * canvas.height / 2) + canvas.height / 2;
        const size = Math.sin(time + i) * 2 + 1;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(time + i) * 0.5 + 0.5})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Objet central (l'œuvre)
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.ellipse(canvas.width / 2, canvas.height / 2, 100, 150, time * 0.1, 0, 2 * Math.PI);
      ctx.fill();

      // Effet de profondeur
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(canvas.width / 2 + 10, canvas.height / 2 + 10, 100, 150, time * 0.1, 0, 2 * Math.PI);
      ctx.fill();
    };

    const animate = () => {
      drawVRScene();
      if (isPlaying) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
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

  const nextScene = () => {
    setCurrentScene((prev) => (prev + 1) % scenes.length);
  };

  const resetExperience = () => {
    setCurrentScene(0);
    setIsPlaying(false);
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'w-full'}`}>
      <Card className={`${isFullscreen ? 'h-full' : 'w-full'}`}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Box className="h-5 w-5" />
            Expérience VR - {artworkTitle}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Headphones className="h-3 w-3" />
              Audio disponible
            </Badge>
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
              {isFullscreen ? <X className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
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
          {/* Contrôles VR */}
          <div className="flex items-center justify-center gap-2 p-3 bg-muted rounded-lg">
            <Button variant="outline" size="sm" onClick={resetExperience}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button 
              variant={isPlaying ? "default" : "outline"} 
              size="sm" 
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={nextScene}>
              Suivant
            </Button>
          </div>

          {/* Canvas VR */}
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={isFullscreen ? window.innerWidth - 100 : 600}
              height={isFullscreen ? window.innerHeight - 200 : 400}
              className="w-full h-auto border rounded-lg cursor-grab active:cursor-grabbing"
            />
            
            {/* Overlay d'information */}
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 max-w-xs">
              <h4 className="font-semibold text-sm">{scenes[currentScene].title}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {scenes[currentScene].description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-full bg-muted rounded-full h-1">
                  <div 
                    className="bg-primary h-1 rounded-full transition-all duration-300"
                    style={{ width: `${(currentScene + 1) * 33.33}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {scenes[currentScene].duration}s
                </span>
              </div>
            </div>
          </div>

          {/* Informations contextuelles */}
          {showInfo && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Contexte de l'œuvre</h4>
              <p className="text-sm text-muted-foreground mb-3">{contextDescription}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Réalité Virtuelle</Badge>
                <Badge variant="secondary">Audio 3D</Badge>
                <Badge variant="secondary">Interaction</Badge>
                <Badge variant="secondary">360°</Badge>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="text-center text-sm text-muted-foreground space-y-1">
            <p>Utilisez la souris pour regarder autour • Cliquez et glissez pour naviguer</p>
            <p>Portez des écouteurs pour une expérience audio immersive</p>
          </div>

          {/* Scènes disponibles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {scenes.map((scene, index) => (
              <Button
                key={scene.id}
                variant={currentScene === index ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentScene(index)}
                className="justify-start text-left h-auto p-3"
              >
                <div>
                  <div className="font-medium text-xs">{scene.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {scene.duration}s
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VRExperience;
