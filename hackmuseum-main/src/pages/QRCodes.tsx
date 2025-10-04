import { Link } from "react-router-dom";
import { ArrowLeft, Printer } from "lucide-react";
import Navigation from "@/components/Navigation";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { artworks } from "@/data/artworks";

const QRCodes = () => {
  const { language } = useLanguage();
  const baseUrl = window.location.origin;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <Button asChild variant="ghost" className="mb-4">
              <Link to="/scan">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold">
              QR Codes des Œuvres
            </h1>
            <p className="text-xl text-muted-foreground mt-4">
              Scannez ces codes avec votre smartphone pour accéder aux détails des œuvres
            </p>
          </div>
          <Button onClick={handlePrint} className="print:hidden">
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <QRCodeGenerator
              key={artwork.id}
              value={`${baseUrl}/artwork/${artwork.id}`}
              title={artwork.title[language]}
              size={200}
            />
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg print:hidden">
          <h2 className="text-2xl font-bold mb-4">Instructions d'utilisation</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Imprimez cette page pour obtenir tous les QR codes</li>
            <li>• Placez les QR codes près des œuvres correspondantes</li>
            <li>• Les visiteurs pourront scanner avec leur smartphone</li>
            <li>• Chaque code redirige vers la page détaillée de l'œuvre</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default QRCodes;
