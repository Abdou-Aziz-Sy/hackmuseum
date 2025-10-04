import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { ArrowRight, Headphones, MapPin, Calendar, Search, Filter, Grid, List, Eye } from "lucide-react";
import Navigation from "@/components/Navigation";
import CategoryFilter from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { artworks, categories } from "@/data/artworks";
import OptimizedImage from "@/components/OptimizedImage";

const Gallery = () => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"title" | "artist" | "period" | "origin">("title");

  // Calculer le nombre d'œuvres par catégorie
  const artworkCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(category => {
      counts[category.id] = artworks.filter(artwork => artwork.category === category.id).length;
    });
    return counts;
  }, []);

  // Filtrer et trier les œuvres
  const filteredArtworks = useMemo(() => {
    let filtered = artworks;
    
    // Filtrer par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter(artwork => artwork.category === selectedCategory);
    }
    
    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(artwork => 
        artwork.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.description[language].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Trier les œuvres
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title[language].localeCompare(b.title[language]);
        case "artist":
          return a.artist.localeCompare(b.artist);
        case "period":
          return a.period.localeCompare(b.period);
        case "origin":
          return a.origin.localeCompare(b.origin);
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [selectedCategory, searchTerm, sortBy, language]);

  // Obtenir la catégorie sélectionnée
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {selectedCategory === "all" ? t("ourCollection") : selectedCategoryData?.name[language]}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {selectedCategory === "all" 
              ? t("collectionDesc") 
              : selectedCategoryData?.description[language]
            }
          </p>
        </div>

        {/* Barre de recherche et contrôles */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t("searchArtworks") || "Rechercher des œuvres..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              artworkCounts={artworkCounts}
            />
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-border rounded-md bg-background text-sm"
              >
                <option value="title">{t("sortByTitle") || "Trier par titre"}</option>
                <option value="artist">{t("sortByArtist") || "Trier par artiste"}</option>
                <option value="period">{t("sortByPeriod") || "Trier par période"}</option>
                <option value="origin">{t("sortByOrigin") || "Trier par origine"}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Affichage des œuvres */}
        {filteredArtworks.length === 0 ? (
          <div className="text-center py-16">
            <Eye className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t("noArtworksFound") || "Aucune œuvre trouvée"}</h3>
            <p className="text-muted-foreground">{t("tryDifferentSearch") || "Essayez avec d'autres termes de recherche"}</p>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" 
            : "space-y-6"
          }>
            {filteredArtworks.map((artwork, index) => (
              <Card
                key={artwork.id}
                className={`overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-scale-in group border border-border/50 hover:border-primary/50 ${
                  viewMode === "list" ? "flex flex-col md:flex-row" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`relative overflow-hidden bg-muted ${
                  viewMode === "list" 
                    ? "w-full md:w-80 h-48 md:h-auto flex-shrink-0" 
                    : "aspect-square"
                }`}>
                  <OptimizedImage
                    src={artwork.image}
                    alt={artwork.title[language]}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Badges floating on hover */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                    <Badge variant="secondary" className="backdrop-blur-sm bg-background/90 text-xs px-2 py-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {artwork.origin}
                    </Badge>
                    <Badge variant="secondary" className="backdrop-blur-sm bg-background/90 text-xs px-2 py-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {artwork.period}
                    </Badge>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <Badge 
                      variant="default" 
                      className="backdrop-blur-sm text-xs px-2 py-1"
                    >
                      <span className="mr-1">
                        {categories.find(cat => cat.id === artwork.category)?.icon}
                      </span>
                      {categories.find(cat => cat.id === artwork.category)?.name[language]}
                    </Badge>
                  </div>

                  {/* Audio indicator */}
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Badge variant="secondary" className="backdrop-blur-sm text-xs px-2 py-1">
                      <Headphones className="h-3 w-3 mr-1" />
                      Audio
                    </Badge>
                  </div>
                </div>
                
                <div className={`flex-1 ${viewMode === "list" ? "flex flex-col" : ""}`}>
                  <CardContent className={`p-5 md:p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {artwork.title[language]}
                    </h3>
                    <p className="text-base md:text-lg text-muted-foreground mb-2 font-semibold">{artwork.artist}</p>
                    <p className={`text-sm text-muted-foreground ${viewMode === "list" ? "line-clamp-4" : "line-clamp-3"}`}>
                      {artwork.description[language]}
                    </p>
                    
                    {/* Informations supplémentaires en mode liste */}
                    {viewMode === "list" && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {artwork.origin}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {artwork.period}
                        </Badge>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className={`p-5 md:p-6 pt-0 flex gap-2 ${viewMode === "list" ? "mt-auto" : ""}`}>
                    <Button asChild variant="default" className="flex-1 group/btn text-sm">
                      <Link to={`/artwork/${artwork.id}`}>
                        {t("viewDetails")}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground flex-shrink-0">
                      <Headphones className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        )}
        
        {/* Statistiques */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="text-center">
            <p className="text-muted-foreground">
              {filteredArtworks.length} {filteredArtworks.length === 1 ? t("artwork") || "œuvre" : t("artworks") || "œuvres"} 
              {selectedCategory !== "all" && ` ${t("inCategory") || "dans la catégorie"} ${selectedCategoryData?.name[language]}`}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gallery;
