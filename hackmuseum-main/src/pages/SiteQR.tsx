import Navigation from "@/components/Navigation";
import SiteQRCode from "@/components/SiteQRCode";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Smartphone, Globe, Download } from "lucide-react";

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
            <div>
              <SiteQRCode />
            </div>

            {/* Informations et avantages */}
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Avantages de l'accès QR
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Accès instantané au site web</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Pas besoin de taper l'URL</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Partage facile avec d'autres visiteurs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Fonctionne sur tous les appareils</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Accès hors ligne après le premier scan</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Télécharger et partager
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Vous pouvez télécharger le QR code et l'imprimer pour le partager 
                    ou l'afficher dans vos locaux.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 border rounded-lg hover:bg-muted transition-colors text-center">
                      <Download className="h-6 w-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">Télécharger PNG</span>
                    </button>
                    <button className="p-3 border rounded-lg hover:bg-muted transition-colors text-center">
                      <Download className="h-6 w-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">Télécharger PDF</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section d'information supplémentaire */}
          <Card className="mt-12">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Fonctionnalités disponibles via QR Code</h3>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  En scannant ce QR code, vous accédez à toutes les fonctionnalités 
                  du Musée des Civilisations Noires en ligne.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <QrCode className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold">Galerie Interactive</h4>
                    <p className="text-sm text-muted-foreground">
                      Explorez notre collection complète avec des descriptions détaillées
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <Smartphone className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold">Réservations</h4>
                    <p className="text-sm text-muted-foreground">
                      Réservez votre visite directement depuis votre appareil mobile
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold">Expérience Multilingue</h4>
                    <p className="text-sm text-muted-foreground">
                      Contenu disponible en français, anglais et wolof
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SiteQR;
