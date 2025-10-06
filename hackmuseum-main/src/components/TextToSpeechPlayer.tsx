import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface TextToSpeechPlayerProps {
  text: string;
  title: string;
  language?: string;
}

const TextToSpeechPlayer = ({ text, title, language = "fr-FR" }: TextToSpeechPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [isSupported, setIsSupported] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Vérifier si l'API Speech Synthesis est supportée
    setIsSupported('speechSynthesis' in window);
    setTotalLength(text.length);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, [text]);

  const startProgressTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (speechSynthesis.speaking && !speechSynthesis.paused) {
        // Estimation approximative de la position basée sur le temps
        setCurrentPosition(prev => {
          const increment = rate * 20; // Ajuster selon le débit
          return Math.min(prev + increment, totalLength);
        });
      }
    }, 100);
  };

  const stopProgressTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const speak = () => {
    if (!isSupported) return;

    // Arrêter toute lecture en cours
    speechSynthesis.cancel();

    // Créer une nouvelle utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Configuration de la voix
    utterance.lang = language;
    utterance.volume = isMuted ? 0 : volume;
    utterance.rate = rate;
    utterance.pitch = 1;

    // Essayer de trouver une voix française
    const voices = speechSynthesis.getVoices();
    const frenchVoice = voices.find(voice => 
      voice.lang.startsWith('fr') || voice.name.toLowerCase().includes('french')
    );
    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }

    // Événements
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      startProgressTracking();
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentPosition(totalLength);
      stopProgressTracking();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      stopProgressTracking();
    };

    utterance.onpause = () => {
      setIsPaused(true);
      stopProgressTracking();
    };

    utterance.onresume = () => {
      setIsPaused(false);
      startProgressTracking();
    };

    // Démarrer la lecture
    speechSynthesis.speak(utterance);
  };

  const togglePlay = () => {
    if (!isSupported) return;

    if (isPlaying) {
      if (isPaused) {
        speechSynthesis.resume();
      } else {
        speechSynthesis.pause();
      }
    } else {
      speak();
    }
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentPosition(0);
    stopProgressTracking();
  };

  const restart = () => {
    stop();
    setTimeout(() => {
      speak();
    }, 100);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    
    // Appliquer le volume à l'utterance en cours
    if (utteranceRef.current && isPlaying) {
      // Redémarrer avec le nouveau volume
      const wasPlaying = isPlaying && !isPaused;
      speechSynthesis.cancel();
      if (wasPlaying) {
        setTimeout(() => speak(), 100);
      }
    }
  };

  const handleRateChange = (value: number[]) => {
    setRate(value[0]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (utteranceRef.current && isPlaying) {
      const wasPlaying = isPlaying && !isPaused;
      speechSynthesis.cancel();
      if (wasPlaying) {
        setTimeout(() => speak(), 100);
      }
    }
  };

  const formatProgress = (position: number, total: number) => {
    const percentage = total > 0 ? Math.round((position / total) * 100) : 0;
    return `${percentage}%`;
  };

  if (!isSupported) {
    return (
      <div className="w-full bg-card border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground text-center">
          La synthèse vocale n'est pas supportée par votre navigateur.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-4">
        <Button
          size="icon"
          variant="outline"
          onClick={togglePlay}
          className="shrink-0"
        >
          {isPlaying && !isPaused ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={restart}
          className="shrink-0 h-8 w-8"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <div className="flex-1 space-y-2">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${totalLength > 0 ? (currentPosition / totalLength) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatProgress(currentPosition, totalLength)}</span>
            <span>Lecture audio</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleMute}
            className="h-8 w-8"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <div className="w-20 hidden sm:block">
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Contrôle de vitesse */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Vitesse:</span>
        <div className="flex-1 max-w-32">
          <Slider
            value={[rate]}
            min={0.5}
            max={2}
            step={0.1}
            onValueChange={handleRateChange}
            className="cursor-pointer"
          />
        </div>
        <span className="text-muted-foreground min-w-8">{rate.toFixed(1)}x</span>
      </div>

      <div className="text-xs text-muted-foreground">
        <p className="mb-2 font-medium">Texte à lire :</p>
        <p className="line-clamp-3 italic">"{text}"</p>
      </div>
    </div>
  );
};

export default TextToSpeechPlayer;
