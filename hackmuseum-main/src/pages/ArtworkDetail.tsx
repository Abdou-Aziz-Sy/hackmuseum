import { useParams, Link } from "react-router-dom";
import { ArrowLeft, QrCode, Share2, MapPin, Calendar, User, Clock, Eye, MessageCircle, Box } from "lucide-react";
import Navigation from "@/components/Navigation";
import TextToSpeechPlayer from "@/components/TextToSpeechPlayer";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import SimpleVRExperience from "@/components/SimpleVRExperience";
import Discussion from "@/components/Discussion";
import VisualDescription from "@/components/VisualDescription";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { artworks, categories } from "@/data/artworks";
import { toast } from "sonner";

const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  
  const artwork = artworks.find((a) => a.id === id);
  const similarArtworks = artworks.filter((a) => a.id !== id && a.category === artwork?.category).slice(0, 3);
  const baseUrl = window.location.origin;
  
  // Déterminer si l'œuvre est en 3D (simulation basée sur la catégorie)
  const is3D = artwork?.category === 'sculpture' || artwork?.category === 'masks';

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Œuvre non trouvée</h1>
          <Button asChild>
            <Link to="/gallery">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backToGallery")}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artwork.title[language],
        text: artwork.description[language],
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papier");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/gallery">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("backToGallery")}
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image et visualisations */}
          <div className="space-y-6 animate-fade-in sticky top-24">
            {/* Visualiseur 3D/2D */}
            <div className="relative">
              <img 
                src={artwork.image} 
                alt={artwork.title[language]}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              {is3D && (
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    3D
                  </Badge>
                </div>
              )}
            </div>
            
            {/* Boutons d'action */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <QrCode className="mr-2 h-4 w-4" />
                    QR Code
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{artwork.title[language]}</DialogTitle>
                  </DialogHeader>
                  <div className="flex justify-center py-4">
                    <QRCodeGenerator
                      value={`${baseUrl}/artwork/${artwork.id}`}
                      title={artwork.title[language]}
                      size={256}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Boutons d'expérience enrichie */}
            <div className="grid grid-cols-1 gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    Description Visuelle
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Description Visuelle - {artwork.title[language]}</DialogTitle>
                  </DialogHeader>
                  <VisualDescription artwork={artwork} />
                </DialogContent>
              </Dialog>

              {is3D && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Box className="mr-2 h-4 w-4" />
                      Expérience VR
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Expérience VR - {artwork.title[language]}</DialogTitle>
                    </DialogHeader>
                    <SimpleVRExperience
                      artworkId={artwork.id}
                      artworkTitle={artwork.title[language]}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {artwork.title[language]}
              </h1>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t("artist")}</p>
                      <p className="font-semibold">{artwork.artist}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t("period")}</p>
                      <p className="font-semibold">{artwork.period}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t("origin")}</p>
                      <p className="font-semibold">{artwork.origin}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <span className="text-lg">
                        {categories.find(cat => cat.id === artwork.category)?.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t("category")}</p>
                      <p className="font-semibold">
                        {categories.find(cat => cat.id === artwork.category)?.name[language]}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm py-1">
                  <span className="mr-1">
                    {categories.find(cat => cat.id === artwork.category)?.icon}
                  </span>
                  {categories.find(cat => cat.id === artwork.category)?.name[language]}
                </Badge>
                <Badge variant="secondary" className="text-sm py-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {artwork.origin}
                </Badge>
                <Badge variant="secondary" className="text-sm py-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  {artwork.period}
                </Badge>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t("listenAudio") || "Écouter la description"}</CardTitle>
              </CardHeader>
              <CardContent>
                <TextToSpeechPlayer
                  text={artwork.description[language]}
                  title={artwork.title[language]}
                  language={language === "fr" ? "fr-FR" : language === "en" ? "en-US" : "fr-FR"}
                />
              </CardContent>
            </Card>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">{t("description")}</TabsTrigger>
                <TabsTrigger value="history">{t("artworkHistory")}</TabsTrigger>
                <TabsTrigger value="context">{t("culturalContext")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card className="border-2">
                  <CardContent className="pt-6 space-y-4">
                    <p className="text-lg leading-relaxed">
                      {artwork.description[language]}
                    </p>
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium mb-2 text-muted-foreground">Écouter cette section :</h4>
                      <TextToSpeechPlayer
                        text={artwork.description[language]}
                        title={`Description - ${artwork.title[language]}`}
                        language={language === "fr" ? "fr-FR" : language === "en" ? "en-US" : "fr-FR"}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="mt-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Timeline de l'œuvre
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative pl-8 border-l-2 border-primary/20">
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
                      <p className="text-lg leading-relaxed pb-6">
                        {artwork.history[language]}
                      </p>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium mb-2 text-muted-foreground">Écouter l'histoire :</h4>
                      <TextToSpeechPlayer
                        text={artwork.history[language]}
                        title={`Histoire - ${artwork.title[language]}`}
                        language={language === "fr" ? "fr-FR" : language === "en" ? "en-US" : "fr-FR"}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="context" className="mt-6">
                <Card className="border-2 bg-gradient-to-br from-primary/5 to-transparent">
                  <CardContent className="pt-6 space-y-4">
                    <p className="text-lg leading-relaxed">
                      {artwork.culturalContext[language]}
                    </p>
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium mb-2 text-muted-foreground">Écouter le contexte culturel :</h4>
                      <TextToSpeechPlayer
                        text={artwork.culturalContext[language]}
                        title={`Contexte culturel - ${artwork.title[language]}`}
                        language={language === "fr" ? "fr-FR" : language === "en" ? "en-US" : "fr-FR"}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Section de discussion */}
        <div className="mt-16 animate-fade-in">
          <Discussion 
            artworkId={artwork.id} 
            artworkTitle={artwork.title[language]} 
          />
        </div>

        {/* Similar Artworks */}
        {similarArtworks.length > 0 && (
          <div className="mt-20 animate-fade-in">
            <h2 className="text-3xl font-bold mb-8">
              {language === "fr"
                ? "Œuvres similaires"
                : language === "en"
                ? "Similar artworks"
                : "Liggéey yu mel ni"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarArtworks.map((similar) => (
                <Link
                  key={similar.id}
                  to={`/artwork/${similar.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={similar.image}
                        alt={similar.title[language]}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                        {similar.title[language]}
                      </h3>
                      <p className="text-sm text-muted-foreground">{similar.artist}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ArtworkDetail;
