import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Users, 
  Eye, 
  Star, 
  TrendingUp, 
  Calendar, 
  Globe, 
  Shield, 
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Download,
  Settings,
  Bell
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdminNavigation from "@/components/AdminNavigation";
import NotificationCenter from "@/components/admin/NotificationCenter";
import { useLanguage } from "@/contexts/LanguageContext";

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalArtworks: number;
  publishedArtworks: number;
  totalViews: number;
  monthlyViews: number;
  reservations: number;
  pendingReservations: number;
  systemHealth: number;
  storageUsed: number;
  storageTotal: number;
}

interface RecentActivity {
  id: string;
  type: 'user' | 'artwork' | 'reservation' | 'system';
  action: string;
  user: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error';
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  resolved: boolean;
}

const ProfessionalDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 1247,
    activeUsers: 892,
    totalArtworks: 156,
    publishedArtworks: 142,
    totalViews: 45678,
    monthlyViews: 1234,
    reservations: 89,
    pendingReservations: 12,
    systemHealth: 98,
    storageUsed: 2.4,
    storageTotal: 10
  });

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'user',
      action: 'Nouvel utilisateur inscrit',
      user: 'Marie Diop',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: 'success'
    },
    {
      id: '2',
      type: 'artwork',
      action: 'Nouvelle œuvre ajoutée',
      user: 'Admin',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'success'
    },
    {
      id: '3',
      type: 'reservation',
      action: 'Nouvelle réservation',
      user: 'Groupe scolaire',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: 'success'
    },
    {
      id: '4',
      type: 'system',
      action: 'Sauvegarde automatique',
      user: 'Système',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      status: 'success'
    },
    {
      id: '5',
      type: 'system',
      action: 'Erreur de connexion base de données',
      user: 'Système',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: 'error'
    }
  ]);

  const [systemAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Espace de stockage',
      message: 'L\'espace de stockage atteint 80% de sa capacité',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      resolved: false
    },
    {
      id: '2',
      type: 'info',
      title: 'Maintenance programmée',
      message: 'Maintenance du serveur prévue demain à 2h00',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      resolved: false
    },
    {
      id: '3',
      type: 'error',
      title: 'Erreur de sauvegarde',
      message: 'Échec de la sauvegarde automatique',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
      resolved: true
    }
  ]);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${days}j`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'info': return <Globe className="h-4 w-4 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="space-y-6">
          {/* En-tête avec notifications */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Tableau de Bord</h1>
              <p className="text-muted-foreground mt-2">
                Vue d'ensemble de votre plateforme muséale
              </p>
            </div>
            <div className="flex items-center gap-3">
              <NotificationCenter />
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Rapport
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
            </div>
          </div>

          {/* Alertes système */}
          {systemAlerts.filter(alert => !alert.resolved).length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <span>
                    {systemAlerts.filter(alert => !alert.resolved).length} alerte(s) système active(s)
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/admin/notifications')}
                  >
                    Voir toutes les alertes
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Utilisateurs Actifs</p>
                    <p className="text-3xl font-bold">{stats.activeUsers.toLocaleString()}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +12% ce mois
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Vues Total</p>
                    <p className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +8% ce mois
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Eye className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Œuvres Publiées</p>
                    <p className="text-3xl font-bold">{stats.publishedArtworks}</p>
                    <p className="text-sm text-blue-600 flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      {stats.totalArtworks} au total
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Réservations</p>
                    <p className="text-3xl font-bold">{stats.reservations}</p>
                    <p className="text-sm text-orange-600 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {stats.pendingReservations} en attente
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Métriques système */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Santé du Système
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Performance globale</span>
                    <span className="text-sm font-medium">{stats.systemHealth}%</span>
                  </div>
                  <Progress value={stats.systemHealth} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span>Serveur</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span>Base de données</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                      <span>Stockage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span>Réseau</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Stockage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Espace utilisé</span>
                    <span className="text-sm font-medium">{stats.storageUsed} GB / {stats.storageTotal} GB</span>
                  </div>
                  <Progress value={(stats.storageUsed / stats.storageTotal) * 100} className="h-2" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Images</span>
                      <span>1.2 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Base de données</span>
                      <span>0.8 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Logs</span>
                      <span>0.4 GB</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activité Récente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.slice(0, 4).map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3">
                      {getStatusIcon(activity.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.user} • {formatTimeAgo(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tableaux détaillés */}
          <Tabs defaultValue="activity" className="space-y-4">
            <TabsList>
              <TabsTrigger value="activity">Activité</TabsTrigger>
              <TabsTrigger value="alerts">Alertes</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Activité Récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentActivity.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell>
                            <Badge variant="outline">{activity.type}</Badge>
                          </TableCell>
                          <TableCell>{activity.action}</TableCell>
                          <TableCell>{activity.user}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(activity.status)}
                              <span className="capitalize">{activity.status}</span>
                            </div>
                          </TableCell>
                          <TableCell>{formatTimeAgo(activity.timestamp)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts">
              <Card>
                <CardHeader>
                  <CardTitle>Alertes Système</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className={`p-4 rounded-lg border ${
                        alert.resolved ? 'bg-gray-50' : 
                        alert.type === 'error' ? 'bg-red-50 border-red-200' :
                        alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-blue-50 border-blue-200'
                      }`}>
                        <div className="flex items-start gap-3">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{alert.title}</h4>
                              <div className="flex items-center gap-2">
                                {alert.resolved ? (
                                  <Badge variant="secondary">Résolu</Badge>
                                ) : (
                                  <Badge variant={alert.type === 'error' ? 'destructive' : 'secondary'}>
                                    {alert.type === 'error' ? 'Erreur' : alert.type === 'warning' ? 'Avertissement' : 'Info'}
                                  </Badge>
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {formatTimeAgo(alert.timestamp)}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Métriques de Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Temps de Réponse</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Page d'accueil</span>
                          <span className="text-green-600">245ms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Galerie</span>
                          <span className="text-green-600">312ms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Détail œuvre</span>
                          <span className="text-yellow-600">456ms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Administration</span>
                          <span className="text-green-600">189ms</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Utilisation des Ressources</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>CPU</span>
                          <span>23%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>RAM</span>
                          <span>67%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Disque</span>
                          <span>24%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Réseau</span>
                          <span>12%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalDashboard;
