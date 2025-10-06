import Navigation from "@/components/Navigation";
import SiteQRCode from "@/components/SiteQRCode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Smartphone } from "lucide-react";

const SiteQR = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <QrCode className="h-12 w-12 text-primary" />
              Accès QR Code
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Accédez rapidement au Musée des Civilisations Noires en scannant ce QR code
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* QR Code principal */}
            <div className="flex justify-center items-center">
              <SiteQRCode />
            </div>

            {/* Instructions simples */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Comment utiliser le QR Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Ouvrez l'appareil photo</p>
                        <p className="text-sm text-muted-foreground">
                          Utilisez l'appareil photo de votre téléphone ou tablette
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Pointez vers le QR code</p>
                        <p className="text-sm text-muted-foreground">
                          Centrez le QR code dans le cadre de votre appareil photo
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Suivez le lien</p>
                        <p className="text-sm text-muted-foreground">
                          Appuyez sur la notification qui apparaît pour ouvrir le site
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SiteQR;
