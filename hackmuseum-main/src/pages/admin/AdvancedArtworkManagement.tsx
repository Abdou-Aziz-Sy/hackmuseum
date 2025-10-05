import { useState, useMemo } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star, 
  Calendar,
  Tag,
  Image,
  FileText,
  BarChart3,
  Settings,
  Copy,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AdminNavigation from "@/components/AdminNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { artworks, categories } from "@/data/artworks";
import { toast } from "sonner";

interface ArtworkStats {
  total: number;
  published: number;
  draft: number;
  featured: number;
  views: number;
  likes: number;
}

const AdvancedArtworkManagement = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedArtworks, setSelectedArtworks] = useState<string[]>([]);
  const [isBulkEditing, setIsBulkEditing] = useState(false);

  // Simulation de données étendues
  const [artworkData, setArtworkData] = useState(artworks.map(artwork => ({
    ...artwork,
    status: Math.random() > 0.3 ? 'published' : 'draft',
    featured: Math.random() > 0.7,
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    tags: ['traditionnel', 'sculpture', 'africain'],
    seoScore: Math.floor(Math.random() * 100),
    imageOptimized: Math.random() > 0.2
  })));

  const stats: ArtworkStats = useMemo(() => ({
    total: artworkData.length,
    published: artworkData.filter(a => a.status === 'published').length,
    draft: artworkData.filter(a => a.status === 'draft').length,
    featured: artworkData.filter(a => a.featured).length,
    views: artworkData.reduce((sum, a) => sum + a.views, 0),
    likes: artworkData.reduce((sum, a) => sum + a.likes, 0)
  }), [artworkData]);

  const filteredArtworks = useMemo(() => {
    return artworkData.filter(artwork => {
      const matchesSearch = artwork.title.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          artwork.title.en.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || artwork.category === selectedCategory;
      const matchesStatus = statusFilter === "all" || artwork.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    }).sort((a, b) => {
      switch (sortBy) {
        case "title": return a.title.fr.localeCompare(b.title.fr);
        case "date": return b.lastModified.getTime() - a.lastModified.getTime();
        case "views": return b.views - a.views;
        case "likes": return b.likes - a.likes;
        default: return 0;
      }
    });
  }, [artworkData, searchTerm, selectedCategory, statusFilter, sortBy]);

  const handleBulkAction = (action: string) => {
    if (selectedArtworks.length === 0) {
      toast.error("Aucune œuvre sélectionnée");
      return;
    }

    switch (action) {
      case "publish":
        setArtworkData(prev => prev.map(artwork => 
          selectedArtworks.includes(artwork.id) 
            ? { ...artwork, status: 'published' }
            : artwork
        ));
        toast.success(`${selectedArtworks.length} œuvres publiées`);
        break;
      case "unpublish":
        setArtworkData(prev => prev.map(artwork => 
          selectedArtworks.includes(artwork.id) 
            ? { ...artwork, status: 'draft' }
            : artwork
        ));
        toast.success(`${selectedArtworks.length} œuvres dépubliées`);
        break;
      case "feature":
        setArtworkData(prev => prev.map(artwork => 
          selectedArtworks.includes(artwork.id) 
            ? { ...artwork, featured: true }
            : artwork
        ));
        toast.success(`${selectedArtworks.length} œuvres mises en vedette`);
        break;
      case "delete":
        setArtworkData(prev => prev.filter(artwork => !selectedArtworks.includes(artwork.id)));
        toast.success(`${selectedArtworks.length} œuvres supprimées`);
        break;
    }
    setSelectedArtworks([]);
  };

  const handleSelectArtwork = (id: string) => {
    setSelectedArtworks(prev => 
      prev.includes(id) 
        ? prev.filter(artworkId => artworkId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedArtworks(
      selectedArtworks.length === filteredArtworks.length 
        ? [] 
        : filteredArtworks.map(artwork => artwork.id)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="space-y-6">
          {/* En-tête avec statistiques */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Gestion Avancée des Œuvres</h1>
              <p className="text-muted-foreground mt-2">
                Gérez votre collection avec des outils professionnels
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Importer
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Œuvre
              </Button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Publiées</p>
                    <p className="text-2xl font-bold text-green-600">{stats.published}</p>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Brouillons</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
                  </div>
                  <FileText className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Vedettes</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.featured}</p>
                  </div>
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Vues</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.views.toLocaleString()}</p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Likes</p>
                    <p className="text-2xl font-bold text-red-600">{stats.likes.toLocaleString()}</p>
                  </div>
                  <Star className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres et contrôles */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher une œuvre..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name.fr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="published">Publié</SelectItem>
                      <SelectItem value="draft">Brouillon</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="title">Titre</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="views">Vues</SelectItem>
                      <SelectItem value="likes">Likes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions en lot */}
          {selectedArtworks.length > 0 && (
            <Alert>
              <AlertDescription className="flex items-center justify-between">
                <span>{selectedArtworks.length} œuvre(s) sélectionnée(s)</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => handleBulkAction("publish")}>
                    Publier
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("unpublish")}>
                    Dépublier
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("feature")}>
                    Mettre en vedette
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleBulkAction("delete")}>
                    Supprimer
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Liste des œuvres */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="analytics">Analytiques</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="media">Médias</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArtworks.map((artwork) => (
                    <Card key={artwork.id} className="overflow-hidden">
                      <div className="relative">
                        <img 
                          src={artwork.image} 
                          alt={artwork.title.fr}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          {artwork.featured && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              <Star className="h-3 w-3 mr-1" />
                              Vedette
                            </Badge>
                          )}
                          <Badge variant={artwork.status === 'published' ? 'default' : 'secondary'}>
                            {artwork.status === 'published' ? 'Publié' : 'Brouillon'}
                          </Badge>
                        </div>
                        <div className="absolute top-2 left-2">
                          <input
                            type="checkbox"
                            checked={selectedArtworks.includes(artwork.id)}
                            onChange={() => handleSelectArtwork(artwork.id)}
                            className="h-4 w-4"
                          />
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{artwork.title.fr}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {artwork.description.fr}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                          <span>{artwork.views} vues</span>
                          <span>{artwork.likes} likes</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{artwork.category}</Badge>
                            <Badge variant="outline">SEO: {artwork.seoScore}%</Badge>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Dupliquer
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Partager
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <input
                              type="checkbox"
                              checked={selectedArtworks.length === filteredArtworks.length}
                              onChange={handleSelectAll}
                              className="h-4 w-4"
                            />
                          </TableHead>
                          <TableHead>Image</TableHead>
                          <TableHead>Titre</TableHead>
                          <TableHead>Catégorie</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Vues</TableHead>
                          <TableHead>Likes</TableHead>
                          <TableHead>SEO</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredArtworks.map((artwork) => (
                          <TableRow key={artwork.id}>
                            <TableCell>
                              <input
                                type="checkbox"
                                checked={selectedArtworks.includes(artwork.id)}
                                onChange={() => handleSelectArtwork(artwork.id)}
                                className="h-4 w-4"
                              />
                            </TableCell>
                            <TableCell>
                              <img 
                                src={artwork.image} 
                                alt={artwork.title.fr}
                                className="w-12 h-12 object-cover rounded"
                              />
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{artwork.title.fr}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(artwork.lastModified).toLocaleDateString()}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{artwork.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Badge variant={artwork.status === 'published' ? 'default' : 'secondary'}>
                                  {artwork.status === 'published' ? 'Publié' : 'Brouillon'}
                                </Badge>
                                {artwork.featured && (
                                  <Star className="h-4 w-4 text-yellow-500" />
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{artwork.views}</TableCell>
                            <TableCell>{artwork.likes}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={artwork.seoScore} className="w-16" />
                                <span className="text-sm">{artwork.seoScore}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Settings className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Dupliquer
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Partager
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytiques des Œuvres</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Graphiques et statistiques détaillées des performances des œuvres.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>Optimisation SEO</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Outils d'optimisation pour les moteurs de recherche.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Médias</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Bibliothèque de médias et optimisation des images.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdvancedArtworkManagement;
