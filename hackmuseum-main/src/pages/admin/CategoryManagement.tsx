import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { categories as initialCategories, Category } from "@/data/artworks";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import AdminNavigation from "@/components/AdminNavigation";

const CategoryManagement = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [categoriesList, setCategoriesList] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: { fr: "", en: "", wo: "" },
    description: { fr: "", en: "", wo: "" },
    icon: "",
    color: "",
  });

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

  const filteredCategories = categoriesList.filter(category =>
    category.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description[language].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({
      name: { fr: "", en: "", wo: "" },
      description: { fr: "", en: "", wo: "" },
      icon: "",
      color: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color,
    });
    setIsDialogOpen(true);
  };

  const handleSaveCategory = () => {
    if (editingCategory) {
      // Modifier la catégorie existante
      setCategoriesList(prev => prev.map(category => 
        category.id === editingCategory.id 
          ? { ...category, ...formData }
          : category
      ));
    } else {
      // Ajouter une nouvelle catégorie
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
      };
      setCategoriesList(prev => [...prev, newCategory]);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    setCategoriesList(prev => prev.filter(category => category.id !== id));
  };

  const colorOptions = [
    { value: "bg-orange-100 text-orange-800 border-orange-200", label: "Orange" },
    { value: "bg-purple-100 text-purple-800 border-purple-200", label: "Violet" },
    { value: "bg-green-100 text-green-800 border-green-200", label: "Vert" },
    { value: "bg-blue-100 text-blue-800 border-blue-200", label: "Bleu" },
    { value: "bg-red-100 text-red-800 border-red-200", label: "Rouge" },
    { value: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Jaune" },
  ];

  const iconOptions = ["🗿", "🎭", "🧵", "💎", "🏺", "🎵", "🎨", "📿", "🪶", "🔔"];

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gestion des catégories</h1>
          <p className="text-muted-foreground">
            Organisez les œuvres par catégories
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher une catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Bouton d'ajout */}
        <div className="mb-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddCategory}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une catégorie
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? "Modifier la catégorie" : "Ajouter une nouvelle catégorie"}
                </DialogTitle>
                <DialogDescription>
                  Remplissez les informations de la catégorie dans toutes les langues
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Nom */}
                <div className="space-y-2">
                  <Label>Nom de la catégorie</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Input
                      placeholder="Français"
                      value={formData.name.fr}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        name: { ...prev.name, fr: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="English"
                      value={formData.name.en}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        name: { ...prev.name, en: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="Wolof"
                      value={formData.name.wo}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        name: { ...prev.name, wo: e.target.value }
                      }))}
                    />
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
                      rows={2}
                    />
                    <Textarea
                      placeholder="Description in English"
                      value={formData.description.en}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        description: { ...prev.description, en: e.target.value }
                      }))}
                      rows={2}
                    />
                    <Textarea
                      placeholder="Faramfacce ci Wolof"
                      value={formData.description.wo}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        description: { ...prev.description, wo: e.target.value }
                      }))}
                      rows={2}
                    />
                  </div>
                </div>

                {/* Icône et couleur */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Icône</Label>
                    <div className="flex flex-wrap gap-2">
                      {iconOptions.map((icon) => (
                        <Button
                          key={icon}
                          type="button"
                          variant={formData.icon === icon ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, icon }))}
                          className="text-lg"
                        >
                          {icon}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Couleur</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {colorOptions.map((color) => (
                        <Button
                          key={color.value}
                          type="button"
                          variant={formData.color === color.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                          className="text-xs"
                        >
                          {color.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Aperçu */}
                {formData.name.fr && formData.icon && formData.color && (
                  <div className="space-y-2">
                    <Label>Aperçu</Label>
                    <div className="p-4 border rounded-lg">
                      <Badge className={`${formData.color} text-xs px-2 py-1`}>
                        <span className="mr-1">{formData.icon}</span>
                        {formData.name[language]}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-2">
                        {formData.description[language]}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSaveCategory}>
                    {editingCategory ? "Modifier" : "Ajouter"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Liste des catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{category.icon}</span>
                    <CardTitle className="text-lg">{category.name[language]}</CardTitle>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {category.description[language]}
                </CardDescription>
                <Badge className={`${category.color} text-xs px-2 py-1`}>
                  <span className="mr-1">{category.icon}</span>
                  {category.name[language]}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucune catégorie trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
