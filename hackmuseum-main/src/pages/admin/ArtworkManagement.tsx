import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { artworks, categories } from "@/data/artworks";
import { Artwork } from "@/data/artworks";
import { Plus, Edit, Trash2, Eye, Search, Filter, Upload, Download, BarChart3, QrCode, AlertTriangle, CheckCircle, Info, Calendar, Clock, Tag, MapPin, User, Globe, History, FileText } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import AdminNavigation from "@/components/AdminNavigation";
import { usePreloadAssets } from "@/hooks/use-asset-loading";

const ArtworkManagement = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [artworksList, setArtworksList] = useState<Artwork[]>(artworks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [artworkToDelete, setArtworkToDelete] = useState<Artwork | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
  } | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<'title' | 'artist' | 'date'>('title');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedArtworks, setSelectedArtworks] = useState<string[]>([]);
  const [isMultipleSelectionMode, setIsMultipleSelectionMode] = useState(false);
  const [formData, setFormData] = useState({
    title: { fr: "", en: "", wo: "" },
    artist: "",
    period: "",
    origin: "",
    category: "",
    description: { fr: "", en: "", wo: "" },
    history: { fr: "", en: "", wo: "" },
    culturalContext: { fr: "", en: "", wo: "" },
    image: "",
    featured: false,
    dateAdded: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    qrCodeEnabled: true,
    audioGuideUrl: "",
    dimensions: "",
    materials: "",
    conservationStatus: "good",
    exhibitionHistory: "",
    tags: [] as string[],
  });

  // Préchargement des images des œuvres
  const { isLoaded: imagesLoaded } = usePreloadAssets(
    artworksList.map(artwork => artwork.image)
  );

  // Afficher une notification temporaire
  const showNotification = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // Vérification des permissions
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Accès refusé</h2>
            <p className="text-muted-foreground">
              Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Filtrage des œuvres
  const filteredArtworks = artworksList.filter(artwork => {
    const matchesSearch = artwork.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || artwork.category === selectedCategory;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "featured" && artwork.featured) ||
                      (activeTab === "recent" && new Date(artwork.dateAdded).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000);
    return matchesSearch && matchesCategory && matchesTab;
  });

  // Tri des œuvres
  const sortedArtworks = [...filteredArtworks].sort((a, b) => {
    if (sortField === 'title') {
      return sortOrder === 'asc' 
        ? a.title[language].localeCompare(b.title[language])
        : b.title[language].localeCompare(a.title[language]);
    } else if (sortField === 'artist') {
      return sortOrder === 'asc'
        ? a.artist.localeCompare(b.artist)
        : b.artist.localeCompare(a.artist);
    } else {
      return sortOrder === 'asc'
        ? new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        : new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
  });

  // Gestion de la sélection multiple
  const toggleArtworkSelection = (id: string) => {
    setSelectedArtworks(prev => 
      prev.includes(id) 
        ? prev.filter(artworkId => artworkId !== id)
        : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    if (selectedArtworks.length === sortedArtworks.length) {
      setSelectedArtworks([]);
    } else {
      setSelectedArtworks(sortedArtworks.map(artwork => artwork.id));
    }
  };

  // Gestion des actions sur les œuvres
  const handleAddArtwork = () => {
    setEditingArtwork(null);
    setFormData({
      title: { fr: "", en: "", wo: "" },
      artist: "",
      period: "",
      origin: "",
      category: "",
      description: { fr: "", en: "", wo: "" },
      history: { fr: "", en: "", wo: "" },
      culturalContext: { fr: "", en: "", wo: "" },
      image: "",
      featured: false,
      dateAdded: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      qrCodeEnabled: true,
      audioGuideUrl: "",
      dimensions: "",
      materials: "",
      conservationStatus: "good",
      exhibitionHistory: "",
      tags: [],
    });
    setIsDialogOpen(true);
  };

  const handleEditArtwork = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setFormData({
      ...artwork,
      featured: artwork.featured || false,
      dateAdded: artwork.dateAdded || new Date().toISOString(),
      lastModified: new Date().toISOString(),
      qrCodeEnabled: artwork.qrCodeEnabled !== false,
      audioGuideUrl: artwork.audioGuideUrl || "",
      dimensions: artwork.dimensions || "",
      materials: artwork.materials || "",
      conservationStatus: artwork.conservationStatus || "good",
      exhibitionHistory: artwork.exhibitionHistory || "",
      tags: artwork.tags || [],
    });
    setIsDialogOpen(true);
  };

  const handleSaveArtwork = () => {
    if (editingArtwork) {
      // Modifier l'œuvre existante
      setArtworksList(prev => prev.map(artwork => 
        artwork.id === editingArtwork.id 
          ? { ...artwork, ...formData }
          : artwork
      ));
    } else {
      // Ajouter une nouvelle œuvre
      const newArtwork: Artwork = {
        id: Date.now().toString(),
        ...formData,
        audioUrl: undefined,
      };
      setArtworksList(prev => [...prev, newArtwork]);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteArtwork = (artwork: Artwork) => {
    setArtworkToDelete(artwork);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteArtwork = () => {
    if (artworkToDelete) {
      setArtworksList(prev => prev.filter(artwork => artwork.id !== artworkToDelete.id));
      showNotification('success', `L'œuvre "${artworkToDelete.title[language]}" a été supprimée avec succès.`);
      setIsDeleteDialogOpen(false);
      setArtworkToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      <div className="container mx-auto px-4 py-8 pt-24">
        {notification && (
          <Alert className={`mb-4 ${notification.type === 'success' ? 'bg-green-50' : notification.type === 'error' ? 'bg-red-50' : notification.type === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'}`}>
            <AlertTitle className="flex items-center">
              {notification.type === 'success' && <CheckCircle className="h-4 w-4 mr-2" />}
              {notification.type === 'error' && <AlertTriangle className="h-4 w-4 mr-2" />}
              {notification.type === 'warning' && <AlertTriangle className="h-4 w-4 mr-2" />}
              {notification.type === 'info' && <Info className="h-4 w-4 mr-2" />}
              {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
            </AlertTitle>
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        )}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gestion des œuvres</h1>
          <p className="text-muted-foreground">
            Gérez la collection du musée
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher une œuvre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name[language]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddArtwork}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter une œuvre
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingArtwork ? "Modifier l'œuvre" : "Ajouter une nouvelle œuvre"}
                  </DialogTitle>
                  <DialogDescription>
                    Remplissez les informations de l'œuvre dans toutes les langues
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Titre */}
                  <div className="space-y-2">
                    <Label>Titre</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <Input
                        placeholder="Français"
                        value={formData.title.fr}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          title: { ...prev.title, fr: e.target.value }
                        }))}
                      />
                      <Input
                        placeholder="English"
                        value={formData.title.en}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          title: { ...prev.title, en: e.target.value }
                        }))}
                      />
                      <Input
                        placeholder="Wolof"
                        value={formData.title.wo}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          title: { ...prev.title, wo: e.target.value }
                        }))}
                      />
                    </div>
                  </div>

                  {/* Informations de base */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Artiste</Label>
                      <Input
                        value={formData.artist}
                        onChange={(e) => setFormData(prev => ({ ...prev, artist: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Période</Label>
                      <Input
                        value={formData.period}
                        onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Origine</Label>
                      <Input
                        value={formData.origin}
                        onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Catégorie</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name[language]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Description en français"
                        value={formData.description.fr}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          description: { ...prev.description, fr: e.target.value }
                        }))}
                        rows={3}
                      />
                      <Textarea
                        placeholder="Description in English"
                        value={formData.description.en}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          description: { ...prev.description, en: e.target.value }
                        }))}
                        rows={3}
                      />
                      <Textarea
                        placeholder="Faramfacce ci Wolof"
                        value={formData.description.wo}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          description: { ...prev.description, wo: e.target.value }
                        }))}
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Image */}
                  <div className="space-y-2">
                    <Label>URL de l'image</Label>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleSaveArtwork}>
                      {editingArtwork ? "Modifier" : "Ajouter"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Liste des œuvres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork) => (
            <Card key={artwork.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <OptimizedImage
                  src={artwork.image}
                  alt={artwork.title[language]}
                  className="w-full h-full"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary">
                    {categories.find(cat => cat.id === artwork.category)?.name[language]}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">
                  {artwork.title[language]}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{artwork.artist}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {artwork.description[language]}
                </p>
                
                <div className="flex justify-end space-x-2 mt-4">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEditArtwork(artwork)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDeleteArtwork(artwork.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucune œuvre trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkManagement;
