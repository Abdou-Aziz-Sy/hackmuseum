import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  QrCode, 
  Download, 
  Share2, 
  Smartphone,
  Globe,
  Copy,
  Check
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SiteQRCode = () => {
  const { language } = useLanguage();
  const [qrCodeData, setQrCodeData] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [siteUrl] = useState(window.location.origin);

  // Générer le QR code (simulation)
  useEffect(() => {
    // En réalité, vous utiliseriez une bibliothèque comme qrcode.js
    // Ici, nous simulons la génération d'un QR code
    setQrCodeData(siteUrl);
  }, [siteUrl]);

  const handleDownload = () => {
    // Logique de téléchargement du QR code
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 200;
    canvas.height = 200;
    
    // Simulation d'un QR code
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 200, 200);
    
    // Motif de QR code simulé
    for (let i = 0; i < 200; i += 10) {
      for (let j = 0; j < 200; j += 10) {
        if ((i + j) % 20 === 0) {
          ctx.fillStyle = '#fff';
          ctx.fillRect(i, j, 8, 8);
        }
      }
    }

    const link = document.createElement('a');
    link.download = 'mcn-qr-code.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Musée des Civilisations Noires',
          text: 'Découvrez notre collection en ligne',
          url: siteUrl,
        });
      } catch (err) {
        console.log('Erreur lors du partage:', err);
      }
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.log('Erreur lors de la copie:', err);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <QrCode className="h-5 w-5" />
          Accès QR Code
        </CardTitle>
        <CardDescription>
          Scannez ce code pour accéder rapidement au site
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* QR Code */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
              {/* Simulation d'un QR code */}
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 ${
                      Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
            <Badge className="absolute -top-2 -right-2">
              <Smartphone className="h-3 w-3 mr-1" />
              Scan
            </Badge>
          </div>
        </div>

        {/* URL du site */}
        <div className="space-y-2">
          <label className="text-sm font-medium">URL du site :</label>
          <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <code className="flex-1 text-sm font-mono">{siteUrl}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-8 p-0"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={handleDownload} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
          <Button onClick={handleShare} variant="outline" className="flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>1. Ouvrez l'appareil photo de votre téléphone</p>
          <p>2. Pointez vers le QR code</p>
          <p>3. Suivez le lien qui apparaît</p>
        </div>

        {/* Informations supplémentaires */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Fonctionnalités disponibles :</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Accès à la galerie complète</li>
            <li>• Réservation de visites</li>
            <li>• Descriptions audio multilingues</li>
            <li>• Visualisation 3D des œuvres</li>
            <li>• Discussions et partage</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteQRCode;
