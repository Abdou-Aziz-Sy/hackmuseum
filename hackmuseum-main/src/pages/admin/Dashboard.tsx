import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Image, 
  Calendar, 
  Bell, 
  Plus,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Activity,
  Layers,
  Map,
  UserCheck,
  UserPlus,
  BarChart,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Info
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { artworks, categories } from "@/data/artworks";
import AdminNavigation from "@/components/AdminNavigation";
import { useNotificationStore } from "@/services/notification-service";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { notifications } = useNotificationStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalArtworks: 0,
    totalCategories: 0,
    totalUsers: 0,
    pendingReservations: 0,
    visitsToday: 0,
    visitsWeek: 0,
    visitsMonth: 0,
    popularArtworks: [],
    popularCategories: [],
    userGrowth: 0,
    artworkGrowth: 0,
    conversionRate: 0,
    averageVisitDuration: 0,
  });

  useEffect(() => {
    // Simuler le chargement des statistiques
    setStats({
      totalArtworks: artworks.length,
      totalCategories: categories.length,
      totalUsers: 156, // Simulé
      pendingReservations: 8, // Simulé
      visitsToday: 42,
      visitsWeek: 287,
      visitsMonth: 1243,
      popularArtworks: [
        { id: 1, name: "La Joconde", views: 245 },
        { id: 2, name: "Guernica", views: 198 },
        { id: 3, name: "La Nuit étoilée", views: 176 },
        { id: 4, name: "Le Cri", views: 154 },
        { id: 5, name: "Les Nymphéas", views: 132 },
      ],
      popularCategories: [
        { id: 1, name: "Peinture", count: 45, percentage: 38 },
        { id: 2, name: "Sculpture", count: 32, percentage: 27 },
        { id: 3, name: "Photographie", count: 18, percentage: 15 },
        { id: 4, name: "Art numérique", count: 12, percentage: 10 },
        { id: 5, name: "Installation", count: 10, percentage: 8 },
      ],
      userGrowth: 12.5,
      artworkGrowth: 8.3,
      conversionRate: 4.7,
      averageVisitDuration: 67,
    });
  }, []);

  const recentActivities = [
    {
      id: 1,
      type: 'artwork',
      action: 'Nouvelle œuvre ajoutée',
      item: 'Sculpture Traditionnelle',
      time: 'Il y a 2 heures',
      icon: Image,
    },
    {
      id: 2,
      type: 'reservation',
      action: 'Nouvelle réservation',
      item: 'Visite du 15 janvier',
      time: 'Il y a 4 heures',
      icon: Calendar,
    },
    {
      id: 3,
      type: 'category',
      action: 'Catégorie modifiée',
      item: 'Sculpture',
      time: 'Il y a 6 heures',
      icon: Edit,
    },
  ];

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

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
            <p className="text-muted-foreground">
              Bienvenue, {user.name}. Gérez votre musée en toute simplicité.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Aujourd'hui
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="analytics">Analytiques</TabsTrigger>
            <TabsTrigger value="artworks">Œuvres</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Œuvres</CardTitle>
                  <Image className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalArtworks}</div>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stats.artworkGrowth}%
                    </Badge>
                    <p className="text-xs text-muted-foreground ml-2">
                      depuis le mois dernier
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Catégories</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCategories}</div>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="text-xs">
                      Toutes actives
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stats.userGrowth}%
                    </Badge>
                    <p className="text-xs text-muted-foreground ml-2">
                      depuis le mois dernier
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Réservations</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingReservations}</div>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                      En attente
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Statistiques de visites */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Visites aujourd'hui</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.visitsToday}</div>
                  <Progress value={42} className="h-2 mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Visites cette semaine</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.visitsWeek}</div>
                  <Progress value={68} className="h-2 mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Visites ce mois</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.visitsMonth}</div>
                  <Progress value={85} className="h-2 mt-2" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Tendances des visites</CardTitle>
                  <CardDescription>Nombre de visites sur les 30 derniers jours</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="h-16 w-16 mx-auto mb-2 opacity-20" />
                    <p>Graphique de tendances des visites</p>
                    <p className="text-sm">(Données simulées)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Œuvres populaires</CardTitle>
                  <CardDescription>Les œuvres les plus consultées</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[220px]">
                    <div className="space-y-4">
                      {stats.popularArtworks.map((artwork, index) => (
                        <div key={artwork.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                              {index + 1}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{artwork.name}</p>
                              <p className="text-xs text-muted-foreground">{artwork.views} vues</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition par catégorie</CardTitle>
                  <CardDescription>Distribution des œuvres par catégorie</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[220px]">
                    <div className="space-y-4">
                      {stats.popularCategories.map((category) => (
                        <div key={category.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{category.name}</p>
                            <p className="text-sm text-muted-foreground">{category.count} œuvres</p>
                          </div>
                          <Progress value={category.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Accès rapide aux fonctionnalités principales</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button className="h-auto py-4 justify-start" variant="outline">
                <div className="flex flex-col items-start">
                  <div className="flex items-center mb-1">
                    <Plus className="h-4 w-4 mr-2" />
                    <span>Ajouter une œuvre</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    Créer une nouvelle entrée
                  </p>
                </div>
              </Button>
              <Button className="h-auto py-4 justify-start" variant="outline">
                <div className="flex flex-col items-start">
                  <div className="flex items-center mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Gérer les réservations</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    {stats.pendingReservations} en attente
                  </p>
                </div>
              </Button>
              <Button className="h-auto py-4 justify-start" variant="outline">
                <div className="flex flex-col items-start">
                  <div className="flex items-center mb-1">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Gérer les utilisateurs</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    {stats.totalUsers} utilisateurs
                  </p>
                </div>
              </Button>
              <Button className="h-auto py-4 justify-start" variant="outline">
                <div className="flex flex-col items-start">
                  <div className="flex items-center mb-1">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    <span>Voir les statistiques</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    Rapport détaillé
                  </p>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Activités récentes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Activités récentes</CardTitle>
                <CardDescription>Dernières actions effectuées</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                Voir tout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <activity.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.item}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="flex items-start gap-4 rounded-lg border p-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(notification.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline" className="w-full">
                <Bell className="mr-2 h-4 w-4" />
                Voir toutes les notifications
              </Button>
            </CardFooter>
          </Card>
        </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une nouvelle œuvre
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Créer une catégorie
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Envoyer une notification
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Gérer les réservations
              </Button>
            </CardContent>
          </Card>

          {/* Activités récentes */}
          <Card>
            <CardHeader>
              <CardTitle>Activités récentes</CardTitle>
              <CardDescription>
                Dernières actions effectuées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.item}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {activity.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Œuvres récentes */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Œuvres récentes</CardTitle>
            <CardDescription>
              Dernières œuvres ajoutées à la collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {artworks.slice(0, 5).map((artwork) => (
                <div key={artwork.id} className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden">
                    <img 
                      src={artwork.image} 
                      alt={artwork.title.fr}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{artwork.title.fr}</p>
                    <p className="text-sm text-muted-foreground">{artwork.artist}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
