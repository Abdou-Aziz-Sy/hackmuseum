import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import QRScanner from "@/components/QRScanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QrCode, Search, Camera, Grid3x3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { artworks } from "@/data/artworks";
import { toast } from "sonner";

const Scan = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof artworks>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      
      // Recherche par ID direct
      if (/^\d+$/.test(searchQuery)) {
        const artwork = artworks.find(a => a.id === searchQuery);
        if (artwork) {
          navigate(`/artwork/${searchQuery}`);
          return;
        }
      }
      
      // Recherche par nom ou pays
      const results = artworks.filter(artwork => 
        artwork.title.fr.toLowerCase().includes(query) ||
        artwork.title.en.toLowerCase().includes(query) ||
        artwork.title.wo.toLowerCase().includes(query) ||
        artwork.origin.toLowerCase().includes(query) ||
        artwork.artist.toLowerCase().includes(query)
      );
      
      if (results.length === 1) {
        navigate(`/artwork/${results[0].id}`);
      } else if (results.length > 1) {
        setSearchResults(results);
        setShowResults(true);
      } else {
        toast.error(
          language === "fr"
            ? "Aucune œuvre trouvée"
            : language === "en"
            ? "No artwork found"
            : "Kenn gisul liggéey"
        );
      }
    } else {
      toast.error(
        language === "fr"
          ? "Veuillez entrer un terme de recherche"
          : language === "en"
          ? "Please enter a search term"
          : "Duggal benn baat"
      );
    }
  };

  const handleScanSuccess = (decodedText: string) => {
    setShowScanner(false);
    
    // Extract artwork ID from URL
    const url = new URL(decodedText);
    const pathParts = url.pathname.split('/');
    const artworkId = pathParts[pathParts.length - 1];
    
    if (artworkId) {
      navigate(`/artwork/${artworkId}`);
      toast.success(
        language === "fr"
          ? "QR Code scanné avec succès !"
          : language === "en"
          ? "QR Code scanned successfully!"
          : "QR Code scanné !"
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {showScanner && (
        <QRScanner
          onScanSuccess={handleScanSuccess}
          onClose={() => setShowScanner(false)}
        />
      )}
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <QrCode className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === "fr"
                ? "Scanner un QR Code"
                : language === "en"
                ? "Scan QR Code"
                : "Scan QR Code"}
            </h1>
            <p className="text-xl text-muted-foreground">
              {language === "fr"
                ? "Scannez le code QR près d'une œuvre ou entrez son identifiant"
                : language === "en"
                ? "Scan the QR code near an artwork or enter its identifier"
                : "Scan QR code bu nekk ci buntu liggéey bi wala duggal ID"}
            </p>
          </div>

          <div className="space-y-4 animate-scale-in">
            <Button
              onClick={() => setShowScanner(true)}
              size="lg"
              className="w-full h-20 text-lg"
            >
              <Camera className="mr-3 h-6 w-6" />
              {language === "fr"
                ? "Scanner avec la caméra"
                : language === "en"
                ? "Scan with camera"
                : "Scan ak caméra"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {language === "fr" ? "ou" : language === "en" ? "or" : "walla"}
                </span>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  {language === "fr"
                    ? "Rechercher une œuvre"
                    : language === "en"
                    ? "Search for an artwork"
                    : "Seet benn liggéey"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder={
                      language === "fr"
                        ? "Nom de l'œuvre, pays ou ID..."
                        : language === "en"
                        ? "Artwork name, country or ID..."
                        : "Turu liggéey, réew walla ID..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Button onClick={handleSearch}>
                    {language === "fr" ? "Rechercher" : language === "en" ? "Search" : "Seet"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  {language === "fr"
                    ? "Exemples: Masque, Sénégal, Mali, 1, 2..."
                    : language === "en"
                    ? "Examples: Mask, Senegal, Mali, 1, 2..."
                    : "Misaal: Mask, Sénégal, Mali, 1, 2..."}
                </p>
                
                {/* Résultats de recherche */}
                {showResults && searchResults.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-semibold text-sm">
                      {language === "fr" ? "Résultats trouvés:" : "Search results:"}
                    </h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {searchResults.map((artwork) => (
                        <Button
                          key={artwork.id}
                          variant="outline"
                          className="w-full justify-start text-left"
                          onClick={() => navigate(`/artwork/${artwork.id}`)}
                        >
                          <div>
                            <div className="font-semibold">{artwork.title[language]}</div>
                            <div className="text-sm text-muted-foreground">
                              {artwork.artist} • {artwork.origin}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <Grid3x3 className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-2">
                {language === "fr"
                  ? "Besoin des QR Codes ?"
                  : language === "en"
                  ? "Need QR Codes?"
                  : "Bëgg na QR Codes?"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === "fr"
                  ? "Consultez tous les QR codes des œuvres à imprimer"
                  : language === "en"
                  ? "View all artwork QR codes to print"
                  : "Xool QR codes yi"}
              </p>
              <Button asChild variant="outline">
                <Link to="/qr-codes">
                  {language === "fr"
                    ? "Voir les QR Codes"
                    : language === "en"
                    ? "View QR Codes"
                    : "Xool QR Codes"}
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <QrCode className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">
                  {language === "fr" ? "Au musée" : language === "en" ? "At the museum" : "Ci musée bi"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === "fr"
                    ? "Scannez les codes QR près des œuvres avec votre smartphone"
                    : language === "en"
                    ? "Scan QR codes near artworks with your smartphone"
                    : "Scan QR code yi nekk ci buntu liggéey yi ak smartphone"}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Search className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-bold mb-2">
                  {language === "fr" ? "À distance" : language === "en" ? "Remotely" : "Ci kaw"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === "fr"
                    ? "Recherchez directement les œuvres par leur identifiant unique"
                    : language === "en"
                    ? "Search artworks directly by their unique identifier"
                    : "Seet liggéey yi ci ID bu kenn"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Scan;
